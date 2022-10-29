import { randomInteger } from "@/utils/randomInteger";

type GetRandomItemOptions<T> = {
  exclude?: Array<T>;
}

// TODO check exist
export function getRandomItem<T>(items: Array<T>, options: GetRandomItemOptions<T> = {}): T {
  const { exclude } = options;
  const availableTaskTypes = exclude ? items.filter((type) => !exclude.includes(type)) : items;
  return availableTaskTypes[randomInteger(0, availableTaskTypes.length - 1)]
}
