import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/admin/oauth/token', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
export async function removeToken() {
  return request('/api/admin/oauth/token/revoke', {
    method: 'POST',
  });
}
