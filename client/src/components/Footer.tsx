/* Footer — Dark navy bg, white text */
import { useState } from "react";

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "6px",
          maxWidth: "560px",
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "28px 24px 24px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "900", color: "#1a2a4a", marginBottom: "20px" }}>
          プライバシーポリシー
        </h2>

        {[
          {
            title: "１．個人情報の管理",
            body: "当事務局は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・職員教育の徹底等の必要な措置を講じ、安全対策を実施し、個人情報の厳重な管理を行ないます。",
          },
          {
            title: "２．個人情報の利用目的",
            body: "お客様からお預かりした個人情報は、当事務局からのご連絡やご質問に対する回答のご送付のために利用いたします。",
          },
          {
            title: "３．個人情報の第三者への開示・提供の禁止",
            body: "当事務局は、お客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。\n・お客様の同意がある場合\n・お客様が希望されるサービスを行なうために当事務局が業務を委託する業者に対して開示する場合\n・法令に基づき開示することが必要である場合",
          },
          {
            title: "４．個人情報の安全対策",
            body: "当事務局は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。",
          },
          {
            title: "５．個人情報の訂正等について",
            body: "お客様がご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。",
          },
          {
            title: "６．法令、規範の遵守と見直し",
            body: "当事務局は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。",
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: "18px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", color: "#1a2a4a", marginBottom: "6px" }}>
              {item.title}
            </p>
            <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.8", whiteSpace: "pre-line", margin: 0 }}>
              {item.body}
            </p>
          </div>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: "8px",
            width: "100%",
            padding: "12px",
            background: "#1a2a4a",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "700",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <footer
        className="px-5 pt-10"
        style={{ background: "#0d1a2e", color: "rgba(255,255,255,0.55)", paddingBottom: "80px" }}
      >
        <div className="max-w-[640px] mx-auto">
          {/* Logo */}
          <a
            href="https://growpal-inc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline gap-1 no-underline mb-6"
          >
            <span className="text-[10px] text-gray-500 tracking-wide">powered by</span>
            <span
              className="text-[20px] font-black text-white tracking-wide"
              style={{ letterSpacing: "0.04em" }}
            >
              Growpal
            </span>
          </a>

          {/* Contact */}
          <div className="mb-6">
            <p
              className="text-[12px] tracking-widest mb-2 uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              お問い合わせ
            </p>
            <p className="text-[16px] font-black mb-3" style={{ color: "rgba(255,255,255,0.85)" }}>
              Growpal×1級FP 事務局
            </p>
            <p className="text-[15px] mb-1.5">
              📞{" "}
              <a
                href="tel:07090973341"
                className="underline"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                070-9097-3341
              </a>
            </p>
            <p className="text-[15px] mb-5">
              ✉️{" "}
              <a
                href="mailto:info@logicalfp.com"
                className="underline"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                info@logicalfp.com
              </a>
            </p>

            {/* プライバシーポリシーボタン — メールの下 */}
            <button
              onClick={() => setShowPrivacy(true)}
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "3px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              プライバシーポリシー
            </button>
          </div>

          {/* コピーライト */}
          <p
            className="text-[12px] pt-4 pb-4"
            style={{
              color: "rgba(255,255,255,0.35)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            © 2025 Growpal Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
