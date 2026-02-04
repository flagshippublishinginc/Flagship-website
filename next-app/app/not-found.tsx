"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <section className="section-spacing">
      <div className="container">
        <div className="inner flex flex-col min-h-[50vh] justify-center">
          <h2 className="text-center">Something went wrong!</h2>
          <div className="flex justify-center pt-10">
            <button
              className="btn-primary py-3! px-6!"
              onClick={() => router.push("/")}>
              Go To Home Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
