import { runtimeData } from "./objectSchemas";
import { readFileSync } from "fs";
import path from "path";
import { colorize } from "./shared";
import "./logger";

export const fofoDocsBuiltInGlobSearch = [
    // TypeScript / Node.js / JS
    "package.json",
    "**/package.json",
    "**/**/package.json",

    // Python
    "**/requirements.txt",
    "**/**/requirements.txt",
    "**/Pipfile",
    "**/**/Pipfile",
    
    // Ruby
    "**/Gemfile",
    "**/**/Gemfile",
    
    // Java
    "**/pom.xml",
    "**/**/pom.xml",

    // Swift
    "**/Podfile",
    "**/**/Podfile",

    // C#
    "**/packages.config",
    "**/**/packages.config",

    // C++
    "**/CMakeLists.txt",
    "**/**/CMakeLists.txt",

    // Kotlin
    "**/build.gradle",
    "**/**/build.gradle",

    // Go
    "**/go.mod",
    "**/**/go.mod",

    // PHP
    "**/composer.json",
    "**/**/composer.json",

    // Rust
    "**/Cargo.toml",
    "**/**/Cargo.toml",

    // Dart
    "**/pubspec.yaml",
    "**/**/pubspec.yaml",

    // Scala
    "**/build.sbt",
    "**/**/build.sbt",

    // Haskell
    "**/stack.yaml",
    "**/**/stack.yaml",

    // Lua
    "**/rockspec",
    "**/**/rockspec",

    // Erlang
    "**/rebar.config",
    "**/**/rebar.config",

    // Elixir
    "**/mix.exs",
    "**/**/mix.exs",

    // Julia
    "**/Project.toml",
    "**/**/Project.toml",

    // R
    "**/DESCRIPTION",
    "**/**/DESCRIPTION",

    // Golang
    "**/go.mod",
    "**/**/go.mod",
    
];

export const fofoDocsBuiltInFileSearch = [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.swift",
    "**/*.java",
    "**/*.py",
    "**/*.go",
    "**/*.rb",
    "**/*.php",
    "**/*.cs",
    "**/*.cpp",
    "**/*.c",
    "**/*.h",
    "**/*.hpp",
    "**/*.m",
    "**/*.mm",
    "**/*.kt",
    "**/*.kts",
    "**/*.sql",
    "**/*.r",
    "**/*.scala",
    "**/*.sh",
    "**/*.bat",
    "**/*.cmd",
    "**/*.rs",
    "**/*.dart",
    "**/*.erl",
    "**/*.ex",
    "**/*.exs",
    "**/*.hs",
    "**/*.jl",
    "**/*.lua",
  
    "**/*.pl",
    "**/*.pm",
    "**/*.r",
    "**/*.tcl",
    "**/*.vb",
    "**/*.vbs",
    "**/*.xml",
    "**/*.html",
    "**/*.css",
    "**/*.scss",
    "**/*.sass",
    "**/*.less",
    "**/*.yaml",
    "**/*.yml",
    "**/*.json"
]

const headerColored = colorize(`

    ====================================================================================
    $$$$$$$$\\         $$$$$$\\                 $$$$$$$\\                                
    $$  _____|       $$  __$$\\                $$  __$$\\                               
    $$ |    $$$$$$\\  $$ /  \\__|$$$$$$\\        $$ |  $$ | $$$$$$\\   $$$$$$$\\  $$$$$$$\\ 
    $$$$$\\ $$  __$$\\ $$$$\    $$  __$$\\       $$ |  $$ |$$  __$$\\ $$  _____|$$  _____|
    $$  __|$$ /  $$ |$$  _|   $$ /  $$ |      $$ |  $$ |$$ /  $$ |$$ /      \\$$$$$$\\  
    $$ |   $$ |  $$ |$$ |     $$ |  $$ |      $$ |  $$ |$$ |  $$ |$$ |       \\____$$\\ 
    $$ |   \\$$$$$$  |$$ |     \\$$$$$$  |      $$$$$$$  |\\$$$$$$  |\\$$$$$$$\\ $$$$$$$  |
    \\__|    \\______/ \\__|      \\______/       \\_______/  \\______/  \\_______|\\_______/ 

    Created By Sweet Papa Technologies, LLC
    Forrester Terry | fterry@sweetpapatechnologis.com
                            
    ====================================================================================


`, 'green')


