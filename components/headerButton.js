import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderButton({ link, label }) {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(window.location.pathname === link);
  }, [link]);

  return (
    <Link href={link}>
      <a
        className={`px-4 py-1 mr-2 text-xs rounded-lg text-primary hover:bg-secondary ${
          isSelected ? `bg-secondary` : ``
        }`}
      >
        <button>{label}</button>
      </a>
    </Link>
  );
}
