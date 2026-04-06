'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, ShieldAlert, ShieldCheck, Leaf, UserX } from 'lucide-react'

interface UserActionMenuProps {
  userId: string
  currentRole: string
}

export function UserActionMenu({ userId, currentRole }: UserActionMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState({ top: 0, right: 0 })
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({
        top: rect.bottom + window.scrollY + 4,
        right: window.innerWidth - rect.right,
      })
    }
    setOpen(prev => !prev)
  }

  // Close on outside click or scroll
  React.useEffect(() => {
    if (!open) return
    function close() { setOpen(false) }
    document.addEventListener('mousedown', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [open])

  const actions = [
    { label: 'Upgrade to Technical', role: 'technical_team', icon: ShieldAlert, color: 'text-purple-600 hover:bg-purple-50' },
    { label: 'Make Administrator',   role: 'administrator',  icon: ShieldCheck, color: 'text-blue-600 hover:bg-blue-50'   },
    { label: 'Assign Researcher',    role: 'researcher',     icon: Leaf,        color: 'text-teal-600 hover:bg-teal-50'   },
  ]

  async function handleRoleChange(role: string) {
    setOpen(false)
    try {
      const res = await fetch('/api/users/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        alert('Failed to update role. Check your permissions.')
      }
    } catch {
      alert('Network error updating role.')
    }
  }

  const menu = open ? (
    <div
      onMouseDown={e => e.stopPropagation()} // prevent close from firing on inner click
      style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 9999 }}
      className="w-52 rounded-xl bg-white border border-slate-200 shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-150"
    >
      <p className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
        Change Role
      </p>
      {actions.map(action => (
        <button
          key={action.role}
          onClick={() => handleRoleChange(action.role)}
          disabled={currentRole === action.role}
          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${action.color}`}
        >
          <action.icon className="w-3.5 h-3.5" />
          {action.label}
          {currentRole === action.role && (
            <span className="ml-auto text-[9px] font-black uppercase tracking-widest opacity-50">Current</span>
          )}
        </button>
      ))}
      <div className="border-t border-slate-100 mt-1 pt-1">
        <button
          onClick={() => { setOpen(false); alert('Suspend feature coming soon.') }}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <UserX className="w-3.5 h-3.5" />
          Suspend Access
        </button>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleOpen}
        className="h-8 w-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        aria-label="User actions"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {typeof document !== 'undefined' && open && createPortal(menu, document.body)}
    </>
  )
}
