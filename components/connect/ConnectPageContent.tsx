"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, MessageCircle, Instagram, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const HERO_TAGLINE = "Collaboration & Contact   clear, professional, direct.";

const LOOKING_FOR = [
  { title: "Partnerships", desc: "Strategic partnerships across climate-tech, platforms, and impact   execution-first, globally." },
  { title: "Investors", desc: "Aligned capital for ventures that scale beyond borders with transparent governance and measurable impact." },
  { title: "Accelerators", desc: "Programs and cohorts focused on venture building, climate, and digital transformation." },
  { title: "Policy & Research", desc: "Academic, policy, and research institutions working on sustainability, technology adoption, and youth." },
];

const CONTACT_LIST = [
  {
    id: "email",
    label: "Email",
    href: "mailto:contact@muhammadmeasmraza.com",
    value: "contact@muhammadmeasmraza.com",
    desc: "Primary for collaborations.",
    icon: <Mail className="w-5 h-5" />,
    color: "group-hover:text-blue-500"
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/971563756215",
    value: "+971563756215",
    desc: "Urgent project communication.",
    icon: <MessageCircle className="w-5 h-5" />,
    color: "group-hover:text-cyan-400"
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/mesamraza.official",
    value: "@mesamraza.official",
    desc: "Behind-the-scenes & ventures.",
    icon: <Instagram className="w-5 h-5" />,
    color: "group-hover:text-blue-400"
  },
];

// Helper for scroll animations
function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}
type LookingCardProps = {
  item: {
    title: string;
    desc: string;
  };
  index: number;
};

function LookingCard({ item, index }: LookingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
      className="p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/40 border border-white/5 transition-all duration-500"
    >
      <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{item.title}</h4>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent!");
      e.target.reset();
    } else {
      alert("Error sending message");
    }
  }
  return (
    <div className="bg-black/70 text-white min-h-screen selection:bg-blue-500/30">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-blue-500 font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6 animate-fade-in">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mb-6 sm:mb-8 leading-[0.9]">
              Connect<span className="text-blue-600">.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed animate-slide-up">
              {HERO_TAGLINE}
            </p>
          </div>
        </section>

        {/* Looking For Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 md:py-24 border-t border-white/5 bg-zinc-950/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
              <div>
                <h2 className="text-cyan-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-3 sm:mb-4">Intent</h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">Currently Looking For</h3>
              </div>
              <p className="text-gray-500 font-mono text-[10px] sm:text-xs max-w-xs md:text-right">
                Prioritizing high-impact ventures with transparent governance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {LOOKING_FOR.map((item, i) => (
                <LookingCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Split Section */}
        <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 sm:gap-16 md:gap-20">

              {/* Left Column: Direct Links */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Direct Channels</h3>
                  <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg leading-relaxed">
                    "Let's build systems that scale responsibly." Reach out via the channel that fits your urgency.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {CONTACT_LIST.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 md:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                        <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-black border border-white/10 ${item.color} transition-colors flex-shrink-0`}>
                          {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-white">{item.label}</p>
                          <p className="text-[10px] sm:text-xs text-gray-500">{item.value}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="relative">
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-[2rem] sm:rounded-[2.3rem] md:rounded-[2.6rem] blur-lg opacity-20"></div>

                <div className="relative p-4 py-8 md:p-10 lg:p-12 rounded-[1.9rem] sm:rounded-[2.2rem] md:rounded-[2.5rem] bg-zinc-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 ml-1 font-bold">Name</label>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          pattern="[A-Za-z\s]+"
                          title="Name should contain only letters"
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                          }}
                          className="w-full bg-black/40 text-white border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-gray-600 hover:border-white/20 text-sm sm:text-base"
                        />

                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 ml-1 font-bold">Email</label>
                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          className="w-full bg-black/40 text-white border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-gray-600 hover:border-white/20 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 ml-1 font-bold">Subject</label>
                      <input
                        required
                        name="subject"
                        type="text"
                        placeholder="Partnership Inquiry"
                        className="w-full bg-black/40 text-white border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-gray-600 hover:border-white/20 text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-widest text-cyan-400 ml-1 font-bold">Message</label>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project..."
                        className="w-full bg-black/40 text-white border border-white/10 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all placeholder:text-gray-600 resize-none hover:border-white/20 text-sm sm:text-base"
                      />
                    </div>

                    <button
                      disabled={loading || submitted}
                      type="submit"
                      className={`w-full py-4 sm:py-5 rounded-lg sm:rounded-xl font-bold transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base ${submitted
                        ? "bg-emerald-500 text-white cursor-default"
                        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-cyan-500 hover:to-blue-600 active:scale-[0.98] shadow-blue-500/30"
                        }`}
                    >
                      {loading ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : submitted ? (
                        <>Message Sent <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /></>
                      ) : (
                        <>Send Message <Send className="w-4 h-4 sm:w-5 sm:h-5" /></>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Secondary CTA */}
      <footer className="px-4 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-24 md:py-32 bg-zinc-950/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">No clutter. No forms overload. Just intent.</h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 font-light leading-relaxed">
            Reach out directly for partnerships, investment, accelerators, or research collaboration. Clear and professional.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              href="/connect"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors"
            >
              Get in Touch
            </Link>

            <Link href="/impact" className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 hover:bg-white/5 text-white rounded-full font-bold transition-colors text-sm sm:text-base w-full sm:w-auto">
              View Impact
            </Link>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
}

