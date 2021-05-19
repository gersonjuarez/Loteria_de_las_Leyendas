                              import React, {useEffect,useState,useRef} from 'react'
                              import {Text,View,AppState,ImageBackground, Image,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,Modal,ScrollView,Keyboard,KeyboardAvoidingView,TextInput} from 'react-native';
                              import io from 'socket.io-client/dist/socket.io.js'
                            
                              import AsyncStorage from '@react-native-community/async-storage';
                              import Snackbar from 'react-native-snackbar';
                              import Salas from './Salas';
                              import ConfiguracionSala from './ConfiguracionSala';
                              import Sound from 'react-native-sound';
                              import LottieView from 'lottie-react-native';
                              import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


                              var isMounted=false;
                              var isMounted2=false;
                              var valor;
                              var tiempo;
                              var mySound;
                            /* const colorboton= "#0A48AB"  */

                                    const CrearServidor = ({modalVisible3,setModalVisible3,socket,navigation,modalVisiblePremio,setModalVisiblePremio,fotos2,fotos}) => {

                                      const appState = useRef(AppState.currentState);
                                      const [appStateVisible, setAppStateVisible] = useState(appState.current);
                                      const [modalVisible, setModalVisible] = useState(false);
                                      const [modalVisibleTorneo, setModalVisibleTorneo] = useState(false);
                                      const [modalVisibleSala, setModalVisibleSala] = useState(false);
                                      const [cambio,setCambio]=useState(1);
                                      const [botoncodigo,setBotonCodigo]=useState(require('../assets/fondos/sala/codigo.png'));
                                      const [botoncrear,setBotonCrear]=useState(require('../assets/fondos/sala/crear.png'));
                                      const [botontorneo,setBotonTorneo]=useState(require('../assets/fondos/sala/torneo.png'));
                                    const [estadoboton,setEstadoBoton]=useState(false);
                                    const [tamanio,setTamanio]=useState([]);
                                      const [colorboton,setColorboton]=useState({ 

                                        backgroundColor: '#0A48AB',
                                        pressed: false,



                                      })
                                      const [codigo, setCodigo] = useState('');

                                        const [usuario,setUsuario]=useState('');
                                        const [datosocket,setDatoSocket]=useState('');
    
                                       


                                        const largo=async()=>{

                                          const cartones= await AsyncStorage.getItem("arreglo_cartones")
                                          setTamanio(cartones);

                                        }

                                        //Modal de carga de imagenes
                                        useEffect(() => {
                                        

                                        if(fotos2.length){

                                      
                                          largo();

                                        }


                                        }, [fotos2])


                                      useEffect(() => {
                                         setCambio(1);
                                        valor=0;

                                      }, [cambio])

                                    const reproduce=()=>{

                                                        

                                                          
                                      mySound = new Sound('sombreron.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                        if(error){
                                        console.log('Error loading sound: ' + error);
                                        return;
                                        }else{
                                        
                                        mySound.setVolume(0.9);
                                      
                                        mySound.setNumberOfLoops(-1)
                                        }
                                        });                                     

                                  }


                                  useEffect(() => {
                                    reproduce();
                                  }, [])


                                  useEffect(() => {

                                    AppState.addEventListener("change",
                                    
                                    _handleAppStateChange
                                    
                                    
                                    );
                                
                                    return () => {
                                      AppState.removeEventListener("change", _handleAppStateChange);
                                    };
                                  }, []);


                                  const _handleAppStateChange = (nextAppState) => {
                                    if (
                                      appState.current.match(/inactive|background/) &&
                                      nextAppState === "active"
                                    ) {
                                      console.log("crear servidor regresamos a la aplicacion!");

                                  

                                      if(valor>0){
                                      mySound = new Sound('sombreron.mp3',Sound.MAIN_BUNDLE,(error)=>{
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
                                
                                    console.log('segundo plano')
                                    appState.current = nextAppState;
                                    setAppStateVisible(appState.current);
                                    mySound.getCurrentTime((segundo)=>tiempo=segundo);

                                    if(valor>0){
                                    mySound.stop();
                                    mySound.release();
                                    }
                                    



                                  };
                                  


    const presionarBotonCodigo=()=>{

      setBotonCodigo(require('../assets/fondos/sala/acodigo.png'))
      
      }
      
      
      const soltarBtnCodigo=()=>{
        mySound.play();
        valor=1;
        setBotonCodigo(require('../assets/fondos/sala/codigo.png'))
      
      }

      const presionarBotonCrear=()=>{

        setBotonCrear(require('../assets/fondos/sala/acrear.png'))
        
        }
        
        
        const soltarBtnCrear=()=>{
          valor=2;
          setBotonCrear(require('../assets/fondos/sala/crear.png'))

        
        }


        const presionarBotonTorneo=()=>{

          setBotonTorneo(require('../assets/fondos/sala/atorneo.png'))
          
          }
          
          
          const soltarBtnTorneo=()=>{
            valor=3;
            setBotonTorneo(require('../assets/fondos/sala/torneo.png'))
          
          }
    



      const Ingreso=async()=>{
        await AsyncStorage.removeItem('creadormaiz');

        if(!colorboton.pressed ){

          setColorboton({
            ...colorboton,
            backgroundColor: '#039DB9',

            pressed: true,

          })

       }
       



       
        setEstadoBoton(true);
   
        
    
        if(codigo.trim().length>0){
          

          const controller = new AbortController();
          const { signal } = controller;
     
          
    setTimeout(

                                
      () => controller.abort()
    
      , 6000);

    fetch('https://api-loteria-heroku.herokuapp.com/politica/de/privacidad',{
      headers:new Headers({
        
      }),
      signal
      }).then(res=>res.json())
      .then(data=>{
        
    
       Entrar();
     

      }).catch((error)=>{

        setTimeout(() => {
          setColorboton({
            ...colorboton,
            backgroundColor: '#0A48AB',
  
            pressed: false,
  
  
          })  
        setEstadoBoton(false);
        Snackbar.show({
          text: 'Ocurrió un error, revise su conexión de internet.',
        
          duration: Snackbar.LENGTH_SHORT,
        });
      }, 200);

      })
  




        }else{

          setTimeout(() => {
            setColorboton({
              ...colorboton,
              backgroundColor: '#0A48AB',
    
              pressed: false,
    
    
            })  
            setEstadoBoton(false);
            Snackbar.show({
              text: 'El campo no debe estar vacío.',
            
              duration: Snackbar.LENGTH_SHORT,
            });
          }, 200);

     


        }
        


         
        
       
      }
     


      const Entrar=()=>{

        const data={nombre:usuario,codigo:codigo}

        socket.emit('jugadores',data)

        socket.on('eventoerror', error=>{
          
          if(error){


            setTimeout(() => {
              setColorboton({
                ...colorboton,
                backgroundColor: '#0A48AB',
      
                pressed: false,
      
      
              })  
            setCodigo('');
            setEstadoBoton(false);
            Snackbar.show({
              text: `${error}`,
            
              duration: Snackbar.LENGTH_SHORT,
            });

          }, 200);



          }
        })

        socket.on('salaexistente',async()=>{
          setEstadoBoton(false);
          setCodigo('');
          setModalVisible(!modalVisible);
          setModalVisible3(!modalVisible3);
          
          await AsyncStorage.setItem('CodSala',codigo);


        })


      }








                  const nom=async()=>{
                    const nombre=await AsyncStorage.getItem("nombre")
                    setUsuario(nombre);
                }



                      useEffect(() => {
                        isMounted=true;

                        if(isMounted){
                          nom();
                        }
                      
                     
            return () => { isMounted= false };

                      }, [])
 





                      
                      const cerrarteclado=()=>{

                        Keyboard.dismiss();
                        

                      }

   

    return (



        <ImageBackground source={require('../assets/fondos/sala/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >


          <Image source={require('../assets/fondos/sala/volcan.png')} resizeMode="contain"  style={{ bottom:'-36%',width:'100%',height:'100%'}}   />



        <Image source={require('../assets/fondos/sala/luz.png')}   style={{bottom:'108%' , width:'100%',height:'100%'}} />

        <Image source={require('../assets/fondos/sala/cerro.png')} resizeMode="contain" style={{bottom:'156%' ,width:'100%',height:'100%'}}   />

        <Image source={require('../assets/fondos/sala/nubes.png')} resizeMode="contain" style={{bottom:'295%',width:('100%'),height:('11%')}}  />





         <Image source={require('../assets/fondos/sala/sombreron.png')}  resizeMode="contain"  style={{left:'15%',bottom:'252%',width:'50%',height:'40%'}} />





    

      
                    <Image source={require('../assets/fondos/sala/gana_premios.png')} resizeMode="contain" style={{width:'100%',height:'4%',bottom:'338%'}} />

                        <TouchableWithoutFeedback  

                        onPressIn={()=>presionarBotonTorneo()}
                        onPressOut={()=>soltarBtnTorneo()} 
                        onPress={()=>{setModalVisibleTorneo(!modalVisibleTorneo);}}
                              

                        >
                          <View
                          style={{width:'45%',height:'6%',bottom:'336%'}} 
                          >

                          <Image source={botontorneo} resizeMode="contain"  style={{width:'100%',height:'100%'}} />

                          </View>

                        
                        </TouchableWithoutFeedback>




        <Image source={require('../assets/fondos/sala/entrar_salas.png')} resizeMode="contain" style={{width:'100%',height:'4%',bottom:'333%'}} />





        <TouchableWithoutFeedback  
      onPressIn={()=>presionarBotonCodigo()}
      onPressOut={()=>soltarBtnCodigo()} 

               onPress={() => {
                setModalVisible(!modalVisible);
              }} 
        

        >

          <View style={{width:'45%',height:'6%',bottom:'331%'}}>

          <Image  source={botoncodigo}  resizeMode="contain"  style={{width:'100%',height:'100%'}} />

          </View>
          

       
        </TouchableWithoutFeedback>



        <Image source={require('../assets/fondos/sala/titulo.png')}  resizeMode="contain"  style={{right:'20%',bottom:'275.5%',width:'100%',height:'3%'}}  />

        <Image source={require('../assets/fondos/sala/crear_mesa.png')} resizeMode="contain" style={{width:'90%',height:'4%',bottom:'331%'}} />



        <TouchableWithoutFeedback  


          onPressIn={()=>presionarBotonCrear()}
          onPressOut={()=>soltarBtnCrear()} 

           onPress={()=>setModalVisibleSala(!modalVisibleSala)} 
        

        >

          <View
          style={{width:'45%',height:'6%',bottom:'330%'}}
          >
          <Image source={botoncrear}  resizeMode="contain"  style={{width:'100%',height:'100%'}} />


          </View>
          

        
        </TouchableWithoutFeedback>


                  {
                    !tamanio.length&&
                  <View style={{width:'100%',height:'100%',backgroundColor:'white',opacity:0.8,bottom:'384%',zIndex:1,alignItems:'center',justifyContent:'center'}} >
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:RFValue(16)}} >Generando cartones, revise su conexión de internet.</Text>
                    <View style={{width:'50%',height:'55%',justifyContent:'center'}} >

                    <LottieView source={require('../assets/load_image.json')} autoPlay loop />


                    </View>

                  </View>
                  
                  }


<View  

style={{ flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22}}
>


                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                

                onRequestClose={() => {
                  setModalVisible(!modalVisible)
                  mySound.stop();
                  valor=0;
                }}
              >
                
                <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
                <TouchableWithoutFeedback
              onPress={()=>cerrarteclado()}    
 
              >

                  <View
                  
                  style={styles.inner}
                  >

                 
       
              <View style={styles.modalView} >

                  
                        


             
                <TouchableOpacity
                onPress={()=>{setModalVisible(!modalVisible),mySound.stop(),valor=0}}
                style={{width:'17%',height:38,left:'90%',bottom:'10%'}}
                >
                  <Image  style={{width:'100%',height:'100%'}} source={require('../assets/fondos/sala/cerrar.png')}  resizeMode='contain'  />
                </TouchableOpacity>


                <Image style={{width:'100%',height:40,bottom:'8%'}} resizeMode='contain' source={require('../assets/fondos/sala/texto.png')} />

        


   
                                  
                                                 <TextInput
                     
                     placeholder="Código de mesa"
                    autoCapitalize = {'characters'}
                    value={codigo}     
                    maxLength={6}     
                 

                    onChangeText={codigo => setCodigo(codigo)}
                    style={styles.textInput}
                    />

                                    
                  


                    <View
                    style={{width:'100%',height:'43%',alignItems:'center',justifyContent:'center'}}
                    >

                    <TouchableOpacity
                          activeOpacity={1}
                          disabled={estadoboton}
                            onPress={() => Ingreso() }

                            style={{width:'65%',height:'60%'}}
                          >

                  <Image  style={{width:'100%',height:'100%'}} source={require('../assets/fondos/sala/entrar.png')}  resizeMode='contain'  />

                          </TouchableOpacity>
                    </View>

                  

                          
                                      
                    
                  


             


                     
                 
                      </View>
                      </View>
                      </TouchableWithoutFeedback>
                      </KeyboardAvoidingView>   
                    </Modal>

                    </View>
                                          
           


           <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTorneo}
        onRequestClose={() => {
          setModalVisibleTorneo(!modalVisibleTorneo)
          mySound.stop();
          valor=0;
        }}
      >



            

                <View style={styles.modalTablero}>
                  
                    <Salas
                    
                    socket={socket}
                    modalVisible3={modalVisible3}
                    setModalVisible3={setModalVisible3}
                    modalVisibleTorneo={modalVisibleTorneo}
                    setModalVisibleTorneo={setModalVisibleTorneo}
                    navigation={navigation}
                    modalVisiblePremio={modalVisiblePremio}
                    setModalVisiblePremio={setModalVisiblePremio}
                    mySound={mySound}
                    setCambio={setCambio}
                    

                    />

                
            
                </View>


         
              

           
          
      </Modal>
      





                            <Modal
                              animationType="slide"
                              transparent={true}
                              visible={modalVisibleSala}
                              onRequestClose={() => {
                                setModalVisibleSala(!modalVisibleSala)
                                mySound.stop();
                                valor=0;
                              }}
                            >



                                  

                                      <View style={styles.modalTablero}>
                                        
                                          <ConfiguracionSala
                                          
                                          socket={socket}
                                          modalVisibleSala={modalVisibleSala}
                                          setModalVisibleSala={setModalVisibleSala}
                                          modalVisible3={modalVisible3}
                                          setModalVisible3={setModalVisible3}
                                          mySound={mySound}
                                          setCambio={setCambio}
                                          />

                                                
                                      </View>


                              
                                    

                                
                                
                            </Modal>









     



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
  modalView: {
    
    margin: 10,
    backgroundColor: "#624E75",
  
    borderRadius: 15,
    padding: 35,
    width:'90%',
    height:250,
 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 18
  },

  openButton: {
   
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width:'50%',
    height:'20%',
    top:10,
    left:0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTablero: {
    flex: 1,
       backgroundColor: "white",

   /*  justifyContent: "center",
    alignItems: "center", */
/*         backgroundColor:'purple'
*/          
    
      
  },
  container: {
    flex: 1
  },
  inner: {

    flex: 1,
    justifyContent:'center',
    alignItems:'center'

  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    backgroundColor:'white',
    borderRadius:5
  },
  
});



export default CrearServidor;
