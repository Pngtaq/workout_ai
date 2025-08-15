export function OverviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-violet-500 ">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
