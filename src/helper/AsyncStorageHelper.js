import AsyncStorage from "@react-native-async-storage/async-storage"


export const setToStore = async (key, value) => {
  try {
    await AsyncStorage.setItem(key,value)    
  } catch (error) {
    // console.log("setToStore  ", error);
  }
}

export const getStore = async (key, value) => {
  try {
    return await AsyncStorage.getItem(key,value)  
  } catch (error) {
    // console.log(error);
    return false
  }
  
}