import {
  getCategoryList,
  updateCategory,
  addCategory,
  searchCategory,
  getCategory,
  deleteCategory,
} from '@/services/category';

const Category = {
  namespace: 'category',
  state: {
    categoryList: {},
    record: {},
  },
  effects: {
    *getCategoryList(_, { call, put }) {
      const res = yield call(getCategoryList);
      yield put({
        type: 'saveCategoryList',
        payload: {
          data: res,
        },
      });
    },
    *getCategory({ payload: { id } }, { call, put }) {
      let res = yield call(getCategory, id);
      yield put({
        type: 'saveCategory',
        payload: res,
      });
    },
    *updateCategory({ payload: { values, id } }, { call, put }) {
      yield call(updateCategory, { values, id });
      yield put({
        type: 'getCategoryList',
      });
    },
    *addCategory({ payload: { values } }, { call, put }) {
      yield call(addCategory, values);
      yield put({
        type: 'getCategoryList',
      });
    },
    *searchCategory({ payload }, { call, put }) {
      const res = yield call(searchCategory, payload);
      yield put({
        type: 'saveSearchCategory',
        payload: res,
      });
    },
    *deleteCategory({ payload }, { call, put }) {
      yield call(deleteCategory, payload);
      yield put({
        type: 'getCategoryList',
      });
    },
  },
  reducers: {
    saveCategoryList(state, { payload: { data } }) {
      return {
        ...state,
        categoryList: data,
      };
    },
    saveCategory(state, { payload }) {
      return {
        ...state,
        record: payload,
      };
    },
    saveSearchCategory(state, { payload }) {
      return {
        ...state,
        categoryList: payload,
      };
    },
  },
};
export default Category;
