import { useState } from 'react'
import {
  Activity,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
  UserRoundPlus,
  Users,
  BriefcaseBusiness,
} from 'lucide-react'
import './Sidebar.css'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Employee Directory', icon: Users },
  { label: 'Attendance', icon: CalendarDays },
  { label: 'Employee Performance', icon: Activity },
  { label: 'Leave Management', icon: ClipboardList },
  { label: 'Payroll & Expenses', icon: BriefcaseBusiness },
  { label: 'Recruitment', icon: UserRoundPlus },
  { label: 'Onboarding', icon: ShieldCheck },
  { label: 'Development', icon: Activity },
]

function Sidebar({ onAction, query, setQuery }) {
  const [activeItem, setActiveItem] = useState('Dashboard')

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">N</div>
        <div className="brand-copy">
          <strong>Nosense Studio</strong>
          <span>hello@nosense.studio</span>
        </div>
        <ChevronDown size={12} className="brand-chevron" />
      </div>

      <label className="sidebar-search">
        <Search size={13} />
        <input
          aria-label="Search employees"
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <kbd>⌘ K</kbd>
      </label>

      <nav className="primary-nav" aria-label="Dashboard sections">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            type="button"
            key={label}
            className={`nav-item${activeItem === label ? ' selected' : ''}`}
            onClick={() => {
              setActiveItem(label)
              if (label !== 'Dashboard') onAction(`${label} is a visual preview in this dashboard.`)
            }}
          >
            <Icon size={14} strokeWidth={1.7} />
            <span>{label}</span>
            {label === 'Employee Directory' && <ChevronDown size={12} className="nav-chevron" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="nav-item" onClick={() => onAction('Help center is coming soon.')}>
          <CircleHelp size={14} /><span>Help Center</span>
        </button>
        <button type="button" className="nav-item" onClick={() => onAction('Settings are not available in this demo.')}>
          <Settings size={14} /><span>Settings</span>
        </button>
        <button type="button" className="nav-item sign-out" onClick={() => onAction('You are already signed in to the demo.')}>
          <LogOut size={14} /><span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
