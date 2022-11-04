export interface LetterType {
  id: string;
  uppercase: string;
  lowercase: string;
  name: string;
  transliteration: string | Array<string>;
  ipa: string | Array<string>;
}

export type LetterState = 'new' | 'progress' | 'done';

export type TotalProgress = Record<string, LetterState>;

export type PageValue = 'alphabet' | 'practice' | 'settings';
