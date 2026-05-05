const navLinks = [
  { name: 'Sobre', href: '#sobre' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contactos', href: '#contactos' },
];

export default function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="font-mono font-bold text-base md:text-lg text-slate-800 cursor-default">
        <span className="text-purple-600">Miguel</span> // Engenharia Informática
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="hover:text-purple-600 transition-colors focus:outline-none"
          >
            {item.name}
          </a>
        ))}
      </div>

      {/* Mobile menu simple trigger (optional for later expansion) */}
      <div className="flex md:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1">
            <div className="h-0.5 w-5 bg-slate-600"></div>
            <div className="h-0.5 w-5 bg-slate-600"></div>
            <div className="h-0.5 w-5 bg-slate-600"></div>
          </div>
        </button>
      </div>
    </nav>
  );
}
