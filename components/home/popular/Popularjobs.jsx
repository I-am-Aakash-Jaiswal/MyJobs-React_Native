import React from 'react'
import {useState} from 'react';
import { View, Text , TouchableOpacity , FlatList , ActivityIndicator } from 'react-native';
import {useRouter } from 'expo-router';
import tempData from '../../../assets/tempData';

import styles from './popularjobs.style';
import {COLORS, SIZES} from '../../../constants';
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch"

const Popularjobs = () => {

  const router = useRouter();
  // const {data, isLoading , error} = useFetch('search' ,{
  //   query: 'React developer',
  //   num_pages:1
  // })
const error =false;
const isLoading = false;

const [selectedJob, setSelectedJob] = useState();
const handleCardPress = (item) =>{
  setSelectedJob(item.job_id)
  router.push(`job-details/${item.job_id}`);
}

  return (
    <View style= {styles.container}>
      <View style = {styles.header}>
      <Text style= {styles.headerTitle}>Popular jobs</Text>
      <TouchableOpacity><Text style= {styles.headerBtn}>Show all</Text></TouchableOpacity>
      </View>

      <View style ={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator size = "large" colors= {COLORS.primary}></ActivityIndicator>
      ): error ? (
        <Text> Something Went Wrong</Text>
      ) :
      (
        <FlatList
        data = {tempData}
          renderItem = {({item})=>(
            <PopularJobCard item ={item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}></PopularJobCard>
          )}
          keyExtractor = {item => item?.job_id}
          contentContainerStyle ={ {columnGap: SIZES.medium}}
          horizontal
        />
      )}
      </View>
    </View>
  )
}

export default Popularjobs