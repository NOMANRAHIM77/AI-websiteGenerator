export default function PreviewArea({ generatedPage }) {
  if (!generatedPage) return null;

  return (
 <div className="border-t bg-white dark:bg-[#1a1a1a] p-3 sm:p-4">
      <h2 className="text-base sm:text-lg font-semibold mb-2">
        Live Landing Page Preview
      </h2>

      <iframe
        srcDoc={generatedPage}
        className="w-full h-[400px] sm:h-[600px] border rounded-lg shadow-md"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
