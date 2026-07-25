import Background from "./Background";
import SearchBar from "./SearchBar";
import AnimatedHeadline from "./AnimatedHeadline";
import StatsSection from "./StatsSection";

type HeroProps = {
  url: string;
  setUrl: (value: string) => void;
  loading: boolean;
  onAudit: (url: string) => void;
  collapsed: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  error: string;
};

export default function Hero({
  url,
  setUrl,
  loading,
  onAudit,
  collapsed,
  inputRef,
  error
}: HeroProps) {
  return (
    <section
  className={`relative overflow-hidden px-6 transition-all duration-500 ${
    collapsed
      ? "pt-28 pb-6"
      : "flex min-h-screen items-center justify-center"
  }`}
>
      <Background />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div
  className={`transition-all duration-500 ${
    collapsed
      ? "max-h-0 overflow-hidden opacity-0"
      : "opacity-100"
  }`}
>
       <div className="mb-4 rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-400">
  Website Audit Platform
</div>

        <AnimatedHeadline />

        <p className="mt-4 max-w-lg text-base leading-7 text-zinc-400">
  Instant insights into SEO, performance, accessibility and metadata —
  powered by Go and React.
</p>
</div>
      <div className="mt-8 w-full max-w-lg">
          <SearchBar
            url={url}
            setUrl={setUrl}
            loading={loading}
            onAudit={onAudit}
            inputRef={inputRef}
            error={error}
          />
        </div>
        <StatsSection />
      </div>
    </section>
  );
}