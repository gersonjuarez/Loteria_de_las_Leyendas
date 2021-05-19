import React,{useState,useEffect} from 'react'
import {StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Modal,TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import Premios from './Premios';
import Cambio from '../../Cambio'
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import * as Animatable from 'react-native-animatable';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

                

                const Canjeo = ({ modalVisibleCanjeo, setModalVisibleCanjeo,modalVisiblePremio, setModalVisiblePremio}) => {

                  const  [botonsalir,setBotonSalir]=useState(require('../assets/fondos/cambio/salir.png'))
                  const [botonpremio,setBotonPremio]=useState(require('../assets/fondos/torneo/premio.png'));
                  const [modalVisiblecarga, setModalVisibleCarga] = useState(false);

                  const  [botoncambiom,setBotonCambiom]=useState(require('../assets/fondos/cambio/cange.png'))
                  const  [botoncambiob,setBotonCambiob]=useState(require('../assets/fondos/cambio/cange.png'))
                  const  [botoncambior,setBotonCambior]=useState(require('../assets/fondos/cambio/cange.png'))
                  const [estadocambio,setEstadoCambio]=useState(false);
                  const [amarillo,setAmarillo]=useState(0);
                  const [blanco,setBlanco]=useState(0);
                  const [rojo,setRojo]=useState(0);
                  const [morado,setMorado]=useState(0);
                  const [id,setId]=useState('');
                  const [estadoRojo,setEstadoRojo]=useState(false);
                  const [estadoAmarillo,setEstadoAmarillo]=useState(false);
                  const [estadoBlanco,setEstadoBlanco]=useState(false);
                  const [estadoMorado,setEstadoMorado]=useState(false);


                  const cargar=async()=>{

                    const id=await AsyncStorage.getItem("id");

                    console.log('entra')
                    const token = await AsyncStorage.getItem("userToken")
                    fetch('https://api-loteria-heroku.herokuapp.com/maiz2/'+`${id}`,{
                    headers:new Headers({
                      Authorization:"Bearer "+token
                    })
                    }).then(res=>res.json())
                    .then(data=>{
                      
                    
                       setAmarillo(data[0].amarillo);
                      setBlanco(data[0].blanco);
                      setMorado(data[0].morado);
                      setRojo(data[0].rojo); 
                      setId(data[0]._id);
               
                    }
                    )

                  }

                  useEffect(() => {
                 cargar()

                  }, [])


            

                   

                  const presionarBotonPremio=()=>{

                    setBotonPremio(require('../assets/fondos/torneo/apremio.png'))
                    
                    }
                    
                    
                    const soltarBtnPremio=()=>{
                      setModalVisiblePremio(!modalVisiblePremio);

                      setBotonPremio(require('../assets/fondos/torneo/premio.png'))
                    
                    }


                    const presionarBoton=()=>{
                        setBotonSalir(require('../assets/fondos/cambio/asalir.png'))
                        
                        }
                        
                        
                        const soltarBtn=()=>{
                         
                          setBotonSalir(require('../assets/fondos/cambio/salir.png'))

                            setModalVisibleCanjeo(!modalVisibleCanjeo)
                        
                        
                        }




                        const presionarcange=(data)=>{


                            if(data=='morado')
                            setBotonCambiom(require('../assets/fondos/cambio/acange.png'));

                            if(data=='blanco')
                            setBotonCambiob(require('../assets/fondos/cambio/acange.png'));

                            if(data=='rojo')
                            setBotonCambior(require('../assets/fondos/cambio/acange.png'));


                        }

                        const soltarcange=(data)=>{
                            console.log('se presiono el boton: '+data)

                            setEstadoCambio(true);

                            if(data=='morado'){
                              
                                                     
                              setBotonCambiom(require('../assets/fondos/cambio/cange.png'));
                           
                                RealizarCangeo(amarillo,data);
                            }

                            if(data=='blanco'){
                              setBotonCambiob(require('../assets/fondos/cambio/cange.png'));
                              RealizarCangeo(morado,data);


                            }

                            if(data=='rojo'){

                              setBotonCambior(require('../assets/fondos/cambio/cange.png'));
                              RealizarCangeo(blanco,data);

                            }


                            

                        }



                          const RealizarCangeo=async(data,color)=>{

                           
                            if(data<6){
                               setEstadoCambio(false);
                               Snackbar.show({
                                text: 'Maíz insuficiente, sigue jugando.',
                              
                                duration: Snackbar.LENGTH_LONG,
                              }); 
                                return;
                            }

                            const id_usuario=await AsyncStorage.getItem("id");


                            const controller = new AbortController();
                            const { signal } = controller;
                       
                            
                                  setTimeout(
                          
                                                              
                                    () => controller.abort()
                                  
                                    , 6000);

                                fetch('https://api-loteria-heroku.herokuapp.com/editar/maiz2/'+`${id}`,{
                                  
                                  method:"PUT",
                                  headers:{
                                'Content-Type': 'application/json'
                                  },
                                  body:JSON.stringify({                                    
                                    "color":color,
                                    "id_usuario":id_usuario
                                  }),
                                  signal
                                })
                              
                                .then(res=>res.json())
                              .then(async data=>{
                                
                              
                               
                              
                                try{
                              
                                                                                          
                                await cargar();
                                setEstadoCambio(false);

                                if(color=="morado"){
                                  setEstadoMorado(true)
                                 setTimeout(() => {
                                  setEstadoMorado(false);

                                 }, 1000);
                                  
                                }

                                if(color=="blanco"){
                                  setEstadoBlanco(true)
                                  setTimeout(() => {
                                    setEstadoBlanco(false)
  
                                   }, 1000);

                                }

                                if(color=="rojo"){
                                  setEstadoRojo(true)
                                  setTimeout(() => {
                                    setEstadoRojo(false)
  
                                   }, 1000);

                                }
                              
                                } catch(e){
                                  alert(e);
                                }
                              
                              }).catch((error)=>{
                                setEstadoCambio(false);

                                Snackbar.show({
                                  text: 'Ocurrió un error revise su conexión de internet.',
                                
                                  duration: Snackbar.LENGTH_LONG,
                                });                               });
                              
                              
                              
                              
                              
                              
                              




                          }




                return (


        <ImageBackground  source={require('../assets/fondos/cambio/fondo.png')} style={{flex:1,alignItems:"center"}}>




            <Image source={require('../assets/fondos/cambio/volcan.png')} resizeMode="contain"  style={{ bottom:'-34%',width:'100%',height:'100%'}}   />


            <Image source={require('../assets/fondos/cambio/luz.png')}   style={{bottom:'105%', width:'100%',height:'100%'}} />

            <Image source={require('../assets/fondos/cambio/cerro.png')} resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}}   />



                                    <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBoton()}
                                    onPress={()=>soltarBtn()} 
                                   
                                
                                    
                                                    >
                                    <Image  source={botonsalir} resizeMode="contain" style={{left:'40%',width:'35%',height:'6%',bottom:'299%'}} />

                                    
                                    </TouchableWithoutFeedback>



                                    <View style={{bottom:'299%',width:'100%',height:'20%',alignContent:"center",alignItems:"center"}} >

