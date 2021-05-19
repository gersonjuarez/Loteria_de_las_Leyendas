                import React, {useState,useEffect,useRef} from 'react'
                import {StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Modal,TouchableWithoutFeedback,AppState,Share} from 'react-native';
                import NetInfo from '@react-native-community/netinfo';

                import AsyncStorage from '@react-native-community/async-storage';
                import Snackbar from 'react-native-snackbar';
                import * as Animatable from 'react-native-animatable';
                import Sound from 'react-native-sound';
                import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




                const {width,height}=Dimensions.get('screen');

                var mySound;

                          var isMounted=false;
                          var isMounted1=false;
                          var ismounted2=false;
                          var segundosaux=0;
                          var detiene=0;
                          var tiempo;
                          const Espera = ({setModalVisible,modalVisible,modalVisiblejuego,setModalVisibleJuego,socket}) => {
                            
                         
                              const[codigo,setCodigo]=useState('');
                              const [datosocket,setDatoSocket]=useState('');
                              const [minutos,setMinutos]=useState(null);
                              const [segundos,setSegundos]=useState(null);
                              const [color,setColor]=useState('white')
                              const  [botonsalir,setBotonSalir]=useState(require('../assets/fondos/cambio/salir.png'))
                              const [nombreMesa,setNombreMesa]=useState();
                              const [estadoMesa,setEstadoMesa]=useState(null)
                              const [botoncompartir,SetBotonCompartir]=useState(require('../assets/fondos/sala/compartir.png'))
                              const [jugadores,setJugadores]=useState(1);
                              const appState = useRef(AppState.currentState);
                              const [appStateVisible, setAppStateVisible] = useState(appState.current);
                              


                                  const reproduce=()=>{

                                    if(modalVisible){

                                      
                                      mySound = new Sound('espera.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                        if(error){
                                        console.log('Error loading sound: ' + error);
                                        return;
                                        }else{
                                        mySound.play()
                                        mySound.setVolume(0.9);
                                       
                                        mySound.setNumberOfLoops(-1)
                                        }
                                        });
                                       
                                     
                                      }
                                       
                                      

                                  }


                                  useEffect(() => {
                                    detiene=0
                                    socket.emit('jugadores_sala');
                                    reproduce();
                                  }, [])

                                

                                  
                                  useEffect(() => {
                                    AppState.addEventListener("change", _handleAppStateChange);
                                
                                    return () => {
                                      AppState.removeEventListener("change", _handleAppStateChange);
                                    };
                                  }, []);
                                
                                  const _handleAppStateChange = (nextAppState) => {
                                    if (
                                      appState.current.match(/inactive|background/) &&
                                      nextAppState === "active"
                                    ) {

                                      if(detiene===0){
                                        mySound = new Sound('espera.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                          if(error){
                                          console.log('Error loading sound: ' + error);
                                          return;
                                          }else{
                                          
                                          mySound.setVolume(0.9);
                                          mySound.setCurrentTime(tiempo);
  
                                          mySound.setNumberOfLoops(-1)
                                          mySound.play();
                                          }
                                          }); 
                                        }



                                    }
                                
                                    appState.current = nextAppState;
                                    setAppStateVisible(appState.current);

                                    mySound.getCurrentTime((segundo)=>tiempo=segundo);

                                          if(detiene===0){
                                          mySound.stop();
                                          mySound.release();
                                          }




                                  };


                                  
                                  useEffect(() => {
                                 
           
                                    NetInfo.addEventListener(state => {
                                    
                              
                                      if(state.isInternetReachable===false){
                                          detiene=1;
                                         mySound.stop();
                                         mySound.release();      
                                         socket.off("cuenta");
                                         socket.off("mensaje_espera");
                                         socket.off("abandonar_espera");
                                         socket.off("cantidad_jugadores");

                                         setModalVisible(false);

                       
                                                                                                                      
                      
                                      }
                                  
                                    });
                      
                      
                                  
                      
                      
                                  }, [])






                                  useEffect(() => {
                                   
                                    socket.emit('nombremesa')

                                    socket.on('recibonombre',({mesa,estado_mesa})=>{

                                      setNombreMesa(mesa);
                                      setEstadoMesa(estado_mesa);

                                    })




                                  }, )

                            const presionarBoton=()=>{
                              setBotonSalir(require('../assets/fondos/cambio/asalir.png'))
                              
                              }
                              
                              
                              const soltarBtn=async()=>{
                              
                                detiene=1;
                               await setBotonSalir(require('../assets/fondos/cambio/salir.png'))
                              await  mySound.stop();
                              await  mySound.release();   
                               await socket.emit('Salir');                                  
                               await socket.off("cuenta");
                               await socket.off("mensaje_espera");
                               await socket.off("abandonar_espera");
                               await socket.off("cantidad_jugadores");

                               await setModalVisible(!modalVisible);
                                  

                              
                              }


                              const presionarBotonCompartir=()=>{
                                SetBotonCompartir(require('../assets/fondos/sala/acompartir.png'))
                                
                                }
                                
                                
                                const soltarBtnCompartir=()=>{
                                
                               
                                  SetBotonCompartir(require('../assets/fondos/sala/compartir.png'))
                                
                                
                                }

              useEffect(() => {

                isMounted1=true;
                    
                    try {
                  
                      
                      socket.on('mensaje_espera', payload => {
                     


                            if(isMounted1){
                          Snackbar.show({
                            text:`${payload} se ha unido a la sala`,
                          
                            duration: Snackbar.LENGTH_SHORT,
                          });
                            }
                        
                      });

                      


                    } catch (error) {
                      console.log(error);
                    }
               
                    return () => { isMounted1= false };



                  }, []); 


                  useEffect(() => {
                    
                    ismounted2=true;
                    try {
                  
                      
                      socket.on('abandonar_espera', payload => {
                      

                          if(ismounted2){
                          Snackbar.show({
                            text:`${payload}`,
                          
                            duration: Snackbar.LENGTH_SHORT,
                          });
                          }
                        
                      });

                      


                    } catch (error) {
                      console.log(error);
                    }
               

                    return () => { isMounted2= false };


                  }, []); 


                useEffect(() => {
               
                  socket.on('cantidad_jugadores',cantidad => {

                    setJugadores(cantidad);

                  })

                }, [])

                  useEffect(() => {
                    
                    try {
                  
                     
                        isMounted=true;
                      
                      socket.on('cuenta',({minutos,segundo,seg}) => {

                        if(isMounted){

                          segundosaux=seg;
                        setMinutos(minutos);    
                        if(segundo<10){
                          setSegundos('0'+segundo);
                        }else{
                          setSegundos(segundo);
                        }   
  
                          if(seg==0 ){
                            detiene=1;
                            mySound.stop();
                            mySound.release();                                     

                            Iniciar();
                          }
                      
                        } // probar close
                        
                      })

                    } catch (error) {
                      console.log(error);
                    }
                    

                    return function cleanup() {

                      socket.off("cuenta");

                      isMounted= false
                    
                    
                    };

                  }, []); 


                  useEffect(() => {
                      
                    const cod=async()=>{


                      setCodigo(await AsyncStorage.getItem("CodSala"));

                    }
                 cod();
                  }, [])




                  

                  const Iniciar=()=>{

                    socket.off("cuenta");
                    socket.off("mensaje_espera");
                    socket.off("abandonar_espera");            
                    socket.off("cantidad_jugadores");
                    setModalVisibleJuego(true);

                    setModalVisible(false);


                  }


                


                                const onShare=async()=>{
                            
                                   try {
                                    await Share.share({
                                      title:'Código de Sala',
                                      message:codigo
                                    })
                                  } catch (error) {
                                    console.log(error)
                                  } 
                            
                            
                            
                                }

                              return (

                                <ImageBackground source={require('../assets/fondos/inicio/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}}>


                                <Image resizeMode="contain" style={{bottom:'-5%',width:'100%',height:'8%',alignItems:"center",alignContent:"center",justifyContent:"center"}}  source={require('../assets/fondos/inicio/nubes.png')} />
                                <Image resizeMode="contain" style={{bottom:'-25%',width:'100%',height:'100%',alignItems:"center",alignContent:"center",justifyContent:"center"}}  source={require('../assets/fondos/inicio/volcan.png')}/>
                                <Image  style={{bottom:'110%',width:'100%',height:'100%',alignItems:"center",alignContent:"center",justifyContent:"center"}}  source={require('../assets/fondos/inicio/Luces.png')}/>
                                <Image resizeMode="contain" style={{bottom:'168%',width:'100%',height:'100%',alignItems:"center",alignContent:"center",justifyContent:"center"}}  source={require('../assets/fondos/inicio/cerro.png')}/>

                     
                          <Text style={{bottom:'307%',fontWeight: "bold",color:'white',fontSize:RFValue(15)}}>Sala: {nombreMesa}</Text>

                                      

                          <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBoton()}
                                    onPress={()=>soltarBtn()} 
                                   
                                    
                                                    >

                                                      <View
                                                      style={{bottom:'310%',width:'14.5%',height:'7%',left:'40%'}}
                                                      >
                                                      <Image  source={botonsalir} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                                      </View>

                                    
                                    </TouchableWithoutFeedback>
              




                            
 
                       
                                
                                    
                             
                        
                       <View style={{bottom:'305%',width:'100%',height:'6%',alignItems:"center"}} >
               {/*      <TouchableOpacity
                    onPress={()=>{

                      detiene=1;
                      mySound.stop();
                      mySound.release();                                     

                      Iniciar();

                    }}
                    >
                      <Text>Saltar</Text>
                    </TouchableOpacity> */}
                       {estadoMesa&& 
                                <TouchableWithoutFeedback  
                                  onPressIn={()=>presionarBotonCompartir()}
                                  onPressOut={()=>soltarBtnCompartir()}
                                  onPress={()=>onShare()}
                              >
                              <Image  source={botoncompartir} resizeMode="contain" style={{width:'45%',height:'100%'}} />

                          
                              </TouchableWithoutFeedback>

                              } 
                              </View>
                         


                               
                           <View style={{bottom:'303%',width:'100%',height:'8%',alignItems:"center"}} >
                          
                              <View style={{backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:8,width:'55%',height:'85%',alignItems:"center",alignContent:"center",justifyContent:"center"}} >

                                <Text style={{fontWeight: "bold",textAlign:'center',fontSize:RFValue(15)}}>El Juego Iniciará En:</Text>
                                { segundos==null?
                                  <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{textAlign:'center',fontSize:RFValue(13)}}>Esperando Jugadores</Animatable.Text>
                                  :segundosaux>2?
                                  <Text style={{fontSize:RFValue(15)}}>{minutos}:{segundos}</Text>
                                  :segundosaux<3&&
                                  <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{fontWeight: "bold",fontSize:RFValue(15)}}>¿ Listos ?</Animatable.Text>

                                } 
                            
                                </View>
                                
                                </View>
                              

                                <View style={{bottom:'302%',width:'100%',height:'8%',alignItems:"center"}} >
                          
                          <View style={{backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:8,width:'55%',height:'85%',alignItems:"center",alignContent:"center",justifyContent:"center"}} >

                            <Text style={{fontWeight: "bold",textAlign:'center',fontSize:RFValue(15)}}>Jugadores</Text>
                            <Text  style={{textAlign:'center',fontSize:RFValue(13)}}>{jugadores}/12</Text>

                        
                            </View>
                            
                            </View>

                              
                                <View style={{bottom:'312%',width:'100%',height:'70%',alignItems:"center",justifyContent:'center',position:"relative"}} >
                                                    <Image
                                                    resizeMode='contain'
                                                    style={{width:'100%',height:'80%'}}
                                                    source={require('../assets/fondos/inicio/llorona.gif')}   />

                                                    </View>





              <Image  source={require('../assets/fondos/inicio/titulo.png')} resizeMode="contain"  style={{right:'22%',bottom:'314.5%',width:'100%',height:'3%'}}  />



                                </ImageBackground>



                              )
                          }



const styles=StyleSheet.create({

  gradient: {
    width,
    height,
    alignItems: "center",
  },
  feedbackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: width * .7
  },
  headings: {
    flex: .4,
    justifyContent: "center"
  },
  heading: {
    color: "#fff",
    fontSize: 42,
    lineHeight: 42,
    fontWeight: '700'
  },
  body: {
    color: "#fff",
    fontFamily: "Menlo"
  },
  svgContainer: {
    marginBottom: 40
  },
  svgWrapper: {
    flex: .6,
    alignItems: "center",
    justifyContent: "center"
  }




})

export default Espera


