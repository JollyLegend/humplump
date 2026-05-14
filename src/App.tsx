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
    "\"Now with 15% more High-Value energy.\"",
    "\"Looksmaxxing: Because your jawline is a political statement.\"",
    "\"Alpha, Sigma, or just confused? We’ve got a skit for that.\"",
    "\"Crying is allowed, but only if it's satirical.\"",
    "\"Reject modernity. Embrace the clown.\"",
    "\"6 or 7 Skits. We honestly lost count.\"",
    "\"Is it theater? Is it a playground? Is it a cry for help?\"",
    "\"Verbatim dialogue. Real absurdity. Fake noses.\"",
    "\"Breaking the fourth wall since " + new Date().toLocaleTimeString() + ".\"",
    "\"Mastered honesty. Casual chaos.\"",
    "\"Don't worry, the joke isn't about you... yet.\"",
    "\"The only show where the audience is part of the problem.\"",
    "\"Come for the puppetry, stay for the existential dread.\"",
    "\"If you're not confused, you're not paying attention.\"",
    "\"Sifting through the obscenity so you don't have to.\""
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
      className="flex items-center gap-0 font-heading font-bold text-3xl md:text-5xl lg:text-6xl cursor-pointer select-none group"
    >
      <span className="text-lump-pink text-stroke-2 drop-shadow-[0_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-rotate-3 group-hover:scale-110">Hump</span>
      <span className="text-lump-blue text-stroke-2 drop-shadow-[0_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:rotate-3 group-hover:scale-110">Lump</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-lump-yellow text-lump-black overflow-x-hidden selection:bg-lump-pink selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center transition-all bg-lump-yellow/95 backdrop-blur-md border-b-4 sm:border-b-8 border-lump-black">
        <Logo />
        
        <div className="flex gap-3 sm:gap-6 items-center font-comic text-lg sm:text-2xl uppercase tracking-wider overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`hover:text-lump-pink transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'home' ? 'text-lump-pink underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Home</span>
          </button>
          <button 
            onClick={() => setCurrentView('pitch')} 
            className={`hover:text-lump-orange transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'pitch' ? 'text-lump-orange underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Pitch</span>
          </button>
          <button 
            onClick={() => setCurrentView('proposal')} 
            className={`hover:text-indigo-500 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'proposal' ? 'text-indigo-500 underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Tv className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Proposal</span>
          </button>
          <button 
            onClick={() => setCurrentView('gallery')} 
            className={`hover:text-lump-blue transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'gallery' ? 'text-lump-blue underline underline-offset-4 sm:underline-offset-8' : ''}`}
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
                    <h1 className="flex items-center gap-0 font-heading text-[12vw] xs:text-[10vw] sm:text-[8rem] md:text-[7rem] lg:text-[10rem] leading-none mb-4 select-none drop-shadow-[0_8px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_16px_0_rgba(0,0,0,1)]">
                      <span className="text-lump-pink text-stroke-4 lg:text-stroke-8 -rotate-3 transition-transform hover:rotate-0 -mr-2 sm:-mr-4">Hump</span>
                      <span className="text-lump-blue text-stroke-4 lg:text-stroke-8 rotate-3 transition-transform hover:rotate-0">Lump</span>
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
                      className="font-heading text-[12vw] xs:text-[10vw] sm:text-[10rem] md:text-[8rem] lg:text-[12rem] leading-none text-lump-black drop-shadow-[0_4px_0_rgba(255,255,255,0.5)] sm:drop-shadow-[0_10px_0_rgba(255,255,255,0.5)] select-none italic text-center w-full"
                    >
                      6 <span className="text-[8vw] xs:text-[6vw] sm:text-[7rem] md:text-[5rem] lg:text-[8rem] lowercase font-comic -mx-2 sm:-mx-8">or</span> 7 skits
                    </motion.h2>
                  </motion.div>

                  <div className="max-w-2xl mx-auto space-y-6 landscape:space-y-4">
                    <p className="text-lg sm:text-4xl md:text-2xl lg:text-4xl font-comic leading-tight bg-white border-4 sm:border-8 border-lump-black p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] -rotate-1 shadow-[4px_4px_0_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
                      A theatrical mirror held up to the face of modern masculinity. 
                      Exactly how they are. Surprisingly musical.
                    </p>
                    
                    <div className="h-12 sm:h-16 flex items-center justify-center pointer-events-none mb-12 lg:mb-0">
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
                    <h2 className="font-heading text-5xl sm:text-8xl leading-none uppercase mb-4 sm:mb-6 drop-shadow-[0_2px_0_rgba(255,75,179,1)] sm:drop-shadow-[0_4px_0_rgba(255,75,179,1)]">
                      THE <br /> MIRROR
                    </h2>
                    <p className="font-comic text-xl sm:text-3xl leading-tight mb-6">
                      A look at our clowning world and performance structure. 
                      This proof of concept features 3 skits that sift through the obscenity of modern discourse.
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
                  <h2 className="font-heading text-7xl sm:text-9xl leading-none uppercase drop-shadow-[0_3px_0_rgba(55,185,255,1)] sm:drop-shadow-[0_6px_0_rgba(55,185,255,1)]">
                    THE <br /> CREW
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
                        <h3 className="font-heading text-4xl sm:text-5xl uppercase tracking-tighter text-stroke-2 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
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
              <div className="flex-1 bg-lump-yellow p-8 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-[2rem]">
                <h3 className="font-heading text-3xl sm:text-4xl mb-4 uppercase underline">The Strap-line</h3>
                <p className="font-comic text-2xl sm:text-4xl italic leading-tight text-lump-pink drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                  "Breaking the numbness: A satirical assault on the modern world through the eyes of the unhinged."
                </p>
              </div>
              <div className="flex-1 bg-white p-8 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-[2rem]">
                <h3 className="font-heading text-3xl sm:text-4xl mb-4 uppercase text-lump-blue underline">Marketing Blurb</h3>
                <p className="font-comic text-xl sm:text-2xl leading-tight">
                  Are you desensitised to the 24-hour news cycle? Join Hump Lump for an unpredictable journey through 6 (maybe 7!) real-life stories covering today's biggest politics and pop culture moments. From toxic "Alpha" podcasts to AI-generated political meltdowns, we serve up a non-linear explosion of live costume changes and visceral physical comedy.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <section className="bg-white border-4 sm:border-8 border-lump-black p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_rgba(0,0,0,1)]">
              <h2 className="font-heading text-6xl sm:text-8xl text-lump-pink mb-6 uppercase transition-transform hover:-skew-x-12 inline-block">Mission</h2>
              <p className="font-comic text-2xl sm:text-4xl leading-tight">
                Hump Lump is a provocative theatre collective dedicated to dismantling the numbness of modern existence. By fusing the disruptive energy of personal clowning with "Rough Theatre" aesthetics, we confront the absurdities of contemporary politics and digital culture. We create a confrontational "playground" where the fourth wall is non-existent, inviting audiences to engage with uncomfortable truths through the liberating lens of satire.
              </p>
            </section>

            {/* Creative Approach */}
            <section className="bg-white p-6 sm:p-12 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(55,185,255,1)]">
              <h2 className="font-heading text-5xl sm:text-7xl text-lump-blue mb-8 uppercase text-center sm:text-left">Our Creative Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      A <span className="bg-lump-yellow px-2 font-bold rotate-1 inline-block">"Play within a play frame"</span> where four personal clowns enter a designated "playground" to act out real world characters.
                    </p>
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      Exploring different styles of theatre through the lens of Satire, making commentary on each scene's story using <span className="bg-lump-blue text-white px-2">Rough Theatre</span> techniques.
                    </p>
                  </div>
                <div className="bg-lump-black p-4 sm:p-8 text-white rounded-3xl transform rotate-1">
                  <h4 className="font-heading text-3xl sm:text-4xl mb-6 uppercase text-lump-pink underline">Key Tools</h4>
                  <ul className="font-comic text-xl sm:text-3xl space-y-4">
                    <li>🎭 Verbatim Theatre</li>
                    <li>🎈 Puppetry</li>
                    <li>🌀 Absurdism</li>
                    <li>🎵 Musicality</li>
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
              <h2 className="font-heading text-5xl sm:text-7xl text-lump-orange mb-8 uppercase italic border-b-4 border-lump-black pb-4">Project Synopsis</h2>
              <div className="font-comic text-xl sm:text-3xl leading-relaxed space-y-6">
                <p>
                  <span className="font-bold underline decoration-lump-pink">6, Maybe 7 Skits</span> is a work of political and social satire structured as a series of rapid-fire, non-linear sketches. The production specifically utilizes <span className="italic font-bold text-lump-blue underline decoration-lump-black">"Rough Theatre"</span> techniques—keeping the mechanics of the performance entirely visible.
                </p>
                <p>
                  We reject traditional theatrical artifice; there are no complex lighting cues or sound systems. Instead, the performance relies on the presence of the actors, acoustic sound, and the visceral reality of on-stage costume changes. This transparency ensures that the spectators are never passive observers but active participants in the shared physical reality of the "playground."
                </p>
              </div>
            </section>

            {/* Key Content Pillars */}
            <section className="space-y-8">
              <h2 className="font-heading text-5xl sm:text-7xl text-lump-pink uppercase text-center md:text-left">Key Content Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-lump-blue uppercase">Hyper-Realistic Satire</h3>
                  <p className="font-comic text-lg">In sequences like the "Chad Speaks" podcast, we abandon traditional theatricality for grounded realism. The satire becomes an uncomfortable reflection of reality.</p>
                </div>
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-lump-orange uppercase">Physical Absurdism</h3>
                  <p className="font-comic text-lg">Using heightened movement, we explore the "Sigma Male" phenomenon as a form of physical home invasion, turning digital pressures into tangible threat.</p>
                </div>
                <div className="bg-white p-8 border-4 border-lump-black rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-2 transition-transform">
                  <h3 className="font-heading text-3xl mb-4 text-pink-500 uppercase">Verbatim & AI Critique</h3>
                  <p className="font-comic text-lg">The production utilizes verbatim scripts and AI-generated text to highlight the fragility of modern leadership, transforming political addresses into physical emergencies.</p>
                </div>
              </div>
            </section>

            {/* Genre & Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
              <div className="bg-lump-yellow p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl rotate-2">
                <h3 className="font-heading text-4xl sm:text-5xl text-lump-black mb-4 uppercase italic">Genre</h3>
                <p className="font-comic text-xl sm:text-2xl">Political & Social Satire</p>
              </div>
              <div className="bg-lump-blue p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl -rotate-2 text-white">
                <h3 className="font-heading text-4xl sm:text-5xl mb-4 uppercase italic">Style</h3>
                <ul className="font-comic text-lg sm:text-2xl list-disc list-inside">
                  <li>Personal Clowning (Devised)</li>
                  <li>Rough Theatre (Visible mechanics)</li>
                  <li>Direct Audience Participation</li>
                </ul>
              </div>
              <div className="bg-lump-orange p-6 sm:p-10 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-2xl rotate-1">
                <h3 className="font-heading text-4xl sm:text-5xl text-lump-black mb-4 uppercase italic">Form</h3>
                <p className="font-comic text-xl sm:text-2xl">Non-linear sketch structure capturing 6 (maybe 7!) real-life stories covering today's biggest politics and pop culture moments.</p>
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
              <h2 className="font-heading text-6xl sm:text-8xl uppercase text-stroke-2 text-lump-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center sm:text-left w-full sm:w-auto">GALLERY</h2>
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
