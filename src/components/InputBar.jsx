export default function InputBar({ prompt, setPrompt, sendPrompt, isLoading }) {
  return (
    <div className="p-3 border-t bg-white dark:bg-[#1a1a1a] flex items-center gap-2 sticky bottom-0">
      
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none"
        placeholder="Ask PitchCraft AI..."
        onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
      />

      <button
        onClick={sendPrompt}
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm disabled:opacity-50"
        disabled={!prompt.trim() || isLoading}
      >
        {isLoading ? "..." : "Send"}
      </button>
    </div>
  );
}
