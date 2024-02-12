import Base from './Base.service'
import { GET_SUGGESTION_SLUG, SHARE_PDF } from './Slug'

class CommonService extends Base{

    _getSuggestionsService(param){
        return new Promise((resolve, reject) => {
            this.post(GET_SUGGESTION_SLUG, param).then(response => { 
                const data = response?.data?.data?.data
                console.log(JSON.stringify(response?.data?.data));                                
                resolve({
                    data: (data !== "") ? data : null
                })
            }, error => {
                reject(error)
            })
        })
    }

    _getSharePdfService(param){
        console.log(param);
        return new Promise((resolve, reject) => {
            this.post(SHARE_PDF, param).then(response => {               
                
                const data = response?.data?.data
                console.log(JSON.stringify(response?.data?.data));
                if(data?.success){
                    resolve({
                        link: data?.data
                    })
                }
               
            }, error => {
                console.log(error);
                reject(error)
            })
        })
    }
    
    
}

export default new CommonService()