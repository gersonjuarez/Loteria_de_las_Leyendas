                import React, {useState,useEffect,useRef} from 'react'
                import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,TouchableWithoutFeedback,ImageBackground,ScrollView} from 'react-native';                                
                import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                import * as Animatable from 'react-native-animatable';


        



                const Emojis = ({showFloatingReaction}) => {


                    const Valor=(valor)=>{


                        showFloatingReaction(valor)



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
                        onPress={()=>Valor('stuck_out_tongue_winking_eye')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😜</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={()=>Valor('smiling_imp')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😈</Text>
                        </TouchableOpacity>     
                        

                        <TouchableOpacity
                        onPress={()=>Valor('sunglasses')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😎</Text>
                        </TouchableOpacity>   

                        <TouchableOpacity
                        onPress={()=>Valor('see_no_evil')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🙈</Text>
                        </TouchableOpacity>   


                        <TouchableOpacity
                        onPress={()=>Valor('speak_no_evil')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🙊</Text>
                        </TouchableOpacity>   

                     

                        <TouchableOpacity
                        onPress={()=>Valor('hankey')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >💩</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity
                        onPress={()=>Valor('nerd_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🤓</Text>
                        </TouchableOpacity> 


                        <TouchableOpacity
                        onPress={()=>Valor('clown_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🤡</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity
                        onPress={()=>Valor('sneezing_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🤧</Text>
                        </TouchableOpacity> 


                        <TouchableOpacity
                        onPress={()=>Valor('dizzy_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😵</Text>
                        </TouchableOpacity> 


                        <TouchableOpacity
                        onPress={()=>Valor('zipper_mouth_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🤐</Text>
                        </TouchableOpacity> 



                        <TouchableOpacity
                        onPress={()=>Valor('heart_eyes_cat')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😻</Text>
                        </TouchableOpacity> 



                        <TouchableOpacity
                        onPress={()=>Valor('shushing_face')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >🤫</Text>
                        </TouchableOpacity> 


                        <TouchableOpacity
                        onPress={()=>Valor('innocent')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >😇</Text>
                        </TouchableOpacity> 


                        <TouchableOpacity
                        onPress={()=>Valor('eyes')}
                        
                        >
                          <Text style={{fontSize:RFValue(33)}}   >👀</Text>
                        </TouchableOpacity> 

                        </ScrollView>
                      </Animatable.View>
                    )
                }

                export default Emojis
                const styles = StyleSheet.create({
                    likeContainer: {
                        flexDirection:"row",
                        width: '70%',
                        bottom:'6.5%',
                        backgroundColor: '#E5EAEF',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 20,
                        padding: 5,
                        opacity: 0.7,
                        justifyContent:"center",
                        position:"absolute",
                        zIndex:1
                        
                      }

                })