import request from '@/utils/request';

export async function queryData(params){
    return request('/api/admin/reports/hot_products',{
        method:"GET", params})
       
}
export async function queryReports(params){
    return request('/api/admin/reports',{
        method:"GET", params})
    
}
export async function queryOrders(params){
    return request('/api/admin/reports/orders',{
        method:"GET", params})
       
}