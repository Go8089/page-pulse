type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ReportSection({
  title,
  children,
}: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8">
      <h2 className="mb-6 text-2xl font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
}