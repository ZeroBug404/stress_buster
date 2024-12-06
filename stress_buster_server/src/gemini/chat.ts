import dotenv from 'dotenv'
dotenv.config()

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
} from '@google/generative-ai'
import initHist from './initHist'

const MODEL_NAME = 'gemini-pro'
const API_KEY = String(process.env.GEMINI_API_KEY)

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

let geminiModel: GenerativeModel | null = null

const setupGeminiChat = async () => {
  const genAI = new GoogleGenerativeAI(API_KEY)
  geminiModel = genAI.getGenerativeModel({ model: MODEL_NAME })
}

const startGeminiChat = (history = []) => {
  if (!geminiModel) {
    throw new Error('geminiModel is not initialized')
  }
  return geminiModel.startChat({
    generationConfig,
    safetySettings,
    history: [...initHist, ...history],
  })
}

export { setupGeminiChat, geminiModel, startGeminiChat }
