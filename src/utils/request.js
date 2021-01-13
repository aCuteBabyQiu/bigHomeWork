/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  //给权限
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmRlYmQyNGVjMWFkODBkZTJlMDA2NGJjNDdkNzNlYmZhY2ZmZGJiZmYxMjRlOWE0MDJmOGJkMGJiOGU5Y2VjMjVjM2E1MTYyMjA2YjE5MmYiLCJpYXQiOjE2MDkyNTQ3NDgsIm5iZiI6MTYwOTI1NDc0OCwiZXhwIjoxNjQwNzkwNzQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.HwHEfvnzBZhGRFOigRW_6zKzMuylG1rGMT1xvjvXxw9J33sJtJ-NLtwQw2t7sxkc-p9TDLbovqgcMiROLZXnaJMTdJ7oZAq_sp6Wv6r6apZQ5WNnspDZ6vNYxk7hSMM1iOP48NTntTwmzRaYf5-ePGyt9_WM05IIzlqkyym6fWh49AEilpZIRTler8seaceRwC8J6SQ21g9okE5NKFPtmhehIT23fn-yyMpnKvJYi2_xv4e9zqRIO2rk8urbUgf66hAyHJfsE2LOZfVAWg-vUE2d_S-kbU-qAswgtBs5iQ5jp6dqODQ4gmhfecriFKYsIhdkR2iFakhBHQo6dHw5BM42gwepGkCStXEDXn6G2zqC6cJqBuVVLaFJ4DLnY4PaGjDf08NCy6HV8wo6HnypAQS9_Y9jHjEAIGE37LBRKD0bdQehUyqccbj25U75ZkT6iq6S3oZ0bt3AEwR-OigybN3pO4z4Kd4H-i5s_bQIL-vu3eJsub8z6fhN9uS0XsX65oB6RprTx4leTSis1qMbaJ7DXzsAk1o7oWBW2rrRCwe2TWplN2FUXqbrhI1_AtjkrxEQ1IaLWRk3fzv6pFC-Q8T7WthwX3VDvUiS2_U2CQVWMxSfxR74h2Dgy5CwASE2fWJbgbFtSMKwK5xFR1tzVtfIoOsaVfLtu6Jnhmbxsw8',
  },
});
export default request;
