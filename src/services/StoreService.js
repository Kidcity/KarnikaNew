import Base from './Base.service'
import { MAIN_CATEGORIES_SLUG } from './Slug';
import {store} from '../redux/store'
import { setStoreBrandDataAction, storeSubCategoriesAction } from '../redux/actions/storeAction';

class StoreService extends Base{
    _getSubCategoriesService(param){       
        return new Promise((resolve, reject) => {
            this.post(MAIN_CATEGORIES_SLUG, param).then(response => {     
                const data = response.data.data
               
                let allSubCategories = ''
                let list = []               
                for (let index = 0; index < data.categories.length; index++) {
                    const element = data.categories[index];
                    list.push({
                        id: element.id,
                        title: element.name,
                        image: element.image
                    })
                    allSubCategories += element.id + ','
                }
                allSubCategories = allSubCategories.substring(0, allSubCategories.length - 1)                

                
                let brands = []                
                for (let index = 0; index < data.brands.brand_logos.length; index++) {
                    const element = data.brands.brand_logos[index];                    
                    brands.push({
                        id: element.id,
                        image: element.brandimage,
                        brand_name: element.brand_name
                    })
                }      
                    
                store.dispatch(storeSubCategoriesAction(list))
                store.dispatch(setStoreBrandDataAction(brands))
                resolve({success: true, data: allSubCategories})
            }, error => {
                reject(error)
            })
        })
    }
}

export default new StoreService()