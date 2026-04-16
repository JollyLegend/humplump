/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  ChevronRight, 
  Mic2, 
  Tv, 
  Music, 
  AlertCircle, 
  ArrowRight,
  Mail,
  Star,
  Sparkles
} from "lucide-react";

const TEAM = [
  { 
    name: "Ishaan", 
    role: "Clown / Instigator", 
    color: "bg-lump-pink", 
    image: "input_file_0.png" 
  },
  { 
    name: "Calvin", 
    role: "Clown / Skeptic", 
    color: "bg-lump-blue", 
    image: "input_file_1.png" 
  },
  { 
    name: "Hayden", 
    role: "Clown / The Look", 
    color: "bg-lump-orange", 
    image: "input_file_2.png" 
  },
  { 
    name: "Jonathan", 
    role: "Clown / The Voice", 
    color: "bg-green-400", 
    image: "input_file_3.png" 
  },
];

const QUOTES = [
  "\"It's about the energy, the masculine energy.\"",
  "\"Look at me. Look at my jawline.\"",
  "\"Six... no, seven. Let's say six or seven.\"",
  "\"Trust the process. Become the alpha.\"",
  "\"VERBATIM. EXACTLY AS THEY ARE.\"",
  "\"A surprise musical number? At this hour?\"",
];

