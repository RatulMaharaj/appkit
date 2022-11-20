export default function Header({ title, description }) {
  return (
    <div className="sm:flex-auto mb-4">
      <h1 className="text-md uppercase font-semibold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-700">{description}</p>
    </div>
  );
}
