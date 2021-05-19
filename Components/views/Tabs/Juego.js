                                    import React, {useState,useEffect,useRef} from 'react'
                                    import { StyleSheet, Text, View, Image, TouchableOpacity,Modal,TouchableWithoutFeedback,ImageBackground,AppState,Dimensions} from 'react-native';                                
                                    import Ganador from './Ganador';                                  
                                    import { AnimatedEmoji } from 'react-native-animated-emoji';
                                    import * as Animatable from 'react-native-animatable';
                                    import Snackbar from 'react-native-snackbar';
                                    import Sound from 'react-native-sound';
                                    import AyudaFiguras from './Screen/AyudaFiguras';
                                    import AsyncStorage from '@react-native-community/async-storage';
                                    import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                    import Perdedor from './Perdedor';
                                    import NetInfo from '@react-native-community/netinfo';
                                    import Marcado from './Marcado';
                                    import FastImage from 'react-native-fast-image'
                                    import LottieView from 'lottie-react-native';
                                    import Emojis from './Emojis';
                                    import Stickers from './Stickers';

                                    const flippingAnimation = {
                                      0:{
                                        rotateY: '360deg'
                                      },
                                      1:{
                                        rotateY: '0deg'
                                      }
                                    }
                                
                                    var cartas_juego;
                                    var mySound; 
                                    var giro;
                                    var marcado;
                                    var marcado_no;
                                    var advertencia;
                                    var activa_emoji;
                                    var tarjeta_aux;
                                    var isMounted=false;
                                    var isMounted2=false;
                                    var isMounted3=false;
                                    var isMounted4=false;
                                    var isMounted5=false;
                                    var isMounte6=false;
                                    var detiene=0;
                                    var tiempo;
                                    var stickerpasadas=0;
                                    const WINDOW_HEIGHT = Dimensions.get('window').height;
                                    var emojiIndex=0;


                                    const Juego = ({fotos,setFotos,resultado,setResultado,modalVisiblejuego,setModalVisibleJuego,socket}) => {

                                        const [modalVisible, setModalVisible] = useState(false);
                                        const [modalVisible3, setModalVisible3] = useState(false);
                                        const [modalVisiblePerdedor, setModalVisiblePerdedor] = useState(false);

                                        const [front,setFront]=useState(true);
                                        const [anim,setAnim]=useState('')
                                        const [fototemp,setFototemp]=useState('');

                                        let [contador,setContador]=useState(0);
                                        let [idd,setIdd]=useState('');
                                        let [cuenta,setCuenta]=useState(6);
                                       
                                        const [estado,setEstado]=useState(false);
                                        
                                        const [esto,setEsto]=useState('');
                                        const [emoji,setEmoji]=useState([1]);
/*                                          const [imageFotos,setImageFotos]=useState(fotos)
 */ 
                                        const  [botonsalir,setBotonSalir]=useState(require('./assets/fondos/cambio/salir.png'))
                                        const  [botonayuda,setBotonayuda]=useState(require('./assets/fondos/cambio/ayuda.png'))
                                        const  [botonloteria,setBotonLoteria]=useState(require('./assets/juego/loteria.png'))
                                        const [open,setOpen]=useState(false);
                                        const [openSticker,setOpenSticker]=useState(false);

                                        const [ayuda,setAyuda]=useState(false);
                                        const [usuario,setUsuario]=useState('')
                                        const [fot,setFot]=useState('')
                                        const [ganador,setGanador]=useState(false)
                                        const [color,setColor]=useState('')
                                        const [estrellas,setEstrellas]=useState(0);
                                        const [valorMarcado,setValorMarcado]=useState(0);
                                        const [activo,setActivo]=useState(false);
                                        const [colorEmoji,setColorEmoji]=useState('😁');
                                        const [bloquear,setBloquear]=useState(false);
                                       const [color_marcado,setColorMarcado]=useState(require('./assets/fondos/torneo/maiza.png'));
                                       const appState = useRef(AppState.currentState);
                                       const [estadoSticker,setEstadoSticker]=useState(false);
                                       const [appStateVisible, setAppStateVisible] = useState(appState.current);
                                      const [stickerTemporal,setStickerTemporal]=useState('');
                                      const [emojiArray,setEmojiArray]=useState([]);
                                      const [valor,setValor]=useState(0);

                                      const [arraySticker,setArraySticker]=useState([]);

                                       const _emojis={};

                                       const Listado_Sticker=([
                                      
                                        {posicion:require('./assets/sticker/fuego.json')},
                                        {posicion:require('./assets/sticker/gato_galleta.json')},                              
                                        {posicion:require('./assets/sticker/hamster.json')},      
                                        {posicion:require('./assets/sticker/hamster2.json')},                                                                     
                                        {posicion:require('./assets/sticker/mono.json')},
                                        {posicion:require('./assets/sticker/mono2.json')},   
                                        {posicion:require('./assets/sticker/mono3.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker1.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker2.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker3.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker4.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker5.json')},                                                                    
                                        {posicion:require('./assets/sticker/sticker6.json')},    
                                        {posicion:require('./assets/sticker/sticker7.json')},                                                                    
                                        {posicion:require('./assets/sticker/yoda.json')},
                                        {posicion:require('./assets/sticker/yoda2.json')},                              
                                        {posicion:require('./assets/sticker/tiburon.json')},
                                        {posicion:require('./assets/sticker/tiburon2.json')},                                   
                                 

                                      ]);

                                        const reproduce=async()=>{

                                          
                                     
                                
                  
                                          


                                            detiene=0;
                                           cartas_juego=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
                                            39,40,41,42,43,44,45,46,47,48,49,50,51,52,53
                                            ]

                                          activa_emoji=0;
                                          const valor=await AsyncStorage.getItem('valorimagen')
                                          setValorMarcado(valor);
                                            
                                         const color_maiz=await AsyncStorage.getItem('color_maiz')


                                          if(color_maiz==="amarillo"){
                                            setColorMarcado(require('./assets/fondos/torneo/maiza.png'))
                                          }

                                          if(color_maiz==="blanco"){
                                            setColorMarcado(require('./assets/fondos/torneo/maizb.png'))

                                          } 

                                          if(color_maiz==="morado"){
                                            setColorMarcado(require('./assets/fondos/torneo/maizm.png'))

                                          }

                                          if(color_maiz==="rojo"){
                                            setColorMarcado(require('./assets/fondos/torneo/maizr.png'))

                                          }
                          
                                          mySound = new Sound('juego.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                            if(error){
                                            console.log('Error loading sound: ' + error);
                                            return;
                                            }else{
                                            mySound.play()
                                            mySound.setVolume(1);
                                           
                                            mySound.setNumberOfLoops(-1)
                                            }
                                            });



                                            
                                          giro = new Sound('giro.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                            if(error){
                                            console.log('Error loading sound: ' + error);
                                            return;
                                            }else{
                                        
                                            giro.setVolume(0.9);
                                            }
                                            });


                                            marcado = new Sound('marcar.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                              if(error){
                                              console.log('Error loading sound: ' + error);
                                              return;
                                              }else{
                                          
                                              marcado.setVolume(1);
                                              }
                                              });

                                              marcado_no = new Sound('marcar_no.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                                if(error){
                                                console.log('Error loading sound: ' + error);
                                                return;
                                                }else{
                                            
                                                marcado_no.setVolume(1);
                                                }
                                                });


                                                                          
                                                advertencia = new Sound('advertencia.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                                if(error){
                                                console.log('Error loading sound: ' + error);
                                                return;
                                                }else{
                                            
                                                advertencia.setVolume(1);
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
    
                                          if(detiene===0){
                                            mySound = new Sound('juego.mp3',Sound.MAIN_BUNDLE,(error)=>{
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
                                             marcado.stop();
                                             marcado.release();
                                             marcado_no.stop();
                                             marcado_no.release();
                                             giro.stop();      
                                             giro.release();
                                             advertencia.stop();
                                             advertencia.release();
                                             setModalVisibleJuego(false);

    
                           
                                                                                                                          
                          
                                          }
                                      
                                        });
                          
                          
                                      
                          
                          
                                      }, [])

                                        const presionarBoton=()=>{
                                          setBotonSalir(require('./assets/fondos/cambio/asalir.png'))
                                          
                                          }
                                          
                                          
                                          const soltarBtn=async()=>{
                                          
                                            detiene=1;
                                          await  socket.emit('Salir');
                                          await  socket.off("abandonar_juego");
                                          await  socket.off("movecard");
                                             mySound.stop();
                                             mySound.release();
                                             marcado.stop();
                                             marcado.release();
                                             marcado_no.stop();
                                             marcado_no.release();
                                             giro.stop();
                                             giro.release();
                                             advertencia.stop();
                                             advertencia.release();
                                           await  setBotonSalir(require('./assets/fondos/cambio/salir.png'))

                                           await setModalVisibleJuego(!modalVisiblejuego);
                                          
                                          
                                          }

                                    
                                      
                                          const presionarBotonayuda=()=>{
                                            setBotonayuda(require('./assets/fondos/cambio/aayuda.png'))
                                            
                                            }
                                            
                                            
                                            const soltarBtnayuda=()=>{
                                            
                                            
                                               setAyuda(!ayuda)
                                                setBotonayuda(require('./assets/fondos/cambio/ayuda.png'))
                                            
                                            }
                                      
                                            const presionarBotonLoteria=()=>{
                                              setBotonLoteria(require('./assets/juego/aloteria.png'))
                                              
                                              }
                                              
                                              
                                              const soltarBtnLoteria=()=>{
                                              
                                              
                                                   Loteria();
                                                  setBotonLoteria(require('./assets/juego/loteria.png'))
                                              
                                              
                                              }
                                        

                                          const abrir=()=>{


                                            if(activo){
                                              advertencia.stop();
                                              advertencia.play();
                                              Snackbar.show({
                                                text: 'No puedes enviar emojis.',
          
                                                duration: Snackbar.LENGTH_SHORT,
                                              });
                                              return;
                                            }

                                            setOpen(!open);
                                          

                                                  }




                                          

                                        const aleatorio=(data)=>{

                                            
                                     
                                        let  longitud=fotos.length-1;
                                        let  longitud2=cartas_juego.length-1;

                                         

                                        if(longitud==0){
                                          return;
                                        }

                                        let tarjeta=data;
                                        tarjeta_aux=data;
                                        let ide=null;
                                        setIdd('');
                                          setFront(true);
                                          giro.stop()
                                          giro.setCurrentTime(0.99);

                                          const al=setInterval(() => {
                                           
                                            giro.play()
                                          

                                            setContador(contador=contador+ 1);
                                            let target=cartas_juego[Math.floor(Math.random() * longitud2)];
                                              setFototemp(fotos[target].dat);
                                              setFront(true);
                                            
                                            setAnim('');
                                            setAnim(flippingAnimation);
                                            setFront(false);
                                            
                                          
                                              

                                      
                                            if(contador===4){
                                            
                                              setFront(false);
                                               
                                                setContador(contador=0);
                                                   ide=fotos[tarjeta].id;
                                                  setIdd(ide);

                                                setFototemp(fotos[tarjeta].dat);
                                                
                                                
                                         
                                                handleRemoveItem(tarjeta);


                                    
                                                  tarjeta=null;
                                                   
                                                clearInterval(al);
                               
                                              }
                                          
                                          }, 600);  
                                        }
                                      


                                          const handleRemoveItem = (tarjeta) => {

  
                                           let otrodelete=cartas_juego.indexOf(tarjeta)

                                    
                                             cartas_juego.splice(otrodelete,1);

                                

                                          };

 


                                        const marcar=async(id)=>{

                                       await  Marcado(marcado_no,marcado,resultado,setResultado,id,idd,valorMarcado);
                                     
                                          let estados=0;
                                       for (var i in resultado){
                                                            
                                        for(var j in resultado[i]){
                                         
                                         
                                          if(resultado[i][j].estado){
                                            estados=estados+1;

                                         
                                            }
                                        }
                                      

                                      }
                                  
/* 
                                      if(valorMarcado==1 && estados==3 || valorMarcado==2 && estados==3 ){

                                        if(activa_emoji==0){
                                        setActivo(false);
                                        setColorEmoji('😁');    
                                      } 
                                      activa_emoji=activa_emoji+1;


                                      }

                                      if(valorMarcado==3  && estados==4 || valorMarcado==4 && estados==4 ){

                                     if(activa_emoji==0){
                                        setActivo(false);
                                        setColorEmoji('😁');    
                                      } 
                                      activa_emoji=activa_emoji+1;                                        }

                                      if(valorMarcado==5 && estados==5 || valorMarcado==6 && estados==5 || valorMarcado==7 && estados==5 ){
                                        if(activa_emoji==0){
                                          setActivo(false);
                                          setColorEmoji('😁');    
                                        } 
                                        activa_emoji=activa_emoji+1;
                                                                              }

                                      if(valorMarcado==8 && estados==8){
                                        if(activa_emoji==0){
                                          setActivo(false);
                                          setColorEmoji('😁');    
                                        } 
                                        activa_emoji=activa_emoji+1;
                                      } */

                              




                                        }







                                        useEffect(() => {
                                                        
                                          try {
                                            isMounted=true;
                                  
                                            socket.on('movecard',({target,estado}) => {
                                          


                                              if(isMounted){
                                            if(!estado){

                                              setCuenta(target)
                                          

                                            }
                                              

                                                if(estado){

                                                            
                                                  setCuenta(4);
                                                  aleatorio(target);
                                                  
                                                    
                                                  
                                                }
                                              }
                                              
                                            });

                                          


                                          } catch (error) {
                                            console.log(error);
                                          }
                                    
                                          return () => { isMounted= false };


                                        }, []); 






                                        const cerrarmod=()=>{

                                 

                                        
                                           setFotos((imagenes)=>{
                                            return imagenes.filter(img=>img.id!=idd);          
                                            })

                                                                                                                  
                                        
                                        }


                                        const Loteria=async()=>{

                                          let estados=0;
                                          let gana=false;
                                          var dato=[];

                                          for (var i in resultado){
                                                            
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].estado){
                                                estados=estados+1;
                                             
                                                }
                                            }
                                          

                                          }


                                          if(valorMarcado==1 && estados==4 || valorMarcado==2 && estados==4 ){
                                            gana=true
                                            setBloquear(true);
                                          }
    
                                          if(valorMarcado==3 && estados==5  || valorMarcado==4 && estados==5 ){
                                            gana=true
                                            setBloquear(true);
                                          }
    
                                          if(valorMarcado==5 && estados==6 || valorMarcado==6 && estados==6 || valorMarcado==7 && estados==6 ){
                                            gana=true
                                            setBloquear(true);
                                          }
    
                                          if(valorMarcado==8 && estados==9){
                                            gana=true;
                                            setBloquear(true);
                                          }

                                          
                                          if(gana){
                                          
                                            const foto=await AsyncStorage.getItem("foto")

                                            const data={foto:foto,valor:valorMarcado,dato:resultado};

                                            socket.emit('Ganador',data)                                     

                                          }else{
                                            advertencia.stop();
                                            advertencia.play();
                                    Snackbar.show({
                                      text: 'Faltan cartas sin marcar.',

                                      duration: Snackbar.LENGTH_LONG,
                                    });
                                          }



                                        }





                                        const   onAnimationCompleted = (index) => {
                                            let newEmojis =Object.assign(emojiArray, []);
                                           newEmojis.shift();                          
                                           setEmojiArray(newEmojis);

                                        };



                                        const getRandomInt=(min, max)=> {
                                          return Math.floor(Math.random() * (max - min + 1)) + min;
                                        } 
                                    






                                                          const showFloatingReaction = (valor) => {
                                                            const emoji=valor;
                                                            setOpen(!open);
                                                            socket.emit('Emoji',emoji)
                                                            
                                                            setColorEmoji('🥶');
                                                            setActivo(true);
                                                            setTimeout(() => {
                
                                                              setColorEmoji('😁');
                                                              setActivo(false);
                                                              
                                                            },30000);


                                                             Snackbar.show({
                                                              text: 'Emoji enviado.',

                                                              duration: Snackbar.LENGTH_SHORT,
                                                            });
                                                            };




                                                            const EnviaSticker=(valor)=>{


                                                              const sticker=valor;
                                                              setOpenSticker(!openSticker)
                                                              socket.emit('Sticker',sticker)

                                                            }



                                                            useEffect(() => {

                                                              isMounted6=true;
                
                                                              socket.on('recibosticker',({nombre,sticker}) => {
                                                          
                                                                  if(isMounted6){
                                                                  if(nombre.length>0){
                                                                            
                                                                   

                                                                    TiempoSticker(sticker,nombre)
                                                             
                                                                        
                                                                        
                                                                       
                                                                    
                                                                   
                                                             
                                                                  }
                                                                    
                                                                
                                            
                
                                                               
                
                                                                }
                                                                
                                                              });
                
                                                              return () => { isMounted6= false };
                
                                                            }, [])


                                                            const TiempoSticker=async(sticker,nombre)=>{



                                                              let valor=await parseInt(sticker)




                                                 

                                                        

                                                                if(!arraySticker.length){
                                                                  await setStickerTemporal(Listado_Sticker[valor].posicion)
                                                                  await setEstadoSticker(true)
                                                                  Snackbar.show({
                                                                    text:`${nombre} envió un Sticker`,
                                                                  
                                                                  duration: Snackbar.LENGTH_LONG
                                                                  });
                                                                  stickerpasadas=1;
                                                                }
                                                               
                                                                arraySticker.push({valor:valor,nombre:nombre})
                                                                console.log('array Sticker: '+JSON.stringify(arraySticker))
                                                                
                                                                if(stickerpasadas==1){
                                                                  stickerpasadas=2;
                                                             
                                                                setTimeout(async() => {
          
                                                                  arraySticker.shift();
                                                                  setEstadoSticker(false);
                                                                
                                                                    
                                                                  },10000);

                                                                  const al=setInterval(async() => {

                                                                    if(!arraySticker.length){
                                                                      clearInterval(al);
                                                                      setEstadoSticker(false);
                                                                      stickerpasadas=0;
  
                                                                    }else
                                                                    if(arraySticker.length  ){
       
                                                                      let temp=arraySticker.shift();
                                                                      console.log('valor de temp: '+JSON.stringify(temp))
                                                                      await setStickerTemporal(Listado_Sticker[temp.valor].posicion)
                                                                      await setEstadoSticker(true)
                                                                      Snackbar.show({
                                                                        text:`${temp.nombre} envió un Sticker`,
                                                                      
                                                                      duration: Snackbar.LENGTH_LONG
                                                                      });
                                                                      setTimeout(async() => {
                
                                                                        setEstadoSticker(false);
                 
                                                                          
                                                                        },10000);
      
                                                                    }
                                                              
  
  
                                                                  },11000)
                                                                }

                                                            }
                


                                                        
                   
                                        useEffect(() => {
                                          
                                          isMounted2=true;
                                          
                                          socket.on('loteria',({nombre,foto,ganador,color,cantidad_estrellas})=>{
                                            if(isMounted2){

                                              setBloquear(true);

                                            setUsuario(nombre);
                                            setFot(foto);
                                            setGanador(ganador);
                                            setColor(color);
                                            setEstrellas(cantidad_estrellas);

                                            if(ganador){
                                              socket.off("abandonar_juego");
                                              socket.off("movecard");
                                              detiene=1;
                                              mySound.stop();
                                              mySound.release();
                                              marcado.stop();
                                              marcado.release();
                                              marcado_no.stop();
                                              marcado_no.release();
                                              giro.stop();
                                              giro.release();
                                              setModalVisible3(!modalVisible3)

                                            }else{
                                              socket.off("abandonar_juego");
                                              socket.off("movecard");
                                              detiene=1;
                                              mySound.stop();
                                              mySound.release();
                                              marcado.stop();
                                              marcado.release();
                                              marcado_no.stop();
                                              marcado_no.release();
                                              giro.stop();
                                              giro.release();
                                              setModalVisiblePerdedor(!modalVisiblePerdedor);
                                            }
                                      
                                          }

                                          })
                                          return () => { isMounted2= false };


                                        }, [])

                                            useEffect(() => {

                                              isMounted3=true;

                                              socket.on('emoji',({nombre,emojii}) => {
                                          
                                                  if(isMounted3){
                                                  if(nombre.length>0){
                                                    generateEmoji(emojii)
                                                   
                                             
                                                  }
                                                    
                                                
                            

                                                  Snackbar.show({
                                                    text:`${nombre} envió un emoji`,
                                                  
                                                  duration: Snackbar.LENGTH_SHORT,
                                                  });

                                                }
                                                
                                              });

                                              return () => { isMounted3= false };

                                            }, [])



                                            const generateEmoji =async(emojix) => {
                  

                                              const newEmojis =  Object.assign(emojiArray, []);
                                          
                                                  let index =  emojix
                                                  const emoji = {
                                                  key: emojiIndex,
                                                  name: emojix,
                                                  size: Math.floor(Math.random() * Math.floor(20)) + 20,
                                                  duration: 6000,
                                                  yPosition: 50 + Math.random() * (WINDOW_HEIGHT - 60)
                                                  };
                                                   newEmojis.push(emoji);
                                                  emojiIndex += 1;
                                                 
                                                  setValor(emojiIndex);
                                                   setEmojiArray(newEmojis)
                                                   
                  
                                               
                                                
                                              };



                                            useEffect(() => {
                                              isMounted5=true;
                                              try {
                                            
                                                
                                                socket.on('abandonar_juego', payload => {
                                                
                          
                                                  if(isMounted5){
                                                    advertencia.stop();
                                                    advertencia.play();
                                                    Snackbar.show({
                                                      text:`${payload}`,
                                                    
                                                      duration: Snackbar.LENGTH_LONG,
                                                    });
                                                  }
                                                  
                                                });
                          
                                                
                          
                          
                                              } catch (error) {
                                                console.log(error);
                                              }
                                         
                          
                                              return () => { isMounted5= false };

                          
                                            }, []); 




                                            useEffect(() => {
                                             
                                              isMounted4=true;

                                              socket.on('sinjugador',()=>{
                                                if(isMounted4){
                                                
                                                  detiene=1;
                                                  mySound.stop();
                                                  mySound.release();
                                                  marcado.stop();
                                                  marcado.release();
                                                  marcado_no.stop();
                                                  marcado_no.release();
                                                  giro.stop();
                                                  giro.release();
                                                  setBloquear(true);
                                                  advertencia.stop();
                                                  advertencia.play();
                                                Snackbar.show({
                                                  text:'Lo sentimos juego detenido.Eres el único jugador.',
                                                
                                                duration: Snackbar.LENGTH_LONG,
                                                });

                                              }
                                              })

                                          return () => { 
                                            socket.off("abandonar_juego");
                                            socket.off("movecard");
                                            isMounted4= false };

                                            
                                            }, [])



                                            
                                            useEffect(() => {
                                             
                                         

                                              socket.on('perdieron',()=>{
                                                
                                                detiene=1;
                                                mySound.stop();
                                                mySound.release();
                                                marcado.stop();
                                                marcado.release();
                                                marcado_no.stop();
                                                marcado_no.release();
                                                giro.stop();
                                                giro.release();
                                                setBloquear(true);
                                                advertencia.stop();
                                                advertencia.play();
                                                Snackbar.show({
                                                  text:'Juego finalizado. Mesa sin cartas',
                                                
                                                duration: Snackbar.LENGTH_LONG,
                                                });

                                              
                                              })

                                        
                                              return ()=>{
                                                socket.off("abandonar_juego");
                                                socket.off("movecard");
                                              }
                                            
                                            }, [])




                return (
                    
                    <View style={{alignItems:"center",justifyContent:"center"}}>

                





                        <View style={styles.centeredView}>


                      <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiblejuego}                  
                    onRequestClose={() => {
                      Snackbar.show({
                        text:'Presione el boton para salir de mesa.',
                      
                        duration: Snackbar.LENGTH_SHORT,
                      });
                    }}
                  >

                      
                                            
                      <ImageBackground  source={require('./assets/juego/fondo.png')}  style={{flex:1,alignContent:"center",alignItems:"center",backgroundColor:'white'}}  >
                    
                   
                          

                          {valor>0&&

                            emojiArray.map((emoji) => {
                                return (
                                    <AnimatedEmoji
                                    key={emoji.key}
                                    index={emoji.key}
                                    ref={ref => _emojis[emoji.key] = ref}
                                    style={{ bottom: emoji.yPosition,zIndex:1 }}
                                    name={emoji.name}
                                    size={emoji.size}
                                    duration={emoji.duration}
                                    onAnimationCompleted={onAnimationCompleted}
                                    />
                                )
                                })


                         
                
                            }


