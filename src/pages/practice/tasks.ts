import { getRandomItem } from '@/utils/getRandomItem';

import { TaskCompareKey, taskCompareTypes } from './compare/compareTasks';

export const taskTypes = { ...taskCompareTypes };

const taskTypeKeys = Object.keys(taskTypes) as Array<keyof typeof taskTypes>;

export type TaskKey = TaskCompareKey;

interface GetRandomTaskTypeOptions {
  exclude?: Array<TaskKey>;
}

export function getRandomTaskTypeKey(options: GetRandomTaskTypeOptions = {}): TaskKey {
  return getRandomItem(taskTypeKeys, options);
}
