import { pickRandom } from './utils.js';

const ROUNDS_PER_GAME = 10;

export const remove = (array, index) => {
  if (index === -1) return;
  array[index] = array[array.length - 1];
  array.pop();
};

export const select = (celebs, lookup, category) => {
  const filtered = celebs.filter((c) => c.categories.includes(category));
  const seen = new Set();
  const selection = [];
  let i = ROUNDS_PER_GAME;
  while (i--) {
    const n = Math.random();
    const ai = Math.floor(n * filtered.length);
    const a = filtered[ai];
    remove(filtered, ai);
    let b;
    const similar = a.similar.filter((id) => !seen.has(id));
    if (similar.length > 0 && Math.random() < 0.75) {
      const id = pickRandom(similar);
      b = lookup.get(id);
    } else {
      b = pickRandom(filtered);
    }

    selection.push({ a, b });

    seen.add(a.id);
    seen.add(b.id);
    remove(filtered, filtered.indexOf(b));
  }
  return selection;
};
