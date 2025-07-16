// app/not-found.tsx (or .jsx)
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sectionBG text-white px-4">
      <h2 className="mb-4 text-[5rem] font-bold flex gap-2 items-center">
        <SearchX className="h-20 w-20" /> Oops!
      </h2>
      <h3 className="mb-4 text-[3rem] font-bold">404 | Page Not Found</h3>
      <p className="mb-8 text-center text-[2rem] max-w-[400px]">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition text-[1.7rem]"
      >
        Back to Home
      </Link>
    </main>
  );
}
