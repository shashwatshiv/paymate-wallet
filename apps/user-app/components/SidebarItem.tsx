"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? "accent-gradient text-white shadow-lg shadow-blue-500/25"
          : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
      }`}
    >
      <div
        className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
      >
        {icon}
      </div>
      <span className="font-medium">{title}</span>
    </Link>
  );
};
