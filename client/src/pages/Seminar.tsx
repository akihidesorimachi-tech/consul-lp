/* Seminar — 1級FPの資産形成術オンラインセミナー予約フォーム
   ★ Booking.tsxと同じDOM直接操作方式で実装（React state不使用）
   元HTMLのdocument.getElementById()をそのまま移植 */
import { useEffect } from "react";
import { Link } from "wouter";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyudktYiPpEltu2PuCI2XxINFmuAnTwlGXIQTKrhNUmUJASgbBUmrXG_l7eRoy5W-MF/exec";

export default function Seminar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    init();

    // プルダウン変更時: selected-slot-label hidden inputに値をセット
    const slotSelect = document.getElementById("slot-select") as HTMLSelectElement | null;
    if (slotSelect) {
      slotSelect.addEventListener("change", function () {
        const label = this.options[this.selectedIndex]?.text ?? "";
        const hidden = document.getElementById("selected-slot-label") as HTMLInputElement | null;
        if (hidden) hidden.value = this.value === "" ? "" : label;
      });
    }
  }, []);

  async function init() {
    try {
      const res = await fetch(`${GAS_URL}?t=${Date.now()}`);
      const data = await res.json();
      const select = document.getElementById("slot-select") as HTMLSelectElement | null;
      if (!select) return;
      if (!data.slots || data.slots.length === 0) {
        const opt = document.createElement("option");
        opt.value = "";
        opt.innerText = "現在、予約可能な日程がありません";
        select.appendChild(opt);
        select.disabled = true;
      } else {
        data.slots.forEach((slot: { value: string; label: string }) => {
          const opt = document.createElement("option");
          opt.value = slot.value;
          opt.innerText = slot.label;
          if (slot.label.includes("(日)")) opt.style.color = "red";
          select.appendChild(opt);
        });
      }
    } catch {
      alert("スケジュールの取得に失敗しました");
    }
    const loader = document.getElementById("seminar-loader");
    if (loader) loader.style.display = "none";
  }

  function showConfirmation() {
    const timeValue = (document.getElementById("slot-select") as HTMLSelectElement)?.value;
    const timeLabel = (document.getElementById("selected-slot-label") as HTMLInputElement)?.value;
    const name = (document.getElementById("user-name") as HTMLInputElement)?.value;
    const email = (document.getElementById("user-email") as HTMLInputElement)?.value;

    if (!name || !email || !timeValue) {
      alert("必須項目をすべて入力し、日時を選択してください。");
      return;
    }

    const age = (document.getElementById("user-age") as HTMLSelectElement)?.value;
    const phone = (document.getElementById("user-phone") as HTMLInputElement)?.value || "未入力";
    const message = (document.getElementById("user-message") as HTMLTextAreaElement)?.value || "特になし";

    const confirmContent = document.getElementById("confirm-content");
    if (confirmContent) {
      confirmContent.innerHTML = `
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">お名前</p><p class="font-bold">${name}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">年代</p><p class="font-bold">${age}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">メールアドレス</p><p class="font-bold">${email}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">電話番号</p><p class="font-bold">${phone}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold text-blue-600">参加希望日時</p><p class="font-bold text-blue-600">${timeLabel}</p></div>
        <div class="pb-1"><p class="text-slate-400 text-[10px] font-bold">特に聞きたい内容</p><p class="font-bold">${message.replace(/\n/g, "<br>")}</p></div>
      `;
    }

    document.getElementById("input-section")?.classList.add("hidden");
    document.getElementById("confirm-section")?.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  function hideConfirmation() {
    document.getElementById("confirm-section")?.classList.add("hidden");
    document.getElementById("input-section")?.classList.remove("hidden");
  }

  async function submitBooking() {
    const btn = document.getElementById("submitBtn") as HTMLButtonElement | null;
    if (btn) { btn.disabled = true; btn.innerText = "送信中..."; }

    const payload = {
      name:     (document.getElementById("user-name") as HTMLInputElement)?.value,
      email:    (document.getElementById("user-email") as HTMLInputElement)?.value,
      phone:    (document.getElementById("user-phone") as HTMLInputElement)?.value || "-",
      age:      (document.getElementById("user-age") as HTMLSelectElement)?.value,
      location: "オンライン",
      station:  "-",
      time:     (document.getElementById("selected-slot-label") as HTMLInputElement)?.value,
      message:  (document.getElementById("user-message") as HTMLTextAreaElement)?.value,
    };

    try {
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      // GA4にセミナー申込完了イベントを送信
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "seminar_reservation",
        });
      }
      const root = document.getElementById("seminar-root");
      if (root) {
        root.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:80vh; text-align:center; padding:20px; font-family:sans-serif;">
            <div style="font-size:60px; margin-bottom:20px;">✅</div>
            <h1 style="font-size:22px; font-weight:bold; margin-bottom:10px;">セミナー申込を完了しました</h1>
            <div style="color:#64748b; font-size:14px; line-height:1.8; margin-bottom:20px;">
              <p>お申し込みありがとうございます。確認メールをお送りしましたのでご確認ください。</p>
              <p style="margin-top:10px; font-weight:bold; color:#ef4444;">※メールが来ない場合は迷惑メールフォルダもご確認ください。</p>
              <div style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:15px;">
                <p>メールが届かない場合には下記までご連絡ください。</p>
                <p style="font-weight:bold; color:black;">info@logicalfp.com</p>
                <p style="font-weight:bold; color:black;">070-9097-3341</p>
              </div>
            </div>
            <a href="${import.meta.env.BASE_URL}" style="margin-top:30px; color:#1a2a4a; font-weight:bold; text-decoration:none; border:2px solid #1a2a4a; padding:12px 24px; border-radius:4px;">LPに戻る</a>
          </div>
        `;
      }
    } catch {
      alert("送信エラーが発生しました。もう一度お試しください。");
      if (btn) { btn.disabled = false; btn.innerText = "予約申込を確定する"; }
    }
  }

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-white border-b-2 px-5 py-3 flex items-center justify-between"
        style={{ borderColor: "#1a2a4a" }}
      >
        <Link href="/" className="flex items-baseline gap-1 no-underline">
          <span className="text-[10px] text-gray-400 tracking-wide">powered by</span>
          <span className="text-[20px] font-black tracking-wide" style={{ color: "#1a2a4a" }}>
            Growpal
          </span>
        </Link>
        <Link
          href="/"
          className="text-[12px] font-bold no-underline px-3 py-1.5"
          style={{ color: "#1a2a4a", border: "1.5px solid #1a2a4a", borderRadius: "4px" }}
        >
          ← LPに戻る
        </Link>
      </header>

      {/* Loader overlay */}
      <div
        id="seminar-loader"
        style={{
          position: "fixed", inset: 0, background: "white", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold",
        }}
      >
        開催スケジュールを取得中...
      </div>

      <div
        id="seminar-root"
        className="p-4 pb-20 max-w-[640px] mx-auto"
        style={{ background: "#f8fafc", minHeight: "100vh" }}
      >
        {/* ===== 入力画面 ===== */}
        <div id="input-section">
          <header className="mb-4">
            <h1 className="text-lg font-bold text-slate-800">1級FPの資産形成術オンラインセミナー</h1>
            <p className="text-[13px] font-bold text-slate-700 mt-1">必要事項を入力し、参加希望日を選択してください</p>
          </header>

          <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            {/* お名前 */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block after:content-['_*'] after:text-red-600">お名前</label>
              <input id="user-name" type="text" placeholder="例：山田 太郎"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
            </div>

            {/* 年代 */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block after:content-['_*'] after:text-red-600">年代</label>
              <select id="user-age" defaultValue="30代" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代">50代</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* メールアドレス */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block after:content-['_*'] after:text-red-600">メールアドレス (半角のみ)</label>
              <input id="user-email" type="email" placeholder="example@mail.com"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                onInput={(e) => { const t = e.target as HTMLInputElement; t.value = t.value.replace(/[^\x20-\x7e]/g, ""); }} />
            </div>

            {/* 電話番号 */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">電話番号（任意）（メールが届かない場合に備え可能であればご入力ください）</label>
              <input id="user-phone" type="tel" placeholder="例：09012345678" inputMode="numeric"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                onInput={(e) => { const t = e.target as HTMLInputElement; t.value = t.value.replace(/[^0-9]/g, ""); }} />
            </div>

            {/* 参加希望日 — hidden inputで選択ラベルを保持（元HTML方式） */}
            <input type="hidden" id="selected-slot-label" />
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-500 block after:content-['_*'] after:text-red-600">参加希望日の選択</label>
              <div className="relative">
                <select id="slot-select"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm appearance-none pr-8">
                  <option value="">選択してください</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
              </div>
              <p className="text-[11px] text-slate-500">※現在予約可能な日程が表示されています</p>
            </div>

            {/* 特に聞きたい内容 */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">特に聞きたい内容（任意）</label>
              <textarea id="user-message" rows={3}
                placeholder="例：毎月いくら積み立てるべきか、自分にあった投資先はなにかなど"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm resize-none" />
            </div>

            <button type="button" onClick={showConfirmation}
              className="w-full py-4 bg-black text-white font-bold rounded-xl active:scale-95 transition-all">
              確認画面へ進む
            </button>
          </div>
        </div>

        {/* ===== 確認画面 ===== */}
        <div id="confirm-section" className="hidden">
          <header className="mb-4">
            <h1 className="text-lg font-bold text-slate-800">入力内容の確認</h1>
            <p className="text-[13px] font-bold text-slate-700 mt-1">内容に間違いがなければ「予約申込を確定する」を押してください</p>
          </header>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div id="confirm-content" className="space-y-3 text-sm" />
          </div>
          <div className="flex flex-col gap-3">
            <button id="submitBtn" type="button" onClick={submitBooking}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-all disabled:opacity-60">
              予約申込を確定する
            </button>
            <button type="button" onClick={hideConfirmation}
              className="w-full py-4 bg-gray-200 text-slate-600 font-bold rounded-xl active:scale-95 transition-all">
              修正する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
