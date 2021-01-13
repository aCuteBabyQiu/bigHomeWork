import {
  getGoodList,
  getGood,
  updateGood,
  addGood,
  searchGood,
  deleteGood,
  createGoodCategoryId,
  createGoodTagsId,
} from '@/services/good';

const GlobalModel = {
  namespace: 'goodList',
  state: {
    productsList: {},
    recordShow: {},
    usefulRecord: { tags: [], categories: [], gallery: [] },
    imgs: [],
    tempId: [],
    tempId2: [],
    uploadImg: [],
    submitImg: [],
  },
  effects: {
    *getProducts(_, { call, put }) {
      const response = yield call(getGoodList);
      yield put({
        type: 'saveProducts',
        payload: {
          response,
        },
      });
    },
    *getGood({ payload: { id } }, { call, put }) {
      const res = yield call(getGood, id);
      yield put({
        type: 'saveGood',
        payload: res,
      });
      yield put({
        type: 'saveImg',
        payload: res,
      });
    },
    *updateGood({ payload: { params, id } }, { call, put }) {
      yield call(updateGood, { params, id });
      yield put({
        type: 'getProducts',
      });
    },
    *addGood({ payload: { values } }, { call, put }) {
      yield call(addGood, values);
      yield put({
        type: 'getProducts',
      });
    },
    *searchGood({ payload }, { call, put }) {
      const res = yield call(searchGood, payload);
      yield put({
        type: 'saveSearchGood',
        payload: res,
      });
    },
    *deleteGood({ payload }, { call, put }) {
      yield call(deleteGood, payload);
      yield put({
        type: 'getProducts',
      });
    },

    *createGoodCategoryId({ payload }, { call, put }) {
      const res = yield call(createGoodCategoryId, payload);
      yield put({
        type: 'saveTempId',
        payload: res,
      });
      return res;
    },
    *createGoodTagsId({ payload }, { call, put }) {
      const res = yield call(createGoodTagsId, payload);
      yield put({
        type: 'saveTempId2',
        payload: res,
      });
      return res;
    },
  },
  reducers: {
    saveProducts(state, { payload: { response } }) {
      return {
        ...state,
        productsList: response,
      };
    },
    saveGood(state, { payload }) {
      let Imgs = payload.gallery.map((item) => {
        return { uid: item.url, url: item.url };
      });
      let useRecord = {};
      useRecord.title = payload.title;
      useRecord.price = payload.price;
      useRecord.regular_price = payload.regular_price;
      useRecord.sku = payload.sku;
      useRecord.post_status = payload.post_status;
      useRecord.manage_stock = payload.manage_stock;
      useRecord.post_content = payload.post_content;
      useRecord.gallery = payload.gallery;
      return {
        ...state,
        recordShow: useRecord,
        usefulRecord: payload,
        imgs: Imgs,
        uploadImg: payload.gallery,
      };
    },
    saveSearchGood(state, { payload }) {
      return {
        ...state,
        productsList: payload,
      };
    },
    saveTempId(state, { payload }) {
      console.log(payload.id);
      return {
        ...state,
        tempId: payload.id,
      };
    },
    saveTempId2(state, { payload }) {
      console.log(payload.id);
      return {
        ...state,
        tempId2: payload.id,
      };
    },
    saveuploadList3(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        submitImg: payload,
      };
    },
  },
};
export default GlobalModel;
