import { query as queryOrders, queryById, updateStatus } from '@/services/order';

const OrderModel = {
  namespace: 'order',
  state: {
    data: [],
    user: {},
    meta: {},
    id:''
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryOrders);
      console.log(response, 'response');
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getDetail({ payload: { id } }, { call, put }) { 
      const res = yield call(queryById, id);    
      yield put({ type: 'detail', payload: res });
    },
    *updateOrderStatus({payload:{params, params2}},{ call, put}){
      console.log('updateOrderStatus');
      const res = yield call(updateStatus,{params,params2})
      // yield put({ type: 'getOrderById', payload: params });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    detail(state, {payload}){
      console.log(payload,'payload');
      return {...state, user:payload}
    },
  },
}
export default OrderModel;
