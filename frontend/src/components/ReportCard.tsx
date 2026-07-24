import type { LucideIcon } from "lucide-react";


type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export default function ReportCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Icon size={20} className="text-slate-400" />
      </div>

      <h2 className="mt-5 break-words text-3xl font-bold text-slate-900">
        {value || "-"}
      </h2>
    </div>
  );
}