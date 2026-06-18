'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Dumbbell, 
  Scale, 
  History, 
  User, 
  LogOut,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/actions/auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workouts', href: '/workouts', icon: Dumbbell },
  { name: 'Weight', href: '/weight', icon: Scale },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'History', href: '/history', icon: History },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 border-r border-gray-800 h-screen bg-black sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter">FORGEFIT</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-white text-black font-medium' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-400 hover:text-red-500 transition-colors rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
