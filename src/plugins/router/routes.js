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
        path: 'company-profile',
        component: () => import('@/pages/company-profile.vue'),
      },
      {
        path: 'client-profile',
        component: () => import('@/pages/company-profile.vue'),
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
        path: 'subtopic/detail',
        component: () => import('@/pages/subtopic-detail.vue'),
      },
      {
        path: 'category-lab/detail',
        component: () => import('@/pages/category-lab-detail.vue'),
      },
      {
        path: 'educational-status/detail',
        component: () => import('@/pages/educational-status-detail.vue'),
      },
      {
        path: 'exam-date/detail',
        component: () => import('@/pages/exam-date-detail.vue'),
      },
      {
        path: 'lab-value/detail',
        component: () => import('@/pages/lab-value-detail.vue'),
      },
      {
        path: 'membership/detail',
        component: () => import('@/pages/membership-detail.vue'),
      },
      {
        path: 'university/detail',
        component: () => import('@/pages/university-detail.vue'),
      },
      {
        path: 'system/detail',
        component: () => import('@/pages/system-detail.vue'),
      },
      {
        path: 'question-packet/detail',
        component: () => import('@/pages/question-packet-detail.vue'),
      },
      {
        path: 'config/detail',
        component: () => import('@/pages/config-detail.vue'),
      },
      {
        path: 'admin-management',
        component: () => import('@/pages/admin-management.vue'),
      },
      {
        path: 'student-management',
        component: () => import('@/pages/student-management.vue'),
      },
      {
        path: 'category-lab-management',
        component: () => import('@/pages/category-lab-management.vue'),
      },
      {
        path: 'educational-status-management',
        component: () => import('@/pages/educational-status-management.vue'),
      },
      {
        path: 'exam-dates-management',
        component: () => import('@/pages/exam-date-management.vue'),
      },
      {
        path: 'lab-value-management',
        component: () => import('@/pages/lab-value-management.vue'),
      },
      {
        path: 'student-management',
        component: () => import('@/pages/student-management.vue'),
      },
      {
        path: 'membership-management',
        component: () => import('@/pages/membership-management.vue'),
      },
      {
        path: 'system-management',
        component: () => import('@/pages/system-management.vue'),
      },
      {
        path: 'university-management',
        component: () => import('@/pages/university-management.vue'),
      },
      {
        path: 'config-management',
        component: () => import('@/pages/config-management.vue'),
      },
      {
        path: 'user-trial-report',
        component: () => import('@/pages/user-trial-report.vue'),
      },
      {
        path: 'user-premium-report',
        component: () => import('@/pages/user-premium-report.vue'),
      },
      {
        path: 'payment-report',
        component: () => import('@/pages/payment-report.vue'),
      },
      {
        path: 'profile/:tab',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'otp',
        component: () => import('@/pages/otp.vue'),
      }
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
        path: 'forgot-password',
        component: () => import('@/pages/forgot-password.vue'),
      },
      {
        path: 'reset-password',
        component: () => import('@/pages/reset-password.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
