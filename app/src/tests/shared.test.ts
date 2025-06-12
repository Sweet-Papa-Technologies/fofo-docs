import { escapeStringForMD } from '../shared';

describe('escapeStringForMD', () => {
  it('should return "Data Not Available" for undefined or null input', () => {
    expect(escapeStringForMD(undefined)).toBe("Data Not Available");
    expect(escapeStringForMD(null as any)).toBe("Data Not Available"); // Cast null to any to satisfy type checking for test
  });

  it('should return the string as is if it is empty or only whitespace', () => {
    expect(escapeStringForMD('')).toBe('');
    expect(escapeStringForMD('   ')).toBe('   ');
  });

  it('should convert escaped newlines (\\n) to actual newlines AND not escape existing actual newlines', () => {
    // The function internally first converts \\n to \n, then processes.
    // Markdown typically treats single \n as a space or continuation, multiple \n as paragraph breaks.
    // The key is that `escapeStringForMD` itself should not *add* backslashes to `\n`.
    // Its primary job is to escape markdown special characters.
    // The `processedLines.join('\n')` part of the function ensures newlines are preserved.
    expect(escapeStringForMD('First line\\nSecond line')).toBe('First line\nSecond line');
    expect(escapeStringForMD('First line\nSecond line')).toBe('First line\nSecond line');
    expect(escapeStringForMD('Line with \\n and then actual\n newline')).toBe('Line with \n and then actual\n newline');
  });

  it('should escape basic markdown characters', () => {
    expect(escapeStringForMD('*bold*')).toBe('\\*bold\\*');
    expect(escapeStringForMD('_italic_')).toBe('\\_italic\\_');
    expect(escapeStringForMD('[link]')).toBe('\\[link\\]');
    // Test for #, -, > at the beginning of lines
    expect(escapeStringForMD('# Header')).toBe('\\# Header');
    expect(escapeStringForMD('  # Indented Header')).toBe('  \\# Indented Header');
    expect(escapeStringForMD('- List item')).toBe('\\- List item');
    expect(escapeStringForMD('> Blockquote')).toBe('\\> Blockquote');
  });

  it('should not escape content within triple backtick code blocks', () => {
    const codeBlock = '```javascript\nconst x = 10;\nconsole.log(x);\n```';
    expect(escapeStringForMD(codeBlock)).toBe(codeBlock);
    const indentedCodeBlock = '  ```python\n#comment\n  def func():\n    return "*"\n  ```';
    expect(escapeStringForMD(indentedCodeBlock)).toBe(indentedCodeBlock); // Whitespace around is preserved
  });

  it('should not escape content within single backtick inline code if paired', () => {
    const inlineCode = 'This is `inline *code*` with stuff.';
    expect(escapeStringForMD(inlineCode)).toBe(inlineCode);
    expect(escapeStringForMD('`*_[]#`')).toBe('`*_[]#`');
  });

  it('should escape unpaired backticks', () => {
    expect(escapeStringForMD('This `is an unpaired` backtick`')).toBe('This \\`is an unpaired\\` backtick\\`');
  });

  it('should handle mixed content correctly', () => {
    const mixed = '# Title\nSome *text* and `code` then \\n an escaped newline.\n```python\n# Comment\nprint("hello")\n```';
    const expected = '\\# Title\nSome \\*text\\* and `code` then \n an escaped newline.\n```python\n# Comment\nprint("hello")\n```';
    expect(escapeStringForMD(mixed)).toBe(expected);
  });

  it('should correctly handle multiple lines with markdown syntax', () => {
    const multiLine = "# Header1\n* Item1\n_Item2_\n\n> Quote\nText with `inline_code`";
    const expectedMultiLine = "\\# Header1\n\\* Item1\n\\_Item2\\_\n\n\\> Quote\nText with `inline_code`";
    expect(escapeStringForMD(multiLine)).toBe(expectedMultiLine);
  });
});
