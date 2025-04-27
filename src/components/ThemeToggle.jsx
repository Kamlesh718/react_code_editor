import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function ThemeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="absolute top-2 right-4 rounded cursor-pointer text-3xl z-10"
    >
      {isDark ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
}
