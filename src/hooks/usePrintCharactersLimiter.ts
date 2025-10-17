export function usePrintCharactersLimiter(
  content: string, 
  maxChars: number = 100
): string {
  return content.replace(/<li>([\s\S]*?)<\/li>/g, (match: string, liContent: string): string => {
    // Count actual TEXT characters (ignore HTML tags)
    const textOnly: string = liContent.replace(/<[^>]*>/g, '');
    const charCount: number = textOnly.length;
    
    // If under limit, return original
    if (charCount <= maxChars) {
      return match;
    }
    
    // Cut to maxChars + add "..."
    const truncated: string = textOnly.substring(0, maxChars).trim() + "...";
    
    // Replace content INSIDE <li> with truncated text
    return `<li>${truncated}</li>`;
  });
}