import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Category from '~/pages/Category';
import Orders from '~/pages/Orders';
import Store from '~/pages/Store';
import ImpWarehouse from '~/pages/ExpWarehouse';
import ExpWarehouse from '~/pages/ImpWarehouse';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Category },
    { path: config.routes.orders, component: Orders },
    { path: config.routes.store, component: Store },
    { path: config.routes.impWarehouse, component: ImpWarehouse },
    { path: config.routes.expWarehouse, component: ExpWarehouse, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
