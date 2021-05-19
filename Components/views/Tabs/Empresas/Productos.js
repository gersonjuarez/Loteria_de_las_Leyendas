import React,{useState,useEffect} from 'react'
import { View, SafeAreaView,Text,ImageBackground,TouchableWithoutFeedback,Image, StyleSheet,Platform,Dimensions,FlatList} from 'react-native';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Card from './Card';




const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 150;
const Productos = ({navigation}) => {

        const [Images,setImages]=useState([

           
                {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUfV2681I0IiI-ZtsLROlcVPmpxMDaScFCuyano8hXqvLZTUoWTFuzgrOavf3kLsKqkM&usqp=CAU'},
                {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0XLTfGaJ7P62h6I_rftHJOcvb33qYmMYr4o1POCR7JRsnARfdixsQ45RRAkyuKepCTQ&usqp=CAU'},
                {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0XLTfGaJ7P62h6I_rftHJOcvb33qYmMYr4o1POCR7JRsnARfdixsQ45RRAkyuKepCTQ&usqp=CAU'},
                {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0XLTfGaJ7P62h6I_rftHJOcvb33qYmMYr4o1POCR7JRsnARfdixsQ45RRAkyuKepCTQ&usqp=CAU'},
                {image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0XLTfGaJ7P62h6I_rftHJOcvb33qYmMYr4o1POCR7JRsnARfdixsQ45RRAkyuKepCTQ&usqp=CAU'},
              

        ])
        const [data,setData]=useState([

            {
                id: '1',
                coordinate: {
                  latitude: 22.6293867,
                  longitude: 88.4354486,
                },
                title: 'Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[0].image,
                rating: 4,
                reviews: 99,
                categories: ['Restaurant', 'Hotel', 'Dineout'],
              },
              {
                id: '2',
                coordinate: {
                  latitude: 22.6345648,
                  longitude: 88.4377279,
                },
                title: 'Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[1].image,
                rating: 5,
                reviews: 102,
                categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
              },
              {
                id: '3',
                coordinate: {
                  latitude: 22.6281662,
                  longitude: 88.4410113,
                },
                title: ' Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[2].image,
                rating: 3,
                reviews: 220,
                categories: ['Restaurant', 'Hotel', 'Dineout'],
              },
              {
                id: '4',
                coordinate: {
                  latitude: 22.6341137,
                  longitude: 88.4497463,
                },
                title: ' Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[3].image,
                rating: 4,
                reviews: 48,
                categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
              },
              {
                id: '5',
                coordinate: {
                  latitude: 22.6292757,
                  longitude: 88.444781,
                },
                title: 'Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[4].image,
                rating: 4,
                reviews: 178,
                categories: ['Restaurant', 'Hotel', 'Dineout'],
              },
              {
                id: '6',
                coordinate: {
                  latitude: 22.6293867,
                  longitude: 88.4354486,
                },
                title: 'Subway del bueno',
                description: `Promocione su producto aquí con información que le interese a los usuarios, imagenes,puntuacion,etc. mas texto para probar`,
                image: Images[0].image,
                rating: 4,
                reviews: 99,
                categories: ['Restaurant', 'Hotel', 'Dineout'],
              }

        ])




    const renderItem = ({item}) => {
        return (

            <Card 
                itemData={item}
                onPress={()=> navigation.navigate('ProductoEmpresa', data)}
            />
        );
    };

    return (
      <View style={styles.container}>
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      </View>
    );
}

export default Productos
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      width: '90%',
      alignSelf: 'center'
    },
  });