export default function ChatMessage({ m }) {
  return (
 <div
      className={`max-w-[90%] sm:max-w-2xl p-3 rounded-lg shadow-sm text-sm sm:text-base ${
        m.role === "user"
          ? "ml-auto bg-blue-600 text-white"
          : "bg-white border text-gray-800"
      }`}
    >
      <div className="whitespace-pre-wrap wrap-break-words">
        {m.text}
      </div>
    </div>
  );
}
