import {queryOrders, queryData, queryReports} from '@/services/static'


const ReportModel = {
  namespace: 'reports',
  state: {
    orders: [],
    report: [],
    sales : [],
    visitors: [],
    hots:[],
    salesNow:[],
    visitorsNow:[]
  },
  effects: {
    *queryData({ payload }, { call, put }) { 
      const result = yield call(queryData,payload)
      console.log(result,'132');
      yield put({ type: 'detail', payload: result.data });
    },
    *queryReports({ payload }, { call, put }) { 
      const result = yield call(queryReports,payload)
      yield put({ type: 'saveReports', payload: result });
    },
    *queryNowData({ payload }, { call, put }) { 
      const result = yield call(queryReports,payload)
      console.log(result);
      yield put({ type: 'saveNowReports', payload: result });
    },

  },
  reducers: {
    detail(state, { payload }){
      return {...state, hots:payload  }
    },
    saveReports(state, { payload }){
      let sale =payload[0].data 
      let order = payload[1].data
      let visit = payload[2].data
      return {  ...state, 
                report: payload,
                sales : sale,
                orders:order,
                visitors: visit
             }
    },
    saveNowReports(state, { payload }){
      let saleNow =payload[0].data
      let visitNow = payload[3].data
      return {  ...state, 
        salesNow:saleNow,
        visitorsNow:visitNow
             }
    },
  },
}
export default ReportModel;
