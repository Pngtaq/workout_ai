export default function WorkoutList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-gray-800">{title}</p>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
