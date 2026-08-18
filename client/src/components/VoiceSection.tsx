/* VoiceSection — Cream bg, navy/orange sketch style
 * Design: バナーと統一した白ベース×ネイビー×オレンジ
 * Purpose: クライアントの声（サンプル）をFAQ前に表示
 */

const voices = [
  {
    nameMain: "Hさん　30代",
    nameSub: "外資系戦略コンサル　マネージャー",
    text: "説明が論理的で腹落ちしやすく、暗黙知になりがちな前提や根拠も明確に伝えてくれるので信頼して相談できます。市場やマクロ環境の変化も踏まえた提案を、スピード感ある対話で進められるのも一つの魅力です。",
    rating: 5,
    tag: "ロジカルな解説",
  },
  {
    nameMain: "Mさん　30代",
    nameSub: "戦略コンサル　プリンシパル",
    text: "職業特性上、よく聞くような保険は自分のキャリア軸にマッチしないのではないか、そもそもロジックで説明してもらえる話ではないのではないか、初めはそんな疑問を持っていましたが、自分のキャリア軸に寄り添って、かつプロの知見から合理的にアドバイスしていただき、頭の理解+腹落ちまでして良い選択をすることができました。",
    rating: 5,
    tag: "キャリア×資産形成",
  },
];

export default function VoiceSection() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "60px 0",
        borderTop: "2px solid #e8e0d0",
        borderBottom: "2px solid #e8e0d0",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>

        {/* セクションタイトル */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "inline-block",
              background: "#1a2a4a",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              padding: "5px 16px",
              borderRadius: "2px",
              marginBottom: "12px",
            }}
          >
            CLIENT VOICES
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "900",
              color: "#1a2a4a",
              lineHeight: "1.4",
              margin: "0 0 8px",
            }}
          >
            相談者の<span style={{ color: "#E8460A" }}>声</span>
          </h2>

        </div>

        {/* 声カード */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {voices.map((v, i) => (
            <div
              key={i}
              style={{
                background: "#f8f6f0",
                border: "2px solid #e8e0d0",
                borderRadius: "4px",
                padding: "20px",
                position: "relative",
              }}
            >
              {/* 引用マーク */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "16px",
                  fontSize: "36px",
                  color: "rgba(232,70,10,0.12)",
                  fontWeight: "900",
                  lineHeight: "1",
                  userSelect: "none",
                }}
              >
                "
              </div>

              {/* タグ */}
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(232,70,10,0.1)",
                  border: "1px solid #E8460A",
                  borderRadius: "2px",
                  padding: "2px 8px",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#E8460A",
                  letterSpacing: "0.05em",
                  marginBottom: "12px",
                }}
              >
                {v.tag}
              </div>

              {/* 本文 */}
              <p
                style={{
                  fontSize: "14px",
                  color: "#333",
                  lineHeight: "1.8",
                  margin: "0 0 14px",
                }}
              >
                {v.text}
              </p>

              {/* 星評価 */}
              <div style={{ marginBottom: "10px" }}>
                {Array.from({ length: v.rating }).map((_, si) => (
                  <span key={si} style={{ color: "#E8460A", fontSize: "14px" }}>★</span>
                ))}
              </div>

              {/* 投稿者 */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#1a2a4a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "900",
                    flexShrink: 0,
                  }}
                >
                  {v.nameMain[0]}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#1a2a4a" }}>
                    {v.nameMain}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                    {v.nameSub}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
