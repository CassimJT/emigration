
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

export const sampleProcessingApplications = [
  {
    _id: "698dea87df8b555e2c78edce",
    type: "Ordinary",
    applicant: "698d92c4071e66192fc52b39",
    identitySession: "698dd8fe084a56db0d38b51c",
    status: "SUBMITTED",
    createdAt: "2026-02-10T09:15:22.000Z",
    submittedAt: "2026-02-10T10:40:10.000Z",
    reviewedAt: null,
    reviewer: null,
    payment: { status: "PENDING", amount: 45000, method: "Airtel Money" },
    formData: {
      1: { passportType: "Ordinary", serviceType: "Normal", bookletType: "36 Pages" },
      2: {
        name: "Chisomo",
        surname: "Phiri",
        email: "chisomo.phiri98@gmail.com",
        dateOfBirth: "1998-05-14",
        gender: "Female",
        nationality: "Malawian",
        phone: "+265999123456"
      }
    }
  },

  {
    _id: "698df123abc456def7890123",
    type: "Ordinary",
    applicant: "698d92c4071e66192fc52b40",
    status: "In Review",
    createdAt: "2026-02-08T14:22:45.000Z",
    submittedAt: "2026-02-08T15:10:33.000Z",
    reviewedAt: "2026-02-12T09:45:00.000Z",
    reviewer: "officer-mary-k",
    payment: { status: "PAID", amount: 45000, method: "Bank Transfer", paidAt: "2026-02-09T11:20:00.000Z" },
    formData: {
      1: { passportType: "Ordinary", serviceType: "Expedited", bookletType: "48 Pages" },
      2: {
        name: "Tawanda",
        surname: "Kumwenda",
        email: "tawanda.k89@yahoo.com",
        dateOfBirth: "1989-11-03",
        gender: "Male",
        nationality: "Malawian",
        phone: "+265888456789"
      }
    }
  },

  {
    _id: "698df456789abc123def4567",
    type: "Diplomatic",
    applicant: "698d92c4071e66192fc52b41",
    status: "Awaiting Documents",
    createdAt: "2026-02-11T16:30:15.000Z",
    submittedAt: "2026-02-11T17:05:22.000Z",
    reviewedAt: "2026-02-12T08:15:00.000Z",
    reviewer: "officer-john-m",
    payment: { status: "PAID", amount: 120000, method: "Visa Card" },
    formData: {
      1: { passportType: "Diplomatic", serviceType: "Normal", bookletType: "48 Pages" },
      2: {
        name: "Dr. Mercy",
        surname: "Mwale",
        email: "mercy.mwale@moh.gov.mw",
        dateOfBirth: "1975-08-22",
        gender: "Female",
        nationality: "Malawian",
        phone: "+265999876543"
      }
    }
  },

  {
    _id: "698df789def123456abc7890",
    type: "Ordinary",
    applicant: "698d92c4071e66192fc52b42",
    status: "REJECTED",
    createdAt: "2026-02-09T10:05:12.000Z",
    submittedAt: "2026-02-09T11:20:55.000Z",
    reviewedAt: "2026-02-12T10:30:00.000Z",
    reviewer: "officer-sara-l",
    payment: { status: "REFUNDED", amount: 45000, refundedAt: "2026-02-12T11:15:00.000Z" },
    formData: {
      1: { passportType: "Ordinary", serviceType: "Normal", bookletType: "36 Pages" },
      2: {
        name: "Frank",
        surname: "Harrison",
        email: "franklinlungu21@gmail.com",
        dateOfBirth: "1995-03-21",
        gender: "Male",
        nationality: "Malawian",
        phone: "+265888234567"
      }
    }
  },

  {
    _id: "698dfabc123def456789abcd",
    type: "Ordinary",
    applicant: "698d92c4071e66192fc52b43",
    status: "APPROVED",
    createdAt: "2026-02-07T08:45:30.000Z",
    submittedAt: "2026-02-07T09:30:15.000Z",
    reviewedAt: "2026-02-11T14:20:00.000Z",
    reviewer: "senior-officer-p",
    payment: { status: "PAID", amount: 45000, method: "TNMP" },
    formData: {
      1: { passportType: "Ordinary", serviceType: "Normal", bookletType: "36 Pages" },
      2: {
        name: "Aisha",
        surname: " Banda",
        email: "aisha.banda22@gmail.com",
        dateOfBirth: "2000-07-15",
        gender: "Female",
        nationality: "Malawian",
        phone: "+265999567890"
      }
    }
  }
];

