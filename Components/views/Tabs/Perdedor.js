                                    import React,{useState,useEffect,useRef} from 'react';
                                    import {StyleSheet, Text,View,TouchableWithoutFeedback,Image,ImageBackground} from 'react-native';
                                    import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                    import LottieView from 'lottie-react-native';
                                    import { Avatar} from 'react-native-paper';
                                    import AsyncStorage from '@react-native-community/async-storage';
                                    import Snackbar from 'react-native-snackbar';
                                    import TypeWriter from 'react-native-typewriter'
                                    import * as Animatable from 'react-native-animatable';



                                    const Perdedor =({usuario,foto,setModalVisibleJuego,setModalVisiblePerdedor})=> {

                                    const [mensaje,setMensaje]=useState('');
                                    const  [botonsalir,setBotonSalir]=useState(require('../Tabs/assets/fondos/cambio/salir.png'))

                                    const frases=[
                                        '¡Si no te das  por vencido la buena suerte llegará!',

                                        '¡La lotería  ya la ganamos, pero la mayoría no cambia su boleto!',
                                        
                                        '¡Si la pata del conejo es de la suerte, recuerda que no le funcionó al conejo¡',
                                        
                                        '¡Lo único seguro acerca de la mala suerte es que cambiará!',
                                        
                                        '¡Cuando se trata de la suerte, haz la tuya!',
                                        
                                        '¡Nunca se sabe de qué peor suerte te ha salvado tu mala suerte!',
                                        
                                        '¡Si no fuera por la mala suerte, no tendrías suerte en absoluto!',
                                        
                                        '¡Qué suerte! Cuando llegó mi barco, ¡estaba atrapado en el aeropuerto!',
                                        
                                        '¡Te doy un consejos para la buena suerte: No la busques, te encontrará!',
                                        
                                        '¡Si tienes suerte no te enorgullezcas; si no la tienes, no te desanimes!',
                                        
                                        '¡La suerte es creer que tienes suerte, la siguiente te va mejor!'

                                    ]


                                    const cargar2=async(maiz)=>{


                                        if(!maiz.length){
                                            return;
                                        }


                                        const id=await AsyncStorage.getItem("id");
                    
                                        console.log('entra')
                                        const token = await AsyncStorage.getItem("userToken")
                                        fetch('https://api-loteria-heroku.herokuapp.com/maiz2/'+`${id}`,{
                                        headers:new Headers({
                                          Authorization:"Bearer "+token
                                        })
                                        }).then(res=>res.json())
                                        .then(data=>{
                                   
                                      AsignarMaiz(data[0]._id,data[0].amarillo,maiz);
                                          
                                        }
                                        )
                    
                                      }


                                        const antes=async()=>{
                                            const maiz=await AsyncStorage.getItem("creadormaiz")

                                            cargar2(maiz);

                                        }

                                    useEffect(() => {


                                       antes();

                                    let target=0+Math.floor(frases.length*Math.random())
                                    console.log('entra '+target)
                                    setMensaje(frases[target]);


                                    }, [])

                                  



                                    
                                          const AsignarMaiz=async(id,amarillo,maiz)=>{
                                            console.log('texto de maiz storage en asignar Maiz: '+maiz);

                                            if(!maiz.length){
                                              return;
                                            }
                                            const id_usuario=await AsyncStorage.getItem("id");

                                             
                                        fetch('https://api-loteria-heroku.herokuapp.com/ganar/maiz3/'+`${id}`,{
                                          
                                          method:"PUT",
                                          headers:{
                                        'Content-Type': 'application/json'
                                          },
                                          body:JSON.stringify({
                                                                        
                                            "color":'amarillo',
                                            "id_usuario":id_usuario
                                       
                                          })
                                        })
                                      
                                        .then(res=>res.json())
                                      .then(async data=>{
                                        
                                      
                                       
                                      
                                        try{
                                                                                                                                
                                        console.log('exito al dar premio')
                                        await AsyncStorage.removeItem('creadormaiz');

                                        } catch(e){
        
                                          alert(e);
                                        }
                                      
                                      }).catch((error)=>{
        
                                        Snackbar.show({
                                          text: 'Ocurrió un error con el premio.',
                                        
                                          duration: Snackbar.LENGTH_SHORT,
                                        });                               });
                                      


                                          }
                                   



                                          
                               const presionarBoton=()=>{
                                setBotonSalir(require('../Tabs/assets/fondos/cambio/asalir.png'))
                                
                                }
                                
                                
                                const soltarBtn=async()=>{
                                
                                 
                                 await setBotonSalir(require('../Tabs/assets/fondos/cambio/salir.png'))
                               
                                 setModalVisiblePerdedor(false);
                                 setModalVisibleJuego(false);
  
                                
                                }

                                    
                                            return (
                                            <ImageBackground  source={require('../Tabs/assets/ganador/fondo.png')} style={{flex:1,backgroundColor:'white',alignItems:"center",justifyContent:"center"}}>


                                            <LottieView 
                                        resizeMode='cover' source={require('../Tabs/assets/fondo.json')}  autoPlay loop speed={9} />



                                    

                                                                <View style={{ bottom:'-2%',height:'10%',width:'70%',justifyContent:"center",alignItems:"center"}} >
                                                            <Animatable.Image animation="pulse" easing="ease-in-back" iterationCount="infinite" resizeMode='contain' source={require('../Tabs/assets/ganador/loteria.png')} style={{width:'100%',height:'100%'}}  />
                                                        
                                                          </View>


                                                    <View style={{ marginVertical:'12%',backgroundColor: '#E5EAEF',opacity: 0.7,borderRadius:10, width:'70%',height:'30%',justifyContent:"center",alignItems:"center"}} >

                                                    <Text style={{bottom:'-10%',fontWeight:"bold",fontSize:RFValue(30)}} >Ganador</Text>

                                                                    <View style={{bottom:'-15%',justifyContent:"center",alignItems:"center",alignContent:"center",flexDirection: 'row'}}>
                                                                    <Avatar.Image 
                                                                    style={{backgroundColor:'transparent'}}
                                                                        source={{
                                                                        uri:foto
                                                                        }}
                                                                        size={RFValue(80)}
                                                                    />
                                                                    <View style={{marginLeft:'2%'}}>
                                                                        <Text style={{fontWeight:"bold",fontSize:RFValue(25)}}>{usuario}</Text>



                                                                    </View>
                                                                    </View>

                                                <Image resizeMode='contain' source={require('../Tabs/assets/ganador/flor2.png')} style={{width:'25%',height:'25%',bottom:'-25%',right:'45%'}}   />
                                                <Image resizeMode='contain' source={require('../Tabs/assets/ganador/flor.png')} style={{width:'25%',height:'25%',bottom:'1%',left:'45%'}}   />

                                                                                    
                                                    </View>

                                                    <View style={{ bottom:'3%',height:'10%',width:'70%',backgroundColor: '#E5EAEF',opacity: 0.7,justifyContent:"center",alignItems:"center"}} >

                                                    <TypeWriter typing={1} style={{fontWeight:"bold",fontSize:RFValue(15),textAlignVertical: "center",textAlign: "center"}}>{mensaje}</TypeWriter>

                                                    </View>


                                                    <View style={{bottom:'3%',width:'100%',height:'35%',alignItems:'center'}} >
                                                    <Image
                                                    resizeMode="contain"
                                                    style={{width:'100%',height:'100%'}}
                                                                        source={require('../Tabs/assets/ganador/siguanabab.gif')} />    



                                                    <TouchableWithoutFeedback  
                                              onPressIn={()=>presionarBoton()}
                                              onPress={()=>soltarBtn()} 
                                            
                                              
                                                              >

                                                                <View
                                                                style={{bottom:'270%',width:'14.5%',height:'20%',left:'42%'}}
                                                                >
                                                                <Image  source={botonsalir} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                                                </View>

                                              
                                              </TouchableWithoutFeedback>
                                                    </View>


                                              
                                                    
                                                        
                                            </ImageBackground>

                                            )

                                        




                                    }






                                    const styles=StyleSheet.create({

                                    container:{

                                    flex:1


                                    },


                                    addbutton:{

                                    marginTop:50,
                                    flex:1,
                                    alignItems:"center",
                                    justifyContent:"center",





                                    },
                                    heartContainer:{
                                    position:"absolute",
                                    bottom:30,
                                    backgroundColor: "transparent",
                                    right:70

                                    },
                                    heart:{
                                    width:50,
                                    height:50,
                                    alignItems:"center",
                                    justifyContent:"center",
                                    backgroundColor: "transparent",
                                    right:70
                                    },
                                    modalText: {

                                    marginBottom: 15,
                                    textAlign: "center",
                                    fontWeight:'bold',
                                    fontSize:18
                                    }






                                    })


                                    export default Perdedor;
