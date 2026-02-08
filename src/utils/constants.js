
export const USER_ROLES = {
  CITIZEN: 'citizen',
  OFFICER: 'officer',
  ADMIN: 'admin',
}

export const APP_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
}

export const APP_STATUS_ARRAY = [
  { id: 1, status: APP_STATUS.PENDING },
  { id: 2, status: APP_STATUS.APPROVED },
  { id: 3, status: APP_STATUS.REJECTED },
];

export const CHECK_LIST_ITEMS = [
  { id: 1, text: 'Complete application form', completed: true },
  { id: 2, text: 'Submitted required documents', completed: true },
  { id: 3, text: 'Paid application fee', completed: false },
];

export const IS_PAID = true;
export const PGARRY = [20, 40, 60, 80, 100];


export const APP_USER = {
  name: 'John Doe',
  role: USER_ROLES.CITIZEN,
  avatarUrl: null,
};
export const AUTH_FLOW = {
  LOGIN: "login",
  SIGNUP: "signup",
  DASHBOARD: "dashboard",
};

export const PENDING_REVIEWS = [
  {
    id: "APP-2024-001",
    name: "John Doe",
    type: "Ordinary Passport",
    date: "2024-02-05",
    status: "Urgent",
    statusColor: "bg-red-50 text-red-600 border-red-100"
  },
  {
    id: "APP-2024-002",
    name: "Jane Smith",
    type: "Ordinary Passport",
    date: "2024-02-04",
    status: "Standard",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: "APP-2024-003",
    name: "Robert Johnson",
    type: "Diplomatic",
    date: "2024-02-04",
    status: "Priority",
    statusColor: "bg-orange-50 text-orange-600 border-orange-100"
  },
  {
    id: "APP-2024-004",
    name: "Sarah Williams",
    type: "Official Passport",
    date: "2024-02-03",
    status: "Standard",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: "APP-2024-005",
    name: "Michael Brown",
    type: "Official Passport",
    date: "2024-02-03",
    status: "Standard",
    statusColor: "bg-blue-50 text-blue-600 border-blue-100"
  }
];



