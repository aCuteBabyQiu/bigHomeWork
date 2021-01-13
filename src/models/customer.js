import {getCustomerById, getOrderById} from '@/services/customer'


const CustmerModel = {
  namespace: 'customer',
  state: {
    user: {},
    ID:'',
    list:[]
  },
  effects: {
    *getUserById({ payload: { id } }, { call, put }) { 
      const result = yield call(getCustomerById,id)
      yield put({ type: 'detail', payload: {result:result,uid:id} });
    },
    *getOrderById({ payload: { id } }, { call, put }) { 
      console.log(id);
      const result = yield call(getOrderById,id)
      console.log(result);
      yield put({ type: 'saveOrders', payload: result });
    },
  },
  reducers: {
    detail(state, {payload}){
      const {result, uid} = payload
      return {...state, user:result,ID:uid  }
    },
    saveOrders(state, {payload}){
      
      return {...state, list:payload }
    },
  },
}
export default CustmerModel;
