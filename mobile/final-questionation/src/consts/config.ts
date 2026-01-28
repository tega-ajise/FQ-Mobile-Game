import { BaseGameConfig } from '@/types/types';

export const DEFAULT_ROUND_CONFIG: BaseGameConfig = {
  numberOfQuestions: 4,
  numberOfCandidates: 8,
};

export const SETUP_STEPS = [
  { step: 'Choose question', role: 'curator' },
  { step: 'Create candidates list', role: 'navigator' },
  { step: 'Rank candidates', role: 'curator' },
];
