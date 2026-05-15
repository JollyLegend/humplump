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
  Mic2,
  Download
} from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
  "\"Sigma grindset: 4 clowns, 1 van, zero budget.\"",
  "\"Looksmaxxing our prop budget by using actual garbage.\"",
  "\"Maintaining a 60-minute mewing streak live on stage.\"",
  "\"We haven't blinked in 45 minutes to maintain hunter eyes.\"",
  "\"A High-Value theatrical experience for low-value attention spans.\"",
  "\"Escaping the Matrix, but getting stuck in the costume rack.\"",
  "\"Mogging the fourth wall.\"",
  "\"Beta-orbiting the concept of a narrative structure.\"",
  "\"Our canthal tilt is negative, but the vibes are immaculate.\"",
  "\"Bone-smashing our way into the Fringe festival.\"",
  "\"We only consume raw meat, tap water, and existential dread.\"",
  "\"Red-pilling the audience with 6 (maybe 7) clown skits.\"",
  "\"Top G theatre for bottom-tier budgets.\"",
  "\"Practicing our jawline clenches in the dressing room.\"",
  "\"You’re an alpha? Cool. We’re four grown men wearing fake noses.\""
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

  const downloadProposalPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const container = document.getElementById("pdf-export-container");
    if (!container) return;

    // Temporarily show container for capture
    container.style.display = "block";
    const pages = container.querySelectorAll(".pdf-page");
    
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    container.style.display = "none";
    pdf.save("Hump_Lump_Full_Pitch.pdf");
  };

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
            className="pt-32 sm:pt-40 pb-24 px-6 container mx-auto space-y-16 sm:space-y-32"
          >
            {/* Strap-line Hero Banner */}
            <section className="relative group">
              <div className="absolute -inset-2 bg-lump-pink rounded-[2.5rem] rotate-1 group-hover:rotate-0 transition-transform blur-sm opacity-30" />
              <div className="relative bg-lump-black border-4 sm:border-8 border-lump-pink p-8 sm:p-16 rounded-[2.5rem] shadow-[15px_15px_0_rgba(255,75,179,1)] -rotate-1 group-hover:rotate-0 transition-transform">
                <p className="font-comic text-3xl sm:text-6xl italic text-white text-center leading-tight tracking-tight">
                  "Six, maybe seven, clown-fed collisions with the absurdity of the modern world."
                </p>
              </div>
            </section>

            {/* Core Identity Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-12">
                {/* Mission Statement */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border-4 sm:border-8 border-lump-black p-8 sm:p-12 rounded-[2.5rem] shadow-[10px_10px_0_rgba(0,0,0,1)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lump-pink/10 rounded-full -mr-16 -mt-16" />
                  <h3 className="font-heading text-4xl sm:text-6xl mb-6 uppercase text-lump-black font-black tracking-tighter">Mission</h3>
                  <p className="font-comic text-xl sm:text-3xl leading-relaxed text-lump-black">
                    Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture. Through clowning, satire, rough theatre and direct audience engagement, we aim to break through modern numbness and invite audiences to <span className="bg-lump-yellow px-2 font-bold rotate-1 inline-block">laugh, question and think again</span>.
                  </p>
                </motion.div>

                {/* Marketing Blurb */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-lump-blue text-white border-4 sm:border-8 border-lump-black p-8 sm:p-12 rounded-[2.5rem] shadow-[10px_10px_0_rgba(0,0,0,1)] rotate-1"
                >
                  <h3 className="font-heading text-4xl sm:text-6xl mb-6 uppercase font-black tracking-tighter">Marketing Blurb</h3>
                  <p className="font-comic text-xl sm:text-2xl leading-relaxed">
                    Feeling numb to the chaos of the world? 6 or 7 Skits throws politics, pop culture and modern masculinity into a clown-filled playground of satire. Through verbatim, puppetry, absurdism, music and audience interaction, Hump Lump turns real events into ridiculous, uncomfortable and strangely recognisable theatre.
                  </p>
                </motion.div>
              </div>

              {/* Project Synopsis (Tall Sidebar) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="lg:col-span-5 bg-white border-4 sm:border-8 border-lump-black p-8 sm:p-12 rounded-[2.5rem] shadow-[12px_12px_0_rgba(255,140,0,1)] -rotate-1 flex flex-col justify-center"
              >
                <div className="mb-6 inline-block bg-lump-orange text-white font-heading px-4 py-1 text-xl uppercase italic">The Project</div>
                <h3 className="font-heading text-4xl sm:text-6xl mb-8 uppercase text-lump-orange font-black tracking-tighter leading-none">Project Synopsis</h3>
                <div className="font-comic text-lg sm:text-xl leading-relaxed space-y-6">
                  <p>
                    <span className="font-bold underline decoration-lump-pink text-lump-black">6 or 7 Skits</span> is a political and social satire created by Hump Lump, a devised theatre company exploring how world events can be reimagined through clowning, rough theatre and absurd performance.
                  </p>
                  <p>
                    The piece is structured as a non-linear sketch show made up of six, maybe seven, short skits. Each skit responds to a real-life political, social or pop-cultural event, using satire to expose the ridiculousness, contradictions and discomfort already present in the world around us.
                  </p>
                  <p>
                    The performance is framed as a <span className="bg-lump-pink px-2 text-white font-bold inline-block -rotate-1">“play within a play,”</span> where literal clowns enter a theatrical playground to act out real-world figures, public narratives and media events.
                  </p>
                  <p>
                    Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make familiar events feel strange again. This allows the audience to encounter subjects they may already feel desensitised to, but from a new and uncomfortable angle.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Key Content Pillars Section */}
            <section className="space-y-12">
              <div className="text-center">
                <h2 className="font-heading font-black text-6xl sm:text-9xl text-lump-pink uppercase drop-shadow-[6px_6px_0_rgba(0,0,0,1)] inline-block -rotate-2">Themes & Style</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-lump-orange p-8 sm:p-10 border-4 sm:border-8 border-lump-black rounded-[2rem] shadow-[10px_10px_0_rgba(0,0,0,1)] -rotate-1"
                >
                  <h3 className="font-heading text-4xl mb-6 uppercase font-black">Style & Form</h3>
                  <p className="font-comic text-xl leading-snug">
                    The company’s style combines clowning, rough theatre, verbatim material, puppetry, absurdism, repetition and musicality. Traditional clown archetypes such as the Whiteface, Auguste and Hobo/Tramp inform the company’s character work, while rough theatre shapes the live, exposed and deliberately imperfect quality of the performance. Costume changes happen in view, the fourth wall is broken, and the audience are treated as active witnesses rather than passive observers.
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-lump-blue text-white p-8 sm:p-10 border-4 sm:border-8 border-lump-black rounded-[2rem] shadow-[10px_10px_0_rgba(0,0,0,1)] rotate-1"
                >
                  <h3 className="font-heading text-4xl mb-6 uppercase font-black">Masculinity</h3>
                  <p className="font-comic text-xl leading-snug">
                    Thematically, the work is connected through masculinity. As four male performers, the company uses satire to question the performance of male power, authority, ego, control and fragility across political and cultural spaces. The piece does not aim to provide neat answers. Instead, it creates a space where laughter becomes a way into discomfort, and where the absurdity of real events can be made visible again.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Creative Approach */}
            <section className="bg-white p-6 sm:p-12 border-4 sm:border-8 border-lump-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(255,75,179,1)] -rotate-1">
              <h2 className="font-heading text-5xl sm:text-7xl text-lump-pink mb-8 uppercase text-center sm:text-left">Ultimate Goal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      Ultimately, <span className="underline decoration-lump-blue decoration-4 italic">6 or 7 Skits</span> aims to break through numbness.
                    </p>
                    <p className="font-comic text-xl sm:text-3xl leading-relaxed">
                      In a world where contradiction, spectacle and irresponsibility can quickly become normalised, Hump Lump uses clowning and satire to remind audiences that the outrageous should still feel outrageous.
                    </p>
                  </div>
                <div className="bg-lump-black p-4 sm:p-8 text-white rounded-3xl transform rotate-1">
                  <h4 className="font-heading text-3xl sm:text-4xl mb-6 uppercase text-lump-blue underline font-black">Our Toolkit</h4>
                  <ul className="font-comic text-xl sm:text-2xl space-y-3">
                    <li className="flex items-center gap-3">🎭 Clowning & Satire</li>
                    <li className="flex items-center gap-3">🎈 Rough Theatre</li>
                    <li className="flex items-center gap-3">🌀 Verbatim Material</li>
                    <li className="flex items-center gap-3">🎵 Puppetry & Absurdism</li>
                    <li className="flex items-center gap-3">🥁 Repetition & Musicality</li>
                    <li className="flex items-center gap-3">🪑 Modular Minimalist Set</li>
                  </ul>
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

            {/* Technical Specification - Screenshot Inspired */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 py-12">
              {/* Essentials Box */}
              <div className="bg-lump-pink p-8 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[3rem] shadow-[0_15px_0_rgba(0,0,0,1)]">
                <h3 className="font-heading text-4xl sm:text-5xl mb-8 uppercase text-white font-black">Essentials</h3>
                <ul className="font-comic text-lg sm:text-2xl space-y-6 text-white font-bold">
                  <li className="flex items-center gap-3">⏱️ <span><strong>Duration:</strong> 45 minutes</span></li>
                  <li className="flex items-center gap-3">⚡ <span><strong>Set-Up/Strike:</strong> 20 mins each</span></li>
                  <li className="flex items-center gap-3">🎭 <span><strong>Company:</strong> 4 Performers</span></li>
                  <li className="flex items-center gap-3">💰 <span><strong>Fees:</strong> Contact clowns@humplump.com</span></li>
                </ul>
              </div>

              {/* Logistics Box */}
              <div className="bg-white p-8 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[3rem] shadow-[0_15px_0_rgba(0,0,0,1)] -rotate-1">
                <h3 className="font-heading text-4xl sm:text-5xl mb-8 uppercase text-lump-blue font-black underline decoration-lump-pink">Logistics</h3>
                <ul className="font-comic text-lg sm:text-2xl space-y-6 text-lump-black font-bold">
                  <li className="flex items-center gap-3">♿ <span><strong>Access needs:</strong> None</span></li>
                  <li className="flex items-center gap-3">🚐 <span><strong>Parking:</strong> Space for one van</span></li>
                  <li className="flex items-center gap-3">📐 <span><strong>Space:</strong> 8m x 8m x 4m</span></li>
                </ul>
              </div>

              {/* Tech Box */}
              <div className="bg-[#e74e00] p-8 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[3rem] shadow-[0_15px_0_rgba(0,0,0,1)] rotate-1">
                <h3 className="font-heading text-4xl sm:text-5xl text-white mb-8 uppercase font-black italic">Tech</h3>
                <ul className="font-comic text-lg sm:text-xl space-y-4 text-white font-bold">
                  <li className="flex items-start gap-3">
                    📢 <span><strong>No mics/PA:</strong> Acoustic & live vocal performance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    💡 <span><strong>House lights:</strong> Performs under found/stable light.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    📦 <span><strong>Modular Set:</strong> Fully self-sufficient props & racks.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-20 pt-16 border-t-8 border-lump-black">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
                <h2 className="font-heading font-black text-5xl sm:text-7xl uppercase text-lump-pink drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                  RISK ASSESSMENT
                </h2>
                <div className="bg-lump-black text-white font-comic px-6 py-3 rounded-xl -rotate-1 text-sm sm:text-base border-2 border-lump-pink shadow-[4px_4px_0_rgba(255,75,179,1)]">
                  Key: L = Likelihood, S = Severity, RS = Risk Score (L×S)
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    id: "R1",
                    title: "THE LIFT (SIGMA SKIT)",
                    hazard: "Ishaan Jolly lifting Calvin Norris aggressively prior to the injection sequence.",
                    persons: "Ishaan & Calvin (Back strains, hernia, impact injuries if dropped)",
                    initial: { l: 4, s: 3, rs: 12 },
                    controls: [
                      "Walked through and rehearsed at half-speed before every performance.",
                      "Proper lifting form (bend at knees, keep back straight, lift with legs).",
                      "Tight core/body tension to assist the lift.",
                      "Barefoot performance for maximum balance and grip."
                    ],
                    target: { l: 1, s: 3, rs: 3 },
                    color: "bg-lump-pink"
                  },
                  {
                    id: "R2",
                    title: "SLIP HAZARD (CEREAL)",
                    hazard: "Use of cereal to represent \"raw meat\" being crushed or dropped on floor.",
                    persons: "Cast (Slipping, pulled muscles, bruising during movement)",
                    initial: { l: 2, s: 4, rs: 8 },
                    controls: [
                      "Limit cereal to the bare minimum required for the gag.",
                      "Dropped in a contained, downstage area away from main running paths.",
                      "Immediate sweep during strike or scene transition."
                    ],
                    target: { l: 1, s: 4, rs: 4 },
                    color: "bg-lump-blue"
                  },
                  {
                    id: "R3",
                    title: "LIVE COSTUME CHANGES",
                    hazard: "Tripping over clothing, racks, or crates in the unlit \"playground\".",
                    persons: "Cast (Tripping, blisters, abrasions, sprained ankles)",
                    initial: { l: 3, s: 3, rs: 9 },
                    controls: [
                      "Rehearsed \"safe zones\" for all discarded costumes.",
                      "Clothing racks with locked wheels to prevent rolling/tipping.",
                      "Prop crates clearly labeled and placed at the perimeter."
                    ],
                    target: { l: 2, s: 2, rs: 4 },
                    color: "bg-[#e74e00]"
                  },
                  {
                    id: "R4",
                    title: "HIGH-IMPACT COMEDY",
                    hazard: "Impact injuries from \"Trump glitch\" drops or aggressive podcast collisions.",
                    persons: "Cast (Head bumps, joint injuries, heavy bruising)",
                    initial: { l: 3, s: 3, rs: 9 },
                    controls: [
                      "Strictly blocked falls with safe landing techniques (absorbing impact).",
                      "Environmental awareness and eye-contact cues before lunges.",
                      "Slow rehearsals to prepare for slips or accidental contact."
                    ],
                    target: { l: 1, s: 3, rs: 3 },
                    color: "bg-lump-green"
                  },
                  {
                    id: "R5",
                    title: "MANUAL HANDLING",
                    hazard: "Lifting/moving heavy boxes or seating blocks during the rapid set-up and strike.",
                    persons: "Cast (Pulled or strained muscles, back injuries, or dropping items on toes)",
                    initial: { l: 2, s: 3, rs: 6 },
                    controls: [
                      "All actors utilize safe manual handling/lifting techniques (Toolbox talk prior to get-in).",
                      "Heavy crates/blocks must be team-lifted if necessary."
                    ],
                    target: { l: 1, s: 2, rs: 2 },
                    color: "bg-lump-yellow"
                  }
                ].map((risk) => (
                  <div key={risk.id} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-lump-black rounded-2xl overflow-hidden shadow-[6px_6px_0_rgba(0,0,0,1)] bg-white">
                    <div className={`${risk.color} lg:col-span-1 flex items-center justify-center p-4 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black`}>
                      <span className="font-heading text-4xl text-white">{risk.id}</span>
                    </div>
                    <div className="lg:col-span-3 p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black">
                      <h4 className="font-heading text-2xl mb-2 uppercase">{risk.title}</h4>
                      <p className="font-comic text-lg opacity-80">{risk.hazard}</p>
                    </div>
                    <div className="lg:col-span-2 p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black bg-gray-50">
                      <h4 className="font-heading text-xs uppercase opacity-50 mb-2">Affected</h4>
                      <p className="font-comic text-lg">{risk.persons}</p>
                    </div>
                    <div className="lg:col-span-4 p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black">
                      <h4 className="font-heading text-xs uppercase opacity-50 mb-2">Control Measures</h4>
                      <ul className="font-comic text-lg list-disc list-inside space-y-1">
                        {risk.controls.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                    <div className="lg:col-span-2 p-6 flex flex-row lg:flex-col justify-around lg:justify-center items-center gap-6 bg-gray-100">
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-heading uppercase opacity-50 mb-3">Initial</div>
                        <div className="flex items-center gap-3 font-heading text-xl sm:text-2xl text-red-600">
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[10px]">L</span>
                            <span>{risk.initial.l}</span>
                          </div>
                          <span className="opacity-30">×</span>
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[10px]">S</span>
                            <span>{risk.initial.s}</span>
                          </div>
                          <span className="opacity-30">=</span>
                          <div className="flex flex-col">
                            <span className="font-black text-[10px]">RS</span>
                            <span className="font-black text-3xl sm:text-4xl">{risk.initial.rs}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-px h-12 lg:w-16 lg:h-px bg-lump-black opacity-20"></div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-heading uppercase opacity-50 mb-3">Target</div>
                        <div className="flex items-center gap-3 font-heading text-xl sm:text-2xl text-green-600">
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[10px]">L</span>
                            <span>{risk.target.l}</span>
                          </div>
                          <span className="opacity-30">×</span>
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[10px]">S</span>
                            <span>{risk.target.s}</span>
                          </div>
                          <span className="opacity-30">=</span>
                          <div className="flex flex-col">
                            <span className="font-black text-[10px]">RS</span>
                            <span className="font-black text-3xl sm:text-4xl">{risk.target.rs}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PDF Download Section */}
            <section className="flex justify-center pt-16">
              <button 
                onClick={downloadProposalPDF}
                className="bg-[#614bff] text-white font-heading text-3xl sm:text-5xl px-12 py-6 border-4 sm:border-8 border-lump-black shadow-[10px_10px_0_rgba(0,0,0,1)] rounded-full hover:scale-110 active:scale-95 transition-all flex items-center gap-4 group"
              >
                <Download className="w-10 h-10 group-hover:bounce transition-transform" />
                <span>Download Full Pitch PDF</span>
              </button>
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

      {/* Hidden PDF Export Structure */}
      <div id="pdf-export-container" border-0 className="hidden" style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        {/* Page 1: Mission & Synopsis */}
        <div className="pdf-page bg-white w-[210mm] h-[297mm] p-16 font-sans text-black overflow-hidden flex flex-col">
          <div className="flex justify-between items-end border-b-8 border-black pb-4 mb-8">
            <h1 className="text-6xl font-black"><span className="text-lump-pink">Hump</span><span className="text-lump-blue underline decoration-lump-pink">Lump</span></h1>
            <div className="text-right">
              <div className="text-lump-pink font-bold text-xl uppercase tracking-widest">Pitch & Proposal</div>
              <div className="text-6xl font-black uppercase">6 OR 7 SKITS</div>
            </div>
          </div>

          <div className="bg-black text-white p-8 rounded-3xl mb-12 text-center text-3xl italic font-serif">
            "Six, maybe seven, clown-fed collisions with the absurdity of the modern world."
          </div>

          <div className="grid grid-cols-2 gap-12 flex-1">
            <div className="space-y-8">
              <div className="border-4 border-black p-8 rounded-3xl">
                <h3 className="text-3xl font-black uppercase mb-4">Mission Statement</h3>
                <p className="text-xl leading-relaxed">
                  Hump Lump creates bold, playful and politically aware theatre that confronts the absurdity of contemporary politics, society and pop culture. Through clowning, satire, rough theatre and direct audience engagement, we aim to break through modern numbness and invite audiences to laugh, question and think again.
                </p>
              </div>
              <div className="border-4 border-black p-4 rounded-3xl overflow-hidden">
                <img src={GALLERY_IMAGES[0].url} alt="The Cheer" className="w-full aspect-video object-cover rounded-xl border-2 border-black" />
                <p className="text-center italic mt-2 text-lg">The Cheer</p>
              </div>
            </div>

            <div className="border-4 border-black p-8 rounded-3xl">
              <h3 className="text-3xl font-black uppercase mb-4 text-[#ff8c00]">Project Synopsis</h3>
              <div className="text-lg space-y-4 leading-relaxed italic font-serif">
                <p><strong>6 or 7 Skits</strong> is a political and social satire created by Hump Lump, a devised theatre company exploring how world events can be reimagined through clowning, rough theatre and absurd performance.</p>
                <p>The piece is structured as a non-linear sketch show made up of six, maybe seven, short skits. Each skit responds to a real-life political, social or pop-cultural event, using satire to expose the ridiculousness, contradictions and discomfort already present in the world around us.</p>
                <p>The performance is framed as a “play within a play,” where literal clowns enter a theatrical playground to act out real-world figures, public narratives and media events. Rather than presenting these stories through realism, Hump Lump uses exaggeration, disruption and play to make familiar events feel strange again.</p>
                <p>This allows the audience to encounter subjects they may already feel desensitised to, but from a new and uncomfortable angle.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Marketing & Themes */}
        <div className="pdf-page bg-white w-[210mm] h-[297mm] p-16 font-sans text-black overflow-hidden flex flex-col">
          <div className="grid grid-cols-2 gap-12 mb-12">
            <div className="border-4 border-black p-8 rounded-3xl">
              <h3 className="text-3xl font-black uppercase mb-4 text-lump-blue font-sans">Marketing Blurb</h3>
              <p className="text-xl leading-relaxed italic font-serif">
                Feeling numb to the chaos of the world? 6 or 7 Skits throws politics, pop culture and modern masculinity into a clown-filled playground of satire. Through verbatim, puppetry, absurdism, music and audience interaction, Hump Lump turns real events into ridiculous, uncomfortable and strangely recognisable theatre.
              </p>
            </div>
            <div className="border-4 border-black p-4 rounded-3xl flex flex-col justify-center">
              <img src={GALLERY_IMAGES[3].url} alt="The Alpha Podcast" className="w-full aspect-[4/3] object-cover rounded-xl border-2 border-black mb-2" />
              <p className="text-center italic text-lg">The Alpha Podcast</p>
            </div>
          </div>

          <div className="border-4 border-black p-10 rounded-3xl flex-1">
            <h3 className="text-4xl font-black uppercase mb-8 text-lump-pink underline decoration-black underline-offset-8">Style & Themes</h3>
            <div className="text-xl space-y-8 leading-relaxed italic font-serif">
              <p>The company’s style combines clowning, rough theatre, verbatim material, puppetry, absurdism, repetition and musicality. Traditional clown archetypes such as the Whiteface, Auguste and Hobo/Tramp inform the company’s character work, while rough theatre shapes the live, exposed and deliberately imperfect quality of the performance. Costume changes happen in view, the fourth wall is broken, and the audience are treated as active witnesses rather than passive observers.</p>
              <p>Thematically, the work is connected through masculinity. As four male performers, the company uses satire to question the performance of male power, authority, ego, control and fragility across political and cultural spaces. The piece does not aim to provide neat answers. Instead, it creates a space where laughter becomes a way into discomfort, and where the absurdity of real events can be made visible again.</p>
              <p className="font-bold">Ultimately, 6 or 7 Skits aims to break through numbness. In a world where contradiction, spectacle and irresponsibility can quickly become normalised, Hump Lump uses clowning and satire to remind audiences that the outrageous should still feel outrageous.</p>
            </div>
          </div>
        </div>

        {/* Page 3: Tech & Risk 1-2 */}
        <div className="pdf-page bg-white w-[210mm] h-[297mm] p-12 font-sans text-black flex flex-col">
          <h2 className="text-5xl font-black text-center mb-8 border-b-4 border-black pb-4">Key Technical Information</h2>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Show Duration", value: "45 Minutes" },
              { label: "Set Up / Strike", value: "20 Minutes Each" },
              { label: "Company Size", value: "4 Performers" },
              { label: "Host Fees", value: "clowns@humplump.com" },
              { label: "Space Required", value: "8m x 8m x 4m" },
              { label: "Parking Required", value: "1 Touring Van" },
            ].map((item, i) => (
              <div key={i} className="border-4 border-black p-4 rounded-xl">
                <div className="text-lump-pink font-bold uppercase text-sm mb-1">{item.label}</div>
                <div className="font-bold text-lg">{item.value}</div>
              </div>
            ))}
            <div className="border-4 border-black p-4 rounded-xl">
              <div className="text-lump-pink font-bold uppercase text-sm mb-1">Access Needs</div>
              <div className="font-bold text-lg">None</div>
            </div>
            <div className="border-4 border-black p-4 rounded-xl col-span-2">
              <div className="text-lump-pink font-bold uppercase text-sm mb-1">Tech Requirements</div>
              <div className="font-bold text-base">Fully Self-Sufficient. No mics, house lights, modular set.</div>
            </div>
          </div>

          <h2 className="text-4xl font-black text-center mb-6">Performance Risk Assessment</h2>
          
          <div className="bg-lump-black p-4 rounded-2xl mb-6 flex justify-between items-center text-white">
            <div className="font-bold uppercase">Risk Assessment Key</div>
            <div className="flex gap-4">
              <span className="bg-lump-pink px-2 py-1 rounded text-xs font-bold">HIGH (RS 11-25)</span>
              <span className="bg-lump-orange px-2 py-1 rounded text-xs font-bold">MEDIUM (RS 6-10)</span>
              <span className="bg-green-500 px-2 py-1 rounded text-xs font-bold">LOW (RS 1-5)</span>
            </div>
          </div>

          <div className="flex-1 border-4 border-black rounded-3xl overflow-hidden">
            <table className="w-full h-full border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase text-[10px]">
                  <th className="p-2 border-r border-white/20">Hazard</th>
                  <th className="p-2 border-r border-white/20">Persons</th>
                  <th className="p-2 border-r border-white/20">Initial RS</th>
                  <th className="p-2 border-r border-white/20">Controls</th>
                  <th className="p-2">Target RS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-black">
                  <td className="p-4 w-1/4 border-r-2 border-black font-bold text-sm text-lump-pink">R1: THE LIFT (SIGMA SKIT)</td>
                  <td className="p-4 w-1/6 border-r-2 border-black text-xs">Ishaan & Calvin (Strains, hernia, fractures)</td>
                  <td className="p-4 w-40 border-r-2 border-black">
                    <div className="bg-lump-pink p-2 text-white text-center rounded">
                      <div className="text-[8px] font-bold">RS: 12</div>
                      <div className="text-[8px] font-black uppercase">HIGH</div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs italic">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Walked through/rehearsed at half speed.</li>
                      <li>Uses proper lifting form (legs, back).</li>
                      <li>Tight core tension.</li>
                      <li>Barefoot footwear for balance.</li>
                    </ul>
                  </td>
                  <td className="p-4 w-40 text-center">
                    <div className="bg-green-500 p-2 text-white rounded">
                      <div className="text-[8px] font-bold">RS: 3</div>
                      <div className="text-[8px] font-black uppercase">LOW</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-r-2 border-black font-bold text-sm text-lump-blue">R2: SLIP HAZARD (CEREAL)</td>
                  <td className="p-4 border-r-2 border-black text-xs">Cast (Slipping, pulled muscles, bruising)</td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="bg-lump-orange p-2 text-white text-center rounded">
                      <div className="text-[8px] font-bold">RS: 8</div>
                      <div className="text-[8px] font-black uppercase">MED</div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs italic">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Limit cereal amount to bare minimum.</li>
                      <li>Crushed in contained area away from paths.</li>
                      <li>Immediate sweep during transitions.</li>
                    </ul>
                  </td>
                  <td className="p-4 text-center">
                    <div className="bg-green-500 p-2 text-white rounded">
                      <div className="text-[8px] font-bold">RS: 4</div>
                      <div className="text-[8px] font-black uppercase">LOW</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Page 4: Risk 3-5 */}
        <div className="pdf-page bg-white w-[210mm] h-[297mm] p-12 font-sans text-black flex flex-col">
          <div className="flex-1 border-4 border-black rounded-3xl overflow-hidden">
            <table className="w-full h-full border-collapse">
              <thead>
                <tr className="bg-black text-white uppercase text-[10px]">
                  <th className="p-2 border-r border-white/20">Hazard</th>
                  <th className="p-2 border-r border-white/20">Persons</th>
                  <th className="p-2 border-r border-white/20">Initial RS</th>
                  <th className="p-2 border-r border-white/20">Controls</th>
                  <th className="p-2">Target RS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-black">
                  <td className="p-4 w-1/4 border-r-2 border-black font-bold text-sm text-lump-orange">R3: LIVE CHANGES</td>
                  <td className="p-4 w-1/6 border-r-2 border-black text-xs">Cast (Tripping over clothing, sprains)</td>
                  <td className="p-4 w-40 border-r-2 border-black">
                    <div className="bg-lump-orange p-2 text-white text-center rounded">
                      <div className="text-[8px] font-bold">RS: 9</div>
                      <div className="text-[8px] font-black uppercase">MED</div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs italic">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Designated safe zones for clothing.</li>
                      <li>Clothing racks wheels locked.</li>
                      <li>Prop crates clearly labeled and secure.</li>
                    </ul>
                  </td>
                  <td className="p-4 w-40 text-center">
                    <div className="bg-green-500 p-2 text-white rounded">
                      <div className="text-[8px] font-bold">RS: 4</div>
                      <div className="text-[8px] font-black uppercase">LOW</div>
                    </div>
                  </td>
                </tr>
                <tr className="border-b-2 border-black">
                  <td className="p-4 border-r-2 border-black font-bold text-sm text-lump-green">R4: PHYSICAL COMEDY</td>
                  <td className="p-4 border-r-2 border-black text-xs">Cast (Head bumps, joint injuries, bruising)</td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="bg-lump-orange p-2 text-white text-center rounded">
                      <div className="text-[8px] font-bold">RS: 9</div>
                      <div className="text-[8px] font-black uppercase">MED</div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs italic">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Strictly blocked falls (impact reduction).</li>
                      <li>Spatial awareness and eye contact cues.</li>
                      <li>Slow rehearsals to prepare for slips.</li>
                    </ul>
                  </td>
                  <td className="p-4 text-center">
                    <div className="bg-green-500 p-2 text-white rounded">
                      <div className="text-[8px] font-bold">RS: 3</div>
                      <div className="text-[8px] font-black uppercase">LOW</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-r-2 border-black font-bold text-sm text-lump-yellow">R5: MANUAL HANDLING</td>
                  <td className="p-4 border-r-2 border-black text-xs">Cast (Back injuries, dropped items on toes)</td>
                  <td className="p-4 border-r-2 border-black">
                    <div className="bg-lump-orange p-2 text-white text-center rounded">
                      <div className="text-[8px] font-bold">RS: 6</div>
                      <div className="text-[8px] font-black uppercase">MED</div>
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-black text-xs italic">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Toolbox talk prior to get-in.</li>
                      <li>Utilize safe lifting techniques (knees).</li>
                      <li>Team-lifting for heavy blocks.</li>
                    </ul>
                  </td>
                  <td className="p-4 text-center">
                    <div className="bg-green-500 p-2 text-white rounded">
                      <div className="text-[8px] font-bold">RS: 2</div>
                      <div className="text-[8px] font-black uppercase">LOW</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center text-gray-400 text-xs italic">
            End of Pitch & Proposal document. For any inquiries, contact clowns@humplump.com
          </div>
        </div>
      </div>
    </div>
  );
}
