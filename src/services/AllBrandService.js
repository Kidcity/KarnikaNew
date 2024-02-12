import Base from './Base.service'
import { ALL_BRANDS_SLUG } from '../services/Slug'
import {store} from '../redux/store'
import { setAllBrandAction, setComingSoonAction, setFilteredBrandAction } from '../redux/actions/allBrandAction';

class AllBrandService extends Base {

    _getAllBrand(param) {  
    
        return new Promise((resolve, reject) => {
            this.post(ALL_BRANDS_SLUG, param).then(response => {

                const data = response?.data?.data                
                        
                if( data?.data && data.data.length == 0){
                    resolve(false)
                    return
                }
                
                let all_brands = []
                for (let index = 0; index < data.brand_logos.length; index++) {
                    const element = data.brand_logos[index];
                    all_brands.push({
                        id: element.id,
                        title: element.brand_name,
                        image: element.brandimage,
                        category: element.brandCategories,
                        location:( element.cities) ? element.cities : '',
                        min_order: (element.min_order != '' && element.min_order != null && element.min_order != "0") ? "₹ "+element.min_order: "N/A"
                    })
                }
               
                // let coming_soon_brands = []
                // for (let index = 0; index < data.upcoming_brand_logos.length; index++) {
                //     const element = data.upcoming_brand_logos[index];
                //     coming_soon_brands.push({
                //         id: element.id,
                //         image: element.brandimage,
                //     })
                // }
                store.dispatch(setFilteredBrandAction(all_brands))
                store.dispatch(setAllBrandAction(all_brands))
                // store.dispatch(setComingSoonAction(coming_soon_brands))
                resolve(true)
            }, error => {
                reject(error)
            })
        })
    }
}

export default new AllBrandService()