export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'report-api',
        component: () => import('@/pages/api-report.vue'),
      },
      {
        path: 'report-tagihan',
        component: () => import('@/pages/api-report.vue'),
      },
      {
        path: 'settlement-history',
        component: () => import('@/pages/api-report.vue'),
      },
      {
        path: 'user-management',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'role-management',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'access-management',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'audit-trail',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'company-transaction-limit',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'exam-dates-management',
        component: () => import('@/pages/exam-dates-management.vue'),
      },
      {
        path: 'profile/:tab',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'otp',
        component: () => import('@/pages/otp.vue'),
      },
      {
        path: 'upgrade/membership',
        component: () => import('@/pages/membership-dashboard.vue'),
      },
      {
        path: 'membership/detail',
        component: () => import('@/pages/membership-template-detail.vue'),
      },
      {
        path: 'lab-values',
        component: () => import('@/pages/lab-values.vue'),
      },
      {
        path: 'analisa-advis',
        component: () => import('@/pages/result-analyst-dashboard.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: 'register-step-2',
        component: () => import('@/pages/register-step-2.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
