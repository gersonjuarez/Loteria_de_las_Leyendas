

                        import React, { Component,useState,useRef,useEffect } from "react";
                        import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, Button,Animated,Modal,ImageBackground,Linking } from "react-native";

                        import LottieView from 'lottie-react-native';
                        import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                  
                        import Carousel from 'react-native-snap-carousel';

                        import Sound from 'react-native-sound';

                        var mySound;

                                
                                  const Consejos= ()=> {
                                    let carouselRef = useRef(); // createRef()

                                   
                                    const instrucciones=[

                                      
                                        {id:'1','image':require('./assets/instrucciones/1.png')},
                                        {id:'2','image':require('./assets/instrucciones/2.png')},
                                        {id:'3','image':require('./assets/instrucciones/3.png')},
                                        {id:'4','image':require('./assets/instrucciones/4.png')},
                                        {id:'5','image':require('./assets/instrucciones/5.png')},
                                        {id:'6','image':require('./assets/instrucciones/6.png')},
                                        {id:'7','image':require('./assets/instrucciones/7.png')},
                                        {id:'8','image':require('./assets/instrucciones/8.png')},
                                        {id:'9','image':require('./assets/instrucciones/9.png')},
                                        {id:'10','image':require('./assets/instrucciones/10.png')},
                                        {id:'11','image':require('./assets/instrucciones/11.png')},
                                        {id:'12','image':require('./assets/instrucciones/12.png')},
                                        {id:'13','image':require('./assets/instrucciones/13.png')},


                                    ]



                                    useEffect(() => {
                                   
                                      mySound = new Sound('ayuda.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                        if(error){
                                        console.log('Error loading sound: ' + error);
                                        return;
                                        }else{
                                        mySound.setVolume(1);

                                        
                                        }
                                        });

                                    }, [])


                                    const reproduce=(valor)=>{


                                     
                                      mySound.stop();

                                      mySound.play()


                                    }

                                    function renderItem({item}){

                                      return(
                
                                        <View style={{flex:1,
                                        justifyContent:"center",alignItems:'center'      
                                            }} >
                                              
                                              <Image  source={item.image} resizeMode="contain" style={styles.sombra} />
                 
                                        </View>
                                   
                                   
                                    
                                     
                 
                                      )
                
                
                
                                    }


                            return (
                              <ImageBackground source={require('./assets/instrucciones/fondo.png')}    style={{flex:1,alignContent:'center', alignItems:"center"}}>

                              <Image source={require('./assets/instrucciones/nubes.png')}  resizeMode='contain' style={{width:'55%',height:'15%'}}  />
                              <Image source={require('./assets/juego/tarjeta.png')}  resizeMode='contain'  style={{bottom:'6%',opacity:0.7,width:'100%',height:'68%'}} />
                              
                              <View style={{bottom:'4%',width:'20%',height:'10%',justifyContent:'center'}} >
                              <LottieView   source={require('./assets/instrucciones/deslizar.json')}  autoPlay loop />
                                </View>


                                <View style={{left:'1%',bottom:'5%',width:'100%',height:'8%',alignItems:"center",justifyContent:"center",flexDirection:"row"}}>


                                <TouchableOpacity
                                            style={{width:'15%',marginHorizontal:'0%'}}

                                             onPress={()=>{

                                              Linking.openURL('https://www.xelacode.com.gt')
                                          }}
                                          > 
                                      <Image source={require('./assets/instrucciones/xela.png')}  resizeMode='contain' style={{width:'100%',height:'100%'}}  />

                                            </TouchableOpacity> 
                                                                    
                                          <TouchableOpacity
                                          style={{width:'8%',marginHorizontal:'3%',alignItems:"center"}}
                                             onPress={()=>{

                                              Linking.openURL('https://www.facebook.com/lluviadeideaseditorial')
                                          }}
                                          > 
                                      <Image source={require('./assets/instrucciones/facebook.png')}  resizeMode='contain' style={{width:'65%',height:'100%'}}  />

                                            </TouchableOpacity> 

                                          
                                          

                                            <TouchableOpacity
                                          style={{width:'10%',marginHorizontal:'0%'}}

                                             onPress={()=>{

                                              Linking.openURL('https://www.instagram.com/lluviadeideas.editorial/')
                                          }}
                                          > 
                                      <Image source={require('./assets/instrucciones/instagram.png')}  resizeMode='contain' style={{width:'100%',height:'100%'}}  />

                                            </TouchableOpacity> 

                                            <TouchableOpacity
                                               style={{width:'10%',marginHorizontal:'3%',marginLeft:'5%'}}

                                             onPress={()=>{

                                              Linking.openURL('https://twitter.com/Elluviadeideas')
                                          }}
                                          > 
                                      <Image source={require('./assets/instrucciones/tuiter.png')}  resizeMode='contain' style={{width:'100%',height:'100%'}}  />

                                            </TouchableOpacity> 





                                          </View>
                              <View  style={{bottom:'102%',width:'100%',height:'90%',
                        justifyContent:"center" ,alignItems:'center'     
                            }} > 
                          <Carousel 
          ref={(c) => {carouselRef = c}}

                           onSnapToItem={(index) => { reproduce(index) }}
                           layout={'tinder'}
                               data={instrucciones}
                              layoutCardOffset={5}
                               sliderWidth={RFValue(400)}
                               itemWidth={RFValue(400)}
                               renderItem={renderItem}
                              /> 
                                </View>

                         

                            </ImageBackground>
 

                            );
                          
                        }


                        const styles = StyleSheet.create({
                        container: {
                          flex: 1,
                          justifyContent: 'center',
                          backgroundColor: '#ecf0f1',
                          padding: 8,
                          alignItems:"center"
                        },
                      
                        sombra:{
                          width:'66%',height:'72%',
                         
                      
                       
                        },
                        carouselItemContainer:{
               
                         alignItems:"center",
                         borderRadius:4,
                         width:'100%',
                         height:'100%',
                         marginTop:20

                        },
                        titulo:{
                    
                          fontSize:16,
                          fontWeight:'bold',
                          color:'#fff',
                          textAlign:"center"
                        }
                        });


                        export default Consejos











