import Base from './Base.service'
import { FILTER_SLUG } from './Slug'

class FilterService extends Base {

    _getFilterDataService(param, onPageFilter=null, selectedSeason="") {
        // console.log(onPageFilter);

        return new Promise((resolve, reject) => {
            this.post(FILTER_SLUG, param).then(response => {

                if (response?.data?.data) {
                    // console.log(response?.data?.data);

                    // SUB CATEGORIES
                    const categories = response?.data?.data?.categories
                    const preselected_categories = (onPageFilter?.subCategory && onPageFilter?.subCategory != '') ? 
                    onPageFilter.subCategory.split(",") : ""

                    let categories_list = []
                    if (categories && categories.length > 0) {
                        for (let index = 0; index < categories.length; index++) {
                            const element = categories[index];

                            categories_list.push({
                                id: element.id,
                                subtitle: element.name,
                                image: element.image,
                                isActive: (preselected_categories != '') && (preselected_categories.includes(element.id.toString())) ? true : false
                            })
                        }
                    }

                    // BRANDS
                    const brands = response?.data?.data?.brands
                    const preselected_brand = (onPageFilter?.brand && onPageFilter?.brand != '') ? onPageFilter?.brand.split(",") : ''
                    
                    let brands_list = []
                    if (brands && brands.length > 0) {
                        for (let index = 0; index < brands.length; index++) {
                            const element = brands[index];                            
                            brands_list.push({
                                id: element.id,
                                subtitle: element.name,
                                image: element.image,
                                isActive: (preselected_brand.includes(element.id.toString())) ? true : false,
                            })
                        }
                    }

                    // AGE
                    const age = response?.data?.data?.age                    
                    const preselected_age = (onPageFilter?.ageGroup && onPageFilter?.ageGroup != '') ? onPageFilter?.ageGroup.split(",") : ''
                    
                    let age_list = []
                    if (age && age.length > 0) {
                        for (let index = 0; index < age.length; index++) {
                            const element = age[index];                            
                            age_list.push({
                                id: element.id,
                                subtitle: element.subtitle,
                                image: element.logo,
                                isActive: (preselected_age.includes(element.id.toString())) ? true : false,
                            })
                        }
                    }

                    // PRICE
                    const price = response?.data?.data?.price
                    const preselected_price = (onPageFilter?.priceRange && onPageFilter?.priceRange != '') ? onPageFilter?.priceRange.split(",") : ''
                    
                    let price_list = []
                    if (price && price.length > 0) {
                        for (let index = 0; index < price.length; index++) {
                            const element = price[index];                            
                            price_list.push({
                                id: element.id,
                                subtitle: element.subtitle,
                                image: element.logo,
                                isActive: (preselected_price.includes(element.id.toString())) ? true : false,
                            })
                        }
                    }

                    // SEASON
                    const season = response?.data?.data?.season
                    const preselected_season = (onPageFilter?.season && onPageFilter?.season != '') ? onPageFilter?.season.split(",") :  selectedSeason.split(",") || ''
                    
                    let season_list = []
                    if (season && season.length > 0) {
                        for (let index = 0; index < season.length; index++) {
                            const element = season[index];                            
                            season_list.push({
                                id: element.id,
                                subtitle: element.subtitle,
                                image: element.logo,
                                isActive: (preselected_season.includes(element.id.toString())) ? true : false,
                            })
                        }
                    }

                    resolve({
                        categories: categories_list,
                        season: season_list,
                        age: age_list,
                        brands: brands_list,
                        price: price_list
                    })
                }else{
                    reject(false)
                }

            }, error => {
                
                reject(error)
            })
        })
    }
}
export default new FilterService()