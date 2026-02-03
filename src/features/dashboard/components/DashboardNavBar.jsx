import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell,
  CreditCard, 
  FileText, 
  HelpCircle,
  LayoutDashboard, 
  LogOut, 
  MessageCircle,
  Phone,
  User 
} from "lucide-react";

const NAV_ITEMS = [
  { 
    label: 'Overview', 
    icon: LayoutDashboard, 
    path: '/dashboard' 
  },
  { 
    label: 'Passport Apply', 
    icon: FileText, 
    path: '/dashboard/passport/apply'
  },
  { 
    label: 'Payments', 
    icon: CreditCard, 
    path: '/dashboard/payments'
  },
  { 
    label: 'Notifications', 
    icon: Bell, 
    badge: '2', 
    path: '/dashboard/notifications'
  },
];

const QUICK_LINKS = [
  { label: "How to Apply", icon: HelpCircle, path: '/demo' },
  { label: "FAQs", icon: MessageCircle, path: '/faqs' },
  { label: "Contact Support", icon: Phone, path: '/contacts' },
];



function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onClick(item.label)}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg 
        text-sm font-medium transition-all duration-200
        w-full
        ${isActive 
          ? 'bg-orange-50 text-orange-600 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge && (
        <Badge className="ml-auto bg-orange-100 text-orange-600 hover:bg-orange-100 border-0">
          {item.badge}
        </Badge>
      )}
    </button>
  );
}

function UserProfile({ user, onSignOut }) {
  return (
    <div className="mt-auto border-t border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-3 px-2">
        <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <User className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm truncate">
            {user.emailAddress || user.name}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {user.role}
          </p>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        onClick={onSignOut}
        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}

// DashboardNavBar - Main navigation sidebar component
import { useNavigate, useLocation } from 'react-router-dom';


export default function DashboardNavBar({ 
  onSelect, 
  onSignOut,
  user,
  className = "" 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onSelect) onSelect();
  }

  const isItemActive = (path) => {
    // Exact match for root dashboard
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  }

  return (
    <aside 
      className={`flex flex-col bg-gray-50 w-64 border-r border-gray-200 
                ${className}`}
    >
      {/* Logo/Header Area */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={isItemActive(item.path)}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>

        {/* Quick Links Section */}
        <hr className="my-4 border-gray-200" />
        
        <div className="space-y-1">
          <p className="px-4 py-2 text-sm font-semibold text-gray-950 uppercase tracking-wider">
            Quick Links
          </p>
          {QUICK_LINKS.map((link) => (
            <NavItem
              key={link.label}
              item={link}
              isActive={isItemActive(link.path)}
              onClick={() => handleNavigation(link.path)}
            />
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      <UserProfile 
        user={user || { name: 'Guest', role: 'Visitor' }} 
        onSignOut={onSignOut} 
      />
    </aside>
  );
}

export{
  DashboardNavBar,
}