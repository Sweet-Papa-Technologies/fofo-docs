import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const bVerbose = process.env.bVerbose?.toLowerCase() === 'true' || false;

const traceCallback = () => {
    const customDebug = new Error().stack || '';
    originalConsole.debug(chalk.lightGray(`🔍 [TRACE=>] ${customDebug.replace('Error', 'Log trace line:')}`));
    logToFile('TRACE', customDebug);
}

// ANSI color codes
const colors = {
    reset: "\x1b[0m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m",
    lightGray: "\x1b[37m",
};

const chalk = {
    blue: (text: string) => `${colors.blue}${text}${colors.reset}`,
    red: (text: string) => `${colors.red}${text}${colors.reset}`,
    yellow: (text: string) => `${colors.yellow}${text}${colors.reset}`,
    gray: (text: string) => `${colors.gray}${text}${colors.reset}`,
    lightGray: (text: string) => `${colors.lightGray}${text}${colors.reset}`,
}

// Define log file path
const timestamp = new Date().toISOString().replace(/:/g, '-');
const logsFolder = join(__dirname, 'logs');
if (!existsSync(logsFolder)) {
    mkdirSync(logsFolder);
}
const logFilePath = join(logsFolder, `log-${timestamp}.txt`);

// Helper function to log to a file
function logToFile(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message}\n`;
    appendFileSync(logFilePath, logMessage);
}

// Store original console methods
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug,
    info: console.info,
};

// Custom log functions
export function customLog(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.log(chalk.blue(`ℹ️ [LOG] ${message}`));
    logToFile('LOG', message);
}

export function customError(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.error(chalk.red(`❌ [ERROR] ${message}`));
    logToFile('ERROR', message);
    traceCallback();
}

export function customWarn(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.warn(chalk.yellow(`⚠️ [WARN] ${message}`));
    logToFile('WARN', message);
    if (bVerbose) {
        traceCallback();
    }
    
}

export function customDebug(...args: any[]): void {
    const message = args.join(' ');
    originalConsole.debug(chalk.gray(`🐞 [DEBUG] ${message}`));
    if (bVerbose) {
        logToFile('DEBUG', message);
        traceCallback();
    }
}

// Replace console methods with custom log functions
console.log = customLog;
console.error = customError;
console.warn = customWarn;
console.info = customLog;
console.debug = customDebug;


if (bVerbose) {
    console.info(`Verbose mode enabled`);
}