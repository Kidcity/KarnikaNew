import Base from './Base.service'
import { AVAILABLE_BRANDS_SLUG, COLORS_SLUG, GET_APP_LOGO, GET_APP_VERSION, GET_BANNERS, GET_CITIES, GET_SUGGESTION_SLUG, ICONIC_BRAND_SLUG, MAIN_CATEGORIES_SLUG, SHOP_IN_SHOP_SLUG, STORE_DEVICE_TOKEN, SYNC_CUSTOMER, TOP_BRAND, TOP_TRENDS, TRACK_APP, } from './Slug'
import { store } from '../redux/store'
import { availableBrandsAction, mainCategoriesAction, setBannersAction, setColorsAction, setIconicBrandAction, setPromosAction, setShopINshopBrandAction, storeCitiesAction } from '../redux/actions/homeAction'
import { Animated } from 'react-native'
import { setAppLogo } from '../redux/actions/commonAction'
const config = require("../../config/karnika.config")

class HomeService extends Base {

    _getAppVersion() {
        return new Promise((resolve, reject) => {
            this.post(GET_APP_VERSION).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _getAppLogo() {
        return new Promise((resolve, reject) => {
            this.post(GET_APP_LOGO).then(response => {
                
                // console.log("==>", response?.data?.data   );
                store.dispatch(setAppLogo(response?.data?.data?.logo))
            }, error => {
                // console.log(error);
                reject(error)
            })
        })
    }

    _saveTrackingDataService(param) {
        return new Promise((resolve, reject) => {
            this.post(TRACK_APP, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _getCategoriesService(param) {
        return new Promise((resolve, reject) => {
            this.post(MAIN_CATEGORIES_SLUG, param).then(response => {
                const data = response.data.data
                let categories = []
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    categories.push({
                        id: element.id,
                        image: element.image,
                        title: element.name
                    })
                }
                // console.log(categories);
                store.dispatch(mainCategoriesAction(categories))
                resolve(categories)
            }, error => {
                reject(error)
            })
        })
    }

    _availableBrandService(param) {
        // console.log('_availableBrandService');
        return new Promise((resolve, reject) => {
            this.post(AVAILABLE_BRANDS_SLUG, param).then(response => {

                if (response?.data?.data) {
                    const allbrands = response.data.data
                    
                    let location_brands = []

                    for (let index = 0; index < allbrands.length; index++) {
                        const element = allbrands[index];
                        let brands = []

                        if (element.brands.length > 0) {
                            brands = [...element.brands, {
                                brand_name: "view_more",
                                city_id: element.city_id,
                                city_name: element.city_name
                            }]
                        }

                        location_brands.push({
                            location: element.city_name,
                            titleLogo: element.titleLogo,
                            brands: brands
                        })
                    }

                    // store.dispatch(availableBrandsAction(location_brands))
                    resolve({
                        brands: location_brands
                    })
                } else {
                    reject({
                        message: "No available brands found."
                    })
                }
            }, error => {
                reject(error)
            })
        })
    }

    _getColorsService() {
        return new Promise((resolve, reject) => {
            this.post(COLORS_SLUG).then(response => {
                if (response.data) {
                    const data = response.data.data.data
                    store.dispatch(setColorsAction(data))
                    resolve(true)
                }

            }, error => {
                reject(error)
            })
        })
    }

    _getSuggestionService(param) {

        return new Promise((resolve, reject) => {
            this.post(GET_SUGGESTION_SLUG, param).then(response => {

                const data = response.data.data.data
                //console.log('data sugg  =====>  ', data);
                resolve(data)
            }, error => {
                reject(error)
            })
        })
    }

    _syncCustomerToUniwareService(userid) {
        const url = config.serviceUrl + SYNC_CUSTOMER + userid
        return new Promise((resolve, reject) => {
            this.get(url).then(response => {
                // console.log(response);
            }, error => {
                reject(error)
            })
        })
    }

    _shopINshopBrandService(param) {
        return new Promise((resolve, reject) => {
            this.post(SHOP_IN_SHOP_SLUG, param).then(response => {
                // console.log("_shopINshopBrandService  ==> ",response.data.data);
                if (response?.data?.data?.data) {
                    const data = response.data.data.data

                    let final_array = []

                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        final_array.push({
                            ...element,
                            poster: element.image,
                            isPlaying: false,
                            xyAxis: new Animated.ValueXY({ x: -40, y: -50 }),
                            opacity: new Animated.Value(1)
                        })
                        if (index === data.length - 1) {
                            final_array.push({
                                show_more: true
                            })
                        }
                    }

                    store.dispatch(setShopINshopBrandAction(final_array))

                } else {
                    reject({
                        message: "Something went wrong."
                    })
                }

            }, error => {
                reject(error)
            })
        })
    }

    _AllshopINshopBrandService() {
        return new Promise((resolve, reject) => {
            this.post(SHOP_IN_SHOP_SLUG).then(response => {

                if (response?.data?.data?.data) {
                    const data = response?.data?.data?.data
                   
                    let final_array = []

                    if (data.length > 0) {
                        for (let index = 0; index < data.length; index++) {
                            const element = data[index];
                            final_array.push({
                                ...element,
                            })
                        }
                    }

                    resolve({
                        data: final_array
                    })
                } else {
                    reject({
                        message: "Something went wrong."
                    })
                }

            }, error => {
                reject(error)
            })
        })
    }

    _IconicBrandService() {
        return new Promise((resolve, reject) => {
            this.post(ICONIC_BRAND_SLUG).then(response => {

                if (response?.data?.data?.data) {
                    const data = response.data.data.data

                    let iconic_final_array = []

                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        iconic_final_array.push({
                            ...element,
                            poster: element.image,
                            isPlaying: false,
                            xyAxis: new Animated.ValueXY({ x: -40, y: -50 }),
                            opacity: new Animated.Value(1)
                        })
                        if (index === data.length - 1) {
                            iconic_final_array.push({
                                show_more: true
                            })
                        }
                    }

                    store.dispatch(setIconicBrandAction(iconic_final_array))

                } else {
                    reject({
                        message: "Something went wrong."
                    })
                }

            }, error => {
                reject(error)
            })
        })
    }

    _getCitiesService() {
        return new Promise((resolve, reject) => {
            this.post(GET_CITIES).then(response => {
                if (response.data.data.data) {

                    if (response.data.data) {
                        const data = response.data.data.data
                        if (data.length > 0) {
                            data.map((item, index) => {

                                if (item.city_name == 'Kolkata') {
                                    item.isActive = true
                                }
                                else {
                                    item.isActive = false
                                }
                            })
                        }
                        store.dispatch(storeCitiesAction(data))
                        resolve(true)
                    } else {
                        reject({
                            message: "Something went wrong in cities API."
                        })
                    }


                } else {
                    reject({ success: false, message: "No cities found" })
                }
                //resolve(data)
            }, error => {
                reject(error)
            })
        })
    }

    _getTopBrandService(param) {
        return new Promise((resolve, reject) => {
            this.post(TOP_BRAND,param).then(response => {
            
            if(response?.data?.data?.data){
                // console.log("brands ====> ", JSON.stringify(response?.data?.data?.data));
                resolve({
                    topbrand: response?.data?.data?.data
                })
            }
            }, error => {
                reject(error)
            })
        })
    }

    _getBannerService(param) {
        console.log('_getBannerService ==> ', param);

        return new Promise((resolve, reject) => {
            this.post(GET_BANNERS, param).then(response => {
                if (response?.data?.data?.data) {
                    const data = response?.data?.data?.data
                    // console.log(JSON.stringify(response?.data?.data));
                    var header_banner =  Object.assign({})
                    var promo_final_obj = Object.assign({})

                    if (data.banners.length > 0 || data.promos.length > 0) {
                        const banners = data.banners
                        const promos = data.promos
                       
                        header_banner = banners.filter((item) => item.banner_section == "HEADER")[0] || {}

                        if (promos.banner_details.length > 0) {
                            promo_final_obj = {
                                banner_section: promos.banner_section ?? "",
                                banner_section_id: promos.banner_section_id ?? "",
                                banner_details: promos.banner_details ?? []
                            }
                        }
                    }

                    const benefitlogo = response?.data?.data?.benefitlogo?.logo
                    const purchase_history = response?.data?.data?.purchase_history?.logo
                    const footer_banner = response?.data?.data?.footer_banner?.url



                    resolve({ 
                        status: true, 
                        header_banner: header_banner,
                        promo_banner: promo_final_obj,
                        benefitlogo: benefitlogo,
                        purchase_history: purchase_history,
                        footer_banner: footer_banner
                     })
                } else {
                    reject({ message: "Something went wrong" })
                }
            }, error => {
                console.log('banner error ----------- ', error);
                reject(error)
            })
        })
    }

    _getTopTrendsService(param) {        
        return new Promise((resolve, reject) => {
            this.post(TOP_TRENDS, param).then(response => {

                const data = response?.data?.data?.data                
                if(data){
                    resolve(data)
                }else{
                    reject(false)
                }
            }, error => {
                reject(error)
            })
        })
    }

    _storeDeviceToken(param) {
        return new Promise((resolve, reject) => {
            this.post(STORE_DEVICE_TOKEN, param).then(response => {

                const data = response.data.data
                if (data.status) {
                    resolve(true)
                } else {
                    reject(false)
                }
            }, error => {
                reject(error)
            })
        })
    }

}

export default new HomeService()