{/* emoji.map(x => (
                            <AnimatedEmoji
                              index={x} 
                              key={x}
                              style={{ top: getRandomInt(200, 500),zIndex:1 }} 
                              name={esto} 
                              size={RFValue(30)} 
                              duration={4000} 
                              onAnimationCompleted={onAnimationCompleted} 
                             
                            />
                          ))  */}
                      
                        <Image source={require('./assets/juego/volcan.png')} resizeMode="contain" style={{bottom:'-33%',width:'100%',height:'100%'}} />

                        <Image source={require('./assets/juego/luz.png')} style={{bottom:'105%',width:'100%',height:'100%'}}   /> 




                        <Image source={require('./assets/juego/cerro.png')} resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}} />

                        <Image source={require('./assets/juego/estrellas.png')} resizeMode="contain" style={{bottom:'299%',width:'100%',height:'30%'}}   />
                        
                          <Image  source={require('./assets/juego/cinta.png')} resizeMode="contain" style={{bottom:'310%',width:'100%',height:'16%'}}  />
                        
             
                                   <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBotonayuda()}
                                    onPress={()=>soltarBtnayuda()} 
                                   
                                    
                                                    >

                                                      <View
                                                      style={{left:'40%',width:'15%',height:'7%',bottom:'345%',zIndex:1}}
                                                      >
                                                      <Image  source={botonayuda} resizeMode="contain" style={{width:'100%',height:'100%',zIndex:1}} />

                                                      </View>


                                    
                                    </TouchableWithoutFeedback>


                                    <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBoton()}
                                    onPress={()=>soltarBtn()} 
                                   
                                
                                                    >

                                                      <View
                                                     style={{right:'40%',width:'15%',height:'7%',bottom:'352%',zIndex:1}}

                                                      >
                                                      <Image source={botonsalir} resizeMode="contain" style={{width:'100%',height:'100%',zIndex:1}} />

                                                      </View>

                                    
                                    </TouchableWithoutFeedback>


              <Animatable.View animation={anim}  style={{bottom:'359%',width:'100%',height:'30%'}} >

                                        {
                                          front?
                                          <Image source={require('./assets/juego/tarjeta.png')} resizeMode="contain" style={{width:'100%',height:'100%'}} />
                                          :
                                        
                                          <ImageBackground source={{uri: fototemp}} resizeMode="contain" style={{width:'100%',height:'100%',alignContent:"center"}} >
                                            
                                                  { cuenta==1&&
                                                    
                                                          
                                                  <Animatable.Image animation="zoomIn"   source={require('./assets/juego/listo.png')} resizeMode="contain" style={{width:'100%',height:'100%'}}  />
                                      

                                                  }

                                                  {
                                                    cuenta==0&&
                                                    <Animatable.Image animation="zoomIn"   source={require('./assets/juego/tombola.png')} resizeMode="contain" style={{width:'100%',height:'100%'}}  />

                                                  }

                                           
                                            </ImageBackground>

                                            

                                                             
                                        }

                                        {
                                        
                                        estadoSticker&&
                                         <View style={{bottom:'102%',width:'100%',height:'105%',alignContent:'center',justifyContent:'center',alignItems:'center'}}>

                                                                    
                                                                        
                                         <LottieView style={{width:'100%',height:'100%',opacity:0.95}} source={stickerTemporal} autoPlay loop  />
                                         </View>   
 
                                        
                                        }
                                           
                                              
                 </Animatable.View>
             
              
                







                    

                                      <ImageBackground   style={{backgroundColor:'#321C53',bottom:'355%',width:'68%',height:'50%',alignContent:"center",alignItems:"center"}}  >

                                      {
                                                          resultado.map((row,rowIndex)=> {
                                                            return (
                                                              <View 
                                                              
                                                              key={rowIndex}
                                                              style={{flex: 1,
                                                                flexDirection: 'row',}} >
                                                                {row.map((col, colIndex) => {
                                                                  return(
                                                                    <View
                                                                    
                                                                    key={col.clave}
                                                                    style={{width: '33.3%',
                                                                    justifyContent: 'center',
                                                                    padding: 5,
                                                                    borderEndWidth:2,
                                                                    
                                                                   
                                                                    }} >

                                                                  
                                                                    <TouchableOpacity   onPress={() =>marcar(col.id)}
                                                             
                                                                    >

                                                              <Image  
                                                             
                                                             
                                                             source={{
                                                               uri: col.dat,

                                                            
                                                            }} style={{width:'100%',height:'100%'}}

                                                            resizeMode='contain'

                                                             
                                                             
                                                             />
                                                                 {col.estado===true&&
                                                                  <Animatable.View animation="bounceIn" style={{position: 'absolute',width:'100%',height:'100%',bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                                                  <Image style={styles.tamanio2}   resizeMode='contain' source={color_marcado} />
                                                                  </Animatable.View>
                                                                  }
    
                                                                  
                                                                    </TouchableOpacity>
                                                                    </View>
                                                                  )
                                                                })}
                                                              </View>
                                                          );
                                                              
                                                          })
                                                        
                                                        }

                                                                                                                      
                                                              </ImageBackground> 


    
                                         <View style={{bottom:'352%',width:'100%',height:'7%'}}>

                    <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>

                    <TouchableOpacity
                    disabled={bloquear}
                    onPress={()=>setOpenSticker(!openSticker)}
                   
                    ><Text style={{fontSize:RFValue(35)}}>🐶</Text></TouchableOpacity>
                                                          <TouchableWithoutFeedback  
                                    disabled={bloquear}
                                     onPressIn={()=>presionarBotonLoteria()}
                                     onPress={()=>soltarBtnLoteria()} 
                                   >

                                     <View
                                     style={{width:'42%',height:'100%',zIndex:1}}
                                     >
                                     <Image  source={botonloteria} resizeMode="contain" style={{width:'100%',height:'100%',zIndex:1}} />

                                     </View>

                  
                   
                   </TouchableWithoutFeedback> 


                   <TouchableOpacity
                    disabled={bloquear}
                    onPress={()=>abrir()}
                   
                    ><Text style={{fontSize:RFValue(35)}}>{colorEmoji}</Text></TouchableOpacity>




                                            {open&& 

                                            <Emojis showFloatingReaction={showFloatingReaction}  />


                                              }

                                            {openSticker&&

                                            <Stickers EnviaSticker={EnviaSticker}/>


                                              }

                                            </View>

                                                            </View>
                            










                                         



                 


          </ImageBackground>

      </Modal>
      </View>






                                            <Modal
                                          animationType="slide"
                                          transparent={true}
                                          visible={modalVisible3}
                                          onRequestClose={() => {
                                            setModalVisible3(!modalVisible3);
                                            setModalVisibleJuego(!modalVisiblejuego);
                                          }}
                                        >

                                          
                                                
                                                  <Ganador
                                                  usuario={usuario}
                                                  foto={fot}
                                                  ganador={ganador}
                                                  estrellas={estrellas}
                                                  color={color}
                                                  setModalVisible3={setModalVisible3}
                                                  setModalVisibleJuego={setModalVisibleJuego}
                                              
                                                  />   
                                            
                                        </Modal>


                                        
                                        <Modal
                                          animationType="slide"
                                          transparent={true}
                                          visible={modalVisiblePerdedor}
                                          onRequestClose={() => {
                                            setModalVisiblePerdedor(!modalVisiblePerdedor)
                                            setModalVisibleJuego(!modalVisiblejuego);
                                          }}
                                        >

                                          
                                                <Perdedor
                                                
                                                usuario={usuario}
                                                foto={fot}
                                                setModalVisiblePerdedor={setModalVisiblePerdedor}
                                                  setModalVisibleJuego={setModalVisibleJuego}

                                                />
                                                 
                                            
                                        </Modal>
                                        
          



                                                    <Modal
                                              animationType="slide"
                                              transparent={true}
                                              visible={ayuda}
                                              onRequestClose={() => {
                                                setAyuda(!ayuda)
                                              }}
                                            >


                                                    <AyudaFiguras
                                                     setAyuda={setAyuda}
                                                     ayuda={ayuda}
                                                     socket={socket}
                                                 

                                                    />

                                               

                                                  
                                             

                                                                                     
                                            </Modal>


        </View>
        
    )
}

const styles = StyleSheet.create({
 

  mejores: {
  

    width: '18%',
    height: '13%',
    
    marginVertical: 5,
    alignContent:"center",
 
  marginLeft:'11%',
    bottom:'10%'
 
  },
  tamanio2:{
    width: '60%',
    height: '60%'
  },
  listado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
   
 
  
  },
  listadoItem: {
    flexBasis: '28%',
  
    alignItems: 'center',justifyContent:"center",alignContent:"center"
  },

  tamanioboton:{
    position: 'relative',
    width: 60,
    height: 60,
  },
    tamanio:{
  
      width: 100,
      height: 120,
      marginVertical:5,
      borderRadius:8,
      borderColor: 'red',
      borderWidth: 2
      
    },


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
/*         backgroundColor:'purple'
 */          
        
          
      },
   
     
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
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
  });
export default Juego;



