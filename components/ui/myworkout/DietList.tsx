export default function DietList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
