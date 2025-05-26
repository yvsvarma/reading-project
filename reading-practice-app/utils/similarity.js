// utils/similarity.js

/**
 * Normalize the given sentence: lowercase, remove punctuation, and standardize spacing.
 */
const normalize = (text) => {
    let cleaned = text.trim().toLowerCase().replace(/[.,!?\\-]/g, '').replace(/\s+/g, ' ');
  
    const fixes = {
      matt: 'mat',
      jon: 'john',
      quay: 'key',
      bill: 'pill',
      cats: 'cat'
    };
  
    Object.entries(fixes).forEach(([wrong, correct]) => {
      cleaned = cleaned.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), correct);
    });
  
    return cleaned;
  };
  
  /**
   * Calculate similarity score between two normalized strings.
   * Score = number of matching words / max word count
   */
  const similarity = (a, b) => {
    const s1 = a.split(' ');
    const s2 = b.split(' ');
    const matches = s1.filter(word => s2.includes(word)).length;
    const total = Math.max(s1.length, s2.length);
    return matches / total;
  };
  
  /**
   * Determine if the spoken sentence closely matches the expected sentence.
   */
  const isMatch = (spoken, target) => {
    if (!spoken || !target) return false;
    const a = normalize(spoken);
    const b = normalize(target);
    return similarity(a, b) >= 0.85;
  };
  
  export { normalize, similarity, isMatch };
  