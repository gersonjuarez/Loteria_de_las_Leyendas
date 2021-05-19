                                      import React,{useState,useEffect,useRef}  from 'react'
                                      import { Text,StyleSheet,ImageBackground,Image,Dimensions,TouchableWithoutFeedback,AppState } from 'react-native'
                                      import TypeWriter from 'react-native-typewriter'
                                      import io from 'socket.io-client/dist/socket.io.js'
                                      import AsyncStorage from '@react-native-community/async-storage';
                                      import Sound from 'react-native-sound';
                                      import NetInfo from '@react-native-community/netinfo';

                                      import Snackbar from 'react-native-snackbar';
import { View } from 'react-native-animatable';

                                      var mySound;
                                      var tiempo;
                                      var aux;

                                const Consejo = ({modalVisible3,modalVisible,setModalVisible3,setModalVisible,socket}) => {





                                            const [botonaceptar,setBotonAceptar]=useState(require('../assets/fondos/consejos/aceptar.png'));

                                            const[codigo,setCodigo]=useState('');
                                            const[imagen,setImagen]=useState('');

                                            const _isMounted = useRef(false); // Initial value _isMounted = true
                                            const isMounted = useRef(false); // Initial value _isMounted = true
                                            const isMounted2 = useRef(false); // Initial value _isMounted = true
                                            const [desmontar,setDesmontar]=useState(true);
     
                                            const appState = useRef(AppState.currentState);
                                            const [appStateVisible, setAppStateVisible] = useState(appState.current);
                                            const [socketConnected, setSocketConnected] = useState(false);



                                                    useEffect(() => {

                                                      socket.emit('figura')
                                                    
                                                    }, [])


                                                    useEffect(() => {
                                                                                                          
                                                         setDesmontar(true);
                                                        
                                                          
                                                        socket.on('cantidad_figura',async({valor,color}) => {

                                                          if(desmontar){

                                                            
                                                            await AsyncStorage.setItem('color_maiz',color.toString())
                                                            await AsyncStorage.setItem('valorimagen',valor.toString())

                                                            setImagen(valor);
                                                          }

                                                        })
                                                     
                                                      
                                                 
                                                        
                                                      return ()=> {

                                                        setDesmontar(false)    
                                                      }
                                                    }, [])


                                                    const reproduce=()=>{

                        
                                                      aux=0;
                          
                                                      mySound = new Sound('siguanaba.mp3',Sound.MAIN_BUNDLE,(error)=>{
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
                          
                          
                                                  useEffect(() => {
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

                                                      if(aux===0){
                                                        mySound = new Sound('siguanaba.mp3',Sound.MAIN_BUNDLE,(error)=>{
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

                                                          if(aux===0){
                                                          mySound.stop();
                                                          mySound.release();
                                                          }




                                                  };




                                                    useEffect(() => {
                    
                                                      isMounted.current=false;
                                                      try {
                                                    
                                                        
                                                        socket.on('mensaje_configuracion', payload => {
                                                       
                                  
                                  
                                                          if(!isMounted.current){
                                                            console.log('dentro del if: ');
                                                            Snackbar.show({
                                                              text:`${payload} se ha unido a la sala`,
                                                            
                                                              duration: Snackbar.LENGTH_SHORT,
                                                            });
                                                          
                                                          }

                                                        });
                                  
                                                        
                                  
                                  
                                                      } catch (error) {
                                                        console.log(error);
                                                      }
                                                 
                                                      return ()=> {


                                                        isMounted.current= true ;    
                                                      
                                                      }
                                                    

                                  
                                                    }, []); 
                                  
                                  
                                                    useEffect(() => {
                                                      isMounted2.current=false;
                                                      try {
                                                    
                                                        
                                                        socket.on('abandonar_configuracion', payload => {
                                                        
                                  
                                                          if(!isMounted2.current){
                                                            Snackbar.show({
                                                              text:`${payload}`,
                                                            
                                                              duration: Snackbar.LENGTH_SHORT,
                                                            });
                                                          }

                                                        });
                                  
                                                        
                                  
                                  
                                                      } catch (error) {
                                                        console.log(error);
                                                      }
                                                 
                                                      return ()=> {

                                                        isMounted2.current= true ;    
                                                      
                                                      }

                                  
                                                    }, []); 




                                                    useEffect(() => {
                                 
           
                                                      NetInfo.addEventListener(state => {
                                                      
                                                
                                                        if(state.isInternetReachable===false){
                                                          socket.off("mensaje_configuracion");
                                                          socket.off("abandonar_configuracion");

                                                           mySound.stop(); 
                                                           aux=1;              
                                                           setModalVisible3(false); 
                                         
                                                                                                                                        
                                        
                                                        }
                                                    
                                                      });
                                        
                                        
                                                    
                                        
                                        
                                                    }, [])


                                                const presionarBotonAceptar=()=>{

                                                    setBotonAceptar(require('../assets/fondos/consejos/a_aceptar.png'))
                                                    
                                                    }
                                                    
                                                    
                                                    const soltarBtnAceptar=()=>{

                                                     
                                                      
                                                      
                                                        
                                                    setBotonAceptar(require('../assets/fondos/consejos/aceptar.png'))
                                                    
                                                    }



                                                    const Saltar =()=>{



                                                    setModalVisible(!modalVisible);
                                                    setModalVisible3(!modalVisible3)



                                                    }





    return (




                <ImageBackground source={require('../assets/fondos/consejos/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >


                           
                    <Image source={require('../assets/fondos/consejos/nubes.png')} resizeMode="contain" style={{bottom:'-6%',width:'100%',height:'9%',alignContent:"center",alignItems:"center"}}  />


                    <Image source={require('../assets/fondos/consejos/volcan.png')} resizeMode="contain"  style={{ bottom:'-24%',width:'100%',height:'100%'}}   />


                    <Image source={require('../assets/fondos/consejos/luz.png')}   style={{bottom:'115%', width:'100%',height:'100%'}} />

                    <Image source={require('../assets/fondos/consejos/cerro.png')} resizeMode="contain" style={{bottom:'169%',width:'100%',height:'100%'}}   />




                   <ImageBackground source={require('../assets/fondos/consejos/dialogo.png')} resizeMode="contain" 
                    style={{bottom:'305%', width:'100%',height:'65%',alignItems:"center",justifyContent:"center",alignContent:"center"}} >

                  
                        {
                            imagen==1&&
                            <Image  source={require('../assets/fondos/figuras/1.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==2&&
                            <Image  source={require('../assets/fondos/figuras/2.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==3&&
                            <Image  source={require('../assets/fondos/figuras/3.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==4&&
                            <Image  source={require('../assets/fondos/figuras/4.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==5&&
                            <Image  source={require('../assets/fondos/figuras/5.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==6&&
                            <Image  source={require('../assets/fondos/figuras/6.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==7&&
                            <Image  source={require('../assets/fondos/figuras/7.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }
                          {
                            imagen==8&&
                            <Image  source={require('../assets/fondos/figuras/8.png')}  resizeMode="contain" style={{bottom:'23%',width:'50%',height:'50%'}}    />


                        }

                        </ImageBackground> 


                          


                        <Image source={require('../assets/fondos/consejos/ziguanaba.png')}  resizeMode="contain"  style={{left:'19%',bottom:'329%',width:'100%',height:'50%'}} />

                        <Image source={require('../assets/fondos/consejos/titulo.png')}  resizeMode="contain"  style={{right:'22%',bottom:'329%',width:'100%',height:'3%'}}  />




                      {/*   <TouchableWithoutFeedback  

                    style={{marginLeft:width*.06,width:width*.46,height:height*.05,marginTop:height*-.4}}>
                    <Image  source={require('../assets/fondos/consejos/consejos.png')}  style={{marginLeft:width*.06,width:width*.46,height:height*.05,marginTop:height*-.4}}>

                    </Image>
                    </TouchableWithoutFeedback> */}

                  


               


                 <TouchableWithoutFeedback  
                     onPressIn={()=>presionarBotonAceptar()}
                     onPressOut={()=>soltarBtnAceptar()} 
                     onPress={()=>{ 
                       
                      socket.off("mensaje_configuracion");
                      socket.off("abandonar_configuracion");
                      aux=1,mySound.stop();mySound.release()

                     setModalVisible(!modalVisible);
                      setModalVisible3(!modalVisible3)}}
                    >
                      <View
                      style={{marginLeft:-150,width:'45%',height:'6%',bottom:'365%'}}
                      >
                      <Image  source={botonaceptar} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                      </View>

                   
                    </TouchableWithoutFeedback> 

                   

                </ImageBackground>




    )
}

export default Consejo


/* 
<TypeWriter typing={1} style={{bottom:'23%',width:width*.4,justifyContent:"center",alignContent:"center",alignItems:"center"}}  >
Memoriza tu cartón para no perder tiempo en buscar coincidencia con la carta mostrada.

    </TypeWriter> */