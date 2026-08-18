/* FormSection — Navy bg, white cards, orange CTA, sketch style */
import { Link } from "wouter";

// GA4イベント送信ヘルパー
function sendGa4Event(eventName: string, params: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
}

const formCards = [
  {
    icon: "👤",
    title: "個別相談",
    desc: "1級FPの話を\nマンツーマンで聞きたい",
    link: "/booking",
    accentColor: "#E8460A",
    internal: true,
    external: false,
    timeInfo: "30分〜延長可 ・ 21時以降も対応可",
    ga4Event: null, // 完了画面で送信するため不要
  },
  {
    icon: "🎤",
    title: "オンラインセミナー参加",
    desc: "セミナー形式（60分）で\n1級FPの話を聞きたい",
    link: "/seminar",
    accentColor: "#1e3a6e",
    internal: true,
    external: false,
    timeInfo: "",
    ga4Event: null, // 完了画面で送信するため不要
  },
  {
    icon: "💼",
    title: "キャリア相談",
    desc: "キャリアの相談を\n専門家にしたい",
    link: "https://growpal-inc.com/#contact",
    accentColor: "#1a2a4a",
    internal: false,
    external: true,
    timeInfo: "30分〜延長可",
    ga4Event: { eventName: "generate_lead", params: { event_category: "form", event_label: "career_consultation" } },
  },
];

function CardInner({ card }: { card: typeof formCards[0] }) {
  return (
    <div
      className="flex items-center gap-5 bg-white transition-transform active:scale-[0.99]"
      style={{
        border: "2px solid white",
        borderRadius: "4px",
        boxShadow: `4px 4px 0 ${card.accentColor}`,
        padding: "20px",
      }}
    >
      <div
        className="text-[32px] w-14 h-14 flex items-center justify-center flex-shrink-0"
        style={{
          background: "#F0F4FA",
          border: `2px solid ${card.accentColor}`,
          borderRadius: "4px",
        }}
      >
        {card.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-[18px] font-black mb-1" style={{ color: "#1a2a4a" }}>
          {card.title}
        </h3>
        <p className="text-[14px] mb-3 leading-relaxed" style={{ color: "#6B7280" }}>
          {card.desc.split("\n").map((line, j) => (
            <span key={j}>
              {line}
              {j < card.desc.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="inline-block text-[14px] font-bold px-4 py-1.5 text-white"
            style={{ background: card.accentColor, borderRadius: "3px" }}
          >
            申し込む →
          </span>
          {card.timeInfo && (
            <span className="text-[11px] font-medium" style={{ color: "#6B7280" }}>
              {card.timeInfo}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FormSection() {
  return (
    <section className="py-14" id="form" style={{ background: "#1a2a4a" }}>
      <div className="container">
        <h2 className="font-black text-[24px] leading-snug mb-2 text-white">
          無料相談に<span style={{ color: "#FF6B35" }}>申し込む</span>
        </h2>
        <div className="flex items-center gap-3 mb-6">
          <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            ご希望の形式をお選びください
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(232,70,10,0.15)",
              border: "1px solid #E8460A",
              borderRadius: "3px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: "900",
              color: "#FF6B35",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            <span style={{
              width: "6px",
              height: "6px",
              background: "#E8460A",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse 1.5s infinite",
            }} />
            先着順 ・ 週5名限定
          </span>
        </div>

        {/* 稼働時間の都合上申込枠に限りがありますの注記 */}
        <div
          style={{
            background: "rgba(232,70,10,0.08)",
            border: "1px solid rgba(232,70,10,0.3)",
            borderRadius: "4px",
            padding: "10px 14px",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.7", margin: 0 }}>
            ⚠️ FPの稼働時間の都合上、申込枠に限りがあります。先着順ですので、申し込みはお早めに。
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {formCards.map((card, i) =>
            card.internal ? (
              <Link key={i} href={card.link} className="no-underline block">
                <CardInner card={card} />
              </Link>
            ) : (
              <a
                key={i}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline block"
                onClick={() => {
                  if (card.ga4Event) {
                    sendGa4Event(card.ga4Event.eventName, card.ga4Event.params);
                  }
                }}
              >
                <CardInner card={card} />
              </a>
            )
          )}
        </div>

      </div>
    </section>
  );
}
