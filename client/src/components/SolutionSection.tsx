/* SolutionSection (ANSWER) — doctor.logicalfp.pro の内容を忠実に再現。配色のみ変更（赤→オレンジ） */

const answers = [
  {
    num: "1",
    title: "安全資産を持つ",
    body: "現金に代わりインフレに負けない安全資産（債券・保険・金など）をポートフォリオ（※）に組み込みましょう。\nリスク資産（オルカンなど）の暴落時に安全資産で凌ぐことができれば、結果的にリスク資産のパフォーマンスを最大化することができます。\n※資産構成、資産の組み合わせ",
  },
  {
    num: "2",
    title: "ベストバランスを知る",
    body: "リスク資産と安全資産の割合・金額を考え、将来貯まる資産額をシミュレーションしましょう。自分にとって最適な将来への積立額が分かれば、残りは自由に好きに使えるので、金銭面のストレスは大幅に軽減できます。",
  },
  {
    num: "3",
    title: "オルカンやS&P500以外の選択肢も",
    body: "安全資産の存在で暴落のリスクをヘッジできるのであれば、FANG+やS&P10などのよりハイリターンを見込めるインデックスの活用も視野に入れられます。これらハイボラティリティなインデックス＋安全資産の組み合わせの期待リターンは、オルカンやS&P500等への集中投資した際のパフォーマンスを大きく上回ります。",
  },
];

export default function SolutionSection() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ background: "#fff", padding: "40px 0" }}>
      <div className="container">

        <p style={{ fontSize: "11px", fontWeight: "900", letterSpacing: "0.15em", color: "#E8460A", marginBottom: "16px" }}>
          ANSWER
        </p>

        <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#1a2a4a", marginBottom: "6px", lineHeight: "1.4" }}>
          答えはリスク資産・安全資産の二刀流！
        </h2>
        <p style={{ fontSize: "13px", color: "#666", marginBottom: "20px" }}>
          これらのベストバランスと出口戦略が重要です
        </p>

        {/* Two swords */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <div style={{ flex: 1, background: "#f9f7f4", border: "1.5px solid #1a2a4a", borderRadius: "6px", padding: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>高い攻撃力の大刀</p>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1a2a4a", marginBottom: "4px" }}>攻めの資産形成</p>
            <p style={{ fontSize: "13px", fontWeight: "900", color: "#E8460A", marginBottom: "6px" }}>リスク資産</p>
            <p style={{ fontSize: "11px", color: "#444", lineHeight: "1.5" }}>インデックス投資<br />（オルカン・FANG+など）</p>
          </div>
          <div style={{ flex: 1, background: "#f0f4f9", border: "1.5px solid #1a2a4a", borderRadius: "6px", padding: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>小回りの利く小刀</p>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1a2a4a", marginBottom: "4px" }}>守りの資産形成</p>
            <p style={{ fontSize: "13px", fontWeight: "900", color: "#1a2a4a", marginBottom: "6px" }}>安全資産</p>
            <p style={{ fontSize: "11px", color: "#444", lineHeight: "1.5" }}>債券・保険・金など<br />（現預金以外）</p>
          </div>
        </div>

        {/* Answer items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {answers.map((a) => (
            <div
              key={a.num}
              style={{
                background: "#1a2a4a",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "10px 14px 6px", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                <p style={{ fontSize: "15px", fontWeight: "900", color: "#fff", margin: 0 }}>
                  <span style={{ color: "#E8460A" }}>{a.num}．</span>{a.title}
                </p>
              </div>
              <div style={{ padding: "10px 14px 12px" }}>
                {a.body.split("\n").map((line, i) => (
                  <p key={i} style={{ fontSize: "13px", color: "rgba(255,255,255,0.82)", lineHeight: "1.7", margin: i > 0 ? "6px 0 0" : 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: "#f9f7f4",
            border: "1.5px solid #e5e0d8",
            borderRadius: "6px",
            padding: "20px 16px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "14px", fontWeight: "700", color: "#1a2a4a", lineHeight: "1.7", marginBottom: "14px" }}>
            ポートフォリオの最適化や<br />
            積立のシミュレーションは<br />
            「1級FPとの無料相談」で解決できます
          </p>
          <a
            href="#form"
            onClick={scrollToForm}
            className="pulse-orange inline-block text-white font-black text-[15px] px-6 py-3 no-underline transition-transform active:scale-95"
            style={{
              background: "#E8460A",
              borderRadius: "4px",
              border: "2px solid #1a2a4a",
              letterSpacing: "0.03em",
              boxShadow: "3px 3px 0 #1a2a4a",
            }}
          >
            FPの空き状況を確認する
          </a>
          <p style={{ fontSize: "11px", color: "#888", marginTop: "10px" }}>
            ✓ 無料　✓ 30分〜(延長可)　✓ オンライン可　✓ 21時以降可
          </p>
        </div>

      </div>
    </section>
  );
}
