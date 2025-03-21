import { ReactNode } from "react";
import { useTheme } from "./buttonLayout";

export default function Child({ bgColor, text, children }: { bgColor: string, text: string, children: ReactNode }) {
  const { setBgColor } = useTheme();

  return (
    <div className="relative group">
      <button
        onMouseEnter={() => setBgColor(bgColor)}
        onClick={() => setBgColor(bgColor)}
        className="w-56 px-6 py-3 my-3 bg-green-600 text-white text-lg rounded-lg shadow-md group-hover:-translate-x-10 transition-transform duration-300 ease-in-out"
      >
        {text}
      </button>

      <div className="absolute left-full top-0 ml-8 w-64 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
}
