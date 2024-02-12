// import axios from 'axios'
const axios = require('axios').default;
import { clearCreditAgenciesAction } from '../redux/actions/applyForCreditAction'
import { clearProductFilterAction } from '../redux/actions/commonAction'
import { clearLoginData } from '../redux/actions/loginAction'
import { clearProductListData } from '../redux/actions/productListAction'
import { clearWishListCount } from '../redux/actions/wishListAction'
const config = require("../../config/karnika.config")
import { store } from '../redux/store'
import * as RootNavigation from '../helper/NavigationHelper'
// import { _recordCrashReport, _setCrashAttributes } from '../helper/CrashlyticsHelper';

class Base {
  constructor() {

    this.http = {}
    this.#init()
  }

  #commonHeader = {
    'Accept': 'application/json',
  }

  #init = async () => {
    this.http = await axios.create({
      baseURL: config.serviceUrl,
    })
    //request interceptor
    this.http.interceptors.request.use(data => {
      // console.log("request =====> ", JSON.stringify(data));
      //this.showLoader()   
      //store.dispatch(startLoadingAction(true))      
      return data
    }, (error) => {
      //this.hideLoader()
      //store.dispatch(endLoadingAction(false))
      // console.log('interceptors response data', data);
      return Promise.reject(error)
    })

    //response interceptor
    this.http.interceptors.response.use(response => {
      // console.log("response =====> ", JSON.stringify(response));
      //this.hideLoader()
      //store.dispatch(endLoadingAction(false))
      return response;
    }, (error) => {
      //this.hideLoader()
      //store.dispatch(endLoadingAction(false))
      return Promise.reject(error)
    });
  }

  // getToken() {
  //   return new Promise(resolve => resolve(store.getState().authReducer.userData.token ? store.getState().authReducer.userData.token : null))
  // }

  async getHeader() {
    return { ...this.#commonHeader }

    // let _token = await this.getToken()
    // if (_token === null) {
    //   return { ...this.#commonHeader }
    // } else {
    //   return { ...this.#commonHeader }
    // }
  }

  // decode(token = null) {
  //   return new Promise(async (resolve, reject) => {
  //     if (token == '') {
  //       reject(this.response(false, "API token missing."))
  //     }
  //     else {
  //       try {
  //         let data = jwt_decode(token)
  //         data = { ...data, token: token }
  //         resolve(data)
  //       } catch (error) {
  //         reject(error)
  //       }
  //     }
  //   })

  // }

  uploadImage(slug, body) {
    return new Promise(async (resolve, reject) => {
      if (slug) {
        let headers = await this.getHeader()
        headers["Content-Type"] = "multipart/form-data"
        // console.log('headers ', headers);
        if (!headers) {
          reject(this.response(false, "Header not forund.\nSomething went wrong."))
        } else {
          try {
            const controller = new AbortController();
            this.http.postForm(config.serviceUrl + slug, body, {
              signal: controller.signal,
              headers: headers
            }).then(response => {
              if (response.status === 200) {
                resolve(this.response(true, "Success", response))
              }
              else
                reject(this.response(false, "API Error"))
            }).catch(error => {
              reject(this.response(false, "API Error"))
            })
          } catch (error) {

            if (error.response) {
              const errMessage = error.response.data ? error.response.data.message : 'server_error'
              reject(this.response(false, errMessage, error))
            }
          }

        }
      }
    })
  }

  post(slug, body = {}) {
    // console.log(slug);
    return new Promise(async (resolve, reject) => {

      if (slug) {
        let headers = await this.getHeader()


        if (!headers) {
          reject(this.response(false, "Header not forund.\nSomething went wrong."))
        }
        else {

          const cancelTokenSource = axios.CancelToken.source();
          const timeout = setTimeout(() => {
            cancelTokenSource.cancel();
          }, config.apiTimeout);
          try {
            let resp = await this.http({
              url: slug,
              method: "POST",
              headers,
              data: body
            })
            //  console.log("resp =====> ",JSON.stringify(resp));
            clearTimeout(timeout)
            if (resp.status === 200) {
              resolve(this.response(true, "Success", resp))
            }
            else{
              reject(this.response(false, "API Error"))
            }

          } catch (err) {
            let errMessage = '';
            clearTimeout(timeout)
            // console.log('api error ==========> ', JSON.stringify(err.response.data));
            // _setCrashAttributes({
            //   api: slug,
            //   method: "POST",
            //   param: JSON.stringify(body),
            //   error: JSON.stringify(err)
            // })
            // _recordCrashReport(err)

            if (err.response) {
              if (err.response.data) {
                if (err.response.data.message) {
                  errMessage = err.response.data.message
                }else{
                  errMessage = JSON.stringify(err.response.data)
                }
              }else{
                if(err.message){
                  errMessage = err.message
                }
                errMessage = "server_message"
              }

              if (err.response.data.status === 401) {
                errMessage = err.response.data ? err.response.data.message : 'server_error'
              }
              reject(this.response(false, errMessage, err))
            } else {
              errMessage = err.message ? err.message : 'server_error'
              reject(this.response(false, errMessage, err))
            }
          }
        }
      }
      else {
        resolve(this.response(false))
      }
    })
  }

  get(slug) {
    return new Promise(async (resolve, reject) => {
      if (slug) {
        await axios.get(slug).then((response) => {
          resolve(this.response(true, "success", response))
        }, error => {
          reject(this.response(false, "Error", error))
        });
      } else {
        reject(this.response(false, 'Slug is missing'))
      }
    })
  }

  imageUploadWithData(slug, param) {
    return new Promise(async (resolve, reject) => {
      if (slug) {
        await axios.post(config.serviceUrl + slug, param).then((response) => {
          resolve(this.response(true, "success", response))
        }, error => {
          //console.log(error);
          reject(this.response(false, "Error", error))
        });

      } else {
        reject(this.response(false, 'Slug is missing'))
      }
    })
  }

  response(success = false, message = "", data = null) {
    return {
      success,
      message,
      data
    }
  }
}

module.exports = Base