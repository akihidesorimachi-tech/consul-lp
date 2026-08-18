/* FpIntroSection — Cream bg, navy/orange sketch style
 * Design: バナーと統一した白ベース×ネイビー×オレンジ、手書き風
 * Purpose: 1級FPとは何か、その希少性・難易度をデータで示す
 */

export default function FpIntroSection() {
  return (
    <section
      style={{
        background: "#f8f6f0",
        padding: "60px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 背景の手書き風装飾 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(30,58,110,0.04) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(232,70,10,0.04) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px", position: "relative" }}>

        {/* セクションタイトル */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
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
              marginBottom: "14px",
            }}
          >
            ABOUT 1ST CLASS FP
          </div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "900",
              color: "#1a2a4a",
              lineHeight: "1.4",
              margin: "0",
            }}
          >
            そもそも<span style={{ color: "#E8460A" }}>1級FP</span>って？
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#555",
              marginTop: "10px",
              lineHeight: "1.7",
            }}
          >
            1級ファイナンシャル・プランニング技能士は、厚生労働省認可の国家資格でお金のプロとして最高峰の称号です。
          </p>
        </div>

        {/* FP資格の3段階 */}
        <div
          style={{
            background: "#fff",
            border: "2px solid #e8e0d0",
            borderRadius: "4px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "900",
              color: "#1a2a4a",
              marginBottom: "14px",
            }}
          >
            FP資格は3段階ある
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                level: "3級FP",
                desc: "入門レベル。基礎的な知識を習得。",
                bg: "#f8f6f0",
                border: "#ddd",
                color: "#666",
                badge: "",
              },
              {
                level: "2級FP",
                desc: "実務レベル。より広範な相談に対応。",
                bg: "#f0f4ff",
                border: "#c0cce8",
                color: "#1e3a6e",
                badge: "",
              },
              {
                level: "1級FP",
                desc: "最高峰。高度・複合的な相談に対応。国家資格の中でも最難関クラス。",
                bg: "#1a2a4a",
                border: "#1a2a4a",
                color: "#fff",
                badge: "★ 最高峰",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: item.bg,
                  border: `1.5px solid ${item.border}`,
                  borderRadius: "4px",
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    minWidth: "60px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "900",
                      fontSize: "14px",
                      color: item.color,
                    }}
                  >
                    {item.level}
                  </div>
                  {item.badge && (
                    <div
                      style={{
                        background: "#E8460A",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: "700",
                        padding: "1px 6px",
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.badge}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "13px", color: item.color, opacity: i === 2 ? 0.85 : 1, lineHeight: "1.5", flex: 1 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 希少性：FP資格保有者に占める割合 */}
        <div
          style={{
            background: "#1a2a4a",
            border: "2px solid #1a2a4a",
            borderRadius: "4px",
            padding: "20px 24px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "8px",
            }}
          >
            FP資格保有者に占める割合
          </p>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "1",
              fontFamily: "'Noto Sans JP', sans-serif",
            }}
          >
            <span style={{ color: "#E8460A" }}>0.09</span>
            <span style={{ fontSize: "22px" }}>%</span>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              marginTop: "8px",
            }}
          >
            ※FP資格合格者数の累計約670万人中、1級FP約6万人（2026年3月現在）
          </p>
          <div
            style={{
              marginTop: "14px",
              background: "rgba(232,70,10,0.2)",
              border: "1px solid #E8460A",
              borderRadius: "4px",
              padding: "10px 14px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "900",
                color: "#fff",
                margin: "0",
                lineHeight: "1.6",
              }}
            >
              FP保有者の中でも<span style={{ color: "#E8460A" }}>希少な存在</span>
            </p>
          </div>
        </div>

        {/* 1級FPと2級FPの違い */}
        <div
          style={{
            background: "#fff",
            border: "2px solid #e8e0d0",
            borderRadius: "4px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "900",
              color: "#1a2a4a",
              marginBottom: "14px",
            }}
          >
            1級FPと2級FPの違い
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      background: "#f8f6f0",
                      border: "1px solid #ddd",
                      padding: "8px 10px",
                      textAlign: "left",
                      color: "#1a2a4a",
                      fontWeight: "700",
                    }}
                  >
                    項目
                  </th>
                  <th
                    style={{
                      background: "#f8f6f0",
                      border: "1px solid #ddd",
                      padding: "8px 10px",
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    2級FP
                  </th>
                  <th
                    style={{
                      background: "#1a2a4a",
                      border: "1px solid #1a2a4a",
                      padding: "8px 10px",
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  >
                    1級FP ★
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    item: "合格率（過去10年平均）",
                    two: "約30％",
                    one: "約10％",
                    note: "",
                  },
                  {
                    item: "受験資格",
                    two: "3級合格者等",
                    one: "2級合格＋実務1年以上",
                    note: "",
                  },
                  {
                    item: "相談対応範囲",
                    two: "基礎的な相談",
                    one: "高度・複合的な相談",
                    note: "",
                  },
                ].map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px 10px",
                        color: "#333",
                        fontWeight: "600",
                        background: i % 2 === 0 ? "#fff" : "#fafaf8",
                      }}
                    >
                      <div>{row.item}</div>
                      {row.note && (
                        <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                          {row.note}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px 10px",
                        textAlign: "center",
                        color: "#666",
                        background: i % 2 === 0 ? "#fff" : "#fafaf8",
                      }}
                    >
                      {row.two}
                    </td>
                    <td
                      style={{
                        border: "1px solid #1a2a4a",
                        padding: "8px 10px",
                        textAlign: "center",
                        color: "#1a2a4a",
                        fontWeight: "700",
                        background: i % 2 === 0 ? "#f0f4ff" : "#e8eef8",
                      }}
                    >
                      {row.one}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 今回の1級FPの特別さ */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a2a4a 0%, #1e3a6e 100%)",
            border: "3px solid #E8460A",
            borderRadius: "6px",
            boxShadow: "6px 6px 0 #E8460A",
            padding: "28px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* アクセントライン */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#E8460A",
          }} />
          <p
            style={{
              fontSize: "13px",
              fontWeight: "900",
              letterSpacing: "0.15em",
              color: "#E8460A",
              marginBottom: "16px",
              textAlign: "center",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ display: "inline-block", width: "24px", height: "2px", background: "#E8460A" }} />
            今回の1級FPはさらに特別
            <span style={{ display: "inline-block", width: "24px", height: "2px", background: "#E8460A" }} />
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              {
                label: "元コンサル職",
                desc: "自身もコンサルとしての実務経験を持つFPのため、高い問題解決能力を持ち、コンサル職の収入構造・キャリアパスにも精通",
              },
              {
                label: "コンサルやGAFAMの顧客を多数担当",
                desc: "外資コンサル・戦略コンサル・GAFAMなど高収入層の資産相談を多数担当。彼らが納得して採用していく戦略を提案",
              },
              {
                label: "ロジカルな説明が得意",
                desc: "感情論ではなくデータとロジックで資産形成を解説。コンサル職が求めるハイレベルな「なぜ？」に答える",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#E8460A",
                    borderRadius: "50%",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "900",
                      color: "#fff",
                      marginBottom: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      background: "#E8460A",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "900",
                      padding: "2px 7px",
                      borderRadius: "2px",
                      letterSpacing: "0.05em",
                      flexShrink: 0,
                    }}>POINT {i + 1}</span>
                    {item.label}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.75)",
                      marginLeft: "6px",
                    }}
                  >
                    — {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