<View style={{left:5,flexDirection:'row',width:'100%',height:'30%',alignContent:'center',justifyContent:'center',alignItems:'center'}}>




                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizr.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{rojo}</Text>           
                              </View>  
                              {
                        estadoRojo&&
                      <Animatable.Image animation="zoomOut" iterationCount={3}  source={require('../assets/fondos/torneo/maizr.png')} resizeMode="contain" style={{bottom:'145%',right:'30%',width:'100%',height:'100%'}} />

                      }
            </ImageBackground>     
                        </View>



                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizb.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{blanco}</Text>           
                              </View>  
                              {
                        estadoBlanco&&
                      <Animatable.Image animation="zoomOut" iterationCount={3}  source={require('../assets/fondos/torneo/maizb.png')} resizeMode="contain" style={{bottom:'145%',right:'30%',width:'100%',height:'100%'}} />

                      }
            </ImageBackground>     
                        </View>


                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizm.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{morado}</Text>           
                              </View>  
                              {
                        estadoMorado&&
                      <Animatable.Image animation="zoomOut" iterationCount={3}  source={require('../assets/fondos/torneo/maizm.png')} resizeMode="contain" style={{bottom:'145%',right:'30%',width:'100%',height:'100%'}} />

                      }
            </ImageBackground>     
                        </View>


                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maiza.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{amarillo}</Text>           
                              </View>  
            </ImageBackground>     
                        </View>






                    
 
                
