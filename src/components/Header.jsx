import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaLayerGroup, FaRegFolder, FaRegFileCode, FaChevronDown, FaSearch, FaBars, FaTimes,
} from "react-icons/fa";
import { socialIcons } from "./socialIcons";

export default function Header() {
  const [open, setOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setSearchOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}#posts` : "/");
    setSearchOpen(false);
  }
  const links = [
    { label: "Home", icon: FaHome, to: "/" },
    {
      label: "Blogs",
      icon: FaLayerGroup,
      drop: [
        { label: "JavaScript", to: "/blogs/javascript" },
        { label: "HTML", to: "/blogs/html" },
        { label: "SEO", to: "/blogs/seo" },
      ],
      to: "/",
    },
    { label: "Resources", icon: FaRegFolder, to: "/" },
    { label: "ShortCodes", icon: FaRegFileCode, to: "/" },
    {
      label: "Tech Tutorials",
      drop: [
        { label: "GitHub", to: "/tutorials/github" },
        { label: "Roadmap", to: "/tutorials/roadmap" },
        { label: "Tools", to: "/tutorials/tools" },
      ],
    },
  ];

  return (
    <header className="text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-4 text-sm font-medium">
        <nav className="hidden gap-4 sm:flex" aria-label="Utility navigation">
          {["About Us", "Contact Us", "Privacy Policy"].map((text) => (
            <a key={text} href="#" className="hover:underline">{text}</a>
          ))}
        </nav>
        <div className="hidden gap-4 text-lg sm:flex">
          {socialIcons.map(({ Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit DigiMistry on ${label}`}
              className="transition-transform hover:-translate-y-1"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-4 border-b border-white/20 px-4 py-4 md:gap-6">
        <Link to="/" aria-label="DigiMistry home">
          <img src="/Logo.png" alt="DigiMistry" className="h-10 w-auto object-contain" />
        </Link>
        <ul className="hidden flex-1 flex-wrap items-center gap-4 font-semibold lg:flex lg:gap-6" aria-label="Main navigation">
          {links.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.drop && setOpen(link.label)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => link.drop && setOpen(link.label)}
            >
              <Link to={link.to || "/"} className="flex items-center gap-1.5 hover:text-yellow-200">
                {link.icon && <link.icon />} {link.label} {link.drop && <FaChevronDown className="text-[10px]" />}
              </Link>
              {link.drop && open === link.label && (
                <ul className="absolute left-0 top-full z-20 w-40 rounded-md bg-white py-2 text-slate-800 shadow-lg">
                  {link.drop.map((item) => (
                    <li key={item.to} className="hover:bg-slate-100">
                      <Link to={item.to} className="block px-4 py-1.5">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((current) => !current)}
          className="ml-auto grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 lg:hidden"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div ref={searchRef} className="relative">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((current) => !current)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
          >
            <FaSearch className="text-lg" />
          </button>
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="absolute right-0 top-full z-30 mt-3 flex w-[min(280px,calc(100vw-2rem))] items-center rounded-md bg-white p-2 shadow-xl"
            >
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search posts..."
                className="min-w-0 flex-1 px-2 text-sm text-slate-900 outline-none"
              />
              <button type="submit" aria-label="Search" className="rounded-md bg-blue-500 p-2.5 text-white hover:bg-blue-600">
                <FaSearch className="text-sm" />
              </button>
            </form>
          )}
        </div>
      </div>
      {mobileOpen && (
        <nav className="mx-4 mb-4 rounded-lg bg-white p-3 text-slate-900 shadow-xl lg:hidden" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to || "/"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 font-semibold hover:bg-slate-100"
                >
                  {link.icon && <link.icon />} {link.label}
                </Link>
                {link.drop && (
                  <div className="ml-5 flex flex-wrap gap-2 pb-2">
                    {link.drop.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
