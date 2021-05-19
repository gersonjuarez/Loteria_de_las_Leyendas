import React,{useState,useEffect} from 'react'
import { Text, View, Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


                const AyudaFiguras = ({socket,estadofigura,setAyuda,ayuda}) => {



                    const [imagen,setImagen]=useState();


                    const valor=async()=>{


                      const valor=await AsyncStorage.getItem('valorimagen')
                      setImagen(valor);


                    }

                    useEffect(() => {
                                                        
                     valor();
                             
                    }, [])

                    return (

                        
                        <TouchableWithoutFeedback
                        onPress={()=>setAyuda(!ayuda)}
                        >
        <View style={{  flex:1,justifyContent: "center",alignItems: "center"}} >

                     
                              <View style={{width:'90%',height:'40%',backgroundColor: 'white',opacity:0.8, borderRadius:15,alignItems:"center",justifyContent:"center",alignContent:"center",flexDirection:"row"}}>
                                
                            
                              {
                                imagen==1&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/1.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }

                                        {
                                imagen==2&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/2.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }

{
                                imagen==3&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/3.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }


{
                                imagen==4&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/4.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }

{
                                imagen==5&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/5.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }


{
                                imagen==6&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/6.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }


{
                                imagen==7&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/7.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }


{
                                imagen==8&&
                               
                            
                                <Image  source={require('../assets/fondos/figuras/8.png')}  resizeMode="contain" style={{width:'50%',height:'80%'}}    />
                            

                                       
                              }



                                

                                  
                             

                              </View>
                              </View>
                              </TouchableWithoutFeedback>
    )
}

export default AyudaFiguras
