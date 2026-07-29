import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
  <div className="flex h-16 w-full items-center justify-between px-8 lg:px-12">

        <NavLink to="/" className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-sky-400" />
          <span className="text-lg font-semibold tracking-tight">
            Page<span className="text-zinc-400">Pulse</span>
          </span>
        </NavLink>

        <nav
          className="hidden items-center gap-8 text-sm md:flex"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-zinc-400 transition hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-zinc-400 transition hover:text-white"
            }
          >
            History
          </NavLink>

          <a
            href="https://github.com/Go8089/page-pulse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition hover:text-white"
          >
            GitHub
          </a>
        </nav>

      </div>
    </header>
  );
}