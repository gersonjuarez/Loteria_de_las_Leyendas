                        import React from 'react'
                        import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,TouchableWithoutFeedback,ImageBackground,ScrollView} from 'react-native';                                
                        import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                        import * as Animatable from 'react-native-animatable';
                        import LottieView from 'lottie-react-native';

                        const Stickers = ({EnviaSticker}) => {



                            const Enviar=(valor)=>{


                                EnviaSticker(valor)

                            }


                            return (
                                <Animatable.View 
                                animation="zoomIn"
                                style={styles.likeContainer}
                              >

                                                

                                                         
                                                
                                                <ScrollView
                                                horizontal
                                                >

                                            
                                                <TouchableOpacity
                                                onPress={()=>Enviar(0)}                                            
                                                >
                                                
                                            <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/fuego.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>

                                                </TouchableOpacity>
                                                       

                                                       

                                                          
                                           


                                                <TouchableOpacity
                                                onPress={()=>Enviar(1)}
                                            
                                                >
                                            <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/gato_galleta.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>

                                                </TouchableOpacity>
                                                   

                                                                   
                                                <TouchableOpacity
                                                onPress={()=>Enviar(2)}
                                            
                                                >
                                            <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/hamster.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>

                                                </TouchableOpacity>

                                            
    

             


                                                <TouchableOpacity
                                                onPress={()=>Enviar(3)}
                                               
                                                >
                                        <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/mono.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                onPress={()=>Enviar(4)}
                                           
                                                >
                                        <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/mono2.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>

                                                
                                                <TouchableOpacity
                                                onPress={()=>Enviar(5)}
                                    
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/mono3.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity> 
                                            

                                              


                                                <TouchableOpacity
                                                onPress={()=>Enviar(6)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/sticker5.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                onPress={()=>Enviar(7)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/sticker6.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                onPress={()=>Enviar(8)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/chica.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                onPress={()=>Enviar(9)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/chica2.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>
                                         


                                                <TouchableOpacity
                                                onPress={()=>Enviar(10)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/sticker7.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>


                                                <TouchableOpacity
                                                onPress={()=>Enviar(11)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/yoda.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                onPress={()=>Enviar(12)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/yoda2.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>

                

                                                <TouchableOpacity
                                                onPress={()=>Enviar(13)}
                                               
                                                >
 <ImageBackground style={{width:'100%',height:'100%',marginHorizontal:5}} resizeMode='contain' source={require('../Tabs/assets/sticker/imagenes/tiburon.png')}  >
                                            <Text style={{fontSize:RFValue(30),opacity:0.01}} >😀</Text>
                                                </ImageBackground>
                                                </TouchableOpacity>


                                          

                                          
                                               

                                </ScrollView>

                                  </Animatable.View>
                            )
                        }

                        export default Stickers
                        const styles = StyleSheet.create({
                            likeContainer: {
                                flexDirection:"row",
                                width: '70%',
                                height:'100%',
                                backgroundColor: '#E5EAEF',
                                borderColor: 'transparent',
                                borderRadius: 20,
                                borderWidth:0,
                                opacity: 0.7,
                                justifyContent:"center",
                                alignItems:'center',
                                position:"absolute",
                                zIndex:1,
                
                                
                              }
        
                        })