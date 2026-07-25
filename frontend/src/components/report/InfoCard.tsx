type Props = {
  title: string;
  value: string | number;
};

export default function InfoCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-white/10
      bg-zinc-950/60
      p-5
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-sky-500/30
      "
    >
      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}