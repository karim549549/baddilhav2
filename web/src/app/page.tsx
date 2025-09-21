"use client";

import { memo } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import CountdownSection from "../components/CountdownSection";
import SocialButtons from "../components/SocialButtons";

function Home() {
  const target = new Date("2026-01-10T00:00:00Z");

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center gap-6 w-full overflow-hidden">
      <Background />

      {/* Content */}
      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">
        <Header />
        <CountdownSection target={target} />
        <SocialButtons />
      </div>
    </main>
  );
}

export default memo(Home);
