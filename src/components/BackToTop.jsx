import { FaChevronUp } from "react-icons/fa";

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 grid h-10 w-10 place-items-center rounded-md bg-indigo-500 text-white shadow-lg"
    >
      <FaChevronUp />
    </button>
  );
}
