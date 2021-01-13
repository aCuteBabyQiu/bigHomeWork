import request from '@/utils/request';

export async function getCustomer(params){
    return request('/api/admin/customers')
}

export async function getCustomerById(params){
    return request(`/api/admin/customers/${params}`)
}

export async function getCustomerHome(params){
    return request('/api/admin/customers',{method:'GET', params})
}
export async function getOrderById(params){
    return request(`/api/admin/customers/${params}/orders`)
}

/* async function getReport(){
   return request('/api/admin/reports/sales').then(res=>console.log(res,'report'))
}
getReport() */