/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Tv, 
  Music, 
  AlertCircle, 
  Star, 
  Sparkles,
  Play,
  Image as ImageIcon,
  Home as HomeIcon,
  X,
  Mic2
} from "lucide-react";

const GALLERY_IMAGES = [
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Cheer.jpg", caption: "The Cheer" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Fight.jpg", caption: "The Fight" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Injection.jpg", caption: "The Injection" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Podcast.jpg", caption: "The Alpha Podcast" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Shook.jpg", caption: "Shock and Awe" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Song.jpg", caption: "A Musical Interlude" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/Summoning.jpg", caption: "The Summoning" },
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/e01ca24b85d268e8ae99dd0f9fa0df698c1c024c/Gallery/USA.jpg", caption: "The Patriot" },
];

// Team configuration
const TEAM = [
  { 
    name: "Ishaan", 
    color: "bg-lump-pink", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Ishaan.jpg"
  },
  { 
    name: "Calvin", 
    color: "bg-lump-blue", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Calvin.jpg" 
  },
  { 
    name: "Hayden", 
    color: "bg-lump-orange", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Hayden.jpg" 
  },
  { 
    name: "Jonathan", 
    color: "bg-green-400", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Crew/Jonathan.jpg" 
  },
];

const QUOTES = [
    "\"Clown-fed collisions with absurdity.\"",
    "\"Six, maybe seven, skits. We honestly lost count.\"",
    "\"Breaking through modern numbness.\"",
    "\"Questioning the performance of male power.\"",
    "\"The outrageous should still feel outrageous.\"",
    "\"A theatrical playground for the unhinged.\"",
    "\"Clowning, satire, and direct engagement.\"",
    "\"Where laughter becomes a way into discomfort.\"",
    "\"Real events turned into ridiculous theatre.\"",
    "\"Exposing the contradictions of our world.\"",
    "\"Rough theatre. Visible mechanics. Zero chill.\"",
    "\"Witness the absurdity since " + new Date().toLocaleTimeString() + ".\"",
    "\"Invite audiences to laugh, question and think again.\"",
    "\"Politics, pop culture, and modern masculinity.\"",
    "\"Making familiar events feel strange again.\""
];

