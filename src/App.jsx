import { useRef, useState, useEffect } from "react"

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const canvasRef = useRef(null)

  // Hook for Reveal
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Hook for Matrix Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const letters = "01";
    const fontSize = 16;
    let drops = [];

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(window.innerWidth / fontSize);
      drops = Array(columns).fill(1);
    };

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#38bdf8";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", setupCanvas);
    };
  }, []);
  return (
    <>
      {/* NAV BAR */}
      <nav className="fixed w-full z-50 bg-bgDark/90 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Pequeño Logo */}
            <div className="shrink-0 font-bold text-xl tracking-wider text-white">
              <span className="text-accent">&lt;</span>DEV<span className="text-accent">/&gt;</span>
            </div>

            {/* Desktop Menu*/}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Sobre mí</a>
                <a href="#skills" className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Skills</a>
                <a href="#projects" className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Proyectos</a>
                <a href="#creative" className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Lab Creativo</a>
                <a href="#contact" className="text-bgDark bg-accent hover:bg-sky-300 px-4 py-2 rounded-md text-sm font-bold transition-colors">Contacto</a>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Panel*/}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-cardDark border-b border-slate-700`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#about" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent hover:bg-slate-700">Sobre mí</a>
            <a href="#skills" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent hover:bg-slate-700">Skills</a>
            <a href="#projects" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent hover:bg-slate-700">Proyectos</a>
            <a href="#contact" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-accent">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="h-screen flex items-center justify-center relative overflow-hidden">

        {/* CANVAS SECTION */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25"></canvas>

        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="text-center z-10 px-4 reveal">
          <h2 className="text-accent font-mono text-sm mb-4 tracking-widest">PORTAFOLIO TÉCNICO</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Backend Foundations<br /><span className="text-slate-500">Student</span></h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-textMuted">
            Construyendo la lógica y el corazón de las aplicaciones. 
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#projects" className="border border-accent text-accent hover:bg-accent hover:text-bgDark px-6 py-3 rounded font-semibold transition-all duration-300">
              Ver Proyectos
            </a>
            
            <a href="assets/cv.pdf" download="CV_IsaacRivas_BackendJr.pdf" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded font-semibold transition-all duration-300 hover:border-accent">
              <i className="fas fa-file-download text-accent"></i> Descargar CV
            </a>

            <a href="https://github.com/zacxdroid" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-textMuted hover:text-white px-6 py-3 transition-colors">
              <i className="fab fa-github text-xl"></i> GitHub
            </a>
          </div>
        </div>
      </header>

    </>
  )
}

export default App
