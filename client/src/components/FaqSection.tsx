/* FaqSection — Light bg, navy/orange sketch style Q cards */
const questions = [
  "FIREって、実際のところ現実的に可能なの？",
  "インデックス投資って、本当に「最適解」なの？",
  "年収2000万クラスの人はどのくらい投資に回すべき？",
  "現金比率は何％が合理的？",
  "インデックス投資の最大の弱点って何？",
  "「安全資産」を入れる意味って何？",
  "お金の戦略はキャリア戦略と一体で考えるべき？",
  "元コンサルの1級FPはどんなポートフォリオを組んでいる？",
];

export default function FaqSection() {
  return (
    <section className="py-14" style={{ background: "#F0F4FA" }}>
      <div className="container">
        <h2
          className="font-black text-[24px] leading-snug mb-2"
          style={{ color: "#1a2a4a" }}
        >
          こんな疑問にも<br />
          <span style={{ color: "#E8460A" }}>ロジカル</span>
          に答えます
        </h2>
        <p className="text-[15px] mb-8" style={{ color: "#6B7280" }}>
          コンサル職の皆さんの鋭い質問にも正面から答えます。
        </p>

        <div className="flex flex-col gap-2.5">
          {questions.map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 bg-white"
              style={{
                border: "1.5px solid #1a2a4a",
                borderRadius: "4px",
              }}
            >
              <span
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[12px] font-black text-white mt-0.5"
                style={{
                  background: "#E8460A",
                  borderRadius: "3px",
                  minWidth: "24px",
                }}
              >
                Q
              </span>
              <p
                className="text-[15px] leading-snug font-medium"
                style={{ color: "#1a2a4a" }}
              >
                {q}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
