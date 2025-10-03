import { Suspense } from "react";
import OauthRedirectClient from "./OauthRedirectClient";

export const dynamic = "force-dynamic"; // avoid prerender error for this route

function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-transparent mb-6" />
      <h1 className="text-2xl font-bold text-gray-800">Finalizing your secure login...</h1>
      <p className="text-gray-500">Please wait a moment.</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <OauthRedirectClient />
    </Suspense>
  );
}
