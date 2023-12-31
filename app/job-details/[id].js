
import { Text , View, SafeAreaView , ScrollView , ActivityIndicator , RefreshControl} from 'react-native'
import { Stack, useRouter , useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import{Company, JobAbout, JobFooter, JobTabs ,ScreenHeaderBtn ,Specifics } from '../../components';
import useFetch from '../../hook/useFetch';
import {COLORS, icons, SIZES} from '../../constants'
import tempData from '../../assets/tempData';




function JobDetails() {
    const tabs = ["About", "Qualifications", "Responsibilities"];
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
 
    const onRefresh= useCallback(()=>{
        setRefreshing(true);
        // refetch();
        setRefreshing(false);
    },[])




    

    const data= tempData[0];
    const isLoading = false;
    const error = false;


    const displayTabContent =()=> {
        switch(activeTab){
            case "Qualifications":
                return <Specifics 
                    title= "Qualifications"
                    points = {data.job_highlights?.Qualifications ?? ['N/A']}
                />

            break;

            case "About":
                return <JobAbout
                    info={data?.job_description ?? "No data provided"}
                />
            break;

            case "Responsibilities":
            return <Specifics 
            title= "Responsibilities"
            points = {data.job_highlights?.Responsibilities ?? ['N/A']}
        />
            default:
                break;
        }
    }


  return (
    <SafeAreaView style ={{flex:1 , backgroundColor : COLORS.lightWhite}}>
    <Stack.Screen
    options={{
        headerStyle: {backgroundColor: COLORS.lightWhite},
        headerShadowVisible:false,
        headerBackVisible:false,
        headerLeft: ()=>(
            <ScreenHeaderBtn
            iconUrl={icons.left}
            dimension="60%"
            handlePress={()=> router.back()}
            ></ScreenHeaderBtn>
        ),
        headerRight: ()=>(
            <ScreenHeaderBtn
            iconUrl={icons.share}
            dimension="60%"
            ></ScreenHeaderBtn>
        ),
        headerTitle:"",
        

    }}
    >
    </Stack.Screen>

    <>
        <ScrollView 
        showsVerticalScrollIndicator = {false} 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }> 

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ): error ? (
                <Text>Something Went Wrong</Text>
            ): data.length === 0 ? (
                <Text>No Data</Text>
            ): (
                <View style ={{padding:SIZES.medium , paddingBottom : 100}}>
                    <Company
                        companyLogo = {data.employer_logo}
                        jobTitle = {data.job_title}
                        companyName= {data.employer_name}
                        Location = {data.job_country} 
                    />
             
                    <JobTabs
                        tabs ={tabs}
                        activeTab ={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    {displayTabContent()}


                </View>
            )}

        </ScrollView>
        <JobFooter url={data?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
    </>
    </SafeAreaView>
  )
}

export default JobDetails