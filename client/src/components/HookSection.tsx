/* HookSection — White bg, navy border cards, orange numbers */
const hookCards = [
  {
    num: "01",
    text: "日々の業務で資産形成に\n時間を割けない",
  },
  {
    num: "02",
    text: "高収入だからこそ\n資産運用の影響が大きい",
  },
  {
    num: "03",
    text: "なんとなくではなく\nロジカルに理解したい",
  },
];

export default function HookSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <h2
          className="font-black text-[22px] leading-snug mb-8"
          style={{ color: "#1a2a4a" }}
        >
          忙しいコンサル職こそ<br />
          <span style={{ color: "#E8460A" }}>効率的に</span>
          答えを知りたくない？
        </h2>

        <div className="flex flex-col gap-4">
          {hookCards.map((card, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-white"
              style={{
                border: "2px solid #1a2a4a",
                borderRadius: "4px",
                boxShadow: "3px 3px 0 #1a2a4a",
              }}
            >
              <span
                className="text-[28px] font-black flex-shrink-0 leading-none"
                style={{ color: "#E8460A", fontFamily: "Georgia, serif" }}
              >
                {card.num}
              </span>
              <p
                className="text-[15px] font-bold leading-relaxed"
                style={{ color: "#1a2a4a" }}
              >
                {card.text.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < card.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
