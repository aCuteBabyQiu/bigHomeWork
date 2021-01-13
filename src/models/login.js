import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, removeToken } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    currentUser: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      let res = JSON.stringify(response);
      let token = response.access_token;
      let token_type = response.token_type;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('res', res);
      window.localStorage.setItem('token_type', token_type);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.access_token) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout(_, { call }) {
      // yield call(removeToken);
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      window.localStorage.removeItem('res');
      window.localStorage.removeItem('token_type');
      window.localStorage.removeItem('token');
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *getRes(_, { put }) {
      let Res = JSON.parse(window.localStorage.res);
      yield put({
        type: 'saveRes',
        payload: { Res },
      });
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, currentUser: payload };
    },
    saveRes(state, { payload: { Res } }) {
      return {
        ...state,
        currentUser: Res,
      };
    },
  },
};
export default Model;
