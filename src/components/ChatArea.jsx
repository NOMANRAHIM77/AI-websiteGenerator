import ChatMessage from "./ChatMessage";

export default function ChatArea({ messages, isLoading, bottomRef }) {
  return (
    <div className="px-3 sm:px-6 py-4 space-y-4 max-w-3xl mx-auto">
      {messages.map((m) => (
        <ChatMessage key={m.id} m={m} />
      ))}

      {isLoading && (
        <div className="max-w-full sm:max-w-2xl p-3 rounded-lg bg-white shadow-sm border text-sm">
          <span className="animate-pulse">AI is typing...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
