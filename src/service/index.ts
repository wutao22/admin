import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import router from "@/router";
import qs from 'qs'
import { ElMessage } from "element-plus";


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 50000


// 添加请求拦截器
axios.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('Token')) {
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})



// 响应拦截器 
axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const { code, msg } = response.data;
      if (code === '200') {
        return response.data;
      } else {
        // 响应数据为二进制流处理(Excel导出)
        if (response.data instanceof ArrayBuffer) {
          return response;
        }
  
        ElMessage({
          message: msg || '系统出错',
          type: 'error'
        });
        return Promise.reject(new Error(msg || 'Error'));
      }
    },
    (error: any) => {
      if (error.response.data) {
        const { code, msg } = error.response.data;
        // token 过期,重新登录
        if (code === '600') {
          ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
            confirmButtonText: 'OK',
            type: 'warning'
          }).then(() => {
            localStorage.clear();
            window.location.href = '/';
          });
        } else {
          ElMessage({
            message: msg || '系统出错',
            type: 'error'
          });
        }
      }
      return Promise.reject(error.message);
    }
  );

// get请求
export function get(url: String, params: any) {
    return new Promise((resolve, reject) => {
        axios.get('/api' + url, {
            params
        }).then(res => {
            if (res.data.code === '200') {
                res.data.success = true
            } else {
                res.data.success = false
            }
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// post 请求

export function post(url: String, params: any) {
    return new Promise((resolve, reject) => {
        axios.post(
            '/api' + url, qs.stringify(params)
        ).then(res => {
            if (res.data.code === '200') {
                res.data.success = true
            } else {
                res.data.success = false
            }
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

// 响应码处理
// const ResponseProcessing = (error: { response: { state: any; data: any; }; }) => {
//     if (error.response) {
//         switch (error.response.state) {
//             case 401:
//                 ElMessage.warning("资源没有访问权限！");
//                 break;
//             case 404:
//                 ElMessage.warning("接口不存在，请检查接口地址是否正确！");
//                 break;
//             case 500:
//                 ElMessage.warning("内部服务器错误，请联系系统管理员！");
//                 break;
//             default:
//                 return Promise.reject(error.response.data); // 返回接口返回的错误信息
//         }
//     } else {
//         ElMessage.error("遇到跨域错误，请设置代理或者修改后端允许跨域访问！");
//     }
// };

