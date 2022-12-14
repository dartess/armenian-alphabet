export function shuffleOnPlaceArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign -- on place by design
    [array[i], array[j]] = [array[j], array[i]];
  }
}
