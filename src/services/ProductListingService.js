import Base from './Base.service'
import { PRODUCT_LIKE_UNLIKE_SLUG, PRODUCT_LIST_SLUG } from './Slug'
import { store } from '../redux/store'
import { setProductListAction } from '../redux/actions/productListAction'

class ProductListingService extends Base {

    _getProductListService(param) {
        return new Promise((resolve, reject) => {
            this.post(PRODUCT_LIST_SLUG, param).then(response => {

                const data = response?.data?.data

                let products = []
                

                if (data?.products_list) {
                    for (let index = 0; index < data.products_list.length; index++) {

                        const element = data.products_list[index];
                        const size_name_array = element.size_group_name.split(',')
                        let size_name = ''
                        let otherSizes = ''

                        if (size_name_array.length > 1) {
                            size_name = size_name_array[0]
                            otherSizes = '+' + (size_name_array.length - 1) + ' Options'
                        }
                        if (size_name_array.length == 1) {
                            size_name = element.size_group_name
                            otherSizes = ''
                        }
                        if (size_name_array.length == 0) {
                            size_name = element.size_group_name
                            otherSizes = ''
                        }

                        let each_set_color = (element.each_set_color != '') ? '(Each ' + element.each_set_color + ' set)' : ''

                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            price: element.sale_price,
                            off: element.extra,
                            prev_price: element.min_wsp_price,
                            size: size_name,
                            otherSizes: otherSizes,
                            color: element.no_of_color,
                            each_set_color: each_set_color,
                            quantity: element.min_set_qty,
                            mrp: element.min_mrp,
                            city_id: element.city_id,
                            city_name: element.city_name,
                            margin: element.margin,
                            item_left: element.stock_msg,
                            isFavourite: (element.isLiked == '1') ? true : false,
                            brand_mov: (element.brand_mov !== 0 && element.brand_mov !== undefined) ? element.brand_mov : 0
                        })
                    }
                }                
                // if (products.length !== 0) {
                //     store.dispatch(setProductListAction(products))
                // }
                // console.log('products.length  ',products.length);
                resolve({
                    products: (products.length > 0) ? products : []
                })
            }, error => {
                reject(error)
            })
        })
    }

    _productLikeUnlikeService(param) {
        return new Promise((resolve, reject) => {
            this.post(PRODUCT_LIKE_UNLIKE_SLUG, param).then(response => {
                resolve(true)
            }, error => {
                reject(error)
            })
        })
    }
}

export default new ProductListingService()