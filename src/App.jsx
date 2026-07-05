import { useState, useEffect, useRef } from "react";

/* ---------------------------------- */
/* FadeInUp scroll-reveal wrapper      */
/* ---------------------------------- */
function FadeInUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- */
/* Logo (stroke-based, Untitled UI style) */
/* ---------------------------------- */
function PletyLogo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2" />
      <path
        d="M16 3 L16 29 M3 16 L29 16 M6.8 6.8 L25.2 25.2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="16" cy="16" r="4.5" stroke="white" strokeWidth="2" fill="black" />
    </svg>
  );
}

/* ---------------------------------- */
/* Buttons                             */
/* ---------------------------------- */
function PrimaryButton({ children = "Get started" }) {
  return (
    <a
      href="#contact"
      className="bg-white hover:bg-gray-200 text-black text-sm font-medium px-6 py-3 rounded-full transition-colors inline-block"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ children = "Learn more" }) {
  return (
    <a
      href="#features"
      className="bg-[#1F1F22] hover:bg-[#2A2A2D] text-white text-sm font-medium px-6 py-3 rounded-full border border-white/5 transition-colors inline-block"
    >
      {children}
    </a>
  );
}

/* ---------------------------------- */
/* Navigation                          */
/* ---------------------------------- */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-black/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-2.5">
            <PletyLogo size={26} />
            <span className="text-lg font-semibold tracking-tight">Plety</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-[#1F1F22] hover:bg-[#2A2A2D] text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/5 transition-colors"
            >
              Get started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6 L18 18 M18 6 L6 18" />
              ) : (
                <path d="M4 7 L20 7 M4 12 L20 12 M4 17 L20 17" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-md"
        style={{ maxHeight: menuOpen ? "320px" : "0px" }}
      >
        <div className="px-6 py-4 flex flex-col gap-1 border-t border-white/5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white py-3 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="bg-[#1F1F22] hover:bg-[#2A2A2D] text-white text-sm font-medium px-5 py-2.5 rounded-full border border-white/5 text-center mt-2 mb-2 transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------------------------------- */
/* Marquee brand logos                 */
/* ---------------------------------- */
const BRANDS = [
  {
    name: "Springfield",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    name: "Orbitc",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      </svg>
    ),
  },
  {
    name: "Cloud",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 18 A4.5 4.5 0 0 1 7 9 A5.5 5.5 0 0 1 17.5 10.5 A3.75 3.75 0 0 1 17 18 Z" />
      </svg>
    ),
  },
  {
    name: "Amster",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 L21 20 L3 20 Z" />
        <path d="M12 10 L16.5 19" />
      </svg>
    ),
  },
  {
    name: "Nexus",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="8" height="8" rx="2" />
        <rect x="13" y="13" width="8" height="8" rx="2" />
        <path d="M11 11 L13 13" />
      </svg>
    ),
  },
];

