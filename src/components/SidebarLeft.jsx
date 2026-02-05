import { FiMessageSquare, FiSave, FiClock } from "react-icons/fi";

export default function SidebarLeft() {
  return (
<aside className="hidden md:flex w-16 bg-white dark:bg-[#1a1a1a] border-r flex-col items-center py-4">
      <div className="space-y-6 mt-2">
        <FiMessageSquare className="text-2xl text-gray-600" />
        <FiSave className="text-2xl text-gray-600" />
        <FiClock className="text-2xl text-gray-600" />
      </div>
    </aside>
  );
}
