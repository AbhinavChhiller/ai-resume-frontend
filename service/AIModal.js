import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey:import.meta.env.VITE_GOOGLE_GEMINI_KEY,
});

/**
 * Sends a prompt to Gemini and returns the full response as a string.
 * @param {string} prompt - The user's prompt for Gemini AI.
 * @returns {Promise<string>} - The response from Gemini AI.
 */
export async function getGeminiResponse(prompt) {
  const config = {
    responseMimeType: 'application/json',
  };

  const model = 'gemini-1.5-flash';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  // Collect the streamed chunks into a single string
  let finalResponse = '';
  for await (const chunk of response) {
    finalResponse += chunk.text;
  }

  return finalResponse;
}
