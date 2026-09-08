import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Resume", href: "#" },
];

export default function Header() {
  return (
    <header className="p-4 text-gray-800 border-b-2">
      <div className="container flex justify-between h-12 mx-auto">
        <div className="flex">
          <Link
            rel="noopener noreferrer"
            href="#"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <Image
              src="/android-chrome-512x512.png"
              alt="Brent portfolio logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </Link>
        </div>
        <div className="flex text-sm">
          <ul className="items-stretch hidden space-x-4 lg:flex">
            {navLinks.map(({ label, href }) => (
              <li className="flex" key={`${label}-${href}`}>
                <Link
                  href={href}
                  className="relative flex items-center px-4 text-white transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-1/2 after:-translate-x-1/2 after:bg-transparent after:transition-colors hover:text-muted hover:after:bg-muted active:text-muted"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="items-center shrink-0 hidden lg:flex">
          <button
            type="button"
            className="cursor-pointer px-4 py-1 text-xs tracking-widest border-white border-2 bg-transparent text-white hover:text-muted hover:border-muted transition-colors"
          >
            LINKEDIN
          </button>
        </div>
        <button type="button" className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
