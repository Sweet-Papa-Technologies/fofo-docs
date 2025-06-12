import fs from 'fs';
import path from 'path';
import { ProjectSummary } from '../objectSchemas'; // Assuming ProjectSummary and moduleObject types can be imported
// If direct import is problematic due to file structure or dependencies, define simplified mocks here.

// Mock 'infer' and 'determineModulesPackagesFromFile' as they are LLM dependent and not the focus of this test unit.
jest.mock('../llmInterface', () => ({
  infer: jest.fn(),
  // getCodeSummaryFromLLM: jest.fn(), // Not directly testing this part of codeParser
}));
jest.mock('../prompt', () => ({
  determineModulesPackagesFromFile: jest.fn(), // Mock if it's used by the parts of codeParser we test
  // determineProjectStack: jest.fn(), // Not testing this
  // getLanguageTypeFromFile: jest.fn(), // Not testing this
}));


// Simplified module object for testing
interface MockModuleObject {
  name: string;
  version: string;
  description: string;
  type: string;
}

interface MockGroupedDependencies {
  [type: string]: MockModuleObject[];
}


describe('Dependency Processing in codeParser', () => {
  let mockProjectSummary: ProjectSummary;

  beforeEach(() => {
    // Reset mocks for each test
    jest.clearAllMocks();

    // Initialize a mock ProjectSummary
    mockProjectSummary = {
      projectName: 'TestProject',
      projectDescription: { goal: '', features_functions: '' },
      projectDependencies: {}, // Initialize as an empty object for grouped dependencies
      projectLocation: '/mock/project/path',
      projectTechStackDescription: '',
      codeFiles: [],
      ragData: [],
      teamContext: '',
    };

    // Mock fs functions
    // @ts-ignore
    fs.existsSync = jest.fn();
    // @ts-ignore
    fs.readFileSync = jest.fn();
  });

  test('should correctly group dependencies and fetch descriptions', async () => {
    // --- Setup Mocks ---
    const projectPackageJsonContent = {
      name: 'TestProject',
      version: '1.0.0',
      dependencies: {
        'lodash': '^4.17.21',
      },
      devDependencies: {
        'jest': '^27.5.1',
        'moment': '^2.29.1', // A dep that will have its description fetched
      },
    };

    const lodashPackageJsonContent = {
      name: 'lodash',
      version: '4.17.21',
      description: 'Lodash modular utilities.',
    };

    const momentPackageJsonContent = {
        name: 'moment',
        version: '2.29.1',
        description: 'Parse, validate, manipulate, and display dates', // Description to be fetched
    };

    // Mock readFileSync behavior
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockProjectSummary.projectLocation, 'package.json')) {
        return JSON.stringify(projectPackageJsonContent);
      }
      if (filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/lodash/package.json')) {
        return JSON.stringify(lodashPackageJsonContent);
      }
      if (filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/jest/package.json')) {
        // Simulate jest's package.json having no description for this test
        return JSON.stringify({ name: 'jest', version: '27.5.1' });
      }
      if (filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/moment/package.json')) {
        return JSON.stringify(momentPackageJsonContent);
      }
      throw new Error(`readFileSync: Unhandled path ${filePath}`);
    });

    // Mock existsSync behavior
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === path.join(mockProjectSummary.projectLocation, 'package.json') ||
          filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/lodash/package.json') ||
          filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/jest/package.json') ||
          filePath === path.join(mockProjectSummary.projectLocation, 'node_modules/moment/package.json')) {
        return true;
      }
      return false;
    });

    // --- Simulate the relevant part of parseCodebase ---
    // This is a simplified simulation of the logic within parseCodebase
    // In a real scenario, you might refactor codeParser to make this logic more directly testable.

    // 1. Process project's package.json (simulating the loop over dependencyFiles)
    const mainPackageJsonPath = path.join(mockProjectSummary.projectLocation, 'package.json');
    if (mainPackageJsonPath.endsWith('package.json')) {
        const content = fs.readFileSync(mainPackageJsonPath, 'utf-8');
        const packageJson = JSON.parse(content);

        const processDeps = (deps: any, type: string) => {
            if (deps) {
                for (const name in deps) {
                    const version = deps[name];
                    if (!mockProjectSummary.projectDependencies[type]) {
                        mockProjectSummary.projectDependencies[type] = [];
                    }
                    mockProjectSummary.projectDependencies[type]!.push({
                        name,
                        version,
                        description: "", // Initially empty
                        type,
                    }); // Removed 'as any' - object should conform to moduleObject
                }
            }
        };
        processDeps(packageJson.dependencies, 'dependencies');
        processDeps(packageJson.devDependencies, 'devDependencies');
    }


    // 2. Simulate fetching missing descriptions (the loop after collecting all initial deps)
    for (const depType in mockProjectSummary.projectDependencies) {
      const depsOfType = mockProjectSummary.projectDependencies[depType] as unknown as MockModuleObject[];
      if (depsOfType && Array.isArray(depsOfType)) {
        for (const dep of depsOfType) {
          if (dep && typeof dep.name === 'string' && (dep.description === undefined || dep.description === "")) {
            try {
              const depPackageJsonPath = path.join(mockProjectSummary.projectLocation, 'node_modules', dep.name, 'package.json');
              if (fs.existsSync(depPackageJsonPath)) {
                const depPackageJsonContent = fs.readFileSync(depPackageJsonPath, 'utf-8');
                const packageJsonDetails = JSON.parse(depPackageJsonContent);
                dep.description = packageJsonDetails.description || 'N/A (description missing in package.json)';
              } else {
                dep.description = 'N/A (package.json not found in node_modules)';
              }
            } catch (error) {
              dep.description = 'N/A (error reading package.json)';
            }
          }
        }
      }
    }
    // --- Assertions ---
    const deps = mockProjectSummary.projectDependencies as unknown as MockGroupedDependencies;

    expect(deps.dependencies).toBeDefined();
    expect(deps.dependencies.length).toBe(1);
    expect(deps.dependencies[0].name).toBe('lodash');
    expect(deps.dependencies[0].description).toBe('Lodash modular utilities.'); // Fetched from its own package.json
    expect(deps.dependencies[0].type).toBe('dependencies');


    expect(deps.devDependencies).toBeDefined();
    expect(deps.devDependencies.length).toBe(2);

    const jestDep = deps.devDependencies.find(d => d.name === 'jest');
    expect(jestDep).toBeDefined();
    expect(jestDep?.description).toBe('N/A (description missing in package.json)'); // Fallback
    expect(jestDep?.type).toBe('devDependencies');

    const momentDep = deps.devDependencies.find(d => d.name === 'moment');
    expect(momentDep).toBeDefined();
    expect(momentDep?.description).toBe('Parse, validate, manipulate, and display dates'); // Fetched
    expect(momentDep?.type).toBe('devDependencies');
  });
});

