export function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-effect rounded-xl p-6 card-hover ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gradient">{title}</h2>
      </div>
      <div className="text-gray-300">{children}</div>
    </div>
  );
}
