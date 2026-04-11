// src/app/page.tsx
"use client";

import Image from "next/image";
import Footer from "./components/Footer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
//  import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles = ["frontend developer", "backend developer"];

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <main className="bg-[#0a192f] text-white">
      {/* Navigation */}
     <Navigation scrollToSection={scrollToSection}/>

      {/* Hero Section */}
          <section id="home" className="relative overflow-hidden pt-16 min-h-screen flex items-center">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0d2b4d] to-[#1a3650]"></div>
        
        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left animate-fadeInLeft">
            <p className="text-blue-400 font-semibold text-lg mb-2 animate-fadeIn"> Hello, I'm</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fadeInUp">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Eyob Wendmagegn
              </span>
            </h1>
            
            {/* Typing Animation */}
            <div className="text-xl md:text-2xl text-gray-300 mb-6 h-12">
              And I'm{" "}
              <span className="font-semibold text-blue-400">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <p className="text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 animate-fadeInUp animation-delay-200">
              I am a junior developer who builds modern websites using Node.js and Next.js. I make sure every site loads fast and looks great on both computer screens and phones. I take new ideas and turn them into clean code that works well for everyone
            </p>
            
            {/* Social Media Icons instead of buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fadeInUp animation-delay-400">
              <a
                href="https://github.com/eyob-wendmagegn"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/eyob-w"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          
          </div>
          
          {/* Right Avatar with Blob Shape */}
          <div className="flex-1 flex justify-center animate-fadeInRight">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Blob background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] "></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] filter blur-xl opacity-50 animate-pulse-slow"></div>
              
              {/* Image container */}
              <div className="absolute inset-2 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden bg-[#0a192f]">
                <div className="relative w-full h-full">
                  <Image
                    src="/eyob.jpg"
                    alt="Eyob profile"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="bg-[#0a192f] py-20 border-y border-blue-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mt-2"> <span className="text-blue-400">Library Management System</span></h2>
          </div>

          {/* Equal Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Dashboard */}
            <div className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-900/30">
              <div className="h-48 md:h-56 relative overflow-hidden group">
                <Image
                  src="/libA.png"
                  alt="Admin Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Admin
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-user-shield text-blue-400"></i>
                  Administrator Panel
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Administrators can <span className="text-blue-400 font-medium">register, deactivate, and activate users</span>, 
                  <span className="text-blue-400 font-medium"> generate detailed reports</span>, and utilize 
                  <span className="text-blue-400 font-medium"> advanced user search functionality</span> to efficiently manage the system.
                </p>
              </div>
            </div>

            {/* Librarian Dashboard */}
            <div className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-900/30">
              <div className="h-48 md:h-56 relative overflow-hidden group">
                <Image
                  src="/libl.png"
                  alt="Librarian Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Librarian
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-book-open text-purple-400"></i>
                  Bookstore Servant
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Librarians can <span className="text-purple-400 font-medium">update book information</span>, 
                  <span className="text-purple-400 font-medium"> view borrowed books</span>, 
                  <span className="text-purple-400 font-medium"> add and delete books</span>, and 
                  <span className="text-purple-400 font-medium"> view total books count</span> to maintain the library collection.
                </p>
              </div>
            </div>

            {/* Teacher Dashboard */}
            <div className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-900/30">
              <div className="h-48 md:h-56 relative overflow-hidden group">
                <Image
                  src="/libT.png"
                  alt="Teacher Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Teacher
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-chalkboard-teacher text-green-400"></i>
                  Teacher Panel
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Teachers can <span className="text-green-400 font-medium">add new books to the library</span>, 
                  <span className="text-green-400 font-medium"> search book information</span>, and 
                  <span className="text-green-400 font-medium"> change their password</span> for secure access.
                </p>
              </div>
            </div>

            {/* Student Dashboard */}
            <div className="bg-[#112240] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-900/30">
              <div className="h-48 md:h-56 relative overflow-hidden group">
                <Image
                  src="/library2.jpg"
                  alt="Student Dashboard"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Student
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-user-graduate text-yellow-400"></i>
                  Student Panel
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Students can <span className="text-yellow-400 font-medium">search and browse books</span>, 
                  <span className="text-yellow-400 font-medium"> borrow and return books</span>, and 
                  <span className="text-yellow-400 font-medium"> change their password</span> for personalized access.
                </p>
              </div>
            </div>
          </div>

          {/* Common Features */}
          <div className="mt-12 bg-gradient-to-br from-[#112240] to-[#1a2f4a] rounded-2xl p-8 border border-blue-900/30">
            <h4 className="text-xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <i className="fas fa-star text-yellow-400"></i>
              Common Features for All Users
              <i className="fas fa-star text-yellow-400"></i>
            </h4>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              Every user can <span className="text-blue-400 font-medium">search for books</span>, 
              <span className="text-blue-400 font-medium"> view book information</span>, and 
              <span className="text-blue-400 font-medium"> change their password</span> for a consistent experience.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#0a192f]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">About me</span>
            <p className="text-gray-400 mb-4">
              My name is Eyob, and I am a junior developer who recently graduated from Woldia University.
               During my studies, I learned how to build modern websites using tools like Node.js, Next.js,
                and Tailwind CSS. I enjoy taking new ideas and turning them into clean code that works well on every screen.
                 My goal is to keep learning and building things that are simple and helpful for everyone to use.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 gap-4 bg-[#112240] p-6 rounded-2xl shadow-xl border border-blue-900/30">
            <div className="flex flex-col items-center p-4 border border-blue-900/30 rounded-xl bg-[#1a2f4a]">
              <i className="fab fa-node text-4xl text-green-400 mb-2"></i>
              <span className="font-medium text-white">Next.js</span>
              <span className="text-xs text-gray-400">App router</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-blue-900/30 rounded-xl bg-[#1a2f4a]">
              <i className="fas fa-wind text-4xl text-blue-400 mb-2"></i>
              <span className="font-medium text-white">Tailwind</span>
              <span className="text-xs text-gray-400">utility CSS</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-blue-900/30 rounded-xl bg-[#1a2f4a]">
              <i className="fab fa-react text-4xl text-blue-400 mb-2"></i>
              <span className="font-medium text-white">React</span>
              <span className="text-xs text-gray-400">hooks & server</span>
            </div>
            <div className="flex flex-col items-center p-4 border border-blue-900/30 rounded-xl bg-[#1a2f4a]">
              <i className="fas fa-database text-4xl text-green-400 mb-2"></i>
              <span className="font-medium text-white">MongoDB</span>
              <span className="text-xs text-gray-400">NoSQL database</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
{/* Contact Section */}
           {/* Contact Section */}
      <section id="contact" className="bg-[#0a192f] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">collaboration</span>
          
          {(() => {
            const [formData, setFormData] = React.useState({
              name: "",
              email: "",
              message: ""
            });
            const [status, setStatus] = React.useState({
              submitting: false,
              success: false,
              error: false,
              message: ""
            });

            const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const { name, value } = e.target;
              setFormData(prev => ({
                ...prev,
                [name]: value
              }));
            };

            const handleSubmit = async (e: React.FormEvent) => {
              e.preventDefault();
              setStatus({ submitting: true, success: false, error: false, message: "" });

              try {
                const response = await fetch('https://portfolio-app-rtx5.onrender.com/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                  setStatus({
                    submitting: false,
                    success: true,
                    error: false,
                    message: "Message sent successfully! I'll get back to you soon."
                  });
                  setFormData({ name: "", email: "", message: "" });
                } else {
                  setStatus({
                    submitting: false,
                    success: false,
                    error: true,
                    message: data.message || "Failed to send message. Please try again."
                  });
                }
              } catch (error) {
                setStatus({
                  submitting: false,
                  success: false,
                  error: true,
                  message: "Network error. Please check your connection."
                });
              }
            };

            return (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-3 bg-[#112240] p-8 rounded-3xl shadow-xl border border-blue-900/30">
                {/* Status Messages */}
                {status.success && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                    {status.message}
                  </div>
                )}
                
                {status.error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {status.message}
                  </div>
                )}

                <div className="grid gap-5">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-5 py-3 rounded-full bg-[#1a2f4a] border border-blue-900/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-5 py-3 rounded-full bg-[#1a2f4a] border border-blue-900/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-5 py-3 rounded-3xl bg-[#1a2f4a] border border-blue-900/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={status.submitting}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-7 py-3 rounded-full font-medium hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.submitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message <i className="fas fa-paper-plane ml-2 text-sm"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            );
          })()}

        </div>
      </section>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </main>
  );
}