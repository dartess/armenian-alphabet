import { useState } from "react";

import { getRandomTaskTypeKey } from "./tasks";
import { CompareTask } from "@/pages/practice/compare/view/CompareTask/CompareTask";

export const Practice = () => {
  const [taskKey, setTaskKey] = useState(getRandomTaskTypeKey);

  return <CompareTask
    taskKey={taskKey}
    onNextTask={() => setTaskKey(getRandomTaskTypeKey({ exclude: [taskKey] }))}
  />
}
