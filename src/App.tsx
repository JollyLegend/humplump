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
  { url: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/refs/heads/main/Poster/Hump%20Lump%20Poster.jpg", caption: "The 6 or 7 Skits Poster" },
  { url: "https://picsum.photos/seed/drama1/800/1000", caption: "Scene 1: The Alpha" },
  { url: "https://picsum.photos/seed/drama2/800/1000", caption: "Scene 2: The Mirror" },
  { url: "https://picsum.photos/seed/drama3/800/1000", caption: "Rehearsal Chaos" },
  { url: "https://picsum.photos/seed/drama4/800/1000", caption: "Backstage" },
];

// Easily add YouTube links here
const CLIPS = [
  { id: "dQw4w9WgXcQ", title: "Teaser: The Alpha Podcast", desc: "A verbatim look at modern discourse." },
  { id: "jNQXAC9IVRw", title: "The Musical Surprise", desc: "Don't say we didn't warn you." },
];

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
  const [currentView, setCurrentView] = useState('home'); // 'home', 'gallery', 'clips'

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
      className="flex items-center gap-0 font-logo text-3xl md:text-5xl lg:text-6xl cursor-pointer select-none group"
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
        
        <div className="flex gap-4 sm:gap-6 items-center font-comic text-xl sm:text-3xl uppercase tracking-wider">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`hover:text-lump-pink transition-all flex items-center gap-2 ${currentView === 'home' ? 'text-lump-pink underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden md:inline">Home</span>
          </button>
          <button 
            onClick={() => setCurrentView('gallery')} 
            className={`hover:text-lump-blue transition-all flex items-center gap-2 ${currentView === 'gallery' ? 'text-lump-blue underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden md:inline">Gallery</span>
          </button>
          <button 
            onClick={() => setCurrentView('clips')} 
            className={`hover:text-lump-orange transition-all flex items-center gap-2 ${currentView === 'clips' ? 'text-lump-orange underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden md:inline">Clips</span>
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
                    <div className="flex items-center gap-0 font-logo text-[12vw] xs:text-[10vw] sm:text-[8rem] md:text-[7rem] lg:text-[10rem] leading-none mb-4 select-none drop-shadow-[0_6px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_12px_0_rgba(0,0,0,1)]">
                      <span className="text-lump-pink text-stroke-2 sm:text-stroke-4 -rotate-3 transition-transform hover:rotate-0">Hump</span>
                      <span className="text-lump-blue text-stroke-2 sm:text-stroke-4 rotate-3 transition-transform hover:rotate-0">Lump</span>
                    </div>

                    {/* - Presents - */}
                    <div className="flex items-center gap-4 sm:gap-8 mb-4 landscape:mb-2 text-center">
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-pink rounded-full hidden xs:block" />
                      <span className="font-comic text-2xl md:text-4xl lg:text-6xl uppercase text-lump-black font-bold tracking-widest leading-none">Presents</span>
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-blue rounded-full hidden xs:block" />
                    </div>

                    {/* 6 or 7 skits in Black Bubbly */}
                    <motion.div 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="font-heading text-[12vw] xs:text-[10vw] sm:text-[10rem] md:text-[8rem] lg:text-[12rem] leading-none text-lump-black drop-shadow-[0_4px_0_rgba(255,255,255,0.5)] sm:drop-shadow-[0_10px_0_rgba(255,255,255,0.5)] select-none italic text-center w-full"
                    >
                      6 <span className="text-[8vw] xs:text-[6vw] sm:text-[7rem] md:text-[5rem] lg:text-[8rem] lowercase font-comic -mx-2 sm:-mx-8">or</span> 7 skits
                    </motion.div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  <motion.div className="bg-white p-6 sm:p-8 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[16px_16px_0_rgba(0,0,0,1)] rotate-0 sm:rotate-2">
                    <h2 className="font-heading text-5xl sm:text-8xl leading-none uppercase mb-4 sm:mb-6 drop-shadow-[0_2px_0_rgba(255,75,179,1)] sm:drop-shadow-[0_4px_0_rgba(255,75,179,1)]">
                      THE <br /> MIRROR
                    </h2>
                    <p className="font-comic text-xl sm:text-4xl leading-tight">
                      We don't create characters. We just hold the camera. We don't write scripts. We just record the air. 
                      Verbatim theatre meets the red nose. A mirror to the podcasts, the platforms, and the politicians. 
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {[
                      { icon: Tv, label: "PLATFORMS", color: "bg-lump-pink" },
                      { icon: Mic2, label: "PODCASTS", color: "bg-lump-yellow" },
                      { icon: AlertCircle, label: "ALPHAS", color: "bg-lump-orange" },
                      { icon: Music, label: "MUSICALS", color: "bg-white" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 4 : -4 }}
                        className={`p-4 sm:p-8 border-4 sm:border-8 border-lump-black flex flex-col items-center justify-center gap-2 sm:gap-4 ${item.color} shadow-[4px_4px_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_rgba(0,0,0,1)] group cursor-pointer h-32 sm:h-52`}
                      >
                        <item.icon className="w-10 h-10 sm:w-16 sm:h-16 stroke-[3px] sm:stroke-[4px]" />
                        <span className="font-heading text-lg sm:text-2xl uppercase tracking-wider sm:tracking-widest text-center">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
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

        {currentView === 'clips' && (
          <motion.main
            key="clips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-40 pb-24 px-6 container mx-auto"
          >
             <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 sm:mb-16 gap-4">
              <h2 className="font-heading text-6xl sm:text-8xl uppercase text-stroke-2 text-lump-orange drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center sm:text-left w-full sm:w-auto">CLIPS</h2>
              <p className="font-comic text-xl sm:text-2xl max-w-sm italic opacity-70 text-center sm:text-left w-full sm:w-auto">The 6 (or 7) highlights.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {CLIPS.map((clip, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-4 sm:border-8 border-lump-black p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[12px_12px_0_rgba(0,0,0,1)]"
                >
                  <div className="aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-lump-black mb-4 sm:mb-6">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${clip.id}`}
                      title={clip.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-2 sm:px-4 pb-2 sm:pb-4">
                    <h3 className="font-heading text-3xl sm:text-4xl mb-1 sm:mb-2 text-lump-pink">{clip.title}</h3>
                    <p className="font-comic text-xl sm:text-2xl opacity-80">{clip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* View Switcher Overlay for Mobile ease */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 sm:hidden">
         <button 
           onClick={() => { setCurrentView('gallery'); window.scrollTo(0, 0); }} 
           className={`bg-lump-blue text-white border-2 border-lump-black p-3 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1 ${currentView === 'gallery' ? 'ring-4 ring-white' : ''}`}
         >
            <ImageIcon className="w-6 h-6" />
         </button>
         <button 
           onClick={() => { setCurrentView('home'); window.scrollTo(0, 0); }} 
           className={`bg-lump-pink text-white border-2 border-lump-black p-3 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1 ${currentView === 'home' ? 'ring-4 ring-white' : ''}`}
         >
            <HomeIcon className="w-6 h-6" />
         </button>
         <button 
           onClick={() => { setCurrentView('clips'); window.scrollTo(0, 0); }} 
           className={`bg-lump-orange text-white border-2 border-lump-black p-3 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1 ${currentView === 'clips' ? 'ring-4 ring-white' : ''}`}
         >
            <Play className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
}
