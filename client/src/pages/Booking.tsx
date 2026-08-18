/* Booking — 個別FP相談予約フォームページ
   GAS連携カレンダー付き予約フォームをReact iframeで埋め込み
   元のHTMLをそのまま活かしてGAS連携・カレンダー機能を維持する */
import { useEffect, useRef } from "react";
import { Link } from "wouter";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwHdNKv7zZ67Q72ZqRXrIIPhLRykGLUEPL6i-XTA3i0b6DELIsDGbhinezqkGhC_t71Cg/exec";

export default function Booking() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const inputSectionRef = useRef<HTMLDivElement>(null);
  const confirmSectionRef = useRef<HTMLDivElement>(null);
  const selectedDisplayRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const dateHeadersRef = useRef<HTMLDivElement>(null);
  const timeAxisRef = useRef<HTMLDivElement>(null);
  const calendarBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Scroll sync
    const mainScroll = mainScrollRef.current;
    const headerContainer = headerContainerRef.current;
    if (mainScroll && headerContainer) {
      const onScroll = () => {
        headerContainer.scrollLeft = mainScroll.scrollLeft;
      };
      mainScroll.addEventListener("scroll", onScroll);
      return () => mainScroll.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const response = await fetch(`${GAS_URL}?t=${Date.now()}`);
      const data = await response.json();
      render(data.busySlots || []);
    } catch (e) {
      console.error(e);
      render([]);
    }
    if (loaderRef.current) loaderRef.current.style.display = "none";
  }

  function render(busyList: string[]) {
    const dateHeaders = dateHeadersRef.current;
    const timeAxis = timeAxisRef.current;
    const body = calendarBodyRef.current;
    if (!dateHeaders || !timeAxis || !body) return;

    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + 2);

    // Time axis
    for (let h = 8; h <= 21; h++) {
      ["00", "30"].forEach((m) => {
        const l = document.createElement("div");
        l.className = "time-label";
        l.innerText = `${h}:${m}`;
        timeAxis.appendChild(l);
      });
    }

    // Days
    for (let i = 0; i < 21; i++) {
      const cur = new Date(baseDate);
      cur.setDate(baseDate.getDate() + i);
      const isoDate = `${cur.getFullYear()}-${("0" + (cur.getMonth() + 1)).slice(-2)}-${("0" + cur.getDate()).slice(-2)}`;

      const dCell = document.createElement("div");
      dCell.className = "date-cell";
      const colorClass =
        cur.getDay() === 0
          ? "text-red-500"
          : cur.getDay() === 6
          ? "text-blue-500"
          : "text-gray-700";
      dCell.innerHTML = `<span class="text-[9px] font-bold text-gray-400 uppercase">${dayNames[cur.getDay()]}</span><span class="text-sm font-bold ${colorClass}">${cur.getMonth() + 1}/${cur.getDate()}</span>`;
      dateHeaders.appendChild(dCell);

      const col = document.createElement("div");
      col.className = "day-col";

      for (let h = 8; h <= 21; h++) {
        ["00", "30"].forEach((m) => {
          const s = document.createElement("div");
          const timeStr = `${h}:${m}`;
          if (busyList.includes(`${isoDate} ${timeStr}`)) {
            s.className = "slot slot-disabled";
            s.innerText = "ー";
          } else {
            s.className = "slot slot-available";
            s.innerText = "◯";
            s.onclick = () => {
              document.querySelectorAll(".slot-selected").forEach((el) =>
                el.classList.remove("slot-selected")
              );
              s.classList.add("slot-selected");
              const disp = selectedDisplayRef.current;
              if (disp) {
                disp.innerText = `${cur.getMonth() + 1}/${cur.getDate()} ${timeStr}〜`;
                disp.dataset.value = `${isoDate} ${timeStr}`;
              }
            };
          }
          col.appendChild(s);
        });
      }
      body.appendChild(col);
    }
  }

  function toggleStation(show: boolean) {
    const el = document.getElementById("station-name") as HTMLInputElement | null;
    if (!el) return;
    el.classList.toggle("hidden", !show);
    if (show) el.focus();
  }

  function showConfirmation() {
    const name = (document.getElementById("user-name") as HTMLInputElement)?.value;
    const email = (document.getElementById("user-email") as HTMLInputElement)?.value;
    const disp = selectedDisplayRef.current;
    const time = disp?.dataset.value;
    if (!name || !email || !time) {
      alert("必須項目をすべて入力し、日時を選択してください。");
      return;
    }
    const loc = (document.querySelector('input[name="location"]:checked') as HTMLInputElement)?.value;
    const station = (document.getElementById("station-name") as HTMLInputElement)?.value;
    const age = (document.getElementById("user-age") as HTMLSelectElement)?.value;
    const phone = (document.getElementById("user-phone") as HTMLInputElement)?.value;
    const message = (document.getElementById("user-message") as HTMLTextAreaElement)?.value || "特になし";

    const confirmContent = document.getElementById("confirm-content");
    if (confirmContent) {
      confirmContent.innerHTML = `
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">お名前</p><p class="font-bold">${name}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">年代</p><p class="font-bold">${age}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">メールアドレス</p><p class="font-bold">${email}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">電話番号</p><p class="font-bold">${phone || "未入力"}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold">相談場所</p><p class="font-bold">${loc} ${loc === "対面" ? "(" + station + ")" : ""}</p></div>
        <div class="border-b pb-2"><p class="text-slate-400 text-[10px] font-bold text-blue-600">希望日時</p><p class="font-bold text-blue-600">${disp?.innerText}</p></div>
        <div class="pb-1"><p class="text-slate-400 text-[10px] font-bold">特に聞きたい内容</p><p class="font-bold">${message.replace(/\n/g, "<br>")}</p></div>
      `;
    }
    inputSectionRef.current?.classList.add("hidden");
    confirmSectionRef.current?.classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  function hideConfirmation() {
    confirmSectionRef.current?.classList.add("hidden");
    inputSectionRef.current?.classList.remove("hidden");
  }

  async function submitBooking() {
    const btn = document.getElementById("submitBtn") as HTMLButtonElement | null;
    if (btn) { btn.disabled = true; btn.innerText = "送信中..."; }

    const payload = {
      name: (document.getElementById("user-name") as HTMLInputElement)?.value,
      email: (document.getElementById("user-email") as HTMLInputElement)?.value,
      phone: (document.getElementById("user-phone") as HTMLInputElement)?.value,
      age: (document.getElementById("user-age") as HTMLSelectElement)?.value,
      location: (document.querySelector('input[name="location"]:checked') as HTMLInputElement)?.value,
      station: (document.getElementById("station-name") as HTMLInputElement)?.value || "-",
      time: selectedDisplayRef.current?.dataset.value,
      message: (document.getElementById("user-message") as HTMLTextAreaElement)?.value,
    };

    try {
      await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) });
      // GA4に個別相談完了イベントを送信
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "individual_consultation",
        });
      }
      // Show success screen
      const root = document.getElementById("booking-root");
      if (root) {
        root.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:80vh; text-align:center; padding:20px; font-family:sans-serif;">
            <div style="font-size:60px; margin-bottom:20px;">✅</div>
            <h1 style="font-size:22px; font-weight:bold; margin-bottom:10px;">予約申込を完了しました</h1>
            <div style="color:#64748b; font-size:14px; line-height:1.8; margin-bottom:20px;">
              <p>お申し込みありがとうございます。確認メールをお送りしましたのでご確認ください。</p>
              <p style="margin-top:10px; font-weight:bold; color:#ef4444;">※メールが来ない場合は迷惑メールフォルダもご確認ください。</p>
              <div style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:15px;">
                <p>メールが届かない場合には下記までご連絡ください。</p>
                <p style="font-weight:bold; color:black;">info@logicalfp.com</p>
                <p style="font-weight:bold; color:black;">070-9097-3341</p>
              </div>
            </div>
            <a href="/" style="margin-top:30px; color:#1a2a4a; font-weight:bold; text-decoration:none; border:2px solid #1a2a4a; padding:12px 24px; border-radius:4px;">LPに戻る</a>
          </div>
        `;
      }
    } catch (e) {
      alert("送信に失敗しました。");
      if (btn) { btn.disabled = false; btn.innerText = "予約申込を確定する"; }
    }
  }

  return (
    <>
      {/* Page-specific styles */}
      <style>{`
        .calendar-app { display: flex; flex-direction: column; height: 400px; border: 2px solid #e2e8f0; border-radius: 12px; background: #ffffff; overflow: hidden; position: relative; }
        .header-outer { overflow: hidden; display: flex; background: #f8fafc; border-bottom: 2px solid #cbd5e1; z-index: 10; }
        .scroll-body { display: flex; overflow: auto; -webkit-overflow-scrolling: touch; height: 100%; background: #ffffff; }
        .time-col { position: sticky; left: 0; width: 60px; background: #f8fafc !important; z-index: 100; box-shadow: 2px 0 0 #cbd5e1; flex-shrink: 0; }
        .date-cell { min-width: calc((100vw - 32px - 60px) / 5); height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid #e2e8f0; flex-shrink: 0; background: #ffffff; }
        .time-corner { width: 60px; height: 60px; background: #f8fafc; box-shadow: 2px 0 0 #cbd5e1; border-bottom: 2px solid #cbd5e1; flex-shrink: 0; position: sticky; left: 0; z-index: 110; }
        .day-col { min-width: calc((100vw - 32px - 60px) / 5); flex-shrink: 0; border-right: 1px solid #e2e8f0; background: #ffffff; }
        .slot { height: 44px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .slot-available { color: #2563eb; font-weight: bold; cursor: pointer; }
        .slot-selected { background-color: #2563eb !important; color: white !important; }
        .slot-disabled { color: #cbd5e1 !important; background-color: #fcfcfc !important; font-size: 10px; }
        .time-label { height: 44px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; color: #64748b; }
        .booking-loading { position: fixed; inset: 0; background: white; z-index: 1000; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .required-mark::after { content: " *"; color: #e11d48; font-weight: bold; }
      `}</style>

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

      {/* Loader */}
      <div ref={loaderRef} className="booking-loading">
        最新の空き状況を確認中...
      </div>

      {/* Main */}
      <div id="booking-root" className="p-4 pb-20 max-w-[640px] mx-auto" style={{ background: "#f8fafc", minHeight: "100vh" }}>
        {/* Input Section */}
        <div ref={inputSectionRef} id="input-section">
          <header className="mb-4">
            <h1 className="text-lg font-bold text-slate-800">個別FP相談 予約申込</h1>
            <p className="text-[13px] font-bold text-slate-700 mt-1">
              必要事項を入力し、日時を選択してください
            </p>
          </header>

          <form className="space-y-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm" id="bookingForm">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 required-mark block">お名前</label>
              <input
                type="text"
                id="user-name"
                placeholder="例：山田 太郎"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 required-mark block">年代</label>
              <select id="user-age" defaultValue="30代" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none">
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代">50代</option>
                <option value="60代">60代</option>
                <option value="70代">70代</option>
                <option value="その他">その他</option>
              </select>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 required-mark block">
                メールアドレス (半角のみ)
              </label>
              <input
                type="email"
                id="user-email"
                placeholder="example@mail.com"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                onInput={(e) => {
                  const t = e.target as HTMLInputElement;
                  t.value = t.value.replace(/[^\x20-\x7e]/g, "");
                }}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">
                電話番号（任意）（メールが届かない場合に備え可能であればご入力ください）
              </label>
              <input
                type="tel"
                id="user-phone"
                placeholder="例：09012345678"
                inputMode="numeric"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                onInput={(e) => {
                  const t = e.target as HTMLInputElement;
                  t.value = t.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 required-mark block">相談場所</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="location"
                    value="オンライン"
                    defaultChecked
                    onChange={() => toggleStation(false)}
                  />
                  オンライン
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name="location"
                    value="対面"
                    onChange={() => toggleStation(true)}
                  />
                  対面 (23区内のみ)
                </label>
              </div>
              <input
                type="text"
                id="station-name"
                placeholder="希望の場所(駅名)をご記入ください"
                className="hidden w-full p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm outline-none"
              />
            </div>

            {/* Calendar */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-500 required-mark block">
                希望日時の選択
              </label>
              <p className="text-[11px] text-slate-500 mb-1">
                ※対応可能なFPがいる日時が◯表示されています
              </p>
              <div id="calendar-section">
                <div className="calendar-app shadow-sm">
                  <div ref={headerContainerRef} className="header-outer">
                    <div className="time-corner" />
                    <div ref={dateHeadersRef} className="flex" />
                  </div>
                  <div ref={mainScrollRef} className="scroll-body" id="main-scroll">
                    <div ref={timeAxisRef} className="time-col" />
                    <div ref={calendarBodyRef} className="flex" />
                  </div>
                </div>
                <div
                  ref={selectedDisplayRef}
                  id="selected-display"
                  className="my-4 p-4 bg-blue-50 text-blue-700 text-center rounded-xl text-sm font-bold border border-blue-100"
                >
                  カレンダーから日時を選んでください
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 block">
                特に聞きたい内容（任意）
              </label>
              <textarea
                id="user-message"
                rows={3}
                placeholder="例：毎月いくら積み立てるべきか、自分にあった投資先はなにかなど"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm resize-none"
              />
            </div>

            <button
              type="button"
              id="confirmBtn"
              onClick={showConfirmation}
              className="w-full py-4 bg-black text-white font-bold rounded-xl active:scale-95 transition-all"
            >
              確認画面へ進む
            </button>
          </form>
        </div>

        {/* Confirm Section */}
        <div ref={confirmSectionRef} id="confirm-section" className="hidden">
          <header className="mb-4">
            <h1 className="text-lg font-bold text-slate-800">入力内容の確認</h1>
            <p className="text-[13px] font-bold text-slate-700 mt-1">
              内容に間違いがなければ「予約申込を確定する」を押してください
            </p>
          </header>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 mb-6">
            <div id="confirm-content" className="space-y-3 text-sm" />
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              id="submitBtn"
              onClick={submitBooking}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-all"
            >
              予約申込を確定する
            </button>
            <button
              type="button"
              onClick={hideConfirmation}
              className="w-full py-4 bg-gray-200 text-slate-600 font-bold rounded-xl active:scale-95 transition-all"
            >
              修正する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
