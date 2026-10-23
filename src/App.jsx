import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  BriefcaseBusiness,
  Check,
  MoreHorizontal,
  Plus,
  UserRound,
  UserRoundPlus,
  Users,
  X,
} from 'lucide-react'
import {
  Area,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import './App.css'

const initialEmployees = [
  { id: '#HR120', name: 'Cooper Edwards', email: 'cooper@gmail.com', role: 'UI Designer', department: 'IT', status: 'Active' },
  { id: '#HR119', name: 'Kiera Oliver', email: 'kiera@gmail.com', role: 'UX Designer', department: 'Creative', status: 'Active' },
  { id: '#HR118', name: 'Chayanne Ford', email: 'chayanne@gmail.com', role: 'Development', department: 'IT', status: 'Active' },
  { id: '#HR117', name: 'Claude Salas', email: 'claude@gmail.com', role: 'Head of Support', department: 'Marketing', status: 'Active' },
  { id: '#HR116', name: 'Lindsey Vargas', email: 'lindsey@gmail.com', role: 'Product Designer', department: 'Creative', status: 'Active' },
]

const monthlyPerformance = [
  { month: 'Jan', project: 280, product: 120 },
  { month: 'Feb', project: 315, product: 140 },
  { month: 'Mar', project: 275, product: 110 },
  { month: 'Apr', project: 290, product: 145 },
  { month: 'May', project: 350, product: 230 },
  { month: 'Jun', project: 320, product: 155 },
  { month: 'Jul', project: 360, product: 205 },
  { month: 'Aug', project: 345, product: 145 },
  { month: 'Sep', project: 380, product: 255 },
  { month: 'Oct', project: 340, product: 195 },
  { month: 'Nov', project: 410, product: 225 },
  { month: 'Dec', project: 470, product: 200 },
]

const yearlyPerformance = [
  { month: 'Jan', project: 280, product: 120 },
  { month: 'Feb', project: 315, product: 140 },
  { month: 'Mar', project: 275, product: 110 },
  { month: 'Apr', project: 290, product: 145 },
  { month: 'May', project: 350, product: 230 },
  { month: 'Jun', project: 380, product: 155 },
  { month: 'Jul', project: 360, product: 205 },
  { month: 'Aug', project: 345, product: 145 },
  { month: 'Sep', project: 380, product: 255 },
  { month: 'Oct', project: 340, product: 195 },
  { month: 'Nov', project: 410, product: 225 },
  { month: 'Dec', project: 470, product: 310 },
]

function PageHeading({ onAction }) {
  return (
    <section className="page-heading">
      <div>
        <h1>HR Insight Dashboard</h1>
        <p>Smart HR insights for data-driven decisions</p>
      </div>
      <div className="heading-actions">
        <button className="button button-light" type="button" onClick={() => onAction('export')}>
          <ArrowDownToLine size={14} /> Export Data
        </button>
        <button className="button button-primary" type="button" onClick={() => onAction({ title: 'New employee', type: 'employee' })}>
          <Plus size={15} /> New Entry
        </button>
      </div>
    </section>
  )
}

const stats = [
  { title: 'Total Employee', value: '272', change: '+10%', icon: Users },
  { title: 'New Employee', value: '72', change: '+5%', icon: UserRoundPlus },
  { title: 'Resign Employee', value: '16', change: '+2%', icon: UserRound },
  { title: 'Job Applicants', value: '329', change: '+8%', icon: BriefcaseBusiness },
]

function StatsGrid() {
  return (
    <section className="stats-grid" aria-label="Employee statistics">
      {stats.map(({ title, value, change, icon: Icon }) => (
        <article className="stat-card" key={title}>
          <div className="stat-card-head">
            <span className="stat-icon"><Icon size={15} /></span>
            <span>{title}</span>
            <button type="button" className="icon-button" aria-label={`${title} options`}><MoreHorizontal size={16} /></button>
          </div>
          <div className="stat-card-value">
            <strong>{value}</strong>
            <span className="stat-change">{change}</span>
            <span className="stat-period">last month</span>
          </div>
        </article>
      ))}
    </section>
  )
}

function PerformanceTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <strong>{label}, 2025</strong>
      <span><i className="legend-dot project-dot" /> Project Team <b>{payload[0]?.value}</b></span>
      <span><i className="legend-dot product-dot" /> Product Team <b>{payload[1]?.value}</b></span>
    </div>
  )
}