export default function App() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'pitch', 'proposal', 'gallery'

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const Logo = () => (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onClick={() => setCurrentView('home')}
      className="flex items-center gap-0 font-heading font-black text-3xl md:text-5xl lg:text-6xl cursor-pointer select-none group"
    >
      <span className="text-lump-pink drop-shadow-[0_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-rotate-3 group-hover:scale-110">HUMP</span>
      <span className="text-lump-blue drop-shadow-[0_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:rotate-3 group-hover:scale-110">LUMP</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-lump-yellow text-lump-black overflow-x-hidden selection:bg-lump-pink selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center transition-all bg-lump-yellow/95 backdrop-blur-md border-b-4 sm:border-b-8 border-lump-black">
        <Logo />
        
        <div className="flex gap-3 sm:gap-6 items-center font-comic font-black text-lg sm:text-2xl uppercase tracking-wider overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`hover:text-lump-pink hover:scale-110 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'home' ? 'text-lump-pink underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Home</span>
          </button>
          <button 
            onClick={() => setCurrentView('pitch')} 
            className={`hover:text-lump-orange hover:scale-110 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'pitch' ? 'text-lump-orange underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Pitch</span>
          </button>
          <button 
            onClick={() => setCurrentView('proposal')} 
            className={`hover:text-indigo-500 hover:scale-110 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'proposal' ? 'text-indigo-500 underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Tv className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Proposal</span>
          </button>
          <button 
            onClick={() => setCurrentView('gallery')} 
            className={`hover:text-lump-blue hover:scale-110 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'gallery' ? 'text-lump-blue underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Gallery</span>
          </button>
        </div>
      </nav>

      {/* View Content */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-screen landscape:min-h-[auto] landscape:py-24 flex flex-col justify-center items-center pt-32 pb-12 px-6 overflow-hidden">
              <div className="absolute inset-0 sunburst-bg opacity-50 z-0 scale-150 animate-[spin_60s_linear_infinite]" />
              
              <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center mt-12 sm:mt-0 landscape:mt-8">
                <div className="text-center relative w-full px-4 sm:px-0">
                  <Star className="absolute -top-32 -left-32 w-20 h-20 text-lump-pink fill-lump-pink animate-bounce hidden lg:block" />
                  <Sparkles className="absolute -bottom-12 -right-12 w-24 h-24 text-lump-blue animate-pulse hidden lg:block" />
                  
                  {/* New Bubbly Logo Style */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center mb-8 sm:mb-12 landscape:mb-6"
                  >
                    {/* Hump Lump Bubbly */}
                    <h1 className="flex items-center gap-0 font-heading font-black text-[12vw] xs:text-[10vw] sm:text-[8rem] md:text-[7rem] lg:text-[10rem] leading-none mb-4 select-none drop-shadow-[0_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
                      <span className="text-lump-pink -rotate-3 transition-transform hover:rotate-0 -mr-2 sm:-mr-4">HUMP</span>
                      <span className="text-lump-blue rotate-3 transition-transform hover:rotate-0">LUMP</span>
                    </h1>

                    {/* - Presents - */}
                    <div className="flex items-center gap-4 sm:gap-8 mb-4 landscape:mb-2 text-center">
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-pink rounded-full hidden xs:block" />
                      <span className="font-comic text-2xl md:text-4xl lg:text-6xl uppercase text-lump-black font-bold tracking-widest leading-none">Presents</span>
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-blue rounded-full hidden xs:block" />
                    </div>

                    {/* 6 or 7 skits in Black Bubbly */}
                    <motion.h2 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="font-heading font-extrabold text-[12vw] xs:text-[10vw] sm:text-[10rem] md:text-[8rem] lg:text-[12rem] leading-none text-lump-black drop-shadow-[0_4px_0_rgba(255,255,255,0.5)] sm:drop-shadow-[0_10px_0_rgba(255,255,255,0.5)] select-none italic text-center w-full"
                    >
                      6 <span className="text-[8vw] xs:text-[6vw] sm:text-[7rem] md:text-[5rem] lg:text-[8rem] lowercase font-comic font-medium -mx-2 sm:-mx-8">or</span> 7 Skits
                    </motion.h2>
                  </motion.div>

                  <div className="max-w-2xl mx-auto space-y-6 landscape:space-y-4">
                    <p className="text-lg sm:text-4xl md:text-2xl lg:text-4xl font-comic leading-tight bg-white border-4 sm:border-8 border-lump-black p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] -rotate-1 shadow-[4px_4px_0_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
                      A theatrical mirror held up to the face of modern masculinity. Surprisingly musical.
                    </p>
                    
                    <div className="h-12 sm:h-16 flex items-center justify-center pointer-events-none mt-12 sm:mt-20 mb-12 lg:mb-0">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={activeQuote}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          className="font-comic text-lump-pink text-2xl sm:text-5xl md:text-3xl lg:text-5xl drop-shadow-[0_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_3px_0_rgba(0,0,0,1)] text-center px-4"
                        >
                          {QUOTES[activeQuote]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Satire Section */}
            <section className="bg-lump-blue py-16 sm:py-24 border-y-4 sm:border-y-8 border-lump-black relative overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <motion.div className="bg-white p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(0,0,0,1)] rotate-0 sm:rotate-1">
                    <h2 className="font-heading font-black text-5xl sm:text-8xl leading-none uppercase mb-4 sm:mb-6 drop-shadow-[0_2px_0_rgba(255,75,179,1)] sm:drop-shadow-[0_4px_0_rgba(255,75,179,1)]">
                      THE <br /> MIRROR
                    </h2>
                    <p className="font-comic text-xl sm:text-3xl leading-tight mb-6">
                      Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture.
                    </p>
                    <div className="bg-lump-yellow p-3 border-2 border-lump-black rounded-lg inline-block font-comic text-lg uppercase tracking-wider font-bold -rotate-1">
                      Proof of Concept
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white border-4 sm:border-8 border-lump-black p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_rgba(0,0,0,1)] w-full"
                  >
                    <div className="aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-lump-black">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/TK_9MlzGyuY"
                        title="Hump Lump 3 Skits Proof of Concept"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Crew Section */}
            <section id="about" className="py-16 sm:py-32 px-4 sm:px-6 bg-white relative">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 sm:mb-24 gap-6 sm:gap-8 text-center md:text-left">
                  <h2 className="font-heading font-black text-7xl sm:text-9xl leading-none uppercase drop-shadow-[0_3px_0_rgba(55,185,255,1)] sm:drop-shadow-[0_6px_0_rgba(55,185,255,1)] transition-all hover:scale-105 active:scale-95 cursor-default">
                    THE CREW
                  </h2>
                  <div className="max-w-xs sm:max-w-sm font-comic text-2xl sm:text-3xl rotate-0 sm:rotate-2 bg-lump-yellow p-4 sm:p-6 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[12px_12px_0_rgba(0,0,0,1)] rounded-xl">
                    Four clowns. One mission. Zero chill. 
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16">
                  {TEAM.map((member, i) => (
                    <motion.div 
                      key={i}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className={`aspect-[3/4] ${member.color} overflow-hidden relative border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none rounded-2xl sm:rounded-3xl`}>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                        />
                      </div>
                      <div className="mt-4 sm:mt-8 text-center">
                        <h3 className="font-heading text-4xl sm:text-5xl uppercase tracking-tighter text-lump-black">
                          {member.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.main>
        )}

        {currentView === 'pitch' && (
          <motion.main
            key="pitch"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pt-32 sm:pt-40 pb-24 px-6 container mx-auto space-y-12 sm:space-y-24"
          >
            {/* Strap-line & Blurb */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              <div className="flex-1 bg-white p-8 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-[2rem]">
                <h3 className="font-heading text-3xl sm:text-4xl mb-4 uppercase text-lump-green underline">The Strap-line</h3>
                <p className="font-comic text-2xl sm:text-4xl italic leading-tight text-lump-black">
                  "Six, maybe seven, clown-fed collisions with the absurdity of the modern world."
                </p>
              </div>
              <div className="flex-1 bg-white p-8 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-[2rem]">
                <h3 className="font-heading text-3xl sm:text-4xl mb-4 uppercase text-lump-blue underline">Marketing Blurb</h3>
                <p className="font-comic text-xl sm:text-2xl leading-tight">
                  Feeling numb to the chaos of the world? 6 or 7 Skits throws politics, pop culture and modern masculinity into a clown-filled playground of satire. Through verbatim, puppetry, absurdism, music and audience interaction, Hump Lump turns real events into ridiculous, uncomfortable and strangely recognisable theatre.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <section className="bg-white border-4 sm:border-8 border-lump-black p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_rgba(0,0,0,1)]">
              <h2 className="font-heading font-black text-6xl sm:text-8xl text-lump-pink mb-6 uppercase transition-transform hover:-skew-x-12 inline-block">Mission</h2>
              <p className="font-comic text-2xl sm:text-4xl leading-tight">
                Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture. Through clowning, satire, rough theatre and direct audience engagement, we aim to break through modern numbness and invite audiences to laugh, question and think again.
              </p>
            </section>

            {/* Creative Approach */}
            <section className="bg-white p-6 sm:p-12 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(55,185,255,1)]">
              <h2 className="font-heading text-5xl sm:text-7xl text-lump-blue mb-8 uppercase text-center sm:text-left">Our Creative Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      Framed as a <span className="bg-lump-yellow px-2 font-bold rotate-1 inline-block">“play within a play,”</span> where literal clowns enter a theatrical playground to act out real-world figures, public narratives and media events.
                    </p>
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make <span className="bg-lump-blue text-white px-2">familiar events feel strange again</span>.
                    </p>
                  </div>
                <div className="bg-lump-black p-4 sm:p-8 text-white rounded-3xl transform rotate-1">
                  <h4 className="font-heading text-3xl sm:text-4xl mb-6 uppercase text-lump-pink underline">Key Tools</h4>
                  <ul className="font-comic text-xl sm:text-3xl space-y-4">
                    <li>🎭 Clowning & Satire</li>
                    <li>🎈 Rough Theatre</li>
                    <li>🌀 Verbatim Material</li>
                    <li>🎵 Puppetry & Absurdism</li>
                  </ul>
                </div>
              </div>
            </section>
          </motion.main>
        )}

        {currentView === 'proposal' && (
          <motion.main
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="pt-32 sm:pt-40 pb-24 px-6 container mx-auto space-y-12 sm:space-y-24"
          >
            {/* Project Synopsis */}
            <section className="bg-white border-4 sm:border-8 border-lump-black p-6 sm:p-12 rounded-[2rem] shadow-[10px_10px_0_rgba(255,140,0,1)]">
              <h2 className="font-heading font-black text-5xl sm:text-7xl text-lump-orange mb-8 uppercase italic border-b-4 border-lump-black pb-4">Project Synopsis</h2>
              <div className="font-comic text-xl sm:text-3xl leading-relaxed space-y-6">
                <p>
                  <span className="font-bold underline decoration-lump-pink text-lump-black">6 or 7 Skits</span> is a political and social satire created by Hump Lump, a devised theatre company exploring how world events can be reimagined through clowning, rough theatre and absurd performance.
                </p>
                <p>
                  The piece is structured as a non-linear sketch show made up of six, maybe seven, short skits. Each skit responds to a real-life political, social or pop-cultural event, using satire to expose the ridiculousness, contradictions and discomfort already present in the world around us. Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make familiar events feel strange again.
                </p>
              </div>
            </section>

            {/* Key Content Pillars */}
            <section className="space-y-8">
              <h2 className="font-heading font-black text-5xl sm:text-7xl text-lump-pink uppercase text-center md:text-left">Key Content Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-lump-blue uppercase">Masculinity</h3>
                  <p className="font-comic text-lg">As four male performers, we question the performance of male power, authority, ego, control and fragility across political and cultural spaces.</p>
                </div>
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-lump-orange uppercase">Rough Theatre</h3>
                  <p className="font-comic text-lg">Exposed and deliberately imperfect performance. Costume changes happen in view, the fourth wall is broken, and audiences are treated as active witnesses.</p>
                </div>
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-pink-500 uppercase">Clown Archetypes</h3>
                  <p className="font-comic text-lg">Traditional clown archetypes such as the Whiteface, Auguste and Hobo/Tramp inform the company’s character work in a modern satirical context.</p>
                </div>
              </div>
            </section>

            {/* Genre & Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
              <div className="bg-lump-green p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl rotate-2">
                <h3 className="font-heading text-4xl sm:text-5xl text-lump-black mb-4 uppercase italic">Genre</h3>
                <p className="font-comic text-xl sm:text-2xl">Political & Social Satire</p>
              </div>
              <div className="bg-lump-blue p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl -rotate-2 text-white">
                <h3 className="font-heading text-4xl sm:text-5xl mb-4 uppercase italic">Style</h3>
                <ul className="font-comic text-lg sm:text-2xl list-disc list-inside">
                  <li>Clowning</li>
                  <li>Rough Theatre</li>
                  <li>Verbatim & Puppetry</li>
                  <li>Absurdism & Musicality</li>
                </ul>
              </div>
              <div className="bg-lump-orange p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl rotate-1">
                <h3 className="font-heading text-4xl sm:text-5xl text-lump-black mb-4 uppercase italic">Form</h3>
                <p className="font-comic text-xl sm:text-2xl">Non-linear sketch show made up of six, maybe seven, short skits responding to real-world events.</p>
              </div>
            </div>

            {/* Technical Specification */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
              <div className="bg-lump-pink p-8 border-4 sm:border-8 border-lump-black text-white rounded-3xl -rotate-1">
                <h3 className="font-heading text-4xl sm:text-5xl mb-6 uppercase underline">The Bare Essentials</h3>
                <ul className="font-comic text-lg sm:text-2xl space-y-4">
                  <li>📍 Space: 5m x 5m "playground"</li>
                  <li>⏱️ Duration: 45 – 60 minutes</li>
                  <li>⚡ Set-Up/Strike: 20 mins each</li>
                  <li>🎭 Company: 4 Performers</li>
                </ul>
              </div>
              <div className="bg-white p-8 border-4 sm:border-8 border-lump-black rounded-3xl rotate-1 shadow-[8px_8px_0_rgba(0,0,0,1)]">
                <h3 className="font-heading text-4xl sm:text-5xl text-lump-blue mb-6 uppercase italic">Low-Footprint Tech</h3>
                <ul className="font-comic text-lg sm:text-xl space-y-2">
                  <li>📢 <strong>No mics/PA:</strong> Acoustic & live vocal performance.</li>
                  <li>💡 <strong>House lights:</strong> Performs under found/stable light.</li>
                  <li>📦 <strong>Modular Set:</strong> Wheeled clothing racks and prop crates remain visible throughout.</li>
                </ul>
              </div>
            </section>
          </motion.main>
        )}

        {currentView === 'gallery' && (
          <motion.main
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-24 px-6 container mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 sm:mb-16 gap-4">
              <h2 className="font-heading font-black text-6xl sm:text-8xl uppercase text-lump-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center sm:text-left w-full sm:w-auto">GALLERY</h2>
              <p className="font-comic text-xl sm:text-2xl max-w-sm italic opacity-70 text-center sm:text-left w-full sm:w-auto">Visual evidence of the absurdity.</p>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
              {GALLERY_IMAGES.map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid relative group cursor-zoom-in"
                >
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-auto border-4 sm:border-8 border-lump-black rounded-2xl sm:rounded-3xl transition-transform group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-lump-pink opacity-0 group-hover:opacity-20 transition-opacity rounded-xl sm:rounded-2xl" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white border-2 sm:border-4 border-lump-black p-2 font-comic text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity rotate-1">
                    {img.caption}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
