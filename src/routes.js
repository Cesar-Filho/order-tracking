import React from 'react';

const routes = [
  { path: '/home', name: 'OrderTracking', component: React.lazy(() => import('./views/OrderTracking')) },
  {
    path: '/order-form',
    name: 'OrderForm',
    component: React.lazy(() => import('./views/OrderForm'))
  },
  {
    path: '/advancing-order',
    name: 'AdvancingOrder',
    component: React.lazy(() => import('./views/AdvancingOrder'))
  }
];

export default routes;