function PerformanceCard() {
  const [period, setPeriod] = useState('Yearly')
  const data = period === 'Monthly' ? monthlyPerformance : yearlyPerformance
  return (
    <section className="panel performance-panel">
      <div className="panel-heading">
        <h2>Team Performance</h2>
        <button type="button" className="icon-button" aria-label="Team performance options"><MoreHorizontal size={16} /></button>
      </div>
      <div className="chart-subhead">
        <div className="chart-legend">
          <span><i className="legend-dot project-dot" />Project Team</span>
          <span><i className="legend-dot product-dot" />Product Team</span>
        </div>
        <div className="period-toggle" role="group" aria-label="Chart period">
          {['Monthly', 'Yearly'].map((option) => (
            <button type="button" key={option} className={period === option ? 'active' : ''} onClick={() => setPeriod(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="performance-chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 2, bottom: 2, left: -22 }}>
            <defs>
              <linearGradient id="projectFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a98ae4" stopOpacity={0.13} />
                <stop offset="100%" stopColor="#a98ae4" stopOpacity={0.015} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#edf0f3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#9299a2', fontSize: 9 }} />
            <YAxis domain={[0, 500]} ticks={[100, 200, 300, 400, 500]} tickLine={false} axisLine={false} tick={{ fill: '#9299a2', fontSize: 9 }} />
            <Tooltip content={<PerformanceTooltip />} cursor={{ stroke: '#e8e5ef', strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="project" stroke="none" fill="url(#projectFill)" />
            <Line type="monotone" dataKey="project" stroke="#b9a2d9" strokeWidth={1.6} dot={false} activeDot={{ r: 3, fill: '#a98ae4' }} />
            <Line type="monotone" dataKey="product" stroke="#efad70" strokeWidth={1.35} dot={false} activeDot={{ r: 3, fill: '#efad70' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

const attendance = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [3, 3, 3, 2, 3],
  [4, 4, 4, 3, 4],
  [5, 5, 5, 5, 5],
]
const timeLabels = ['15:00', '13:00', '11:00', '09:00', '07:00', '05:00']
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function AttendanceCard() {
  return (
    <section className="panel attendance-panel">
      <div className="panel-heading">
        <h2>Attendance Report</h2>
        <button type="button" className="icon-button" aria-label="Attendance options"><MoreHorizontal size={16} /></button>
      </div>
      <div className="attendance-grid">
        <div className="time-labels">
          {timeLabels.map((time) => <span key={time}>{time}</span>)}
        </div>
        <div className="attendance-heatmap">
          {attendance.map((row, rowIndex) => row.map((level, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`heat-cell level-${level}`} title={`${weekdays[colIndex]} at ${timeLabels[rowIndex]}`} />
          )))}
          <div className="weekday-labels">
            {weekdays.map((day) => <span key={day}>{day}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function EmployeesCard({ employees, query, onAction }) {
  const [selected, setSelected] = useState([])
  const [sortAscending, setSortAscending] = useState(false)
  const filteredEmployees = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = employees.filter((employee) =>
      `${employee.id} ${employee.name} ${employee.email}`.toLowerCase().includes(normalizedQuery),
    )
    return [...filtered].sort((a, b) => sortAscending ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id))
  }, [employees, query, sortAscending])

  const toggleEmployee = (id) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  const allVisibleSelected = filteredEmployees.length > 0 && filteredEmployees.every(({ id }) => selected.includes(id))

  return (
    <section className="panel employees-panel">
      <div className="panel-heading">
        <h2>Employees</h2>
        <div className="employee-tools">
          {selected.length > 0 && <span className="selected-count">{selected.length} selected</span>}
          <button type="button" className="icon-button" aria-label="Employee table options" onClick={() => onAction('Use the employee search to filter the table.')}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  aria-label="Select all employees"
                  checked={allVisibleSelected}
                  onChange={() => setSelected(allVisibleSelected ? selected.filter((id) => !filteredEmployees.some((employee) => employee.id === id)) : [...new Set([...selected, ...filteredEmployees.map((employee) => employee.id)])])}
                />
              </th>
              <th><button type="button" className="sort-button" onClick={() => setSortAscending((current) => !current)}>Employee ID <span>{sortAscending ? '↑' : '↓'}</span></button></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="checkbox-cell"><input type="checkbox" aria-label={`Select ${employee.name}`} checked={selected.includes(employee.id)} onChange={() => toggleEmployee(employee.id)} /></td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td><span className="status-active">{employee.status}</span></td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr><td colSpan="7" className="empty-state">No employees match “{query}”.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const jobData = [
  { name: 'Open', value: 46, color: '#9563ee' },
  { name: 'Pending', value: 18, color: '#ff995d' },
  { name: 'Closed', value: 8, color: '#57d98a' },
]

function JobsCard() {
  return (
    <section className="panel jobs-panel">
      <div className="panel-heading">
        <h2>Jobs Overview</h2>
        <button type="button" className="icon-button" aria-label="Jobs overview options"><MoreHorizontal size={16} /></button>
      </div>
      <div className="jobs-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={jobData} dataKey="value" nameKey="name" cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius="68%" outerRadius="100%" paddingAngle={0} stroke="none">
              {jobData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} jobs`, name]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="jobs-chart-center"><strong>72</strong><span>Total Jobs</span></div>
      </div>
      <div className="jobs-legend">
        {jobData.map(({ name, value, color }) => (
          <div className="job-legend-row" key={name}>
            <i style={{ backgroundColor: color }} />
            <strong>{value}</strong>
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Modal({ modal, onClose, onSubmit }) {
  const [value, setValue] = useState('')
  if (!modal) return null
  const isEmployee = modal.type === 'employee'
  const isInvite = modal.type === 'invite'
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div>
            <h2 id="modal-title">{modal.title}</h2>
            <p>{isEmployee ? 'Add a sample employee to the directory.' : 'Send a dashboard invitation to a teammate.'}</p>
          </div>
          <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={17} /></button>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); onSubmit(value, modal.type); onClose() }}>
          <label>{isEmployee ? 'Full name' : 'Email address'}
            <input autoFocus required type={isInvite ? 'email' : 'text'} placeholder={isEmployee ? 'e.g. Jordan Lee' : 'name@company.com'} value={value} onChange={(event) => setValue(event.target.value)} />
          </label>
          <div className="modal-actions">
            <button type="button" className="button button-light" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{isEmployee ? 'Add employee' : 'Send invite'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

function App() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const handleAction = (action) => {
    if (typeof action === 'object') {
      setModal(action)
      return
    }
    if (action === 'export') {
      const rows = [['Employee ID', 'Full Name', 'Email', 'Role', 'Department', 'Status'], ...employees.map((employee) => [employee.id, employee.name, employee.email, employee.role, employee.department, employee.status])]
      const csv = rows.map((row) => row.map((field) => `"${String(field).replaceAll('"', '""')}"`).join(',')).join('\r\n')
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'hr-employees.csv'
      link.click()
      URL.revokeObjectURL(url)
      setToast('Employee data exported.')
      return
    }
    setToast(action)
  }

  const handleModalSubmit = (value, type) => {
    if (type === 'employee') {
      const nextIdNumber = Math.max(...employees.map((employee) => Number(employee.id.replace(/\D/g, ''))), 120) + 1
      const name = value.trim()
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '')
      setEmployees((current) => [{ id: `#HR${nextIdNumber}`, name, email: `${slug}@gmail.com`, role: 'New Employee', department: 'IT', status: 'Active' }, ...current])
      setToast(`${name} added to employees.`)
    } else {
      setToast(`Invitation sent to ${value}.`)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar onAction={handleAction} query={search} setQuery={setSearch} />
      <main className="main-content">
        <TopBar onAction={handleAction} />
        <div className="dashboard-content">
          <PageHeading onAction={handleAction} />
          <StatsGrid />
          <div className="overview-grid">
            <PerformanceCard />
            <AttendanceCard />
          </div>
          <div className="details-grid">
            <EmployeesCard employees={employees} query={search} onAction={handleAction} />
            <JobsCard />
          </div>
        </div>
      </main>
      <Modal modal={modal} onClose={() => setModal(null)} onSubmit={handleModalSubmit} />
      {toast && <div className="toast" role="status"><Check size={15} />{toast}<button type="button" aria-label="Dismiss notification" onClick={() => setToast('')}><X size={13} /></button></div>}
    </div>
  )
}

export default App
