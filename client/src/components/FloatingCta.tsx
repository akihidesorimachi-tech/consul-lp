/* FloatingCta — Navy bg, orange button, sketch style */
import { useEffect, useRef, useState } from "react";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<Element | null>(null);

  useEffect(() => {
    heroRef.current = document.querySelector(".hero-section");
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(!entry.isIntersecting));
      },
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-4 pt-5 text-center transition-transform duration-300"
      style={{
        background: "linear-gradient(to top, rgba(13,26,46,0.97) 60%, transparent 100%)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href="#form"
        onClick={scrollToForm}
        className="inline-block w-full max-w-[400px] text-white font-black text-[15px] py-4 no-underline transition-transform active:scale-95"
        style={{
          background: "#E8460A",
          border: "2px solid #1a2a4a",
          borderRadius: "4px",
          boxShadow: "3px 3px 0 #1a2a4a",
          letterSpacing: "0.03em",
        }}
      >
        無料相談に申し込む ▲
      </a>
    </div>
  );
}
