import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import extractLandingPage from "../utils/extractLandingPage";
import { useChatEngine } from "../hooks/useChatEngine";

import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import ChatArea from "../components/ChatArea";
import PreviewArea from "../components/PreviewArea";
import InputBar from "../components/InputBar";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { initChat, sendAIMessage } = useChatEngine(apiKey);
  const { theme, toggleTheme } = useTheme();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [savedChats, setSavedChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [generatedPage, setGeneratedPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const bottomRef = useRef();
  const uid = auth?.currentUser?.uid || "guest";

  // LOAD SAVED CHATS
  useEffect(() => {
    const q = query(
      collection(db, "users", uid, "chats"),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSavedChats(list);
      if (!activeChatId && list.length) setActiveChatId(list[0].id);
    });
  }, [uid]);

  // LOAD MESSAGES FOR ACTIVE CHAT
  useEffect(() => {
    if (!activeChatId) return setMessages([]);

    const q = query(
      collection(db, "users", uid, "chats", activeChatId, "messages"),
      orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snap) => {
      const loaded = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(loaded);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      initChat(loaded);
    });
  }, [uid, activeChatId]);

  // SEND MESSAGE
  async function sendPromptHandler() {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);

    const userPrompt = prompt;
    setPrompt("");

    let chatId = activeChatId;

    try {
      // Create new chat
      if (!chatId) {
        const newChat = await addDoc(
          collection(db, "users", uid, "chats"),
          { title: userPrompt.substring(0, 20), createdAt: Date.now() }
        );
        chatId = newChat.id;
        setActiveChatId(chatId);
        initChat([]);
      }

      const messagesRef = collection(
        db,
        "users",
        uid,
        "chats",
        chatId,
        "messages"
      );

      // Add USER message
      await addDoc(messagesRef, {
        role: "user",
        text: userPrompt,
        createdAt: Date.now(),
      });

      const aiText = await sendAIMessage(userPrompt);

      const page = extractLandingPage(aiText);
      if (page) setGeneratedPage(page);

      // Add AI message
      await addDoc(messagesRef, {
        role: "assistant",
        text: aiText,
        createdAt: Date.now(),
      });

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-[#0f0f0f] text-gray-900 dark:text-gray-100 transition">
      
      <SidebarLeft />

      <main className="flex-1 flex flex-col">
        
        {/* HEADER */}
        <header className="p-4 border-b dark:border-gray-700 bg-white dark:bg-[#1a1a1a] flex items-center justify-between">
          <h1 className="text-lg font-semibold">Pitch Craft</h1>

          <div className="flex items-center gap-4">

            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <ChatArea messages={messages} isLoading={isLoading} bottomRef={bottomRef} />
          <PreviewArea generatedPage={generatedPage} />
        </div>

        <InputBar
          prompt={prompt}
          setPrompt={setPrompt}
          sendPrompt={sendPromptHandler}
          isLoading={isLoading}
        />
      </main>

      <SidebarRight
        savedChats={savedChats}
        setSavedChats={setSavedChats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setGeneratedPage={setGeneratedPage}
      />
    </div>
  );
}
