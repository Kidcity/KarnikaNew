import Base from './Base.service'
import { PRODUCT_LIKE_UNLIKE_SLUG, WISHLIST_SLUG } from './Slug'
import { store } from '../redux/store'
import { setWishListCount } from '../redux/actions/wishListAction'

class WishlistService extends Base {

    _getWishListService(param) {
        return new Promise((resolve, reject) => {
            this.post(WISHLIST_SLUG, param).then(response => {

                if (response.data && response.data.data && response.data.data.data) {
                    const data = response.data.data.data                    
                    let list = []
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        let size_group_name = element.size_group_name.split(",")

                        if (size_group_name.length > 1) {
                            size_group_name = size_group_name[0] + ', ' + '+' + (size_group_name.length - 1) + ' More'
                        } else {
                            size_group_name = size_group_name[0]
                        }
                        list.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            price: element.sale_price,
                            offer: element.extra,
                            color: element.no_of_color,
                            size: size_group_name,
                            margin: element.margin,
                            mrp: element.min_mrp,
                            image: element.image,
                            category: element.category_name,
                            each_set_color: element.each_set_color
                        })
                    }
                    store.dispatch(setWishListCount(list.length))
                    resolve(list)
                }else{
                    reject({
                        message : "Something went wrong."
                    })
                }
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

export default new WishlistService()