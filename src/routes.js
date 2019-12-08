import React from 'react'

const routes = [
  { path: '/home', name: 'Home', component: React.lazy(() => import('./views/Home')) },
  {
    path: '/order-form',
    name: 'OrderForm',
    component: React.lazy(() => import('./views/OrderForm'))
  }
]

export default routes
