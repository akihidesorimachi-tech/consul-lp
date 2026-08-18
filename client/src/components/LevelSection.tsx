/* LevelSection — White bg, navy/orange sketch style tabs */
import { useState } from "react";

function scrollToForm(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
}

type Level = "beginner" | "elementary" | "intermediate" | "advanced";

const tabs: { id: Level; name: string; desc: string }[] = [
  { id: "beginner", name: "初心者", desc: "現預金のみ" },
  { id: "elementary", name: "初級者", desc: "オルカンなど少額" },
  { id: "intermediate", name: "中級者", desc: "インデックス中心" },
  { id: "advanced", name: "上級者", desc: "個別株や債券も" },

];

type PanelData = {
  headerBg: string;
  title: string;
  subtitle: string;
  points: { title: string; body: string }[];
  ctaText: string;
  ctaLink: string;
  ctaBtnText: string;
};

const panels: Record<Level, PanelData> = {
  beginner: {
    headerBg: "#1a2a4a",
    title: "初心者の方へ",
    subtitle: "「何かしなきゃ」と思いつつ、手をつけられていない方",
    points: [
      { title: "インフレ時代、銀行預金だけでは危険", body: "インフレ（物価上昇）に対して現預金の価値は目減りし続けます。高年収であってもインフレ次第では老後に資産が枯渇する可能性は十分にあります。" },
      { title: "まずはNISAでインデックス投資から", body: "投資はNISA枠でインデックス投資が正解と言われています。インデックス投資とは何か、毎月いくらくらい積み立てた方が良いのか、初心者にも丁寧にロジカルに解説します。" },
      { title: "安全資産も持つべき", body: "安全資産（債券・保険・金など）を組み合わせることで、暴落時も安心です。投資が怖いという方は安全資産だけでも検討してみては？インフレには負けにくくなりますよ。" },
    ],
    ctaText: "具体的な始め方・金額設定は\n1級FPへの無料相談で解決できます",
    ctaLink: "#form",
    ctaBtnText: "無料で１級FPに相談する →",
  },
  elementary: {
    headerBg: "#1e3a6e",
    title: "初級の方へ",
    subtitle: "なんとなくインデックス投資少額",
    points: [
      { title: "現預金が圧倒的に多い状態はインフレ負け", body: "少額の投資をしていても、残りが全部現預金では資産全体でインフレに負け続けていき、将来資産が枯渇する恐れがあります。比率の最適化が必要です。" },
      { title: "「なぜオルカンが良いか」説明できますか？", body: "周囲の情報で始めたものの、メリットデメリットを理解せずに投資するのは危険です。理解は安心とリスク回避につながります。" },
      { title: "将来困らないために必要な積み立て額から逆算する。", body: "インデックス投資を理解すれば安心して投資への予算を上げることができます。\n将来からの逆算も踏まえて必要な積み立てをすることが重要です。" },
    ],
    ctaText: "具体的なメリットデメリットや金額は\n1級FPと考えるのが効率的です",
    ctaLink: "#form",
    ctaBtnText: "無料で１級FPに相談する →",
  },
  intermediate: {
    headerBg: "#1a2a4a",
    title: "中級の方へ",
    subtitle: "貯蓄のほとんどをインデックス投資に回している方",
    points: [
      { title: "オルカン・S&P500は「安全」ではない", body: "S&P500は以下のように何度も暴落を繰り返しています。個別株よりは低リスクではあるものの、カテゴリとしてはリスク資産です。\n\n• ITバブル崩壊：約49%下落（回復に7年）\n• リーマンショック：56%下落（回復に6年）" },
      { title: "暴落時に大きな出費が重なったら？", body: "住宅購入・子どもの教育費・転職など、人生の大きなイベントが暴落と重なった場合、リスク資産だけでは対応できません。" },
      { title: "安全資産をパートナーとして組み込む", body: "債券・保険・金などの安全資産があることで暴落時にリスク資産を使わずに凌ぐことができ、結果的にリスク資産のパフォーマンスを上げることに繋がります。" },
      { title: "そもそもオルカン・S&P500がベストか？", body: "FANG+等のハイボラティリティなインデックス＋安全資産の組み合わせは、オルカンやS&P500等へ集中投資した際のパフォーマンスを期待値上遥かに上回ります。\nシミュレーションを行いあなたにとってベストな選択をしましょう。" },
    ],
    ctaText: "ポートフォリオの最適化は\n1級FPとの無料相談で",
    ctaLink: "#form",
    ctaBtnText: "無料で１級FPに相談する →",
  },
  advanced: {
    headerBg: "#1e3a6e",
    title: "上級の方へ",
    subtitle: "FANG+や個別株・債券なども保有している方",
    points: [
      { title: "しっかり取り組んでいる、素晴らしい！", body: "ここまで自分で考えて行動できている方は少数です。その姿勢は本業にも活きているはずです。" },
      { title: "お金のことを考えすぎると本業に影響も", body: "コンサルの本業で最大のパフォーマンスを発揮するためにも、資産管理に使う認知リソースは最小化すべきです。" },
      { title: "現状のバランスは本当にベストか？", body: "専門家のセカンドオピニオンを聞くことで、見落としや改善点が見つかることがあります。" },
      { title: "1級FP自身のポートフォリオも公開", body: "元コンサルの1級FP自身がどのようなポートフォリオを組んでいるか、具体的な参考情報として共有します。" },
    ],
    ctaText: "セカンドオピニオンとして\n1級FPの無料相談を活用する",
    ctaLink: "#form",
    ctaBtnText: "無料で１級FPに相談する →",
  },

};

