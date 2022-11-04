import { useState } from 'react';

import { getRandomTaskTypeKey } from './tasks';
import { CompareTask } from './compare/view/CompareTask/CompareTask';

export function Practice() {
  const [taskKey, setTaskKey] = useState(getRandomTaskTypeKey);

  return (
    <CompareTask
      taskKey={taskKey}
      onNextTask={() => setTaskKey(getRandomTaskTypeKey({ exclude: [taskKey] }))}
    />
  );
}
