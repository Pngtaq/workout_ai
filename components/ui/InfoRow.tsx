export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{label || "-"}</p>
      <p className="text-base">{value || "-"}</p>
    </div>
  );
}
