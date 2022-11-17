export interface LetterType {
  id: string;
  uppercase: string | Array<string>;
  lowercase: string;
  name: string;
  transliteration: string | Array<string>;
  ipa: string | Array<string>;
  audio: string;
}

export type LetterState = 'new' | 'progress' | 'done';

export type TotalProgress = Record<string, LetterState>;

export type PageValue = 'alphabet' | 'quiz' | 'drawing' | 'settings';

export type TaskUnit = 'meta' | 'lowercase' | 'uppercase';

export type Theme = 'dark' | 'light';
export type UserTheme = Theme | 'system';

export type DisplayMode = 'twa' | 'standalone' | 'browser';
