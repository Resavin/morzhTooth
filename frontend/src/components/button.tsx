import { useTheme } from "./buttonLayout";

export default function Child() {
  const { setBgColor } = useTheme();

  return (
    <button
      onClick={() => setBgColor("bg-green-500")}
      className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition"
    >
      Change Background via Context
    </button>
  );
}
