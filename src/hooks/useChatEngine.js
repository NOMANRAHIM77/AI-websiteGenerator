import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useChatEngine = (apiKey) => {
  const chatRef = useRef(null);
  const genAI = new GoogleGenerativeAI(apiKey);

  const initChat = (history) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const mapped = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    chatRef.current = model.startChat({
      history: mapped,
      systemInstruction: {
       role: "system",
  parts: [{
    text: `
You are an AI website generator.
Always respond with FULL VALID HTML.
Include <html>, <head>, <style>, and <body>.
Do NOT include explanations.
`
  }]
      },
    });
  };

  const sendAIMessage = async (prompt) => {
    const result = await chatRef.current.sendMessage(prompt);
    return await result.response.text();
  };

  return { initChat, sendAIMessage, chatRef };
};
