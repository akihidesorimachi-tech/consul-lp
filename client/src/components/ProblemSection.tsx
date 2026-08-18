/* ProblemSection — doctor.logicalfp.pro の内容を忠実に再現。配色のみ変更（赤→オレンジ） */
import { useEffect, useRef } from "react";

const crashes = [
  { name: "世界恐慌", drop: "約86%下落", recovery: "回復に25年" },
  { name: "オイルショック", drop: "約46%下落", recovery: "回復に9年" },
  { name: "ITバブル崩壊", drop: "約49%下落", recovery: "回復に7年" },
  { name: "リーマンショック", drop: "約56%下落", recovery: "回復に6年" },
];

const inflationData = [
  { age: "30歳", multiplier: 1.0 },
  { age: "65歳", multiplier: 2.0 },
  { age: "75歳", multiplier: 2.43 },
  { age: "85歳", multiplier: 2.97 },
  { age: "95歳", multiplier: 3.62 },
];

function InflationChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const padL = 36, padR = 16, padT = 24, padB = 36;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    ctx.clearRect(0, 0, W, H);

    const yMax = 4.0;
    const yLabels = [{ label: "1倍", val: 1 }, { label: "2倍", val: 2 }, { label: "3倍", val: 3 }];
    ctx.fillStyle = "#666";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    yLabels.forEach(({ label, val }) => {
      const y = padT + chartH - (val / yMax) * chartH;
      ctx.fillText(label, padL - 4, y + 4);
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();
    });

    ctx.textAlign = "center";
    inflationData.forEach((d, i) => {
      const x = padL + (i / (inflationData.length - 1)) * chartW;
      ctx.fillStyle = "#666";
      ctx.fillText(d.age, x, H - 4);
    });

    const gradient = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    gradient.addColorStop(0, "rgba(232,70,10,0.25)");
    gradient.addColorStop(1, "rgba(232,70,10,0.02)");
    ctx.beginPath();
    inflationData.forEach((d, i) => {
      const x = padL + (i / (inflationData.length - 1)) * chartW;
      const y = padT + chartH - (d.multiplier / yMax) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padL + chartW, padT + chartH);
    ctx.lineTo(padL, padT + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#E8460A";
    ctx.lineWidth = 2.5;
    inflationData.forEach((d, i) => {
      const x = padL + (i / (inflationData.length - 1)) * chartW;
      const y = padT + chartH - (d.multiplier / yMax) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    inflationData.forEach((d, i) => {
      if (i === 0) return;
      const x = padL + (i / (inflationData.length - 1)) * chartW;
      const y = padT + chartH - (d.multiplier / yMax) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#E8460A";
      ctx.fill();
      ctx.fillStyle = "#1a2a4a";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${d.multiplier}倍`, x, y - 8);
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={180}
      style={{ width: "100%", maxWidth: "320px", display: "block" }}
    />
  );
}

export default function ProblemSection() {
  return (
    <section style={{ background: "#f9f7f4", padding: "40px 0" }}>
      <div className="container">

        <p style={{ fontSize: "11px", fontWeight: "900", letterSpacing: "0.15em", color: "#E8460A", marginBottom: "24px" }}>
          PROBLEM
        </p>

        {/* Problem 1 */}
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#1a2a4a", marginBottom: "12px", lineHeight: "1.4" }}>
            1．暴落時にどうする？
          </h2>
          <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", marginBottom: "16px" }}>
            S&P500は以下のように何度も暴落を繰り返しています。個別株よりは低リスクではあるものの、カテゴリとしてはリスク資産です。
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            {crashes.map((c) => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1.5px solid #e5e0d8", borderRadius: "4px", padding: "10px 14px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#1a2a4a" }}>{c.name}</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#E8460A" }}>{c.drop}（{c.recovery}）</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF8F0", border: "1.5px solid #E8460A", borderRadius: "4px", padding: "12px 14px", marginBottom: "12px" }}>
            <p style={{ fontSize: "13px", color: "#1a2a4a", lineHeight: "1.7", margin: 0 }}>
              ⚠️ そんな時に<strong>住宅購入・子の教育費・転職</strong>など人生の大きなイベントが重なった場合、<strong>リスク資産だけでは対応できません。</strong>
              <br />⚠️ 或いは老後に発生したら…？「どう増やすか」だけでなく、「どう使うか」の<strong>出口戦略</strong>が重要です
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "#fff", border: "1.5px solid #1a2a4a", borderRadius: "4px" }}>
            <span style={{ color: "#E8460A", fontWeight: "900", fontSize: "16px" }}>▶</span>
            <p style={{ fontSize: "13px", color: "#1a2a4a", fontWeight: "700", margin: 0, lineHeight: "1.5" }}>
              とは言え、投資を控えてしまうと更に大きなリスクを抱えることになります。
            </p>
          </div>
        </div>

        {/* Problem 2 */}
        <div style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#1a2a4a", marginBottom: "12px", lineHeight: "1.4" }}>
            2．現金比率が高いのも危ない
          </h2>
          <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.7", marginBottom: "16px" }}>
            暴落を恐れて現金の比率を高め過ぎるのもそれはそれでリスクとなります。インフレ時代に突入した今、現金で長期の資金を貯めるのは困難を伴います。
          </p>

          <div style={{ background: "#fff", border: "1.5px solid #e5e0d8", borderRadius: "6px", padding: "14px", marginBottom: "10px" }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1a2a4a", marginBottom: "10px", textAlign: "center" }}>
              2%インフレが進んだ場合の物価の変化
            </p>
            <InflationChart />
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#E8460A", textAlign: "center", marginTop: "8px" }}>
              65歳時には物価が現在の約2倍、85歳では約3倍に！
            </p>
          </div>

          <div style={{ background: "#fff", border: "1.5px solid #e5e0d8", borderRadius: "6px", padding: "14px", marginBottom: "14px" }}>
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#1a2a4a", marginBottom: "12px", textAlign: "center" }}>
              老後に月30万円ずつ取り崩す場合の必要金額
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, background: "#f9f7f4", border: "1.5px solid #e5e0d8", borderRadius: "4px", padding: "10px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", color: "#666", marginBottom: "4px" }}>インフレなし</p>
                <p style={{ fontSize: "20px", fontWeight: "900", color: "#1a2a4a", margin: "0 0 2px" }}>1億800万円</p>
                <p style={{ fontSize: "10px", color: "#888" }}>65歳から30年分</p>
              </div>
              <span style={{ fontSize: "20px", color: "#E8460A", fontWeight: "900" }}>→</span>
              <div style={{ flex: 1, background: "#FFF8F0", border: "2px solid #E8460A", borderRadius: "4px", padding: "10px", textAlign: "center" }}>
                <p style={{ fontSize: "11px", color: "#E8460A", fontWeight: "700", marginBottom: "4px" }}>2%インフレ時</p>
                <p style={{ fontSize: "20px", fontWeight: "900", color: "#E8460A", margin: "0 0 2px" }}>2億6600万円</p>
                <p style={{ fontSize: "10px", color: "#E8460A" }}>必要額が約2.5倍に</p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.7" }}>
            高収入のコンサルと言えど、この金額を貯めるのは容易ではありません。貯める額を気にし過ぎて今楽しくお金を使えないこともストレスになるでしょう。
          </p>
        </div>

        {/* Bridge to answer */}
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "6px" }}>この問題を解決する</p>
          <p style={{ fontSize: "20px", fontWeight: "900", color: "#1a2a4a" }}>
            コンサルのお金の答えは・・・
          </p>
        </div>

      </div>
    </section>
  );
}
