/**
 * @param {string} addedText - The text representing additions.
 * @param {string} deletedText - The text representing deletions.
 * @returns {{ netAdditions , netDeletions }} An object containing net additions and deletions.
 */
export function findNetAdditionsAndDeletions(addedText, deletedText) {
  if (!addedText && !deletedText) {
    return {
      netAdditions: '',
      netDeletions: ''
    };
  }

  // Split texts into arrays and prepare the maps
  const addArray = addedText.split(/\s+|\b/);
  const delArray = deletedText.split(/\s+|\b/);
  const addPositions = new Map();
  const delPositions = new Map();

  // Populate position maps
  addArray.forEach((word, index) => {
    if (word) {
      if (!addPositions.has(word)) {
        addPositions.set(word, []);
      }
      addPositions.get(word).push(index);
    }
  });

  delArray.forEach((word, index) => {
    if (word) {
      if (!delPositions.has(word)) {
        delPositions.set(word, []);
      }
      delPositions.get(word).push(index);
    }
  });

  let netAdditions = [];
  let netDeletions = [];

  // Process additions
  addArray.forEach((word, index) => {
    if (word && delPositions.has(word)) {
      const positions = delPositions.get(word);
      positions.shift(); // Remove the first occurrence from deletions
      if (positions.length === 0) {
        delPositions.delete(word); // No more occurrences left
      }
    } else if (word) {
      // This word is not deleted, so it's an addition
      netAdditions.push({word, index});
    }
  });

  delPositions.forEach((positions, word) => {
    positions.forEach(index => {
      netDeletions.push({word, index});
    });
  });

  // Sort by original position and join words to form the final strings
  const sortedNetAdditions = netAdditions.sort((a, b) => a.index - b.index).map(item => item.word).join(' ');
  const sortedNetDeletions = netDeletions.sort((a, b) => a.index - b.index).map(item => item.word).join(' ');

  return {
    netAdditions: sortedNetAdditions,
    netDeletions: sortedNetDeletions
  };
}
