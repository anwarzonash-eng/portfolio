import { SearchX } from "lucide-react";
import Link from "next/link";

export default function EmptyState({ message = "No data found." }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-sectionBG text-white px-4">
      <h2 className="mb-4 text-[4rem] font-bold flex gap-2 items-center">
        <SearchX className="h-16 w-16" /> Oops!
      </h2>
      <h3 className="mb-4 text-[2rem] font-bold">Nothing to show</h3>
      <p className="mb-8 text-center text-[1.5rem] max-w-[400px]">{message}</p>
      <Link
        href="/"
        className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition text-[1.2rem]"
      >
        Back to Home
      </Link>
    </main>
  );
}
