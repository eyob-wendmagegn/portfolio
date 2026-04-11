"use client";

import { useState } from "react";

interface NavigationProps {
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

export default function Navigation({ scrollToSection }: NavigationProps){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <nav className="fixed top-0 w-full bg-[#0a192f]/80 backdrop-blur-sm z-30 border-b border-blue-900/60 animate-fadeInDown">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
            Portfolio
          </span>
          
          {/* Centered Navigation - Desktop */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm font-medium">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, "home")}
              className="text-gray-300 hover:text-blue-400 hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
            >
              Home
            </a>
            <a 
              href="#work" 
              onClick={(e) => scrollToSection(e, "work")}
              className="text-gray-300 hover:text-blue-400 hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
            >
              Work
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, "about")}
              className="text-gray-300 hover:text-blue-400 hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-gray-300 hover:text-blue-400 hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
            >
              Contact
            </a>
          </div>
          
          {/* Download CV Button - Desktop */}
          <div className="hidden md:block">
            <a 
              href="/Eyob-CV.pdf" 
              download
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <i className="fas fa-download"></i> Download CV
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a192f]/95 backdrop-blur-sm border-t border-blue-900/60 py-4 px-6">
            <div className="flex flex-col space-y-4">
              <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, "home")}
                className="text-gray-300 hover:text-blue-400 py-2 transition text-center"
              >
                Home
              </a>
              <a 
                href="#work" 
                onClick={(e) => scrollToSection(e, "work")}
                className="text-gray-300 hover:text-blue-400 py-2 transition text-center"
              >
                Work
              </a>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, "about")}
                className="text-gray-300 hover:text-blue-400 py-2 transition text-center"
              >
                About
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, "contact")}
                className="text-gray-300 hover:text-blue-400 py-2 transition text-center"
              >
                Contact
              </a>
              <a 
                href="/cv.pdf" 
                download
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 justify-center mx-auto w-fit"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-download"></i> Download CV
              </a>
            </div>
          </div>
        )}
      </nav>

    );
}