function Marquee() {
  const repeated = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <div className="w-full mt-24">
      <p className="text-sm text-gray-500 font-medium mb-8 text-center">
        Trusted by industry leaders
      </p>
      <div
        className="overflow-hidden w-full max-w-4xl mx-auto"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-[marquee_30s_linear_infinite]">
          {repeated.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 flex items-center gap-2.5 text-gray-400"
            >
              {brand.icon}
              <span className="text-base font-semibold tracking-tight whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Hero                                */
/* ---------------------------------- */
function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 relative z-0 px-6"
    >
      {/* Background video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full opacity-90"
        >
          <source
            src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      <FadeInUp>
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-sm inline-block">
          ✨ Announcing API 2.0
        </div>
      </FadeInUp>

      <FadeInUp delay={100}>
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-center">
          The intelligence layer
          <br />
          for clear{" "}
          <span className="font-serif italic font-normal">decisions.</span>
        </h1>
      </FadeInUp>

      <FadeInUp delay={200}>
        <p className="text-[16px] text-gray-400 max-w-2xl text-center mb-10">
          Our platform integrates seamlessly into your stack to deliver
          real-time understanding, not just predictions.
        </p>
      </FadeInUp>

      <FadeInUp delay={300}>
        <div className="flex flex-row items-center gap-4">
          <PrimaryButton />
          <SecondaryButton />
        </div>
      </FadeInUp>

      <FadeInUp delay={400} className="w-full">
        <Marquee />
      </FadeInUp>
    </section>
  );
}

/* ---------------------------------- */
/* Feature mockup cards                */
/* ---------------------------------- */
function ChatMockup() {
  return (
    <div className="rounded-3xl overflow-hidden p-8 border border-white/10 relative min-h-[420px] flex items-end">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source
          src="https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating chat card */}
      <div className="relative w-full bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["✦ Create image", "📄 Summarize", "💡 Brainstorm", "＋ More"].map(
            (chip) => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 whitespace-nowrap"
              >
                {chip}
              </span>
            )
          )}
        </div>
        {/* Input */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
          <span className="text-sm text-gray-500 flex-1">Ask anything...</span>
          {/* Mic icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11 a7 7 0 0 0 14 0 M12 18 L12 21" />
          </svg>
          {/* Soundwave icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 10 L4 14 M8 7 L8 17 M12 4 L12 20 M16 7 L16 17 M20 10 L20 14" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TranscriptionMockup() {
  const bars = [8, 14, 20, 12, 24, 16, 28, 10, 22, 15, 26, 12, 18, 24, 9, 20, 14, 25, 11, 17, 22, 13, 19, 8, 16];
  return (
    <div className="rounded-3xl overflow-hidden p-8 border border-white/10 relative min-h-[420px] flex items-center">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full"
      >
        <source
          src="https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating transcription card */}
      <div className="relative w-full bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-4">
          {/* Play button */}
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="black">
              <path d="M3 1.5 L10.5 6 L3 10.5 Z" />
            </svg>
          </button>
          <span className="text-sm text-gray-300 font-medium">
            11:06 AM &ndash; Chris
          </span>
        </div>
        {/* Waveform */}
        <div className="flex items-center gap-[3px] h-8 mb-4">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-full ${i < 10 ? "bg-white" : "bg-white/25"}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        {/* Transcription text */}
        <p className="text-sm text-gray-400 leading-relaxed">
          <span className="text-white">Chris:</span> Alright team, let's
          finalize the Q3 roadmap today. The main priority is shipping the new
          analytics dashboard before the...
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Feature sections                    */
/* ---------------------------------- */
function FeatureChat() {
  return (
    <section id="features" className="relative z-0 bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24 px-6 max-w-7xl mx-auto items-center">
        <FadeInUp>
          <div>
            <div className="text-xs font-medium text-yellow-400 mb-4">
              ✨ AI chat
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Where speed meets intelligent conversation.
            </h2>
            <p className="text-gray-400 text-base mb-8 max-w-lg">
              A conversational AI assistant that understands your questions,
              provides intelligent answers, and helps you get things done fast
              from casual chats to complex tasks.
            </p>
            <PrimaryButton />
          </div>
        </FadeInUp>
        <FadeInUp delay={150}>
          <ChatMockup />
        </FadeInUp>
      </div>
    </section>
  );
}

function FeatureTranscription() {
  return (
    <section className="relative z-0 bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-24 px-6 max-w-7xl mx-auto items-center">
        <FadeInUp className="order-2 lg:order-1">
          <TranscriptionMockup />
        </FadeInUp>
        <FadeInUp delay={150} className="order-1 lg:order-2">
          <div>
            <div className="text-xs font-medium text-green-400 mb-4">
              ✨ AI transcription
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Turn speech into text with speed and precision.
            </h2>
            <p className="text-gray-400 text-base mb-8 max-w-lg">
              Automatically convert speech into accurate, editable text in real
              time. Perfect for meetings, interviews, voice notes, and more,
              powered by advanced speech recognition technology.
            </p>
            <PrimaryButton />
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* FAQ                                 */
/* ---------------------------------- */
const FAQS = [
  {
    q: "Is my data safe and secure on your platform?",
    a: "Yes. All data is encrypted in transit with TLS 1.3 and at rest with AES-256. We are SOC 2 Type II certified, GDPR compliant, and never use your data to train models without explicit consent.",
  },
  {
    q: "How does the integration with my existing stack work?",
    a: "Plety ships with SDKs for JavaScript, Python, and Go, plus a REST API and native connectors for tools like Slack, Notion, and Salesforce. Most teams are fully integrated in under an hour.",
  },
  {
    q: "Can I try Plety before committing to a paid plan?",
    a: "Absolutely. Every plan starts with a 14-day free trial with full access to all features. No credit card required, and you can cancel or downgrade at any time.",
  },
  {
    q: "What languages does the AI transcription support?",
    a: "Our transcription engine supports over 50 languages with automatic language detection, speaker diarization, and real-time streaming output at industry-leading accuracy.",
  },
  {
    q: "Do you offer support for enterprise teams?",
    a: "Yes. Enterprise plans include a dedicated success manager, custom SLAs with 99.99% uptime, SSO and SCIM provisioning, private cloud deployment options, and priority 24/7 support.",
  },
];

function FaqItem({ faq, isOpen, onToggle, isLast }) {
  return (
    <div className={isLast ? "" : "border-b border-white/10"}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 px-6 text-left gap-4"
      >
        <span className="text-base text-white font-medium">{faq.q}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          <path d="M9 3 L9 15 M3 9 L15 9" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-gray-400 text-sm pb-6 px-6">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="py-32 px-6 max-w-3xl mx-auto relative z-0 bg-black">
      <FadeInUp>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12 text-center">
          We've got answers
        </h2>
      </FadeInUp>
      <FadeInUp delay={150}>
        <div className="border border-white/10 rounded-xl bg-transparent">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isLast={i === FAQS.length - 1}
            />
          ))}
        </div>
      </FadeInUp>
    </section>
  );
}

/* ---------------------------------- */
/* Footer                              */
/* ---------------------------------- */
const FOOTER_COLS = [
  {
    title: "Product",
    links: ["About", "Pricing", "Changelog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "404"],
  },
  {
    title: "Connect",
    links: ["Instagram", "YouTube", "LinkedIn", "Twitter / X"],
  },
];

function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-0 pt-32 pb-10 px-6 border-t border-white/5 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 object-cover w-full h-full opacity-40 -z-10"
      >
        <source
          src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black -z-10" />

      {/* Top CTA */}
      <FadeInUp>
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-10">
            Ready to automate{" "}
            <span className="font-serif italic font-normal">everything?</span>
          </h2>
          <div className="flex flex-row items-center justify-center gap-4">
            <PrimaryButton />
            <SecondaryButton />
          </div>
        </div>
      </FadeInUp>

      {/* Link grid */}
      <FadeInUp delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto mb-24">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <PletyLogo size={26} />
              <span className="text-xl font-bold tracking-tight">Plety</span>
            </div>
            <p className="text-sm text-gray-400">
              Speed, scale, and smarts, deployed.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeInUp>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-8 max-w-7xl mx-auto">
        <span>&copy; 2026 Plety. All rights reserved</span>
        <span className="hidden md:inline text-gray-700">&middot;</span>
        <span>
          by <span className="text-gray-300">Re-text</span>
        </span>
        <span className="hidden md:inline text-gray-700">&middot;</span>
        <span>
          Made in <span className="text-gray-300">Gemini</span>
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------- */
/* App                                 */
/* ---------------------------------- */
export default function App() {
  return (
    <div className="bg-black text-white min-h-screen antialiased overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <FeatureChat />
      <FeatureTranscription />
      <Faq />
      <Footer />
    </div>
  );
}
