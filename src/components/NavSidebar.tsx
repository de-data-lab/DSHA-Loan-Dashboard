import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Median Credit Score", path: "/" },
  { label: "Loan Amount", path: "/loan-amount" },
  { label: "Loan Type", path: "/loan-type" },
  { label: "DPA", path: "/dpa" },
  { label: "Demographic Info", path: "/demographics" },
];

export default function NavSidebar() {
  return (
    <aside
      className="bg-[#002452] text-white h-full px-6 py-8 font-bold flex flex-col items-start  border-r border-[#1a3860]"
      style={{ boxShadow: '2px 0 8px 0 rgba(0,0,0,0.04)' }}
    >
      <nav className="flex flex-col gap-8 w-full mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-lg md:text-xl rounded-lg px-2 py-2 w-full block transition-all duration-150 ${
                isActive
                  ? "bg-white/10 border-l-4 border-[#4A90E2] text-[#4A90E2] shadow-sm"
                  : "opacity-80 hover:opacity-100 hover:bg-white/5"
              }`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
