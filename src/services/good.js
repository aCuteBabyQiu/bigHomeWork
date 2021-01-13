import request from '@/utils/request';
import { message } from 'antd';

export async function getGoodList() {
  return request('/api/admin/products');
}
export async function getGood(id) {
  return request(`/api/admin/products/${id}`);
}
//创建分类详情供分类标签使用
export async function createGoodCategoryId(payload) {
  return request('/api/admin/categories', {
    method: 'POST',
    data: payload,
  });
}
//创建标签详情供分类标签使用
export async function createGoodTagsId(payload) {
  return request('/api/admin/tags', {
    method: 'POST',
    data: payload,
  });
}
export async function deleteGood(payload) {
  return request(`/api/admin/products/${payload}`, {
    method: 'DELETE',
  })
    .then((res) => {
      message.success('删除成功');
    })
    .catch((error) => {
      message.error('删除失败');
    });
}
export async function searchGood(payload) {
  return request('/api/admin/products', {
    params: payload,
  });
}
export async function updateGood({ params, id }) {
  return request(`/api/admin/products/${id}`, {
    method: 'PUT',
    data: params,
  })
    .then((res) => {
      message.success('修改成功');
    })
    .catch((error) => {
      message.error('修改失败');
    });
}

export async function addGood(params) {
  return request('/api/admin/products', {
    method: 'POST',
    data: params,
  })
    .then((res) => {
      message.success('添加成功');
    })
    .catch((error) => {
      message.error('添加失败');
    });
}
