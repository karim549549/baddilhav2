import { Sparkles, Timer } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Enhanced coming soon badge */}
      <div className="fade-in delay-80">
        <span className="text-sm  border-1 border-white/30 backdrop-blur-2xl  bg-gradient-to-r from-violet-800/20  to-pink-500/20 mt-3 flex items-center gap-2 capitalize px-6 py-3 mb-8 text-white  rounded-full group cursor-pointer">
          <Sparkles className="w-4 h-4  duration-300" />
          coming soon
          <Timer className="w-4 h-4  duration-300" />
        </span>
      </div>

      {/* Enhanced main title */}
      <div className="fade-in delay-160">
        <h1 className="uppercase font-black text-white leading-tight text-4xl sm:text-5xl md:text-7xl lg:text-7xl max-w-4xl mb-6">
          <span className="bg-gradient-to-r text-3xl from-gray-300 to-sky-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
            AMAZING EXPERIENCE
          </span>
          <br />
          <span className="text-white hover:scale-105 transition-transform duration-500 inline-block">
            baddilha
          </span>
        </h1>
      </div>

      {/* Enhanced subtitle */}
      <div className="fade-in delay-240">
        <p className="text-neutral-200 text-lg sm:text-xl max-w-2xl mt-5 leading-relaxed">
          We&apos;re crafting an extraordinary experience that will change
          everything. Get ready for the future.
        </p>
      </div>
    </>
  );
}
