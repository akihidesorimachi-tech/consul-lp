/* FeeSection — White bg, navy/orange sketch style, donut chart */
import { useEffect, useRef } from "react";

declare const Chart: any;

const feeData = [
  { label: "5,000円未満", value: 14.2, color: "#CBD5E1" },
  { label: "5,000〜10,000円未満", value: 47.3, color: "#1e3a6e" },
  { label: "10,000〜20,000円未満", value: 33.5, color: "#1a2a4a" },
  { label: "20,000円以上", value: 5.0, color: "#E8460A" },
];

export default function FeeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (typeof Chart === "undefined") return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: feeData.map((d) => d.label),
        datasets: [{
          data: feeData.map((d) => d.value),
          backgroundColor: feeData.map((d) => d.color),
          borderColor: "#fff",
          borderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        responsive: true,
        cutout: "60%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx: any) => `${ctx.label}: ${ctx.parsed}%` },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <section className="py-14 bg-white">
      <div className="container">
        <h2
          className="font-black text-[24px] leading-snug mb-2"
          style={{ color: "#1a2a4a" }}
        >
          通常、FP相談は
          <span style={{ color: "#E8460A" }}>有料</span>
          です
        </h2>
        <p className="text-[15px] mb-8" style={{ color: "#6B7280" }}>
          日本FP協会の調査（2021年度）によると、1時間あたりの相談料は…
        </p>

        <div className="max-w-[240px] mx-auto mb-5">
          <canvas ref={canvasRef} />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-8">
          {feeData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
              <span className="text-[13px]" style={{ color: "#6B7280" }}>
                {d.label} {d.value}%
              </span>
            </div>
          ))}
        </div>

        {/* Highlight */}
        <div
          className="px-6 py-7 text-center"
          style={{
            background: "#1a2a4a",
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            boxShadow: "4px 4px 0 #E8460A",
          }}
        >
          <p className="text-[13px] mb-3 tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
            今回の相談料
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
            <span className="text-[14px] line-through" style={{ color: "rgba(255,255,255,0.4)" }}>
              通常 5,000〜20,000円/時間
            </span>
            <span className="text-[18px]" style={{ color: "#E8460A" }}>→</span>
            <span
              className="text-[36px] font-black text-white"
              style={{ letterSpacing: "0.02em" }}
            >
              完全無料
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
