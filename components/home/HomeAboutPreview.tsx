"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/providers";
import { User, MoveRight } from "lucide-react";
import FounderImage from "@/public/mesam.png"
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY = [
  "I build systems that solve real-world problems at scale.",
  "Execution-first: teams, products, and go-to-market   shipped, not theorized.",
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
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">

          {/* Left Column: All Text Content */}
          <div className={`order-2 lg:order-1 lg:col-span-6 space-y-4 sm:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-10 h-[1px] bg-cyan-500" />
              <span className="text-cyan-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em]">The Visionary</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-tight sm:leading-none mb-4 sm:mb-6">
              About the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Founder</span>
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {PHILOSOPHY.map((item, idx) => (
                <div key={idx} className="group flex gap-3 sm:gap-4 md:gap-6 items-start">
                  <span className="text-blue-500 font-mono text-base sm:text-lg mt-1 flex-shrink-0">0{idx + 1}</span>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light leading-relaxed sm:leading-snug group-hover:text-white transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 sm:pt-8">
              <a
                href="/about"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-transparent border border-white/10 rounded-full text-white font-bold overflow-hidden transition-all hover:border-cyan-500/50 w-full sm:w-auto"
              >
                {/* Button Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                <span className="relative z-10 uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm">Discover the full story</span>
                <MoveRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right Column: Founder Image */}
          <div className={`order-1 lg:order-2 lg:col-span-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full max-w-3xl mx-auto">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl group">
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />

                {/* Interactive Border Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src={FounderImage}
                  alt="Founder"
                  width={1200}
                  height={1440}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
                  quality={100}
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAboutPreview