import Home from '~/pages/Home';
import Orders from '~/pages/Orders';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/orders', component: Orders },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
