import { message } from 'antd';

interface IParams {
  [paramName: string]: any
}

interface IResult {
  code: number | string
  msg: null | string
  data: any
}

// 环境变量，请求base url
const BASE_URL = import.meta.env.VITE_BASE_URL_API;

function getOptions(options: IParams) {
  const defaultOptions = {
    // credentials: 'include'
  };
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    ...options.headers,
  }
  const newOptions: IParams = { ...defaultOptions, ...options };

  // 增加一个'唯一'标识，方便服务端追踪请求，定位问题
  headers['request-id'] = Number(Math.random().toString().substr(2, 19) + new Date().getTime()).toString(36);

  newOptions.headers = headers;
  return newOptions;
}

// 发送请求 处理body的
function requestFetch(url: string, options: IParams) {
  const newOptions = getOptions(options);
  return new Promise((resolve, reject) => {
    window.fetch(`${BASE_URL}${url}`, newOptions)
      .then((response) => response.json())
      .then((result: IResult) => {
        // 返回结果
        try {
          if (result.code === 200) { // 接口正常成功
            resolve(result.data);
          } else { // 处理session过期
            console.error(result.msg);
            message.warning(result?.msg || '');
            reject(result);
          }
        } catch (err) {
          console.error(err);
          message.warning('网络异常');
          reject(err);
        }
      })
      .catch((e) => {
        console.error(e);
        message.error('网络错误');
        return reject(e);
      });
  });
}

function get(url: string, params?: IParams) {
  if (params && Object.keys(params)) { // 拼装参数
    Object.keys(params).forEach((key, index) => {
      if (index === 0) {
        url += `?${key}=${params[key]}`;
      } else {
        url += `&${key}=${params[key]}`;
      }
    });
  }
  return requestFetch(url, {
    method: 'get',
  });
}

function post(url: string, params?: IParams) {
  return requestFetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: params ? JSON.stringify(params) : null,
  });
}

function postFormData(url: string, params: IParams) {
  return requestFetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: params ? JSON.stringify(params) : null,
  });
}

function postFile(url: string, params: IParams) {
  const formData = new FormData(); // 创建form对象
  // eslint-disable-next-line guard-for-in
  for (const key in params) {
    formData.append(key, params[key]);
  }

  return requestFetch(url, {
    method: 'post',
    headers: {
      // 'Content-Type': 'multipart/form-data;charset=utf-8',
    },
    body: formData,
  });
}

function put(url: string, params: IParams) {
  return requestFetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: params ? JSON.stringify(params) : null,
  });
}

function putFormData(url: string, params: IParams) {
  return requestFetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: params ? JSON.stringify(params) : null,
  });
}

export {
  requestFetch,
  get,
  post,
  postFormData,
  postFile,
  put,
  putFormData,
};
