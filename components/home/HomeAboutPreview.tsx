"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { User, MoveRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY = [
  "I build systems that solve real-world problems at scale.",
  "Execution-first: teams, products, and go-to-market — shipped, not theorized.",
  "Operating globally, remote-first, founder-led.",
];

// REUSABLE HOOK
type UseIOOptions = IntersectionObserverInit & {
  once?: boolean;
};

const useIntersectionObserver = <T extends HTMLElement>(
  options: UseIOOptions = {}
) => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.once) observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
};





 const HomeAboutPreview = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-20 overflow-hidden"
    >
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Visual/Heading */}
          <div className={`lg:col-span-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-cyan-500" />
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.4em]">The Visionary</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-8">
              About the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Founder</span>
            </h2>

            {/* Visual Element: Stylized User Icon / Badge */}
            <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <User className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Right Column: Content & Philosophy */}
          <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              {PHILOSOPHY.map((item, idx) => (
                <div key={idx} className="group flex gap-6 items-start">
                  <span className="text-blue-500 font-mono text-lg mt-1">0{idx + 1}</span>
                  <p className="text-xl md:text-2xl text-gray-400 font-light leading-snug group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <a
                href="/about"
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-white/10 rounded-full text-white font-bold overflow-hidden transition-all hover:border-cyan-500/50"
              >
                {/* Button Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <span className="relative z-10 uppercase tracking-widest text-sm">Discover the full story</span>
                <MoveRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAboutPreview