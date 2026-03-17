"use client";

import { useState } from "react";
import Link from "next/link";

interface FooterProps {
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ""
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: "" });

    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: "✅ Subscribed successfully! Check your email."
        });
        setEmail("");
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false, message: "" }));
        }, 5000);
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: true,
          message: data.message || "❌ Subscription failed. Try again."
        });
      }
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: "❌ Network error. Please check your connection."
      });
    }
  };

  return (
    <footer className="border-t border-blue-900/30 bg-[#0a192f] pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Eyob.dev
            </span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Building modern web experiences with Next.js and Tailwind CSS. Junior developer passionate about clean code.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1a2f4a] flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-[#234] transition-all duration-300"
              >
                <i className="fab fa-github text-sm"></i>
              </a>
             
              <a 
                href="https://t.me/yourusername" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1a2f4a] flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-[#234] transition-all duration-300"
              >
                <i className="fab fa-telegram-plane text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" onClick={(e) => scrollToSection(e, "home")} className="text-gray-400 hover:text-blue-400 text-sm transition cursor-pointer">Home</a></li>
              <li><a href="#work" onClick={(e) => scrollToSection(e, "work")} className="text-gray-400 hover:text-blue-400 text-sm transition cursor-pointer">Work</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, "about")} className="text-gray-400 hover:text-blue-400 text-sm transition cursor-pointer">About</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="text-gray-400 hover:text-blue-400 text-sm transition cursor-pointer">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Style Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">GitHub Repo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition">Components</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Get in Touch</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-envelope text-blue-400 text-xs"></i>
                <span>eyobwende18@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-phone-alt text-blue-400 text-xs"></i>
                <span>+251983610499</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <i className="fas fa-map-marker-alt text-blue-400 text-xs"></i>
                <span>Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-blue-900/30 py-6 mb-6">
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              <i className="far fa-envelope text-blue-400 mr-2"></i>
              Subscribe to my newsletter for updates and tips
            </p>
            
            {/* Status Message */}
            {status.message && (
              <div className={`text-sm ${status.success ? 'text-green-400' : 'text-red-400'} md:absolute md:left-1/2 md:transform md:-translate-x-1/2`}>
                {status.message}
              </div>
            )}

            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                required
                disabled={status.submitting}
                className="px-4 py-2 bg-[#1a2f4a] border border-blue-900/30 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500 w-full md:w-64 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status.submitting}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-r-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {status.submitting ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900/30 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <span>
            © {new Date().getFullYear()} Eyob.dev — built with 
            using Next.js & Tailwind CSS
          </span>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a 
              href="https://www.termsfeed.com/live/de1a3f0e-d854-4d78-aa6b-74f108773ca2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </a>
            <a 
              href="https://www.termsfeed.com/live/496eeab2-05d0-482d-94f6-08aaec1b1500" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}