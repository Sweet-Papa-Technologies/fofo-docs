export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]s$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json',
        },
      ],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transformIgnorePatterns: ['/node_modules/(?!@mermaid-js/mermaid-cli)'],
  };