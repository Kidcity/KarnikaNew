import Base from './Base.service'
import { AVAILABLE_BRANDS_SLUG, CATELOG_BANNER_SLUG, GET_BANNERS, MAIN_CATEGORIES_SLUG } from './Slug';
import { store } from '../redux/store'
import { setAvailableBrandsByCityAction, setBannersAction, setCategoriesAction, setGenderAction } from '../redux/actions/storeByCityAction';
import { setMinimunOrderPriceAction } from '../redux/actions/purchaseHistoryAction';

class StoreByCityService extends Base {
    
    _getGenderService(param) {
        return new Promise((resolve, reject) => {
            this.post(MAIN_CATEGORIES_SLUG, param).then(response => {

                if (response?.data?.data) {
                    const data = response?.data?.data
                    
                    let categories = []
                    if (data.categories && data.categories.length > 0) {
                        for (let index = 0; index < data.categories.length; index++) {
                            const element = data.categories[index];
                            categories.push({
                                id: element.id,
                                image: element.image,
                                title: element.name
                            })
                        }
                    }
                    store.dispatch(setMinimunOrderPriceAction(data.minimum_order_pirce))
                    store.dispatch(setGenderAction(categories))
                    resolve(true)
                } else {
                    reject({ message: "Something went wrong." })
                }
            }, error => {
                reject(error)
            })
        })
    }

    _availableBrandService(param) {
        // console.log('_availableBrandService', param);
        return new Promise((resolve, reject) => {
            this.post(AVAILABLE_BRANDS_SLUG, param).then(async response => {

                const data = response.data.data.brand_logos

                let brands = []
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    brands.push({
                        id: element.id,
                        image: element.brandlogo,
                        brand_name: element.brand_name,
                        brand_location: element.brand_location
                    })
                }
                // console.log('brands',brands);
                await store.dispatch(setAvailableBrandsByCityAction(brands))
                resolve(true)
            }, error => {
                reject(error)
            })
        })
    }

    _getBannerService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_BANNERS, param).then(response => {

                if (response.data.data.data) {
                    const data = response.data.data.data
                    if (data.banners.length > 0) {
                        const banners = data.banners
                        let banners_final_array = Object.assign({})


                        for (let index = 0; index < banners.length; index++) {
                            const element = banners[index];

                            let section_string = (element.banner_section == "HEADER") ? element.banner_section : (element.banner_section == "SECTION 1") ? "SECTION_1" : (element.banner_section == "SECTION 2") ? "SECTION_2" : '' // header

                            // console.log("element.banner_details ",element.banner_details);

                            let obj = {
                                [section_string]: {
                                    banner_section: element.banner_section ? element.banner_section : '',
                                    banner_section_id: element.banner_section_id ? element.banner_section_id : '',
                                    banner_details: element.banner_details ? element.banner_details : []
                                }
                            }

                            banners_final_array = { ...banners_final_array, ...obj }

                        }

                        // console.log(JSON.stringify(banners_final_array));

                        store.dispatch(setBannersAction(banners_final_array))
                        resolve(true)
                    } else {
                        resolve(true)
                    }
                } else {
                    reject({ message: "Something went wrong" })
                }
            }, error => {
                reject(error)
            })
        })
    }

    _categoriesService(param) {

        return new Promise((resolve, reject) => {
            this.post(MAIN_CATEGORIES_SLUG, param).then(async response => {

                if (response?.data?.data) {
                 
                    let horizontal_categories = response?.data?.data?.horizontal
                    let vertical_categories = response?.data?.data?.vertical

                    let final_horizontal_categories_array = []
                    let final_vertical_categories = []  

                    if ((horizontal_categories && horizontal_categories.length > 0)) {
                        for (let index = 0; index < horizontal_categories.length; index++) {
                            const element = horizontal_categories[index];
                            final_horizontal_categories_array.push({
                                id: element.id,
                                image: element.image,
                                title: element.name,
                                link: element?.link ?? ""
                            })
                        }
                    }

                    if (vertical_categories && vertical_categories.length > 0) {
                        for (let index = 0; index < vertical_categories.length; index++) {
                            const element = vertical_categories[index];
                            final_vertical_categories.push({
                                id: element.id,
                                image: element.image,
                                title: element.name
                            })
                        }
                    }

                  
                    resolve({
                        categories: final_horizontal_categories_array,
                        vertical_categories: final_vertical_categories
                    })

                } else {
                    reject({ messgae: "No categories found." })
                }

            }, error => {
                reject(error)
            })
        })
    }

    _catelogService(param) {
        // console.log('catelog --- ', param);
        return new Promise((resolve, reject) => {
            this.post(CATELOG_BANNER_SLUG, param).then(async response => {

                if(response?.data?.data?.data){
                    // console.log('cate ==> ', JSON.stringify(response?.data?.data?.data));
                    resolve({
                        catelogs: response?.data?.data?.data,
                        total: response?.data?.data?.data.length
                    })
                }


            }, error => {
                reject(error)
            })
        })
    }
}

export default new StoreByCityService()