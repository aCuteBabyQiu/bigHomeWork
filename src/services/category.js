import request from '@/utils/request';
import { message } from 'antd';

export async function getCategoryList() {
  return request('/api/admin/categories');
}
export async function searchCategory(payload) {
  return request('/api/admin/categories', {
    params: payload,
  });
}
export async function deleteCategory(payload) {
  return request(`/api/admin/categories/${payload}`, {
    method: 'DELETE',
  })
    .then((res) => {
      message.success('删除成功');
    })
    .catch((error) => {
      message.error('删除失败');
    });
}
export async function getCategory(id) {
  return request(`/api/admin/categories/${id}`);
}

export async function updateCategory({ values, id }) {
  return request(`/api/admin/categories/${id}`, {
    method: 'PUT',
    data: values,
  })
    .then((res) => {
      message.success('修改成功');
    })
    .catch((error) => {
      message.error('修改失败');
    });
}
export async function addCategory(values) {
  return request('/api/admin/categories', {
    method: 'POST',
    data: values,
  })
    .then((res) => {
      message.success('添加成功');
    })
    .catch((error) => {
      message.error('添加失败');
    });
}
