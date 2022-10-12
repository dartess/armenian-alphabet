export type LetterType = {
  uppercase: string;
  lowercase: string;
  name: string;
  transliteration: string;
}

export type LetterState = 'new' | 'progress' | 'done'

export type TotalProgress = Record<string, LetterState>;
