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

            <a href="https://github.com/zacxdroid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-textMuted hover:text-white px-6 py-3 transition-colors">
              <i className="fab fa-github text-xl"></i> GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-bgDark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="bg-cardDark p-8 rounded-xl border-l-4 border-accent shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <i className="fas fa-terminal text-accent text-xl"></i> Sobre mí
            </h2>
            <p className="text-lg leading-relaxed text-slate-300">
              Estudiante de TI con fuerte interés en <span className="text-accent font-semibold">Backend Engineering</span> y <span className="text-accent font-semibold">Cybersecurity</span>. 
              Actualmente desarrollando habilidades en Node.js, Python, Linux, SQL y Git. 
              Me encuentro construyendo una base técnica sólida para integrarme a un entorno profesional 
              donde pueda aprender, crecer y aportar valor. 
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-white reveal">Habilidades Técnicas</h2>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Card: Backend */}
            <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fab fa-node-js text-4xl text-[#68A063]"></i>
                <h3 className="text-xl font-bold text-white">Backend Development</h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Node.js + Express </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Creación de REST APIs</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Middlewares, manejo de rutas y controllers</li>
              </ul>
            </div>
            
            {/* Skill Card: Git */}
            <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fab fa-git-alt text-4xl text-[#F05032]"></i>
                <h3 className="text-xl font-bold text-white">Git & GitHub</h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Control de versiones</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Gestión de Ramas (Branches)</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Pull Requests y Merges</li>
              </ul>
            </div>

            {/* Skill Card: Auth */}
            <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-shield-alt text-4xl text-[#4F46E5]"></i>
                <h3 className="text-xl font-bold text-white"> Authentication & Security </h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Authentication y Authorization </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Password Hashing (bcrypt) y JWT</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Protected Routes </li>
              </ul>
            </div>

            {/* Skill Card: API Design */}
            <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-plug text-4xl text-[#22C55E]"></i>
                <h3 className="text-xl font-bold text-white"> API Design </h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> RESTful API Design </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> HTTP Methods y Status Codes </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Request Validation </li>
              </ul>
            </div>

            {/* Skill Card: DB */}
            <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-database text-4xl text-[#94A3B8]"></i>
                <h3 className="text-xl font-bold text-white"> Database Management </h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Prisma ORM </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Mongoose ODM </li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Schema Design y Data Validation </li>
              </ul>
            </div>

            {/* Skill Card: Networks */}
             <div className="bg-cardDark p-6 rounded-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 border border-slate-700 reveal">
              <div className="flex items-center gap-4 mb-4">
                <i className="fas fa-network-wired text-4xl text-green-500"></i>
                <h3 className="text-xl font-bold text-white">Redes</h3>
              </div>
              <ul className="space-y-2 text-textMuted text-sm">
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Modelo OSI & TCP/IP</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> Subnetting básico</li>
                <li className="flex items-start gap-2"><span className="text-accent mt-1">▹</span> DNS / HTTP / SSH</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* PROFESSIONAL PROJECTS SECTION */}
      <section id="projects" className="py-20 bg-bgDark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12 reveal">
            <div className="h-px bg-slate-700 flex-grow"></div>
            <h2 className="text-3xl font-bold text-center px-6 text-white">Portafolio Profesional</h2>
            <div className="h-px bg-slate-700 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <article className="group bg-cardDark border border-slate-700 rounded-xl overflow-hidden reveal">
              <div className="h-2 bg-gradient-to-r from-orange-500 to-yellow-400"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">Gym AI Planner Full Stack</h3>
                  <i className="fas fa-code text-slate-500"></i>
                </div>
                <p className="text-textMuted mb-4">
                  Aplicación web Full-Stack que genera programas de entrenamiento personalizados para gimnasio utilizando IA. 
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">Node.js + Express</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">Vite</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">Tailwind CSS</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">React</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">API REST</span>
                </div>
                <div className="flex gap-20">
                  <a href="https://github.com/zacxdroid/GymAI-Planner-FullStack" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:text-white font-semibold text-sm transition-colors">
                  Ver en GitHub <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:text-white font-semibold text-sm transition-colors">
                  Ver Live <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="group bg-cardDark border border-slate-700 rounded-xl overflow-hidden reveal">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-400"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">REST API Movie Watchlist</h3>
                  <i className="fas fa-code text-slate-500"></i>
                </div>
                <p className="text-textMuted mb-4">
                  Gestión de películas con autenticación de usuarios, operaciones CRUD y un sistema de watchlist personal.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">Node.js + Express</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">Prisma</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">PostgreSQL (Neon Serverless)</span>
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-white">JWT</span>
                </div>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-accent hover:text-white font-semibold text-sm transition-colors">
                  Ver en GitHub <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-bgDark relative">
        <div className="max-w-3xl mx-auto px-4 text-center reveal">
          <h2 className="text-4xl font-bold text-white mb-8">¿Conectamos?</h2>
          <p className="text-lg text-textMuted mb-10">
            Estoy buscando activamente oportunidades como Backend Engineer Jr. 
            Si te interesa mi perfil, no dudes en contactarme.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="mailto:zacky.dackyrr@gmail.com" className="flex items-center justify-center gap-3 bg-accent text-bgDark hover:bg-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-accent/20">
              <i className="fas fa-envelope"></i> Enviar Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} zacxdroid. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/zacxdroid" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
            <a href="mailto:zacky.dackyrr@gmail.com" className="text-slate-400 hover:text-white transition-colors"><i className="fas fa-envelope text-xl"></i></a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
