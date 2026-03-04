import AppText from '@/components/AppText';
import { BaseGameConfig } from '@/types/types';
import { ReactElement } from 'react';
import { Image, Text, View } from 'react-native';

export const DEFAULT_ROUND_CONFIG: BaseGameConfig = {
  numberOfQuestions: 4,
  numberOfCandidates: 8,
};

export const SETUP_STEPS: { step: string; role: 'navigator' | 'curator' }[] = [
  { step: 'Choose question', role: 'curator' },
  { step: 'Create candidates list', role: 'navigator' },
  { step: 'Rank candidates', role: 'curator' },
];

export const INSTRUCTIONS: { step: string; data: ReactElement[] }[] = [
  {
    step: 'Overview',
    data: [
      <View key={0} className="mt-0 p-4">
        <Text className="text-md text-center text-primary">
          Welcome to Final Questionation. The game where you go through rounds of questions, until
          you reach the final question with all the stakes.
        </Text>
      </View>,
      <View key={1}>
        <AppText className="text-center text-2xl text-primary">Objective</AppText>
        <Text className="text-center text-primary">
          This is a <Text className="font-bold">two player game.</Text>
        </Text>
        <Text className="text-center text-primary">
          Interesting questions + interesting answers = interesting experience
        </Text>
        <Text className="text-center text-primary">
          One player focuses on creating a number of questions based on an arbitrary category
        </Text>
        <Text className="text-right text-primary">
          (example broad categories: people, numbers, things said/things to say, temporal things,
          actions, events, etc.)
        </Text>
        <Text className="mt-4 text-center text-primary">
          The other gets through the rounds, filtering answers one round-at-a-time until the final
          round where they have to select the best remaining answer.
        </Text>
      </View>,
      <View key={2} className="flex-col gap-2">
        <AppText className="text-center text-2xl text-primary">Gameplay Summary</AppText>
        <Text className="text-center text-primary">
          Think of the gameplay consisting of a <Text className="text-accent">4-step process</Text>
        </Text>
        <>
          <Text className="m-auto text-primary">
            <AppText className="text-accent">1.</AppText> At the beginning, one player generates a
            list of questions. If N questions were chosen in the setup, this player will be required
            to create N+1 questions (more on this coming).{' '}
          </Text>
          <Text className="m-auto text-primary">
            <AppText className="text-accent">2.</AppText>The other player only receives the FIRST
            question (labelled Round 0), and generates a list of answers (known as{' '}
            <Text className="font-bold">candidates</Text>) that answers that first question
          </Text>
          <Text className="m-auto text-primary">
            <AppText className="text-accent">3.</AppText> The first player receives the list of
            candidates, and ranks them based on the LAST question in their list
          </Text>
          <Text className="m-auto text-primary">
            <AppText className="text-accent">4.</AppText> In the game loop, a new question gets
            revealed every round, and the player who created the candidates has to eliminate one
            item from the list for that round&apos;s question. When they get to the last question,
            they select answer they think ranks the highest
          </Text>
        </>
      </View>,
    ],
  },
  {
    step: 'Game Setup',
    data: [
      <View key={0} className="flex flex-col">
        <AppText className="text-center text-2xl text-primary">Player Roles</AppText>
        <View className="flex">
          <View className="flex flex-col gap-1">
            <Text className="text-primary">
              Player 1 - <Text className="font-bold text-accent">The Curator </Text>- Creates the
              question bank and ranks the candidates.{' '}
              <Text className="font-bold">
                Their questions are their strength. The other player does not know what the last
                question will be.
              </Text>
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="text-primary">
              Player 2 - <Text className="font-bold text-accent">The Navigator</Text> - Creates the
              candidates list & eliminates options throughout the rounds.{' '}
              <Text className="font-bold">
                The candidates are their strength. The Curator&apos;s rank is restricted to what
                options they provide.
              </Text>
              <Text className="text-justify text-primary">
                {`
                • Understand The Curator's thinking
                • Avoid eliminating the true best answer
                • Land as close as possible to The Curator's top-ranked choice in the final round`}
              </Text>
            </Text>
          </View>
        </View>
      </View>,
      <View key={1}>
        <AppText className="text-center text-2xl text-primary">Game Setup - Curator (1)</AppText>
        <View className="flex flex-row gap-2">
          <Image
            source={require('../../assets/setup-round-curator.png')}
            style={{ width: 120, height: 250, resizeMode: 'contain' }}
          />
          <Text className="flex-1 text-lg text-primary">
            {`
• This is where the Curator will create their (Number of Rounds + 1) open-ended questions
• Remember, all questions should follow some theme/category, be creative
• The questions become locked after submission
• They should also be open-ended and treated in isolation - `}
            <Text className="font-bold">
              no question should depend on another question or the answers
            </Text>{' '}
            (avoid saying things such as &quot;which one of these ...?&quot;)
          </Text>
        </View>
        <Text
          className="text-center text-xl text-primary"
          style={{ textDecorationLine: 'underline' }}>
          Order Matters
        </Text>
        <Text className="text-center text-lg text-primary">
          First Question (Round 0) = The question the Navigator creates the candidates from
        </Text>
        <Text className="text-center text-lg text-primary">
          Final Questionation (Last Question) = The question the Navigator guesses the highest
          ranked selection
        </Text>
      </View>,
    ],
  },
  {
    step: "Game Setup (Cont'd)",
    data: [
      <View key={0}>
        <AppText className="text-center text-2xl text-primary">Game Setup - Navigator</AppText>
        <View className="flex flex-row gap-2">
          <Text className="flex-1 text-lg text-primary">
            {`
• The Navigator is given the first question, and should generate a list of M plausible answers to that question (KNOWN AS THE CANDIDATES)

• Known as candidates because remember, one of these is going to be the ultimate selection as the answer for the final question

• Also keep in mind you will be eliminating from these candidates throughout the rounds of questions.

• The answers also become locked & cannot be duplicated. Be creative: candidates can be literal, symbolic, abstract, etc`}
          </Text>
          <Image
            source={require('../../assets/setup-round-navigator.png')}
            style={{ width: 120, height: 250, resizeMode: 'contain' }}
          />
        </View>
      </View>,
      <View key={1}>
        <AppText className="text-center text-2xl text-primary">Game Setup - Curator (2)</AppText>
        <View className="flex flex-row gap-2">
          <Image
            source={require('../../assets/setup-round-curator-2.png')}
            style={{ width: 120, height: 250, resizeMode: 'contain' }}
          />
          <Text className="flex-1 text-lg text-primary">
            {`
Now given the final questionation, The Curator will:
            • Rank all M candidates given from the Navigator
            • #1 = Best possible answer to the final question
            • #M = Worst possible answer to the final question
            `}
          </Text>
        </View>
      </View>,
    ],
  },
  {
    step: 'Gameplay Phase',
    data: [
      <View key={0} className="gap-2">
        <AppText className="text-center text-xl text-primary">
          Each round proceeds as follows...
        </AppText>
        <Text className="text-lg text-primary">
          1. The Curator reveals the next question in the order
        </Text>
        <Text className="text-lg text-primary">
          2. The Navigator must eliminate 1 candidate by:
        </Text>
        <Text className="ml-4 text-lg text-primary">
          • REMOVING weak answers that could be irrelevant to theme of questions
        </Text>
        <Text className="ml-4 text-lg text-primary">
          • PRESERVING what they believe aligns with the theme of questions &amp; The Curator&apos;s
          final preference
        </Text>
      </View>,
      <View key={1} className="gap-2">
        <Text className="text-lg text-primary">
          There is no bluffing, lying, or hidden information beyond the secret rankisetupng.
          Trounds-curaottorhe game continues until only the final round remains.
        </Text>
        <Text className="text-lg text-primary">
          And yes, the question for the rounds-navigator round may not make the most sense for the
          list of candidates. That is still okay.
        </Text>
      </View>,
      <View key={2} className="gap-2">
        <View className="flex flex-row justify-center gap-4">
          <View className="items-center gap-1">
            <Text className="text-lg font-bold text-accent">Curator View</Text>
            <Image
              source={require('../../assets/rounds-curator.png')}
              style={{ width: 150, height: 250, resizeMode: 'contain' }}
            />
          </View>
          <View className="items-center gap-1">
            <Text className="text-lg font-bold text-accent">Navigator View</Text>
            <Image
              source={require('../../assets/rounds-navigator.png')}
              style={{ width: 150, height: 250, resizeMode: 'contain' }}
            />
          </View>
        </View>
      </View>,
    ],
  },
  {
    step: 'Reveal',
    data: [
      <View key={0} className="gap-4">
        <Text className="text-center text-xl text-primary">
          The Curator reveals the <Text className="font-bold text-accent">Final Questionation</Text>
        </Text>
        <Text className="text-center text-xl text-primary">
          From the remaining candidates, The Navigator selects one final answer based on what they
          believe is the highest ranked candidate to the question
        </Text>
        <Text className="text-center text-xl text-primary">
          The game immediately ends and the ranking of the Navigator&apos;s selection is revealed
        </Text>
        <Text className="text-center text-xl italic text-primary">
          (Optional) The Curator may laugh and make fun of the Navigator when they do poorly
        </Text>
      </View>,
    ],
  },
  {
    step: 'Example Question banks',
    data: [
      <View key={0} className="gap-2">
        <AppText className="text-center text-xl text-accent">
          4 Round Game (Category - funny story/something that happened):
        </AppText>
        <Text className="text-lg text-primary">
          0) Why would you sleep through your alarm in the morning?
        </Text>
        <Text className="text-lg text-primary">1) How did you find out about your school?</Text>
        <Text className="text-lg text-primary">
          2) What were you doing the morning of Jan 6th, 2021?
        </Text>
        <Text className="text-lg text-primary">3) Why did your Uber driver cancel the trip?</Text>
        <Text className="text-lg text-primary">4) How did your best friend go broke?</Text>
      </View>,
      <View key={1} className="gap-2">
        <AppText className="text-center text-xl text-accent">
          5 Round Game (Category - Titles):
        </AppText>
        <Text className="text-lg text-primary">
          0) What would people call you if they forgot your name?
        </Text>
        <Text className="text-lg text-primary">
          1) What is an appropriate way to address your dog?
        </Text>
        <Text className="text-lg text-primary">2) What is the most unisex name?</Text>
        <Text className="text-lg text-primary">3) What name would show up in the dictionary?</Text>
        <Text className="text-lg text-primary">
          4) What is an excellent substitute teacher name?
        </Text>
        <Text className="text-lg text-primary">5) What title has the most rhyme potential?</Text>
      </View>,
    ],
  },
];
