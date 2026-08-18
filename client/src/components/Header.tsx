/* Header — 2-row layout:
 * Row 1 (top bar): "powered by Growpal" — スクロールで上に消える
 * Row 2 (sticky bar): "コンサル職限定" + "無料相談" — 常時表示
 */
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (topBarRef.current) {
      setTopBarHeight(topBarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > topBarHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topBarHeight]);

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "2px solid #1a2a4a", boxShadow: "0 2px 8px rgba(26,42,74,0.08)" }}
    >
      {/* Row 1: powered by Growpal — スクロールで上にスライドアウト */}
      <div
        ref={topBarRef}
        style={{
          overflow: "hidden",
          maxHeight: scrolled ? "0px" : "48px",
          transition: "max-height 0.3s ease",
          borderBottom: scrolled ? "none" : "1px solid #e8e0d0",
        }}
      >
        <a
          href="https://growpal-inc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-baseline gap-1 no-underline px-4 py-2"
        >
          <span className="text-[10px] text-gray-400 tracking-wide">powered by</span>
          <span
            className="text-[18px] font-black tracking-wide"
            style={{ color: "#1a2a4a", letterSpacing: "0.04em" }}
          >
            Growpal
          </span>
        </a>
      </div>

      {/* Row 2: バッジ 3つ — 常時表示 */}
      <div className="container flex items-center justify-start py-2">
        <div className="flex gap-2">
          <span
            className="text-[12px] font-bold px-2.5 py-1 rounded text-white"
            style={{ background: "#E8460A", border: "1.5px solid #E8460A" }}
          >
            コンサル職限定
          </span>
          <span
            className="text-[12px] font-bold px-2.5 py-1 rounded"
            style={{ color: "#1a2a4a", border: "1.5px solid #1a2a4a", background: "white" }}
          >
            無料FP相談
          </span>
          <span
            className="text-[12px] font-bold px-2.5 py-1 rounded text-white"
            style={{ background: "#1a2a4a", border: "1.5px solid #1a2a4a" }}
          >
            4月限定先着15名
          </span>
        </div>
      </div>
    </header>
  );
}
