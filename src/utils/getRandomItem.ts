import { randomInteger } from '@/utils/randomInteger';

export type GetRandomItemOptions<T> = {
  exclude?: Array<T>;
  getWeight?: (item: T) => number;
}

// TODO check exist
// TODO validate weight
export function getRandomItem<T>(items: Array<T>, options: GetRandomItemOptions<T> = {}): T {
  const { exclude, getWeight } = options;
  const availableItems = exclude ? items.filter((type) => !exclude.includes(type)) : items;
  const weightedItems = getWeight
    ? availableItems.flatMap((item) => {
      const weight = getWeight(item);
      return new Array<T>(weight).fill(item);
    })
    : availableItems;
  return weightedItems[randomInteger(0, weightedItems.length - 1)];
}
