import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000, // 10秒的超时
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前可以修改配置，例如添加token到headers
  // config.headers.Authorization = 'Bearer YOUR_TOKEN';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // return Promise.reject(error);

  // 显示一个用户友好的消息
  if (error.message.includes('timeout')) {
    console.log('请求超时，请检查网络或稍后再试。');
  } else if (error.message === 'Network Error') {
    console.log('网络错误，请检查网络连接。');
  } else {
    console.log('发生错误，请稍后再试。');
  }

  // 返回一个特定的对象或空对象，以便不会在客户端抛出错误
  return {
    data: {
      error: '请求失败，请稍后再试'
    }
  };
  
});

export default http;
