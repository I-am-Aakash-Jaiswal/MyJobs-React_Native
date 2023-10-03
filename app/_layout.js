import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'; 

//This makes native splash screen remain visible until hide async is called.
// That is when App is initially loading this is going to make the splash screen visible
SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold : require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium : require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular : require('../assets/fonts/DMSans-Regular.ttf'),
    })
    const onLayoutRootView = useCallback(async()=>{
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    },[fontsLoaded])

    if(!fontsLoaded) return null;

    return (
    <Stack onLayout = {onLayoutRootView}/>
    ); 
    


    
}

export default Layout;


