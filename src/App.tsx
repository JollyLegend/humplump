/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  Download,
  Mail
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
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/420954d499707ed278b5855f878e251d6f62231f/Crew/Calvin.jpg" 
  },
  { 
    name: "Hayden", 
    color: "bg-lump-orange", 
    image: "https://raw.githubusercontent.com/JollyLegend/humplump-pictures/d0a49d1b74e8be88bfe74114b0e152f9161c724f/Crew/Hayden.jpg" 
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
  const [currentView, setCurrentView] = useState('home'); // 'home', 'pitch', 'gallery', 'contact'
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionData, setSubmissionData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSubmissionData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!submissionData.name.trim()) errors.name = "The clowns need to know who you are!";
    if (!submissionData.email.trim()) errors.email = "Where shall we send the absurdity back to?";
    else if (!/^\S+@\S+\.\S+$/.test(submissionData.email)) errors.email = "This email looks too normal. Try a real one.";
    if (!submissionData.subject.trim()) errors.subject = "Give your transmission a title!";
    if (!submissionData.message.trim()) errors.message = "Don't leave the void empty!";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('sending');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "a478655e-5cbe-47f2-a6e5-f3b96dab0c88",
          name: submissionData.name,
          email: submissionData.email,
          subject: submissionData.subject,
          message: submissionData.message,
          from_name: "HUMP LUMP WEB"
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Transmission failed');
      }

      setFormStatus('success');
      setSubmissionData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error("Submission error:", error);
      setFormErrors({ form: error.message || "The transmission was intercepted by cosmic interference. Please try again." });
      setFormStatus('idle');
    }
  };

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
    <div className="min-h-screen bg-lump-yellow text-lump-black overflow-x-hidden selection:bg-lump-pink selection:text-white font-sans break-words hyphens-auto">
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
          <button 
            onClick={() => setCurrentView('contact')} 
            className={`hover:text-lump-pink hover:scale-110 transition-all flex items-center gap-2 flex-shrink-0 ${currentView === 'contact' ? 'text-lump-pink underline underline-offset-4 sm:underline-offset-8' : ''}`}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" /> 
            <span className="hidden lg:inline">Contact</span>
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
                    <h1 className="flex items-center gap-0 font-heading font-black text-[15vw] xs:text-[12vw] sm:text-[8rem] md:text-[6rem] lg:text-[9rem] leading-none mb-4 select-none drop-shadow-[0_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
                      <span className="text-lump-pink -rotate-3 transition-transform hover:rotate-0 -mr-2 sm:-mr-4">HUMP</span>
                      <span className="text-lump-blue rotate-3 transition-transform hover:rotate-0">LUMP</span>
                    </h1>

                    {/* - Presents - */}
                    <div className="flex items-center gap-4 sm:gap-8 mb-4 landscape:mb-2 text-center">
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-pink rounded-full hidden xs:block" />
                      <span className="font-comic text-xl sm:text-2xl md:text-3xl lg:text-5xl uppercase text-lump-black font-bold tracking-widest leading-none">Presents</span>
                      <div className="h-1.5 sm:h-2 w-8 sm:w-24 bg-lump-blue rounded-full hidden xs:block" />
                    </div>

                    {/* 6 or 7 skits in Black Bubbly */}
                    <motion.h2 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="font-heading font-extrabold text-[15vw] xs:text-[12vw] sm:text-[9rem] md:text-[7rem] lg:text-[11rem] leading-none text-lump-black drop-shadow-[0_4px_0_rgba(255,255,255,0.5)] sm:drop-shadow-[0_10px_0_rgba(255,255,255,0.5)] select-none italic text-center w-full break-words"
                    >
                      6 <span className="text-[10vw] xs:text-[8vw] sm:text-[6rem] md:text-[4rem] lg:text-[7.5rem] lowercase font-comic font-medium -mx-2 sm:-mx-8">or</span> 7 Skits
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

            {/* Trailer Section */}
            <section className="px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-lump-black p-4 rounded-t-3xl border-x-4 border-t-4 border-lump-black flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="font-heading text-white text-lg uppercase tracking-widest italic">Hump Lump Cinema: The Trailer</span>
                </div>
                <div className="aspect-video w-full bg-black border-4 sm:border-8 border-lump-black shadow-[10px_10px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(0,0,0,1)] rounded-b-3xl overflow-hidden relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/pCeyPrb1ElQ" 
                    title="6 or 7 Skits Trailer" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
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
              <div className="bg-lump-pink p-6 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_10px_0_rgba(0,0,0,1)] sm:shadow-[0_15px_0_rgba(0,0,0,1)]">
                <h3 className="font-heading text-3xl sm:text-5xl mb-6 sm:mb-8 uppercase text-white font-black break-words">Essentials</h3>
                <ul className="font-comic text-base sm:text-2xl space-y-4 sm:space-y-6 text-white font-bold break-words">
                  <li className="flex items-start gap-2 sm:gap-3">⏱️ <span className="leading-tight"><strong>Duration:</strong> 45 minutes</span></li>
                  <li className="flex items-start gap-2 sm:gap-3">⚡ <span className="leading-tight"><strong>Set-Up/Strike:</strong> 20 mins each</span></li>
                  <li className="flex items-start gap-2 sm:gap-3">🎭 <span className="leading-tight"><strong>Company:</strong> 4 Performers</span></li>
                  <li className="flex items-start gap-2 sm:gap-3">💰 <span className="leading-tight"><strong>Fees:</strong> Contact clowns@humplump.com</span></li>
                </ul>
              </div>

              {/* Logistics Box */}
              <div className="bg-white p-6 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_10px_0_rgba(0,0,0,1)] sm:shadow-[0_15px_0_rgba(0,0,0,1)] -rotate-1">
                <h3 className="font-heading text-3xl sm:text-5xl mb-6 sm:mb-8 uppercase text-lump-blue font-black underline decoration-lump-pink break-words">Logistics</h3>
                <ul className="font-comic text-base sm:text-2xl space-y-4 sm:space-y-6 text-lump-black font-bold break-words">
                  <li className="flex items-start gap-2 sm:gap-3">♿ <span className="leading-tight"><strong>Access needs:</strong> None</span></li>
                  <li className="flex items-start gap-2 sm:gap-3">🚐 <span className="leading-tight"><strong>Parking:</strong> Space for one van</span></li>
                  <li className="flex items-start gap-2 sm:gap-3">📐 <span className="leading-tight"><strong>Space:</strong> 8m x 8m x 4m</span></li>
                </ul>
              </div>

              {/* Tech Box */}
              <div className="bg-[#e74e00] p-6 sm:p-10 border-[6px] sm:border-[10px] border-lump-black rounded-[2.5rem] sm:rounded-[3rem] shadow-[0_10px_0_rgba(0,0,0,1)] sm:shadow-[0_15px_0_rgba(0,0,0,1)] rotate-1">
                <h3 className="font-heading text-3xl sm:text-5xl text-white mb-6 sm:mb-8 uppercase font-black italic break-words">Tech</h3>
                <ul className="font-comic text-base sm:text-xl space-y-4 text-white font-bold break-words">
                  <li className="flex items-start gap-2 sm:gap-3">
                    📢 <span className="leading-tight"><strong>No mics/PA:</strong> Acoustic & live vocal performance.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    💡 <span className="leading-tight"><strong>House lights:</strong> Performs under found/stable light.</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    📦 <span className="leading-tight"><strong>Modular Set:</strong> Fully self-sufficient props & racks.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-20 pt-16 border-t-8 border-lump-black">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 px-4">
                <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl uppercase text-lump-pink drop-shadow-[4px_4px_0_rgba(0,0,0,1)] break-words text-center sm:text-left">
                  RISK ASSESSMENT
                </h2>
                <div className="bg-lump-black text-white font-comic px-4 py-2 sm:px-6 sm:py-3 rounded-xl -rotate-1 text-xs sm:text-base border-2 border-lump-pink shadow-[4px_4px_0_rgba(255,75,179,1)] text-center">
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
                    <div className={`${risk.color} lg:col-span-1 flex items-center justify-center p-3 sm:p-4 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black`}>
                      <span className="font-heading text-3xl sm:text-4xl text-white">{risk.id}</span>
                    </div>
                    <div className="lg:col-span-3 p-4 sm:p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black">
                      <h4 className="font-heading text-xl sm:text-2xl mb-2 uppercase break-words">{risk.title}</h4>
                      <p className="font-comic text-base sm:text-lg opacity-80 break-words">{risk.hazard}</p>
                    </div>
                    <div className="lg:col-span-2 p-4 sm:p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black bg-gray-50">
                      <h4 className="font-heading text-xs uppercase opacity-50 mb-2">Affected</h4>
                      <p className="font-comic text-base sm:text-lg break-words">{risk.persons}</p>
                    </div>
                    <div className="lg:col-span-4 p-4 sm:p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-lump-black">
                      <h4 className="font-heading text-xs uppercase opacity-50 mb-2">Control Measures</h4>
                      <ul className="font-comic text-base sm:text-lg list-disc list-inside space-y-1 break-words">
                        {risk.controls.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                    <div className="lg:col-span-2 p-4 sm:p-6 flex flex-row lg:flex-col justify-around lg:justify-center items-center gap-4 sm:gap-6 bg-gray-100 min-h-[120px] sm:min-h-0">
                      <div className="text-center">
                        <div className="text-[10px] sm:text-sm font-heading uppercase opacity-50 mb-1 sm:mb-3">Initial</div>
                        <div className="flex items-center gap-2 sm:gap-3 font-heading text-lg sm:text-2xl text-red-600">
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[8px] sm:text-[10px]">L</span>
                            <span>{risk.initial.l}</span>
                          </div>
                          <span className="opacity-30">×</span>
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[8px] sm:text-[10px]">S</span>
                            <span>{risk.initial.s}</span>
                          </div>
                          <span className="opacity-30">=</span>
                          <div className="flex flex-col">
                            <span className="font-black text-[8px] sm:text-[10px]">RS</span>
                            <span className="font-black text-2xl sm:text-4xl">{risk.initial.rs}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-px h-10 lg:w-16 lg:h-px bg-lump-black opacity-20"></div>
                      <div className="text-center">
                        <div className="text-[10px] sm:text-sm font-heading uppercase opacity-50 mb-1 sm:mb-3">Target</div>
                        <div className="flex items-center gap-2 sm:gap-3 font-heading text-lg sm:text-2xl text-green-600">
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[8px] sm:text-[10px]">L</span>
                            <span>{risk.target.l}</span>
                          </div>
                          <span className="opacity-30">×</span>
                          <div className="flex flex-col">
                            <span className="opacity-60 text-[8px] sm:text-[10px]">S</span>
                            <span>{risk.target.s}</span>
                          </div>
                          <span className="opacity-30">=</span>
                          <div className="flex flex-col">
                            <span className="font-black text-[8px] sm:text-[10px]">RS</span>
                            <span className="font-black text-2xl sm:text-4xl">{risk.target.rs}</span>
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
              <a 
                href="https://raw.githubusercontent.com/JollyLegend/humplump-pictures/89fa431262f9a59d76f0abf2b6b9f026500ffb99/Hump%20Lump%20-%20Pitch%20%26%20Proposal%20Final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#614bff] text-white font-heading text-2xl xs:text-3xl sm:text-5xl px-8 sm:px-12 py-4 sm:py-6 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[10px_10px_0_rgba(0,0,0,1)] rounded-full hover:scale-110 active:scale-95 transition-all flex items-center gap-3 sm:gap-4 group no-underline decoration-transparent text-center"
              >
                <Download className="w-6 h-6 sm:w-10 sm:h-10 group-hover:bounce transition-transform flex-shrink-0" />
                <span className="whitespace-normal">Download Full Pitch PDF</span>
              </a>
            </section>
          </motion.main>
        )}



        {currentView === 'gallery' && (
          <motion.main
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 sm:pt-40 pb-24 px-6 container mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 sm:mb-16 gap-4">
              <h2 className="font-heading font-black text-5xl xs:text-6xl sm:text-8xl uppercase text-lump-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] text-center sm:text-left w-full sm:w-auto break-words">GALLERY</h2>
              <p className="font-comic text-lg sm:text-2xl max-w-sm italic opacity-70 text-center sm:text-left w-full sm:w-auto">Visual evidence of the absurdity.</p>
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

        {currentView === 'contact' && (
          <motion.main
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 sm:pt-40 pb-24 px-6 container mx-auto max-w-4xl"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading font-black text-6xl sm:text-8xl uppercase text-lump-pink drop-shadow-[4px_4px_0_rgba(0,0,0,1)] sm:drop-shadow-[8px_8px_0_rgba(0,0,0,1)] inline-block -rotate-1 mb-6">
                CONTACT US
              </h2>
              <p className="font-comic text-xl sm:text-2xl italic opacity-70">
                Summon the clowns for your next event or existential crisis.
              </p>
            </div>

            <div className="bg-white border-4 sm:border-8 border-lump-black p-6 sm:p-12 rounded-[2.5rem] shadow-[10px_10px_0_rgba(0,0,0,1)] sm:shadow-[20px_20px_0_rgba(0,0,0,1)] rotate-1 relative">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12 space-y-8"
                  >
                    <div className="w-24 h-24 bg-lump-green rounded-full border-4 border-lump-black flex items-center justify-center mx-auto shadow-[4px_4px_0_rgba(0,0,0,1)]">
                      <Sparkles className="w-12 h-12 text-lump-black" />
                    </div>
                    <h3 className="font-heading text-4xl sm:text-6xl uppercase text-lump-pink">TRANSMISSION RECEIVED!</h3>
                    <p className="font-comic text-xl sm:text-2xl max-w-md mx-auto">
                      Your message has been hurled into the clown-void. Expect a ridiculous reply soon.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="bg-lump-blue text-white font-heading text-2xl px-8 py-4 border-4 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-full hover:scale-110 active:scale-95 transition-all"
                    >
                      SEND ANOTHER?
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6 sm:space-y-8"
                  >
                    {formErrors.form && (
                      <div className="bg-lump-pink p-4 rounded-xl border-4 border-lump-black text-white font-comic text-center animate-bounce">
                        <p>{formErrors.form}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-heading text-2xl uppercase tracking-tighter">Your Name</label>
                        <input 
                          type="text" 
                          id="name"
                          name="name"
                          value={submissionData.name}
                          onChange={handleInputChange}
                          placeholder="E.g. An Intrigued Human" 
                          className={`w-full bg-lump-yellow/30 border-4 ${formErrors.name ? 'border-lump-pink' : 'border-lump-black'} p-4 rounded-xl font-comic text-xl focus:outline-none focus:ring-4 ring-lump-pink/20 transition-all placeholder:opacity-50`}
                        />
                        {formErrors.name && <p className="text-lump-pink font-comic text-sm font-bold italic">{formErrors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="font-heading text-2xl uppercase tracking-tighter">Your Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={submissionData.email}
                          onChange={handleInputChange}
                          placeholder="clown@example.com" 
                          className={`w-full bg-lump-yellow/30 border-4 ${formErrors.email ? 'border-lump-pink' : 'border-lump-black'} p-4 rounded-xl font-comic text-xl focus:outline-none focus:ring-4 ring-lump-blue/20 transition-all placeholder:opacity-50`}
                        />
                        {formErrors.email && <p className="text-lump-pink font-comic text-sm font-bold italic">{formErrors.email}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-heading text-2xl uppercase tracking-tighter">Subject</label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={submissionData.subject}
                        onChange={handleInputChange}
                        placeholder="E.g. Booking Query / Fan Mail / Complaint" 
                        className={`w-full bg-lump-yellow/30 border-4 ${formErrors.subject ? 'border-lump-pink' : 'border-lump-black'} p-4 rounded-xl font-comic text-xl focus:outline-none focus:ring-4 ring-lump-blue/20 transition-all placeholder:opacity-50`}
                      />
                      {formErrors.subject && <p className="text-lump-pink font-comic text-sm font-bold italic">{formErrors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="font-heading text-2xl uppercase tracking-tighter">Message</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={5}
                        value={submissionData.message}
                        onChange={handleInputChange}
                        placeholder="Type your absurd transmission here..." 
                        className={`w-full bg-lump-yellow/30 border-4 ${formErrors.message ? 'border-lump-pink' : 'border-lump-black'} p-4 rounded-xl font-comic text-xl focus:outline-none focus:ring-4 ring-lump-orange/20 transition-all placeholder:opacity-50 resize-none`}
                      />
                      {formErrors.message && <p className="text-lump-pink font-comic text-sm font-bold italic">{formErrors.message}</p>}
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-lump-pink text-white font-heading text-3xl sm:text-4xl py-4 sm:py-6 border-4 sm:border-8 border-lump-black shadow-[6px_6px_0_rgba(0,0,0,1)] rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'sending' ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
                      ) : (
                        <Mail className="w-8 h-8 group-hover:scale-125 transition-transform" />
                      )}
                      <span>{formStatus === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-8 pt-8 border-t-4 border-lump-black/10 text-center">
                <p className="font-comic text-lg opacity-60">
                  Direct submission enabled. We'll get back to you via the email provided.
                </p>
                <a href="mailto:clowns@humplump.com" className="font-heading text-xl text-lump-blue hover:underline">clowns@humplump.com</a>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