export const appHeaderPretty = (runtimeData:runtimeData) => `

${headerColored}

Version: ${colorize(runtimeData.appVersion, 'blue')}
Project: ${colorize(runtimeData.projectName, 'magenta')}
Path: ${colorize(runtimeData.projectPath, 'magenta')}

Selected Language Model: ${colorize(runtimeData.selectedLLModel || 'Undefined', 'yellow')}
Selected RAG Service: ${colorize(runtimeData.selectedRAGService, 'yellow')}

Output Path: ${colorize(runtimeData.outputPath, 'green')}

====================================================================================
`

export function getAppVersion() {
    try {
        const scriptDirectory = __dirname;
        const packageJSONpath = path.join(scriptDirectory, "../package.json");
        const packageJSON = readFileSync(packageJSONpath, "utf-8");
        const packageJSONParsed = JSON.parse(packageJSON);
        return packageJSONParsed.version;
    } catch (error) {
        console.error("Error reading package.json", error);
        return "AWESOME VERSION - THE ONE INCAPABLE OF RETURNING ITS OWN VERSION";
    }
}    

export function isNoNoFile(file: string, ignoreMeh:string[]=[]): boolean {
    let isNoNo = false;

    const nonoDirs = [
        "node_modules",
        "dist",
        "build",
        "out",
        "bin",
        "obj",
        "venv",
        "__pycache__",
        ".DS_Store",
        ".vscode",
        "coverage",
        ".nyc_output",
        ".mypy_cache",
        ".pytest_cache",
        ".tox",
        ".nox",
        ".coverage",
        ".hypothesis",
        ".git",
        ".hg",
        ".svn",
        ".bzr",
        "htmlcov",
        "site",
        ".sass-cache",
        ".cache",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".venv",
        ...ignoreMeh
    ]

    const noNoKeywords = [
        "node_modules/",
        "tsconfig.json",
        ".md",
        "dist/",
        "build/",
        "out/",
        "bin/",
        "obj/",
        "venv/",
        "__pycache__/",
        "*.pyc",
        "*.pyo",
        ".DS_Store",
        "*.class",
        "*.jar",
        "*.war",
        "*.ear",
        "*.dll",
        "*.exe",
        "*.out",
        "*.log",
        "*.tmp",
        "*.lock",
        "yarn.lock",
        "package-lock.json",
        "pipfile.lock",
        "poetry.lock",
        "*.iml",
        ".idea/",
        "*.suo",
        "*.user",
        "*.userosscache",
        "*.sln.docstates",
        "*.swp",
        "*.swo",
        "*.bak",
        "*.orig",
        "*.rej",
        ".vscode/",
        "coverage/",
        ".nyc_output/",
        "*.test",
        "*.spec",
        "*.snap",
        "target/",
        "Pods/",
        "DerivedData/",
        ".gradle/",
        "*.xcworkspace",
        "*.xcodeproj",
        "CMakeFiles/",
        "CMakeCache.txt",
        "CMakeLists.txt.user",
        ".mypy_cache/",
        ".pytest_cache/",
        ".tox/",
        ".nox/",
        ".coverage",
        ".hypothesis/",
        "*.prof",
        ".xml",
        ".json",
        ".html",
        ".css",
        ".scss",
        ".sass",
        ".less",
        ".yaml",
        ".yml",
        ".env",
        ".env.*",
        ".git/",
        ".hg/",
        ".svn/",
        ".bzr/",
        "nosetests.xml",
        "test-results.xml",
        "tests/__pycache__/",
        "tests/*.pyc",
        "tests/*.pyo",
        "docs/_build/",
        "*.ipynb_checkpoints",
        "htmlcov/",
        "site/",
        ".sass-cache/",
        ".cache/",
        "npm-debug.log",
        "yarn-debug.log",
        "yarn-error.log",
        ".env",
        ".env.*",
        ".venv/"
    ]
    
    for (const keyword of noNoKeywords) {
        if (file.includes(keyword)) {
            isNoNo = true;
            break;
        }
    }

    for (const OKkeyword of fofoDocsBuiltInGlobSearch) {

        if (file.includes(OKkeyword)) {
            let isOK = true

            for (const dir of nonoDirs) {
                if (file.includes(dir)) {
                    isOK = false;
                    break;
                }
            }

            if (isOK === true) {
                isNoNo = false;
                break;
            }
        }
    }

    return isNoNo;

}