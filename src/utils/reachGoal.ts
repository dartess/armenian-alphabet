import ym from 'react-yandex-metrika';

type Goal =
  | 'cardOpen'
  | 'cardPlaySound'
  | 'progressLetterStart'
  | 'progressLetterEnd'
  | 'progressTotalComplete'
  | 'quizCorrect'
  | 'quizWrong'
  | 'drawCorrect'
  | 'drawWrong'
  | 'installationStart'
  | 'openDonate'
  | 'openContacts';

export function reachGoal(goal: Goal, params?: Record<string, unknown>): void {
  ym('reachGoal', goal, params);
}
