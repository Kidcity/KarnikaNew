import Base from './Base.service'
import { ADD_TO_CART_SLUG, CHECK_STOCK_SLUG, PRODUCT_DETAILS_SLUG, PRODUCT_LIKE_UNLIKE_SLUG } from './Slug'
import { store } from '../redux/store'
import { setCartCountDataAction } from '../redux/actions/cartAction'

class ProductDetailsService extends Base {

    _populateData(data) {
        console.log(JSON.stringify(data));
        return new Promise((resolve, reject) => {
            let sizeList = []
            for (let index = 0; index < data.product_size_groups.length; index++) {
                const element = data.product_size_groups[index];
                sizeList.push(
                    {
                        product_size_group_id: element.id,
                        size: element.size_group_name,
                        label: element.age_group_name,
                        price_per_piece: element.sale_price,
                        mrp: element.MRP,
                        wsp: element.WSP,
                        total_set: element.set_qty,
                        total_selected: 0,
                        total_set_available: parseInt(element.stock_qty),
                    },
                )
            }

            let similer_product = []
            for (let index = 0; index < data.similar_products.length; index++) {
                const element = data.similar_products[index];
                similer_product.push(
                    {
                        id: element.products_id,
                        brand_name: element.brand_name,
                        image: element.image,
                        price: element.sale_price,
                        off: element.extra,
                        prev_price: element.min_wsp_price,
                        size: element.size_group_name,
                        each_set_color: '(Each ' + element.each_set_color + ' Set)',
                        otherSizes: "",
                        color: element.no_of_color,
                        quantity: element.min_set_qty,
                        mrp: element.min_mrp,
                        city_id: element.city_id,
                        city_name: element.city_name,
                        margin: element.margin,
                        item_left: element.stock_msg,
                        isFavourite: (element.isLiked == '1') ? true : false,
                        brand_mov: (element.brand_mov !== 0) ? element.brand_mov : 0
                    },
                )
            }

            let shop_in_shop_product = []
            if (data.shop_in_shop_products.length > 0) {
                for (let index = 0; index < data.shop_in_shop_products.length; index++) {
                    const element = data.shop_in_shop_products[index];
                    shop_in_shop_product.push(
                        {
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            price: element.sale_price,
                            off: element.extra,
                            prev_price: element.min_wsp_price,
                            size: element.size_group_name,
                            each_set_color: '(Each ' + element.each_set_color + ' Set)',
                            otherSizes: "",
                            color: element.no_of_color,
                            quantity: element.min_set_qty,
                            mrp: element.min_mrp,
                            city_id: element.city_id,
                            city_name: element.city_name,
                            margin: element.margin,
                            item_left: element.stock_msg,
                            isFavourite: (element.isLiked == '1') ? true : false,
                            shop_in_shop: "1",
                            brand_mov: (element.brand_mov !== 0) ? element.brand_mov : 0
                        },
                    )
                }

            }

            let product_images = []

            const video_url = "https://media.istockphoto.com/id/1199496434/video/4k-abstract-particle-wave-bokeh-background-blue-water-snow-beautiful-glitter-loop.mp4?s=mp4-640x640-is&k=20&c=Rh3weWDi5nKDOAcGoToIxkHgy0DCBylLjXYjjDUKIEA="
            const video_poster = "https://rukminim1.flixcart.com/image/416/416/jbgtnrk0/poster/z/j/g/medium-ashd-as-desktop-photos-plain-images-wallposter-original-imaet7a4gszfdhhn.jpeg?q=70"


            let preview_product_image_list = []
            for (let index = 0; index < data.products_snd_images.length; index++) {
                const element = data.products_snd_images[index];
                const images = element.images
                product_images.push(...images)
                element.images.map((item, index) => {
                    preview_product_image_list.push({
                        uri: item.image
                    })
                })
            }

            // product_images.push({
            //     image: video_poster,
            //     isVideoPoster: true
            // })

            //console.log(product_images);


            const productdata = {
                brand_name: data.brand.brand_name,
                brand_id: data.brand.id,
                city_id: data.brand.city_id,
                city_name: data.brand.city_name,

                product_total_colors: (data.colors && data.product_size_groups.length > 0) ? data.colors.length + ' (Each ' + data.product_size_groups[0].each_set_color + ' Set)' : 0,

                product_id: data.product.products_id,

                product_categories_name: data.product.categories_name,
                product_style_no: data.product.vendor_style_no,
                product_material: (data.product.fabric_name != '' && data.product.fabric_name != null) ? data.product.fabric_name : 'N/A',

                product_neck_name: (data.product.neck_name != '' && data.product.neck_name != null) ? data.product.neck_name : 'N/A',

                product_sleeve_name: (data.product.sleeve_name != '' && data.product.sleeve_name != null) ? data.product.sleeve_name : 'N/A',
                product_fitting: (data.product.pattern_name != '' && data.product.pattern_name != null) ? data.product.pattern_name : 'N/A',
                product_packaging: data?.product?.packaging_type == 0 ? "Box Setwise" : data?.product?.packaging_type == 1 ? "Box Single Pcs" : "Master Poly"  ,

                brand_mov: (data.product.brand_mov !== 0) ? data.product.brand_mov : 0,

                productSizeList: sizeList,
                similer_product: similer_product,
                shop_in_shop_product: shop_in_shop_product,
                product_images: product_images,
                product_video_url: video_url,
                product_video_poster: video_poster,
                preview_product_image_list: preview_product_image_list,

                is_added_to_wishlist: (data.product.isLiked == '1') ? true : false,

                category_id: data?.product_category?.categories_id

            }

            resolve(productdata)
        })
    }

    _getProductDetailsService(param) {
        return new Promise((resolve, reject) => {
            this.post(PRODUCT_DETAILS_SLUG, param).then(async response => {
                
                if (response?.data?.data) {
                    const data = await this._populateData(response.data.data)
                    resolve(data)
                } else {
                    reject(false)
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

    _addToCartService(param, total_items) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(ADD_TO_CART_SLUG, param).then(response => {
                //console.log(response);
                const total_cart_count = store.getState().cartReducer.total_cart_items
                store.dispatch(setCartCountDataAction(total_items + total_cart_count))
                resolve(true)
            }, error => {
                reject(error)
            })
        })
    }

    _checkStockService(param) {
        return new Promise((resolve, reject) => {
            this.post(CHECK_STOCK_SLUG, param).then(response => {
                resolve(response.data.data)
                //console.log(response.data.data);
            }, error => {
                reject(error)
            })
        })
    }
}

export default new ProductDetailsService()