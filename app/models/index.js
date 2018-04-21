import { routerReducer } from 'react-router-redux';
import services from './services';
import categories from './categories';
import organizations from './organizations';
import user from './user';

export default {
  categories,
  organizations,
  routing: routerReducer,
  services,
  user,
};
