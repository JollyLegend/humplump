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

// Easily add gallery images here
const GALLERY_IMAGES = [
  { url: "/Images/Poster/Hump Lump Poster.png", caption: "The 6 or 7 Skits Poster" },
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
    image: "/Images/Crew/Ishaan.jpg" 
  },
  { 
    name: "Calvin", 
    color: "bg-lump-blue", 
    image: "/Images/Crew/Calvin.jpg" 
  },
  { 
    name: "Hayden", 
    color: "bg-lump-orange", 
    image: "/Images/Crew/Hayden.jpg" 
  },
  { 
    name: "Jonathan", 
    color: "bg-green-400", 
    image: "/Images/Crew/Jonathan.jpg" 
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
      className="flex items-center gap-0 font-logo text-4xl sm:text-6xl cursor-pointer select-none group"
    >
      <span className="text-lump-pink text-stroke-2 drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-rotate-3 group-hover:scale-110">Hump</span>
      <span className="text-lump-blue text-stroke-2 drop-shadow-[0_4px_0_rgba(0,0,0,1)] transition-transform group-hover:rotate-3 group-hover:scale-110">Lump</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-lump-yellow text-lump-black overflow-x-hidden selection:bg-lump-pink selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 flex justify-between items-center transition-all bg-lump-yellow/90 backdrop-blur-md border-b-8 border-lump-black">
        <Logo />
        
        <div className="flex gap-4 sm:gap-6 items-center font-comic text-xl sm:text-3xl uppercase tracking-wider">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`hover:text-lump-pink transition-all flex items-center gap-2 ${currentView === 'home' ? 'text-lump-pink underline underline-offset-8' : ''}`}
          >
            <HomeIcon className="w-5 h-5 hidden sm:block" /> Home
          </button>
          <button 
            onClick={() => setCurrentView('gallery')} 
            className={`hover:text-lump-blue transition-all flex items-center gap-2 ${currentView === 'gallery' ? 'text-lump-blue underline underline-offset-8' : ''}`}
          >
            <ImageIcon className="w-5 h-5 hidden sm:block" /> Gallery
          </button>
          <button 
            onClick={() => setCurrentView('clips')} 
            className={`hover:text-lump-orange transition-all flex items-center gap-2 ${currentView === 'clips' ? 'text-lump-orange underline underline-offset-8' : ''}`}
          >
            <Play className="w-5 h-5 hidden sm:block" /> Clips
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
            <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-12 px-6 overflow-hidden">
              <div className="absolute inset-0 sunburst-bg opacity-50 z-0 scale-150 animate-[spin_60s_linear_infinite]" />
              
              <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="text-center relative">
                  <Star className="absolute -top-32 -left-32 w-20 h-20 text-lump-pink fill-lump-pink animate-bounce hidden sm:block" />
                  <Sparkles className="absolute -bottom-12 -right-12 w-24 h-24 text-lump-blue animate-pulse hidden sm:block" />
                  
                  {/* New Bubbly Logo Style */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center mb-12"
                  >
                    {/* Hump Lump Bubbly */}
                    <div className="flex items-center gap-0 font-logo text-[12vw] sm:text-[10rem] leading-none mb-4 select-none drop-shadow-[0_12px_0_rgba(0,0,0,1)]">
                      <span className="text-lump-pink text-stroke-4 -rotate-3 transition-transform hover:rotate-0">Hump</span>
                      <span className="text-lump-blue text-stroke-4 rotate-3 transition-transform hover:rotate-0">Lump</span>
                    </div>

                    {/* - Presents - */}
                    <div className="flex items-center gap-4 sm:gap-8 mb-4">
                      <div className="h-2 w-12 sm:w-24 bg-lump-pink rounded-full" />
                      <span className="font-comic text-4xl sm:text-6xl uppercase text-lump-black font-bold tracking-widest">Presents</span>
                      <div className="h-2 w-12 sm:w-24 bg-lump-blue rounded-full" />
                    </div>

                    {/* 6 or 7 skits in Black Bubbly */}
                    <motion.div 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="font-heading text-[15vw] sm:text-[12rem] leading-none text-lump-black drop-shadow-[0_10px_0_rgba(255,255,255,0.5)] select-none italic"
                    >
                      6 <span className="text-[10vw] sm:text-[8rem] lowercase font-comic -mx-4 sm:-mx-8">or</span> 7 skits
                    </motion.div>
                  </motion.div>

                  <div className="max-w-2xl mx-auto space-y-4">
                    <p className="text-xl sm:text-4xl font-comic leading-tight bg-white border-8 border-lump-black p-6 rounded-[2rem] -rotate-1 shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
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
                          className="font-comic text-lump-pink text-3xl sm:text-5xl drop-shadow-[0_3px_0_rgba(0,0,0,1)]"
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
            <section className="bg-lump-blue py-24 border-y-8 border-lump-black relative overflow-hidden">
              <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <motion.div className="bg-white p-8 border-8 border-lump-black shadow-[16px_16px_0_rgba(0,0,0,1)] rotate-2">
                    <h2 className="font-heading text-6xl sm:text-8xl leading-none uppercase mb-6 drop-shadow-[0_4px_0_rgba(255,75,179,1)]">
                      THE <br /> MIRROR
                    </h2>
                    <p className="font-comic text-2xl sm:text-4xl leading-tight">
                      We don't create characters. We just hold the camera. We don't write scripts. We just record the air. 
                      Verbatim theatre meets the red nose. A mirror to the podcasts, the platforms, and the politicians. 
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: Tv, label: "PLATFORMS", color: "bg-lump-pink" },
                      { icon: Mic2, label: "PODCASTS", color: "bg-lump-yellow" },
                      { icon: AlertCircle, label: "ALPHAS", color: "bg-lump-orange" },
                      { icon: Music, label: "MUSICALS", color: "bg-white" },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 8 : -8 }}
                        className={`p-8 border-8 border-lump-black flex flex-col items-center justify-center gap-4 ${item.color} shadow-[8px_8px_0_rgba(0,0,0,1)] group cursor-pointer h-40 sm:h-52`}
                      >
                        <item.icon className="w-16 h-16 stroke-[4px]" />
                        <span className="font-heading text-2xl uppercase tracking-widest">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Crew Section */}
            <section id="about" className="py-24 sm:py-32 px-6 bg-white relative">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8 text-center md:text-left">
                  <h2 className="font-heading text-8xl sm:text-9xl leading-none uppercase drop-shadow-[0_6px_0_rgba(55,185,255,1)]">
                    THE <br /> CREW
                  </h2>
                  <div className="max-w-sm font-comic text-3xl rotate-2 bg-lump-yellow p-6 border-8 border-lump-black shadow-[12px_12px_0_rgba(0,0,0,1)] rounded-xl">
                    Four clowns. One mission. Zero chill. 
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
                  {TEAM.map((member, i) => (
                    <motion.div 
                      key={i}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className={`aspect-[3/4] ${member.color} overflow-hidden relative border-8 border-lump-black shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-none rounded-3xl`}>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="mt-8 text-center">
                        <h3 className="font-heading text-5xl uppercase tracking-tighter text-stroke-2 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
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
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-4">
              <h2 className="font-heading text-8xl uppercase text-stroke-2 text-lump-blue drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">GALLERY</h2>
              <p className="font-comic text-2xl max-w-sm italic opacity-70">Visual evidence of the absurdity.</p>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
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
                    className="w-full h-auto border-8 border-lump-black rounded-3xl transition-transform group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-lump-pink opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white border-4 border-lump-black p-2 font-comic text-sm opacity-0 group-hover:opacity-100 transition-opacity rotate-1">
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
             <div className="flex flex-col sm:flex-row justify-between items-baseline mb-16 gap-4">
              <h2 className="font-heading text-8xl uppercase text-stroke-2 text-lump-orange drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">CLIPS</h2>
              <p className="font-comic text-2xl max-w-sm italic opacity-70">The 6 (or 7) highlights.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {CLIPS.map((clip, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-8 border-lump-black p-4 rounded-[2.5rem] shadow-[12px_12px_0_rgba(0,0,0,1)]"
                >
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border-4 border-lump-black mb-6">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${clip.id}`}
                      title={clip.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="font-heading text-4xl mb-2 text-lump-pink">{clip.title}</h3>
                    <p className="font-comic text-2xl opacity-80">{clip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* View Switcher Overlay for Mobile ease */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-4 sm:hidden">
         <button onClick={() => { setCurrentView('gallery'); window.scrollTo(0, 0); }} className="bg-lump-blue text-white border-4 border-lump-black p-4 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1">
            <ImageIcon className="w-6 h-6" />
         </button>
         <button onClick={() => { setCurrentView('clips'); window.scrollTo(0, 0); }} className="bg-lump-orange text-white border-4 border-lump-black p-4 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none translate-y-0 active:translate-y-1">
            <Play className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
}
