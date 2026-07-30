type Props = {
  url: string;
};

export default function WebsiteAvatar({
  url,
}: Props) {
  const host = new URL(url).hostname;

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`}
      alt={host}
      className="h-12 w-12 rounded-xl border border-white/10 bg-zinc-900"
    />
  );
}