/* HeroSection — 自然な流れ設計:
 * 1. タイトル（誰向けか＋何の相談か）
 * 2. 「なぜこのFPが特別か」3ポイント（タイトルの説明として自然に続く）
 * 3. 「問」を大きく目立たせてスクロールを促す（CTAはここに置かない）
 * 4. バナー注意書き
 */
export default function HeroSection() {
  const points = [
    {
      label: "元コンサル職",
      desc: "自身もコンサルとしての実務経験を持つFPのため、高い問題解決能力を持ち、コンサル職の収入構造・キャリアパスにも精通",
    },
    {
      label: "コンサル・GAFAMの顧客を多数担当",
      desc: "外資コンサル・戦略コンサル・GAFAMなど高収入層の資産相談を多数担当。彼らが納得して採用していく戦略を提案",
    },
    {
      label: "ロジカルな説明が得意",
      desc: "感情論ではなくデータとロジックで資産形成を解説。コンサル職が求めるハイレベルな「なぜ？」に答える",
    },
  ];

  return (
    <>
      <section
        className="relative overflow-hidden bg-white"
        style={{ borderBottom: "2px solid #1a2a4a" }}
      >
        {/* Notebook lines background */}
        <div
          className="absolute inset-0 pointer-events-none notebook-bg"
          style={{ opacity: 0.5 }}
        />

        <div className="relative z-10 container pt-8 pb-8">

          {/* ① タイトル */}
          <h1
            className="font-black leading-tight mb-5"
            style={{ color: "#1a2a4a", fontSize: "clamp(24px, 7vw, 32px)" }}
          >
            コンサル出身1級FPの<br />
            <span style={{ color: "#E8460A" }}>資産形成術</span>
          </h1>
          {/* ② なぜこのFPが特別か（タイトルの自然な補足） */}
          <div
            style={{
              background: "#1a2a4a",
              borderRadius: "6px",
              padding: "14px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.12em",
                marginBottom: "12px",
              }}
            >
              コンサル職から選ばれる理由
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {points.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#E8460A",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "900",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "900", color: "#fff", marginBottom: "2px" }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: "1.5" }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ③ 問：大きく目立たせてスクロールを促す */}
          <div
            style={{
              background: "#1a2a4a",
              borderRadius: "6px",
              padding: "20px 16px",
              marginBottom: "12px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 背景装飾 */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                background: "#E8460A",
                opacity: 0.08,
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                color: "#E8460A",
                marginBottom: "10px",
              }}
            >
              QUESTION
            </p>
            <p
              style={{
                fontSize: "clamp(17px, 5vw, 22px)",
                fontWeight: "900",
                color: "#fff",
                lineHeight: "1.5",
                marginBottom: "14px",
              }}
            >
              「NISAでオルカン(S&amp;P500)だけ」が<br />
              <span style={{ color: "#E8460A" }}>本当にベストアンサーか？</span>
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.6",
                marginBottom: "14px",
              }}
            >
              「オルカンやS&amp;P500だけ買っておけば良い」近年WEB上で語られるこの方法には2つの問題点があります。
            </p>
            {/* スクロール促進 */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: "700" }}>
                答えはこのページで解説
              </span>
              <span
                style={{
                  display: "inline-block",
                  color: "#E8460A",
                  fontSize: "16px",
                  animation: "bounce 1.2s infinite",
                }}
              >
                ↓
              </span>
            </div>
          </div>

          {/* ④ バナー注意書き */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #ccc",
              borderRadius: "4px",
              padding: "10px 12px",
            }}
          >
            <p style={{ fontSize: "11px", color: "#666", lineHeight: "1.7", margin: 0 }}>
              ⚠️ バナー広告は一定数クリックされると表示されなくなります。あとで読みたい場合は<strong>本ページをブックマーク</strong>していただくことをおすすめします。
            </p>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </>
  );
}
