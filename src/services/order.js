import request from '@/utils/request';

export async function query(params){
    return request('/api/admin/orders',{
        method:"GET", params})
}
export async function queryById(params){
    return request(`/api/admin/orders/${params}`)
}

export async function updateStatus({params,params2}){
    console.log('123');
    return request(`/api/admin/orders/${params}/track`,
    {
        method:'POST',
        data:params2 ,
    
    })
}
