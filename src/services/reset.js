import request from '@/utils/request';
import { message } from 'antd';

export async function resetPassword(params) {
  return request('/api/admin/me/update-password', {
    method: 'POST',
    data: params,
  })
    .then((res) => {
      message.success('修改成功');
    })
    .catch((error) => {
      message.error('修改失败');
    });
}
