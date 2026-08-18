/* TwoSwordSection — Light navy bg, hand-drawn illustration, sketch style */
const TWO_SWORD_ILLUST = "/assets/two-sword-illustration.webp";

export default function TwoSwordSection() {
  return (
    <section
      className="py-14"
      style={{ background: "#F0F4FA" }}
    >
      <div className="container">
        <p
          className="text-[12px] font-bold mb-1 tracking-widest uppercase"
          style={{ color: "#6B7280" }}
        >
          元コンサルの1級FPが考える
        </p>
        <h2
          className="font-black text-[22px] leading-snug mb-8"
          style={{ color: "#1a2a4a" }}
        >
          コンサル職に最適な<br />
          <span style={{ color: "#E8460A" }}>「二刀流」</span>
          資産形成術
        </h2>

        {/* Illustration */}
        <div
          className="bg-white mb-6 overflow-hidden"
          style={{
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 #1a2a4a",
          }}
        >
          <img
            src={TWO_SWORD_ILLUST}
            alt="リスク資産 × 安全資産の二刀流"
            className="w-full h-auto"
            style={{ maxHeight: "260px", objectFit: "contain", padding: "16px" }}
          />
        </div>

        {/* Labels */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "リスク資産", sub: "インデックス投資\n（オルカン・S&P500等）", accent: "#E8460A" },
            { label: "安全資産", sub: "債券・保険・金など\nリスクヘッジ", accent: "#1e3a6e" },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-4 bg-white"
              style={{
                border: `2px solid ${item.accent}`,
                borderRadius: "4px",
                boxShadow: `2px 2px 0 ${item.accent}`,
              }}
            >
              <div
                className="text-[15px] font-black mb-1"
                style={{ color: item.accent }}
              >
                {item.label}
              </div>
              <div className="text-[11px] leading-relaxed" style={{ color: "#6B7280" }}>
                {item.sub.split("\n").map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div
          className="bg-white p-5"
          style={{
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            boxShadow: "3px 3px 0 #1a2a4a",
          }}
        >
          {[
            ["高いリターン", "不安なく、かつ", "を狙える"],
            ["ぴったりの放置可能な戦略", "忙しいコンサルに", ""],
            ["30分〜", "相談時間は", "（延長も可能）"],
          ].map(([bold, pre, post], i) => (
            <p key={i} className="text-[14px] mb-2 last:mb-0 leading-relaxed" style={{ color: "#1a2a4a" }}>
              <span
                className="inline-block w-5 h-5 text-center text-white text-[11px] font-black rounded-sm mr-2"
                style={{ background: "#E8460A", lineHeight: "20px" }}
              >
                ✓
              </span>
              {pre}<strong>{bold}</strong>{post}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
