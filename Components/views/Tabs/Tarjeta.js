import React, {useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-looped-carousel';
import * as Animatable from 'react-native-animatable';
import Juego from './Juego';

const { width, height } = Dimensions.get('window');




const Tarjeta = ({anim,front,fototemp})=> {




    return (
      <View style={{ flex: 1}} >

                                   {/*    <Animatable.View animation={anim}>
                                        {
                                          front?
                                          <Image  source={require('./assets/img/33.jpg')} resizeMode='contain' style={styles.sombra} />
                                          :
                                          <Image  source={fototemp} resizeMode='contain' style={styles.sombra} />
                                        }
                                      </Animatable.View> */}
     
      </View>
    );
  
    }

    const styles=StyleSheet.create({

      sombra:{
        width:width,height:200,
        borderRadius:10,
       
        marginTop:25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        
        elevation: 5,

      }



    });
   

 export default Tarjeta;









/*  <Carousel
 delay={250}
 style={{width:width,height:250,       
    }}
 autoplay={estado}
 swipe={false}
>

 

        


           <Image  source={require('./assets/img/1-37.jpg')} resizeMode='contain' style={styles.sombra} />
           <Image  source={require('./assets/img/1-37.jpg')} resizeMode='contain' style={styles.sombra} />

           <Image  source={require('./assets/img/1-37.jpg')} resizeMode='contain' style={styles.sombra} />
           <Image  source={require('./assets/img/1-37.jpg')} resizeMode='contain' style={styles.sombra} />
          
     
           
                  
                 

       

   


 



</Carousel> */

















