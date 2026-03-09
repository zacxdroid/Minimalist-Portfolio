import { useState } from "react"

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
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


    </>
  )
}

export default App
