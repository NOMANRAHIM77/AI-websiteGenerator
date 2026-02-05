import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function SidebarRight({
  savedChats,
  setSavedChats,
  activeChatId,
  setActiveChatId,
  setGeneratedPage,
}) {
  const uid = auth.currentUser?.uid || null;

  // Create new chat (UI-only — your Home logic will create it in Firestore when the first message is sent)
  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      isEditing: false,
    };

    setSavedChats((prev) => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setGeneratedPage("");
  };

  // Delete chat: optimistic UI update + Firestore delete if logged-in
  async function deleteChat(chatId) {
    // optimistic UI update
    setSavedChats((prev) => prev.filter((c) => c.id !== chatId));

    // if user signed in, try to delete from Firestore too
    if (!uid) return;

    try {
      await deleteDoc(doc(db, "users", uid, "chats", chatId));
      // If the active chat was deleted, reset active and preview
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setGeneratedPage("");
      }
    } catch (err) {
      console.error("Delete error:", err);
      // revert UI change if delete failed (optional)
      // You may re-fetch savedChats from Firestore in your parent using snapshot listener,
      // but here's a simple revert: (not ideal if you want server as source of truth)
      // setSavedChats(prev => [...prev, { id: chatId, title: "Unknown (restore)", messages: [] }])
    }
  }

  // Enable rename mode for a chat (set isEditing flag)
  function activateRename(id) {
    setSavedChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isEditing: true } : { ...c, isEditing: false }))
    );
  }

  // Rename chat: update Firestore if possible, always update UI and close editing state
  async function renameChat(id, newName) {
    const finalName = (newName || "").toString().trim() || "Untitled Chat";

    // Update UI immediately
    setSavedChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: finalName, isEditing: false } : c))
    );

    // Update Firestore if signed-in
    if (!uid) return;

    try {
      await updateDoc(doc(db, "users", uid, "chats", id), {
        title: finalName,
      });
    } catch (err) {
      console.error("Rename error:", err);
      // optional: show toast / revert UI / re-fetch from server
    }
  }

  // Helper: handle Enter in rename input
  const handleKeyDownOnRename = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // commit rename
      renameChat(id, e.target.value);
    } else if (e.key === "Escape") {
      // cancel rename (restore previous title from savedChats)
      setSavedChats((prev) => prev.map((c) => (c.id === id ? { ...c, isEditing: false } : c)));
    }
  };

  return (
   <aside className="hidden md:block w-64 border-l bg-white dark:bg-[#1a1a1a]">
      
      <div className="p-4 font-semibold border-b">
        Saved Chats
      </div>

      <div className="p-3 space-y-2">
        {savedChats.map((c) => (
          <div
            key={c.id}
            className={`p-2 rounded cursor-pointer flex justify-between items-center text-sm ${
              c.id === activeChatId
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            onClick={() => {
              if (c.isEditing) return;
              setActiveChatId(c.id);
              setGeneratedPage("");
            }}
          >
            <div className="flex-1 pr-2 truncate">
              {c.isEditing ? (
                <input
                  autoFocus
                  defaultValue={c.title}
                  onBlur={(e) => renameChat(c.id, e.target.value)}
                  onKeyDown={(e) => handleKeyDownOnRename(e, c.id)}
                  className="border px-1 py-0.5 rounded w-full text-sm"
                />
              ) : (
                <div
                  onDoubleClick={() => activateRename(c.id)}
                  className="truncate"
                >
                  {c.title}
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Delete this chat?")) deleteChat(c.id);
              }}
              className="text-red-600 hover:text-red-800 px-2"
            >
              ✕
            </button>
          </div>
        ))}

        <div
          onClick={createNewChat}
          className="p-2 rounded cursor-pointer text-blue-600 hover:bg-gray-100"
        >
          + Start New Chat
        </div>
      </div>
    </aside>
  );
}
