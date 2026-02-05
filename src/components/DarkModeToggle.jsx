function DarkModeToggle() {
  function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  }

  return (
   <button
      onClick={toggleTheme}
      className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white rounded"
    >
      Toggle Theme
    </button>
  );
}

export default DarkModeToggle;
