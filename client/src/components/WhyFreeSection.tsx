/* WhyFreeSection — Light bg, navy/orange sketch style, Growpal branding explanation */

export default function WhyFreeSection() {
  return (
    <section className="py-14" style={{ background: "#F0F4FA" }}>
      <div className="container">
        <h2
          className="font-black text-[24px] leading-snug mb-8"
          style={{ color: "#1a2a4a" }}
        >
          なぜ<span style={{ color: "#E8460A" }}>無料</span>なのか？
        </h2>

        {/* Reason card */}
        <div
          className="bg-white p-6"
          style={{
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 #1a2a4a",
          }}
        >
          <h3
            className="text-[17px] font-black mb-3"
            style={{ color: "#1a2a4a" }}
          >
            Growpal × 1級FP コラボ企画
          </h3>

          {/* Branding reason — highlighted */}
          <div
            className="p-4 mb-4"
            style={{
              background: "#FFF0EB",
              border: "1.5px solid #E8460A",
              borderRadius: "4px",
            }}
          >
            <p className="text-[15px] font-bold leading-relaxed" style={{ color: "#E8460A" }}>
              コンサル職のキャリア支援に強みを持つGrowpalが長期目線で行うブランディング施策の一環として、実施しているプロジェクトのため無料です。
            </p>
          </div>



          <ul className="flex flex-col gap-2">
            {[
              ["特定の金融商品を勧めることは", "一切なし"],
              ["王道のインデックス投資の使い方を", "中立的に解説"],
              ["安全資産の選択方法を", "ロジカルにアドバイス"],
              ["コンサル職の収入・キャリア構造を", "熟知したFPが対応"],
            ].map(([pre, bold], i) => (
              <li key={i} className="flex items-start gap-2 text-[15px]" style={{ color: "#1a2a4a" }}>
                <span
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-white text-[11px] font-black mt-0.5"
                  style={{ background: "#1a2a4a", borderRadius: "3px" }}
                >
                  ✓
                </span>
                {pre}<strong>{bold}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
