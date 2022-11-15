
const routes = [
  {
    path: '/',
    component: () => import('pages/HomePage')
  },
  {
    path: '/sseditor',
    component: () => import('src/tools/sseditor/Main')
  },

  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
