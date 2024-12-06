import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../../config";
const genAI = new GoogleGenerativeAI(config.google_api as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import fs from "fs";

// Helper function to convert an image file into the required format for the AI model
const fileToGenerativePart = (filePath: string, mimeType: string) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"), // Convert file content to base64
      mimeType, // Specify the file's MIME type
    },
  };
};

const getResult = async (prompt: string) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

// ! image
const getImagePromptResult = async (
  prompt: string,
  filePath: string,
  mimeType: string
) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at ${filePath}`);
  }

  const imagePart = fileToGenerativePart(filePath, mimeType);
  console.log(imagePart);

  const content = await model.generateContent([prompt, imagePart]);

  return content.response.text();

  //
};

// let messages: { role: string; text: string }[];
let messages = [];

const geminiChat = async ({ prompt }: { prompt: string }) => {
  if (!prompt) {
    throw new Error("Prompt is required!");
  }

  messages.push({ role: "user", text: prompt });
  console.log(messages);
  const aiResponse = await getResult(prompt);

  messages.push({ role: "ai", text: aiResponse });

  return aiResponse;
};

const getChatHistory = async () => {
  return messages;
};

//
export const googleServices = {
  getResult,
  getImagePromptResult,
  geminiChat,
  getChatHistory,
};
