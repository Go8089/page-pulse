type Props = {
  good: boolean;
};

export default function StatusBadge({ good }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        good
          ? "bg-green-500/10 text-green-400"
          : "bg-red-500/10 text-red-400"
      }`}
    >
      {good ? "PASS" : "FAIL"}
    </span>
  );
}