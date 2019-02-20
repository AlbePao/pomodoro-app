
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import FormPage from '../pages/FormPage';
import NotFoundPage from '../pages/NotFoundPage';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
