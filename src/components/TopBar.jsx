import { UserRoundPlus } from 'lucide-react'
import './TopBar.css'

function TopBar({ onAction }) {
  return (
    <div className="topbar">
      <div className="breadcrumb"><span>Dashboard</span><i>/</i><strong>Overview</strong></div>
      <div className="top-actions">
        <button className="button button-light button-small" type="button" onClick={() => onAction({ title: 'Invite people', type: 'invite' })}>
          <UserRoundPlus size={13} /> Invite People
        </button>
        <button className="button button-primary button-small" type="button" onClick={() => onAction('Your HR plan has been generated.')}>
          Generate Plan
        </button>
      </div>
    </div>
  )
}

export default TopBar