export default function LevelSection() {
  const [active, setActive] = useState<Level>("beginner");
  const panel = panels[active];

  return (
    <section className="py-14 bg-white" id="level-section">
      <div className="container">
        <h2
          className="font-black text-[24px] leading-snug mb-2"
          style={{ color: "#1a2a4a" }}
        >
          あなたの資産の現状は？
        </h2>
        <p className="text-[15px] mb-6" style={{ color: "#6B7280" }}>
          タップして、現状に合ったアドバイスを受け取ってください。
        </p>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-6">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="flex flex-col items-center gap-0.5 py-2.5 px-1 text-center transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: "#E8460A",
                        border: "2px solid #1a2a4a",
                        borderRadius: "4px",
                        color: "white",
                        boxShadow: "2px 2px 0 #1a2a4a",
                      }
                    : {
                        background: "white",
                        border: "2px solid #E5E7EB",
                        borderRadius: "4px",
                        color: "#1a2a4a",
                      }
                }
              >
                <span
                  className="text-[13px] font-black block leading-tight"
                  style={{ color: isActive ? "white" : "#1a2a4a" }}
                >
                  {tab.name}
                </span>
                <span
                  className="text-[12px] block leading-tight"
                  style={{ color: isActive ? "rgba(255,255,255,0.85)" : "#9CA3AF" }}
                >
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          key={active}
          className="fade-in-up overflow-hidden"
          style={{
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 #1a2a4a",
          }}
        >
          {/* Panel Header */}
          <div
            className="text-white text-center px-6 py-6"
            style={{ background: panel.headerBg }}
          >
            <h3 className="text-[22px] font-black mb-1.5">{panel.title}</h3>
            <p className="text-[15px] opacity-90">{panel.subtitle}</p>
          </div>

          {/* Panel Body */}
          <div className="bg-white px-6 py-6">
            {panel.points.map((point, i) => (
              <div
                key={i}
                className="flex gap-4 pb-5 mb-5 border-b last:border-b-0 last:pb-0 last:mb-0"
                style={{ borderColor: "#E5E7EB" }}
              >
                <span
                  className="text-[24px] font-black flex-shrink-0 leading-none pt-0.5"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#E8460A",
                    opacity: 0.4,
                    minWidth: "32px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong
                    className="block text-[16px] font-black mb-1.5 leading-snug"
                    style={{ color: "#1a2a4a" }}
                  >
                    {point.title}
                  </strong>
                  <div className="text-[14px] leading-relaxed" style={{ color: "#6B7280" }}>
                    {point.body.split("\n").map((line, li) =>
                      line.startsWith("•") ? (
                        <div key={li} className="flex gap-1.5 mt-1">
                          <span className="flex-shrink-0" style={{ color: "#E8460A" }}>•</span>
                          <span>{line.slice(1).trim()}</span>
                        </div>
                      ) : line === "" ? (
                        <div key={li} className="h-1" />
                      ) : (
                        <p key={li} className="mt-0">{line}</p>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div
              className="p-5 text-center mt-2"
              style={{ background: "#F0F4FA", borderRadius: "4px" }}
            >
              <p className="text-[15px] mb-4 leading-relaxed" style={{ color: "#1a2a4a" }}>
                {panel.ctaText.split("\n").map((line, i) => (
                  <span key={i}>
                    {i === 1 ? <strong>{line}</strong> : line}
                    {i < panel.ctaText.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a
                href={panel.ctaLink}
                onClick={scrollToForm}
                className="inline-block text-white font-black text-[16px] px-7 py-3.5 no-underline transition-transform active:scale-95"
                style={{
                  background: "#E8460A",
                  border: "2px solid #1a2a4a",
                  borderRadius: "4px",
                  boxShadow: "3px 3px 0 #1a2a4a",
                  letterSpacing: "0.02em",
                }}
              >
                {panel.ctaBtnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
