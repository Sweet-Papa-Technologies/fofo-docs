declare module 'file-search-module' {
    /**
     * Searches for files in a directory and its subdirectories.
     * @param directory The root directory to start the search from.
     * @param ignorePatterns An array of glob patterns to ignore during the search.
     * @returns An array of file paths found during the search.
     */
    export function searchFiles(directory: string, ignorePatterns: string[]): string[];
  }