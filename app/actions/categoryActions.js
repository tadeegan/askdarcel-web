import { CATEGORIES_LOAD, CATEGORIES_LOAD_SUCCESS, CATEGORIES_LOAD_FAIL } from 'actions/actionTypes';
import { get } from 'utils/DataService';

export function fetchCategories(conf) {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_LOAD });
    return get(`/api/categories${conf.top ? '?top_level=true' : ''}`).then((resp) => {
      const { categories } = resp;
      dispatch({ type: CATEGORIES_LOAD_SUCCESS, categories });
    }).catch((err) => {
      dispatch({ type: CATEGORIES_LOAD_FAIL, err });
    });
  };
}
