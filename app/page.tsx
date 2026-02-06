"use client" 
import AnimatedBeamsBackground from "@/components/AnimatedBeamsBackground/AnimatedBeamsBackground";
import HomeAboutPreview from "@/components/home/HomeAboutPreview";
import HomeGreynPreview from "@/components/home/HomeGreynPreview";
import HomeImpactPreview from "@/components/home/HomeImpactPreview";
import HomeFinalCTA from "@/components/home/HomeFinalCTA";
import Link from "next/link";


// --- MAIN PORTFOLIO COMPONENT ---
const HERO_LINES = [
  "Muhammad Measm Raza",
  "Founder | Climate-Tech Entrepreneur | Global Impact Builder",
  "Building verified climate impact, scalable technology, and globally distributed companies from day one.",
  "Operating globally · Remote-first · Founder-led",
] as const;

const App = () => {
  return (
    <div className="relative min-h-screen text-slate-100 font-sans bg-black/20 selection:bg-cyan-500/30">
      <AnimatedBeamsBackground />

      <main className="relative z-10 w-full mx-auto px-6 md:px-20 py-24 md:pt-36 md:pb-48">
        <div className="w-full space-y-10 pb-24 md:px-20 py-20">
          {/* Badge using Electric Blue and Cyan */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Available for Impact
          </div>

          <div className="space-y-6 w-full">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
              {HERO_LINES[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 leading-relaxed tracking-normal text-[22px] md:text-3xl">
                {HERO_LINES[1]}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
              {HERO_LINES[2]}
            </p>

            <p className="text-sm md:text-base text-cyan-400/70 font-mono tracking-widest uppercase">
              {HERO_LINES[3]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <Link href="/greyn"
             className=" text-center md:text-left px-10 py-4 bg-cyan-400 text-black font-bold rounded-2xl hover:bg-white transition-all shadow-2xl shadow-cyan-500/20 active:scale-95">
              Explore the Work
            </Link>
            <Link href="/connect" className=" text-center md:text-left px-10 py-4 border border-slate-700 bg-black/50 backdrop-blur-md text-white font-bold rounded-2xl hover:border-cyan-500 transition-all active:scale-95">
              Contact Founder
            </Link>
          </div>
        </div>

        <section className="w-full mt-40 grid grid-cols-1 md:grid-cols-3 gap-10 pb-24 md:px-20">
          {[
            { title: 'Climate-Tech', desc: 'Leveraging technology to solve the most pressing environmental challenges.' },
            { title: 'Entrepreneurship', desc: 'Building and scaling companies with a global-first mindset.' },
            { title: 'Global Impact', desc: 'Creating measurable, verified positive outcomes for the planet.' }
          ].map((item, idx) => (
            <div
              key={idx}
              className=" p-6 md:p-10 rounded-3xl bg-slate-900/10 border border-slate-800/60 backdrop-blur-sm hover:border-cyan-500/40 transition-all group"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
         <HomeAboutPreview />
         <HomeGreynPreview />
         <HomeImpactPreview />
         <HomeFinalCTA/>
      </main>
    </div>
  );
};

export default App;