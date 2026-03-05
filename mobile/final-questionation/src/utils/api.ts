import { GameConfig } from '@/types/types';

export const phoneAFriend = async (
  questionCtx: GameConfig['roundQuestions'],
  onChunk: (text: string) => void,
  onDone: (fullText: string) => void,
  onError: (err: Error) => void
) => {
  const questionHelpPrompt =
    questionCtx && questionCtx.length > 0
      ? questionCtx.at(-1)
      : 'Give me a random, peculiar question. Do not repeat anything said before';
  try {
    const xhr = new XMLHttpRequest();
    let fullContent = '';
    let lastProcessedIndex = 0;

    xhr.open('POST', 'https://ai-copilot.app/bot'); // request method & url
    xhr.setRequestHeader('Content-Type', 'application/json'); // then content type must be JSON

    // set callback for what happens while data is coming in
    xhr.onprogress = () => {
      console.log('Index ' + lastProcessedIndex + ': ' + xhr.responseText);
      const newData = xhr.responseText.substring(lastProcessedIndex);
      lastProcessedIndex = xhr.responseText.length;

      // Parse each new line (NDJSON)
      const lines = newData.split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const chunk = parsed.message?.content ?? '';
          if (chunk) {
            fullContent += chunk;
            onChunk(chunk); // sends it back to the handler to autofill text
          }
        } catch {
          // Incomplete JSON line, will be completed in next progress event (JSON parse fails)
        }
      }
    };

    xhr.onload = () => {
      onDone?.(fullContent);
    };
    xhr.onerror = () => {
      onError?.(new Error('Network request failed'));
    };

    // send the request last
    // everything before this allows event handlers to be registered BEFORE request goes out
    // prevents race condition of receiving response before event handlers registered
    xhr.send(
      JSON.stringify({
        model: 'thinker',
        messages: [{ role: 'user', content: questionHelpPrompt }],
      })
    ); // then send the body
    return () => xhr.abort();
  } catch (error) {
    console.error('phoneAFriend error:', error);
    throw error;
  }
};
