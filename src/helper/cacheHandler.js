import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFetchBlob from 'react-native-blob-util'
import { logout } from './Logout'


const dirs = RNFetchBlob.fs.dirs
const CacheDir = dirs.CacheDir

export const clearCache = async () => {

    RNFetchBlob.fs.lstat(CacheDir)
        .then((stats) => {
            // console.log("cache dir ==> ", CacheDir);
            // console.log("before ===> ", JSON.stringify(stats));
        })
        .catch((err) => {
            alert(err);
        })

    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);

    RNFetchBlob.fs.unlink(CacheDir)
        .then((res) => {
            // console.log('deleted => ', JSON.stringify(res));
        })
        .catch((err) => {
           alert('cache cannot cleared: ', err);
        })

    await AsyncStorage.setItem("@cache_cleared", "1")

    logout()
}