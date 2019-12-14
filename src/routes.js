import React from 'react';

const routes = [
    { path: '/home', name: 'Home', component: React.lazy(() => import('./views/Home')) },
    {
        path: '/order-tracking',
        name: 'OrderTracking',
        component: React.lazy(() => import('./views/OrderTracking')),
    },
    {
        path: '/order-form',
        name: 'OrderForm',
        component: React.lazy(() => import('./views/OrderForm')),
    },
    {
        path: '/advancing-order',
        name: 'AdvancingOrder',
        component: React.lazy(() => import('./views/AdvancingOrder')),
    },
    {
        path: '/cashier',
        name: 'Cashier',
        component: React.lazy(() => import('./views/Cashier')),
    },
];

export default routes;
