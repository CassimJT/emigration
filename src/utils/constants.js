
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


