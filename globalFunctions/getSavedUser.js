import AsyncStorage from "@react-native-async-storage/async-storage";


export const getUser = async()=>{
    try{
        const userData = await AsyncStorage.getItem("User");
        if(userData !== null){
            const user = JSON.parse(userData);
            return user
        }

        return null
    }catch(err){
        console.error("Error retrieving user data:", err);
        return null;

    }

}
