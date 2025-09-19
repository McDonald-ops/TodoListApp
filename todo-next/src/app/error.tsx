"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="p-6 text-center text-[#2A8D63]">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm opacity-80">{error.message}</p>
    </div>
  );
}