</View>
                


                                    </View>



                        

                                                            <Image   source={require('../assets/fondos/cambio/titulo.png')} resizeMode="contain" style={{width:'35%',height:'6%',bottom:'309%'}} />

                                                <Image source={require('../assets/fondos/cambio/fondoc.png')}  style={{width:'85%',height:'50%',bottom:'307%'}} />

                                                <Image   source={require('../assets/fondos/cambio/maices.png')} resizeMode="contain" style={{right:'13%',width:'50%',height:'38%',bottom:'352%'}} />



                                                <TouchableWithoutFeedback
                                             onPressIn={()=>presionarcange('morado')}
                                             onPressOut={()=>soltarcange('morado')} 
                                   
                                            >
                                                <Image   source={botoncambiom} resizeMode="contain" style={{left:'27%',width:'19%',height:'11%',bottom:'391%'}} />
                                                </TouchableWithoutFeedback>


                                                <TouchableWithoutFeedback
                                             onPressIn={()=>presionarcange('blanco')}
                                             onPressOut={()=>soltarcange('blanco')} 
                                   
                                            >
                                                <Image   source={botoncambiob} resizeMode="contain" style={{left:'27%',width:'19%',height:'11%',bottom:'388%'}} />
                                                </TouchableWithoutFeedback>


                                                <TouchableWithoutFeedback
                                             onPressIn={()=>presionarcange('rojo')}
                                             onPressOut={()=>soltarcange('rojo')} 
                                   
                                            >
                                                <Image   source={botoncambior} resizeMode="contain" style={{left:'27%',width:'19%',height:'11%',bottom:'385%'}} />
                                                </TouchableWithoutFeedback>

                                                    


{/* 
                                                    <TouchableWithoutFeedback
                                             onPressIn={()=>presionarBotonPremio()}
                                             onPress={()=>soltarBtnPremio()} 
                                   
                                            >
                                                <Image  source={botonpremio}  resizeMode="contain" style={{bottom:'370%',width:'45%',height:'5%'}}  />
                                            </TouchableWithoutFeedback> */}



                                              
                                                
                                                 

                                           
                                                    {
                                                      estadocambio&& 
                                                          <View style={{width:'100%',height:'100%',bottom:'458%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8,zIndex:1}} >
                                                    <View style={{width:'45%',height:'45%',justifyContent:'center'}} >


                                                    <LottieView source={require('../assets/flecha2.json')}  autoPlay loop />

                                                    </View>
                                                    </View>
                                                  

                                                    }
                             
                                                   



        </ImageBackground>
       
    )
}

const styles = StyleSheet.create({
                                 
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalTablero: {
      flex: 1,
         backgroundColor: "white",
         paddingTop:10,
      justifyContent: "center",
      alignItems: "center",
       
      
        
    },
    modalTablero2: {
      flex: 1,
         backgroundColor: "white",
         paddingTop:10,
      justifyContent: "center",
      alignItems: "center",
       
      
        
    }
  });
export default Canjeo