export default function App() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-lump-yellow text-lump-black overflow-x-hidden selection:bg-lump-pink selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 flex justify-between items-center transition-all bg-lump-yellow/90 backdrop-blur-md border-b-4 border-lump-black">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 font-logo text-3xl sm:text-5xl drop-shadow-[0_4px_0_rgba(0,0,0,1)] tracking-tighter"
        >
          <span className="text-lump-pink text-stroke-2">Hump</span>
          <span className="text-lump-blue text-stroke-2">Lump</span>
        </motion.div>
        
        <div className="flex gap-4 sm:gap-8 items-center font-comic text-xl sm:text-2xl uppercase tracking-wider">
          <a href="#about" className="hover:text-lump-pink transition-all transform hover:rotate-3">The Lump</a>
          <a href="#notify" className="px-6 py-2 bg-lump-pink text-white border-4 border-lump-black font-heading shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            STAY TUNED!
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 px-6 overflow-hidden">
          {/* Sunburst Background */}
          <div className="absolute inset-0 sunburst-bg opacity-50 z-0 scale-150 animate-[spin_60s_linear_infinite]" />
          
          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <img 
                src="input_file_4.png" 
                alt="Hump Lump Poster" 
                className="w-full max-w-lg rounded-3xl border-8 border-lump-black shadow-[20px_20px_0_rgba(0,0,0,0.2)]"
              />
            </motion.div>

            <div className="text-center relative">
              {/* Decorative Stars from Poster */}
              <Star className="absolute -top-12 -left-12 w-12 h-12 text-lump-pink fill-lump-pink animate-pulse" />
              <Sparkles className="absolute -bottom-8 -right-8 w-16 h-16 text-lump-blue animate-pulse" />
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-comic text-3xl sm:text-4xl uppercase mb-2 text-lump-black/80"
              >
                Hump Lump Presents
              </motion.p>
              
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-heading text-[12vw] sm:text-9xl leading-none mb-6 drop-shadow-[0_8px_0_rgba(0,0,0,1)] text-stroke-2"
              >
                6 OR <span className="text-lump-orange">7 SKITS</span>
              </motion.h1>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-2xl mx-auto space-y-4"
              >
                <p className="text-xl sm:text-3xl font-comic shadow-black leading-tight bg-white/40 backdrop-blur-sm p-4 border-4 border-lump-black rounded-2xl rotate-1">
                  A theatrical mirror held up to the face of modern masculinity. 
                  Exactly how they are. Surprisingly musical.
                </p>
                
                <div className="h-16 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeQuote}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="font-comic text-lump-pink text-2xl sm:text-4xl drop-shadow-[0_2px_0_rgba(0,0,0,1)]"
                    >
                      {QUOTES[activeQuote]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Satire Section */}
        <section className="bg-lump-blue py-24 border-y-8 border-lump-black relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ rotate: -5 }}
                whileInView={{ rotate: 0 }}
                className="bg-white p-8 border-8 border-lump-black shadow-[16px_16px_0_rgba(0,0,0,1)] rotate-2"
              >
                <h2 className="font-heading text-6xl sm:text-8xl leading-none uppercase mb-6 drop-shadow-[0_4px_0_rgba(255,75,179,1)]">
                  THE <br /> MIRROR
                </h2>
                <p className="font-comic text-2xl sm:text-3xl leading-snug">
                  We don't create characters. We just hold the camera. We don't write scripts. We just record the air. 
                  Verbatim theatre meets the red nose. A mirror to the podcasts, the platforms, and the politicians. 
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Tv, label: "PLATFORMS", color: "bg-lump-pink" },
                  { icon: Mic2, label: "PODCASTS", color: "bg-lump-yellow" },
                  { icon: AlertCircle, label: "ALPHAS", color: "bg-lump-orange" },
                  { icon: Music, label: "MUSICALS", color: "bg-white" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                    className={`p-8 border-8 border-lump-black flex flex-col items-center justify-center gap-4 ${item.color} shadow-[8px_8px_0_rgba(0,0,0,1)] group cursor-pointer`}
                  >
                    <item.icon className="w-12 h-12 stroke-[3px]" />
                    <span className="font-heading text-xl uppercase tracking-widest">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 sm:py-32 px-6 bg-white relative">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 text-center md:text-left">
              <h2 className="font-heading text-8xl sm:text-9xl leading-none uppercase drop-shadow-[0_6px_0_rgba(55,185,255,1)]">
                THE <br /> LUMP
              </h2>
              <div className="max-w-sm font-comic text-2xl rotate-2 bg-lump-yellow p-4 border-4 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)]">
                Four clowns. One mission. Zero chill. 
                The team behind the chaos.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {TEAM.map((member, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className={`aspect-[3/4] ${member.color} overflow-hidden relative border-8 border-lump-black shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-lump-pink opacity-0 group-hover:opacity-20 transition-opacity mix-blend-multiply" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="font-heading text-4xl uppercase tracking-tighter text-stroke-2 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                      {member.name}
                    </h3>
                    <div className="inline-block mt-2 px-3 py-1 bg-lump-black text-white font-comic text-sm uppercase -rotate-1">
                      {member.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="notify" className="py-32 px-6 bg-lump-pink border-t-8 border-lump-black text-white relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="font-heading text-7xl sm:text-9xl mb-12 uppercase leading-[0.9] drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
              STAY <br /> <span className="text-lump-yellow">LUMPY!</span>
            </h2>

            <div className="w-full max-w-xl mx-auto space-y-8">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="GIVE US YOUR EMAIL"
                  className="w-full bg-white border-8 border-lump-black p-6 font-comic text-3xl text-lump-black placeholder:text-lump-black/30 focus:outline-none shadow-[12px_12px_0_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-lump-black hover:text-lump-blue transition-colors">
                  <ArrowRight className="w-12 h-12 stroke-[3px]" />
                </button>
              </div>
              
              <p className="font-comic text-2xl bg-lump-black/10 p-2 inline-block rounded-lg">
                WE PROMISE NO ALPHA PODCAST SPAM. PROBABLY.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-12 bg-lump-black text-white flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="font-logo text-4xl">
          <span className="text-lump-pink">Hump</span>
          <span className="text-lump-blue">Lump</span>
        </div>
        
        <div className="flex gap-12 font-heading text-2xl uppercase tracking-widest">
          <a href="#" className="hover:text-lump-pink transition-colors">Insta</a>
          <a href="#" className="hover:text-lump-blue transition-colors">Talk</a>
          <a href="#" className="hover:text-lump-yellow transition-colors">Bird</a>
        </div>
        
        <div className="font-comic text-xl text-white/40">
          HELLO@HUMPLUMP.CA
        </div>
      </footer>

      {/* Floating Poster Stickers */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <motion.div 
          animate={{ rotate: [-15, -10, -15], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/4 right-8 pointer-events-auto cursor-grab active:cursor-grabbing transform -rotate-12"
        >
          <div className="bg-lump-yellow border-4 border-lump-black p-2 font-heading text-xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
            6 OR 7 SKITS
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: [5, 10, 5], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-1/4 left-8 pointer-events-auto cursor-grab active:cursor-grabbing transform rotate-6 hidden sm:block"
        >
          <div className="bg-lump-blue border-4 border-lump-black p-4 font-comic text-3xl shadow-[4px_4px_0_rgba(0,0,0,1)]">
            CLOWNING.RED
          </div>
        </motion.div>
      </div>
    </div>
  );
}
