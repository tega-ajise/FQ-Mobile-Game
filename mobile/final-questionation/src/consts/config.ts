import { BaseGameConfig } from '@/types/types';

export const DEFAULT_ROUND_CONFIG: BaseGameConfig = {
  numberOfQuestions: 4,
  numberOfCandidates: 8,
};

export const SETUP_STEPS: { step: string; role: 'navigator' | 'curator' }[] = [
  { step: 'Choose question', role: 'curator' },
  { step: 'Create candidates list', role: 'navigator' },
  { step: 'Rank candidates', role: 'curator' },
];

export const INSTRUCTIONS = [
  {
    step: 'Overview & Roles',
    data: [
      `The Curator - Creates the questions and secretly ranks the answers.`,
      `The Navigator - Creates the candidate list for the Curator to rank and eliminates options over time.`,
      `The Goal - How accurately can The Navigator preserve and identify The Curator's true preferred answer through a series of filtering questions?`,
      `This is by:
* Understanding The Curator's thinking
* Avoiding eliminating the true best answer
* Land as close as possible to The Curator's top-ranked choice in the final round`,
      `Number of Rounds - 3 to 5 (+1 question at the beginning)`,
      `Number of Candidates - 6 to 10`,
    ],
  },
  {
    step: 'Game Setup - Curator',
    data: [
      `Question Bank Creation
The Curator creates (Number of Rounds + 1) open-ended questions, but all questions MUST fit into a general category determined by the Curator`,
      `example broad categories: people, numbers, things said/things to say, temporal things, actions, events, etc.`,
      `Be Creative`,
      `The first question is used to generate candidates`,
      `The last question is declared as the Final Question`,
      `* Once questions are submitted they are locked
* The Curator will be able to see all the questions throughout the game, The Navigator does not`,
    ],
  },
  {
    step: 'Game Setup - Navigator',
    data: [
      `
      Candidate Creation
      The Navigator answers only Question 0 by creating a list of candidates that all plausibly fit the question.`,
      `
Rules for candidates:
* Must be distinct
* Must all reasonably answer Question 0
* Can be creative, literal, symbolic, or abstract
* No duplicates or trivial rewordings
      `,
    ],
  },
  {
    step: 'Game Setup - Curator 2',
    data: [
      `Based only on the Final Question, The Curator secretly ranks all M candidates from the Navigator where:
* #1 = Best possible answer to the final question
* #M = Worst possible answer to the final question`,
      `
* This ranking is:
* Hidden from the Navigator the entire game
* Locked and cannot be changed once submitted
* Used for final scoring`,
    ],
  },
  {
    step: 'Gameplay Phase',
    data: [
      `Each round proceeds as follows:
1. The Curator reveals the next question in the order
2. The Navigator must eliminate 1 candidate by
    * REMOVING weak answers that could be irrelevant to theme of questions
    * PRESERVING what they believe aligns with the theme of questions & The Curator's final preference
`,
      `There is no bluffing, lying, or hidden information beyond the secret ranking.
The game continues until only the final round remains.`,
      `And yes, the question for the round may not make the most sense for the list of candidates. That is still okay.`,
    ],
  },
  {
    step: 'Reveal',
    data: [
      `The Curator reveals the Final Question`,
      `From the remaining candidates, The Navigator selects one final answer based on what they believe is the highest ranked candidate to the question`,
      `The game immediately ends and the ranking of the Navigator's selection is revealed`,
      `(Optional) The Curator may laugh and make fun of the Navigator when they do poorly`,
    ],
  },
  {
    step: 'Example Question banks',
    data: [
      `
      4 Round Game (Category - funny story/something that happened):
      0) Why would you sleep through your alarm in the morning? 
      1) How did you find out about your school? 
      2) What were you doing the morning of Jan 6th, 2021?
      3) Why did your Uber driver cancel the trip?
      4) How did your best friend go broke?
      `,
      ` 5 Round Game (Category - Titles):
      0) What would people call you if they forgot your name?
      1) Which would you name your dog?
      2) Which name is most unisex?
      3) Which would show up in the dictionary?
      4) What is an excellent substitute teacher name?
      5) Which one has the most rhyme potential?
      `,
    ],
  },
];