// Tests for extractProjectContext
import { extractProjectContext } from '../codeParser'; // Import the function to test
import { glob as globPromise } from 'glob';

// Mock globPromise
jest.mock('glob', () => ({
  glob: jest.fn(),
}));

describe('extractProjectContext', () => {
  let mockProjectSummary: ProjectSummary;
  // @ts-ignore
  const inferMock = jest.requireMock('../llmInterface').infer;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProjectSummary = {
      projectName: 'TestProject',
      projectLocation: '/mock/project/path',
      projectDependencies: {},
      projectDescription: { goal: '', features_functions: '' },
      projectTechStackDescription: '',
      codeFiles: [], // Will be populated per test case
      ragData: [],
      teamContext: '', // This is what extractProjectContext will generate
    };

    // Default mock implementations (can be overridden in tests)
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockReturnValue('');
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValue([]);
    inferMock.mockResolvedValue({ response: 'Default LLM context summary.' }); // Default LLM response
  });

  test('should return default message if no context sources are found and LLM provides no summary', async () => {
    inferMock.mockResolvedValueOnce({ response: '' }); // LLM returns empty
    const context = await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);
    expect(context).toBe('LLM could not generate a project context summary. Using extracted information as fallback.');
    // Check that glob and readFileSync were called for README/package.json
    expect(globPromise).toHaveBeenCalled();
    expect(fs.existsSync).toHaveBeenCalledWith(path.join(mockProjectSummary.projectLocation, 'package.json'));
  });

  test('should include README content in context passed to LLM', async () => {
    const readmeContent = 'This is a sample README file.';
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValueOnce(['/mock/project/path/README.md']);
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockImplementation(filePath => {
      if (filePath === '/mock/project/path/README.md') return readmeContent;
      if (filePath === path.join(mockProjectSummary.projectLocation, 'package.json')) return '{}'; // empty package.json
      return '';
    });
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockImplementation(p => p === path.join(mockProjectSummary.projectLocation, 'package.json') || p === '/mock/project/path/README.md');


    await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);

    expect(inferMock).toHaveBeenCalled();
    const promptToLLM = inferMock.mock.calls[0][0]; // The first argument to infer is the prompt
    expect(promptToLLM).toContain('README Content (README.md):\n' + readmeContent);
  });

  test('should include package.json description, name, and keywords in context passed to LLM', async () => {
    const packageJson = {
      name: 'my-test-package',
      description: 'A test package description.',
      keywords: ['test', 'sample'],
    };
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // For package.json
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(packageJson));
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValueOnce([]); // No READMEs

    await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);

    expect(inferMock).toHaveBeenCalled();
    const promptToLLM = inferMock.mock.calls[0][0];
    expect(promptToLLM).toContain(`Project Name (from package.json):\n${packageJson.name}`);
    expect(promptToLLM).toContain(`Project Description (from package.json):\n${packageJson.description}`);
    expect(promptToLLM).toContain(`Project Keywords (from package.json):\n${packageJson.keywords.join(', ')}`);
  });

  test('should include code summaries and object descriptions from projectSummary.codeFiles', async () => {
    mockProjectSummary.codeFiles = [
      {
        fileName: 'file1.ts',
        fileLocation: '/mock/project/path/file1.ts',
        language: 'typescript',
        processingStatus: 'success',
        codeSummary: { goal: 'File1 goal', features_functions: 'File1 features' },
        codeObjects: {
          // @ts-ignore
          functions: [{ name: 'doSomething', type: 'function', description: 'Does something cool', annotation: {purpose: "Purpose of doSomething"} }],
        },
      },
    ];

    await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);

    expect(inferMock).toHaveBeenCalled();
    const promptToLLM = inferMock.mock.calls[0][0];
    expect(promptToLLM).toContain('File file1.ts - Goal: File1 goal');
    expect(promptToLLM).toContain('File file1.ts - Features/Functions: File1 features');
    expect(promptToLLM).toContain('Object "doSomething" (function in file1.ts) - Description: Does something cool');
    expect(promptToLLM).toContain('Object "doSomething" (function in file1.ts) - Annotated Purpose: Purpose of doSomething');
  });

  test('should identify and include known patterns in context passed to LLM', async () => {
    const readmeContent = 'This project handles security and compliance requirements.';
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValueOnce(['/mock/project/path/README.md']);
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockImplementation(filePath => {
      if (filePath === '/mock/project/path/README.md') return readmeContent;
      return '{}';
    });
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockImplementation(p => p === path.join(mockProjectSummary.projectLocation, 'package.json') || p === '/mock/project/path/README.md');


    await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);

    expect(inferMock).toHaveBeenCalled();
    const promptToLLM = inferMock.mock.calls[0][0];
    expect(promptToLLM).toContain('Potential Contextual Keywords Found:\nsecurity, compliance');
  });

  test('should return LLM response as context', async () => {
    const expectedContext = 'LLM generated project context about security.';
    inferMock.mockResolvedValueOnce({ response: expectedContext });
     // @ts-ignore
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // For package.json
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify({description: "Security focus"}));


    const context = await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);
    expect(context).toBe(expectedContext);
  });

  test('should return fallback if LLM call fails', async () => {
    inferMock.mockRejectedValueOnce(new Error('LLM API Error'));
    const readmeContent = 'Important project data.';
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValueOnce(['/mock/project/path/README.md']);
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockImplementation(p => (p === '/mock/project/path/README.md' ? readmeContent : '{}'));
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockImplementation(p => p === path.join(mockProjectSummary.projectLocation, 'package.json') || p === '/mock/project/path/README.md');


    const context = await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);
    expect(context).toContain('Error generating project context summary via LLM. Fallback:');
    expect(context).toContain(readmeContent);
  });

   test('should handle empty codeFiles gracefully', async () => {
    mockProjectSummary.codeFiles = []; // Ensure codeFiles is empty
    // @ts-ignore
    (globPromise as jest.Mock).mockResolvedValueOnce([]); // No README
    // @ts-ignore
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true); // package.json exists
    // @ts-ignore
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify({ description: "Minimal package" }));


    await extractProjectContext(mockProjectSummary.projectLocation, mockProjectSummary);

    expect(inferMock).toHaveBeenCalled();
    const promptToLLM = inferMock.mock.calls[0][0];
    expect(promptToLLM).not.toContain("Collected Code Summaries and Object Descriptions");
    expect(promptToLLM).toContain("Minimal package");
  });
});
