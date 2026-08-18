import FaqSection from "@/components/FaqSection";
import VoiceSection from "@/components/VoiceSection";
import FeeSection from "@/components/FeeSection";
import FloatingCta from "@/components/FloatingCta";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FpIntroSection from "@/components/FpIntroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import LevelSection from "@/components/LevelSection";
import WhyFreeSection from "@/components/WhyFreeSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      <Header />
      <main>
        {/* 1. ヒーロー */}
        <div className="hero-section">
          <HeroSection />
        </div>

        {/* 2. 問題提起 */}
        <ProblemSection />

        {/* 3. 解決策1：どんな資産形成術？（二刀流4ポイント＋イラスト） */}
        <SolutionSection />

        {/* 4. 解決策2：レベル別アドバイス */}
        <LevelSection />

        {/* 5. 1級FPとは？ */}
        <FpIntroSection />

        {/* 6. 通常、FP相談は有料です */}
        <FeeSection />

        {/* 7. なぜ無料なのか？ */}
        <WhyFreeSection />

        {/* 8. クライアントの声 */}
        <VoiceSection />
        {/* 9. こんな疑問にもロジカルに答えます */}
        <FaqSection />

        {/* 9. 申込フォーム */}
        <FormSection />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
