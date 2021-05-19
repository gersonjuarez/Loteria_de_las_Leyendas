                  import React,{useState,useEffect,useRef} from 'react'
                  import { View,Text,TouchableOpacity,Image,Dimensions,StyleSheet,ImageBackground,TouchableWithoutFeedback,AppState } from 'react-native'
                  import * as Animatable from 'react-native-animatable';
                  import AsyncStorage from '@react-native-community/async-storage';
                  import Carousel from 'react-native-snap-carousel';
                  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                  import NetInfo from '@react-native-community/netinfo';
                  import Snackbar from 'react-native-snackbar';
                  import Sound from 'react-native-sound';
                  import FastImage from 'react-native-fast-image'

                  const flippingAnimation = {
                    0:{
                      rotateY: '0deg'
                    },
                    1:{
                      rotateY: '360deg'
                    }
                  }

                  var aux;
                  var bandera=60;
                  var bandera2=60;
                  var mySound;
                  var detiene=0;
                  var tiempo;
                  var detecta=false;
                  var matriz;
                  var carton;
                  var contador=0;
                  const TarjetaRandom = ({setModalVisible,modalVisible,setModalVisible2,setFotos,setFotos2,fotos2,setResultado,cuadro,socket,modalVisiblejuego,setModalVisibleJuego,setEmpieza,empieza}) => {


                    const isMounted = useRef(false); 
                    const isMounted1 = useRef(false); 
                    const isMounted2 = useRef(false); 
                    const isMounted3 = useRef(false); 
                    const isMounted4 = useRef(false); 
                    const isMounted5 = useRef(false); 


/*                         const [carton,setCarton]=useState([]);
 */                        const [pagina,setPagina]=useState(true);
                            const [pagina2,setPagina2]=useState(false);
                        let [contador,setContador]=useState(0);
                        const [front,setFront]=useState(true);
                        const [anim,setAnim]=useState('')
                  /*       const [target,setTarget]=useState('');
                  */      const[codigo,setCodigo]=useState('');
                        const [botonescoger,setBotonEscoger]=useState(require('../assets/fondos/carton/boton.png'));
                        const [estadoBoton,setEstadoBoton]=useState(false);
                        const [estadoBoton2,setEstadoBoton2]=useState(true);
                        const  [botonsalir,setBotonSalir]=useState(require('../assets/fondos/cambio/salir.png'))
                        const [minutos,setMinutos]=useState();
                        const [segundos,setSegundos]=useState();
                        const [segundosact,setSegundosAct]=useState(null);
                        const [cadena,setCadena]=useState('stack');
                        const [cartonMatriz,setCatonMatriz]=useState([]);
                        const [modalPrueba,setModalPrueba]=useState(false);
                      const [animacionCarta,setAnimacionCarta]=useState('');

                        const appState = useRef(AppState.currentState);
                        const [appStateVisible, setAppStateVisible] = useState(appState.current);

                        const car=[
                          {id:'1','image':require('../assets/juego/tarjeta.png')},
                      {id:'2','image':require('../assets/juego/tarjeta.png')},
                      {id:'3','image':require('../assets/juego/tarjeta.png')},
                      {id:'4','image':require('../assets/juego/tarjeta.png')},
                      {id:'5','image':require('../assets/juego/tarjeta.png')},


                        ]


              






                        const configuraCarton=async()=>{

                          setFotos2([]);
                          setFotos([]);
                          setResultado([]);
                          carton=[];
                          
                        const cartones= await AsyncStorage.getItem("arreglo_cartones")
                          const imagefotos=JSON.parse(cartones);
                                     
/*                          setFotos2(cartones)
 */                   
    
                          let j;
                          const limite = 9;
                          
                          for (let i=0,j=imagefotos.length; i<j; i+=limite){

                            carton.push(imagefotos.slice(i,i+limite));
  
                          }



                        const imagenes= await AsyncStorage.getItem("arreglo_imagenes")
                        
                          const objeto=JSON.parse(imagenes)
                          setFotos(objeto)   
                          
               
                         
                          
  
                         


                        }







                      useEffect(() => {  

                      configuraCarton();
                        

                      
                    },[]);




                    const listToMatrix=(list, elementsPerSubArray)=> {
                      var matrix = [], i, k;
                     
               
                      for (i = 0, k = -1; i < list.length; i++) {
                          if (i % elementsPerSubArray === 0) {
                              k++;
                              matrix[k] = [];
                          }
               
                          matrix[k].push(list[i]);
                      }


              

                      setCatonMatriz(matrix);
                      setResultado(matrix); 

              




                      
                              

                      }

                      const Maqueta=({carton})=>{

                    
                        

                            
                     
                                            
                                        


                    




                      }
                                      
                        

                    const presionarBotonEscoger=()=>{
                    
                      
                      setBotonEscoger(require('../assets/fondos/carton/aboton.png'))
                      
                      }
                      
                      
                      const soltarBtnEscoger=()=>{
                        console.log('si se presionar')
                          setAnimacionCarta('rubberBand');
                          setEstadoBoton(true);
                          socket.emit('Random',codigo)

                      setBotonEscoger(require('../assets/fondos/carton/boton.png'))
                      
                      }

                                                



                      const presionarBoton=()=>{
                        setBotonSalir(require('../assets/fondos/cambio/asalir.png'))
                        
                        }
                        
                        
                        const soltarBtn=()=>{
                        
                          detecta=true;
                          mySound.stop();
                          socket.off("cuenta_random");
                          socket.off("mensaje_random");
                          socket.off("abandonar_random");
                          socket.emit('Salir');
                          setBotonSalir(require('../assets/fondos/cambio/salir.png'))

                          setModalVisible(!modalVisible);
                        
                        
                        }


                  

                        const reproduce=()=>{

                        

                          
                          mySound = new Sound('random.mp3',Sound.MAIN_BUNDLE,(error)=>{
                            if(error){
                            console.log('Error loading sound: ' + error);
                            return;
                            }else{
                            mySound.play()
                            mySound.setVolume(0.8);
                           
                            mySound.setNumberOfLoops(-1)
                            }
                            });
                           

                         
                          
                           
                          

                      }


                      useEffect(() => {
                        detiene=0;
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
                                                        mySound = new Sound('random.mp3',Sound.MAIN_BUNDLE,(error)=>{
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


                      isMounted3.current=true;

                 

                      socket.on('target',data => {
                        if(isMounted3.current){
                          aleatorio(data);
                      
               
                        }
                              });

                            
                              return function cleanup() {
                                socket.off("target");

                                isMounted3.current= false ;    
                              
                              }



                    }, [])



            


                    const aleatorio=(data)=>{

                    
                      setPagina(true);
                      setCadena('default');



                          var target=data;

                      const al=setInterval(() => {

                       
                        

                        
                        setContador(contador=contador+ 1)
                

             


                             if(contador===20){

                              clearInterval(al);
                              setEmpieza(false);
                                
                            
                               setEmpieza(false);
                               setPagina(false);
                              
                               
                                setContador(contador=0);
      
                                 listToMatrix(carton[target], 3);
      
                          
                       
      
                                setFront(true);
                                setAnim('');
                                setAnim(flippingAnimation);
                              setEstadoBoton2(false);
                             
                              detiene=1;
                  
                                 aux= setTimeout(() => {
                                    
      
                                    if(detecta){

                                      return;
                                    }
                                        if(bandera==60 || bandera >3){
                                          mySound.stop();
                                          mySound.release();
                                          socket.off("cuenta_random");
                                          socket.off("mensaje_random");
                                          socket.off("abandonar_random");
                                          
                                          setModalVisible2(true) // espera
                                          setModalVisible(false)//tarjeta random
                                          return;
      
                                        }
      
      
                                       if(bandera<=3){
                                        mySound.stop();
                                        mySound.release();
                                        socket.off("cuenta_random");
                                        socket.off("mensaje_random");
                                        socket.off("abandonar_random");
                                        setModalVisibleJuego(true);
                                        setModalVisible2(false) // espera

                                        setModalVisible(false)//tarjeta random
                                        return;
      
                                      }
      
                                   
      
                                  }, 3000);
      



                              
                             }
                        
 
 
                          }, 150);
                             

                         
                          
                      
                          
                        
                      


             


                    }

                    useEffect(() => {

                        isMounted2.current=true;


                      NetInfo.addEventListener(state => {
                      
                        if(isMounted2.current){

                        if(state.isInternetReachable===false){
        
                            detiene=1;
                            detecta=true;
                            mySound.stop();
                            socket.off("cuenta_random");
                          socket.off("mensaje_random");
                          socket.off("abandonar_random");
                            clearTimeout(aux);

                            setModalVisible(false);
                         
                         


          
                        }
                      }
                    
                      });

                      return function cleanup() {
                        isMounted2.current= false ;    
                      
                      }
        

                    
        
        
                    }, [])

          


                    useEffect(() => {
                      detecta=false
                      setSegundos(60);
                      setSegundosAct(null);
                      socket.emit('sabertiempo');
                      

                    }, []) 


                    useEffect(() => {

                      isMounted.current=true;

                      socket.on('tiempodevuelto',(dato) => {
                        
                        if(isMounted.current){

                      
                        if(dato<4){
                          bandera=2;
                          bandera2=2;
                          setSegundos(2);
                          setSegundosAct(null);
                        }

                      }

                                                
                      });

                      return function cleanup() {
                        socket.off("tiempodevuelto");
                        isMounted.current= false ;    
                      
                      }
                    
                    }, [])



                    useEffect(() => {
                    
                      try {
                    
                        isMounted1.current=true;
                        socket.on('cuenta_random',({minutos,segundo,seg}) => {

                          if(isMounted1.current){
                            bandera=seg;
                          setMinutos(minutos);   
                          if(segundo<10){
                            setSegundos('0'+segundo);
                          }else{
                            setSegundos(segundo);
                          }           
                          
                          if(seg>1)
                          setSegundosAct(1);

                          
                          

                          if( seg==1 ){
                            bandera2=2;
                            setSegundosAct(null);
                            
                          }


  
                        }

                        });
  
                      
  
  
                      } catch (error) {
                        console.log(error);
                      }
                      return function cleanup() {
                        isMounted1.current= false ;    
                      
                      }

  
  
                    }, []);// dentro de los corchetes se puede agregar minutos,segundos para que abarque en las funciones y poder operar 



                    useEffect(() => {
                    
                      isMounted4.current=true;
                      try {
                    
                        
                        socket.on('mensaje_random', payload => {
                       
  

                          if(isMounted4.current){
                            Snackbar.show({
                              text:`${payload} se ha unido a la sala`,
                            
                              duration: Snackbar.LENGTH_SHORT,
                            });
                          
                          }

                        });
  
                        
  
  
                      } catch (error) {
                        console.log(error);
                      }
                 
                      return function cleanup() {
                        isMounted4.current= false ;    
                      
                      }

  
                    }, []); 
  
  
                    useEffect(() => {
                      isMounted5.current=true;
                      try {
                    
                        
                        socket.on('abandonar_random', payload => {
                        
  
                          if(isMounted5){
                            Snackbar.show({
                              text:`${payload}`,
                            
                              duration: Snackbar.LENGTH_SHORT,
                            });
                          }

                        });
  
                        
  
  
                      } catch (error) {
                        console.log(error);
                      }
                 
                      return function cleanup() {
                        isMounted5.current= false ;    
                      
                      }

  
                    }, []); 

                    const cod=async()=>{


                      setCodigo(await AsyncStorage.getItem("CodSala"));

                    }

                    useEffect(() => {
                                        
                     cod();
                    }, [])



                    function renderItem({item}){

                      return(

                       <View style={{width:'100%',height:'100%',
                       justifyContent:"center",alignItems:'center'      
                           }} >
                             
                         <Image  source={item.image} resizeMode="contain" style={styles.sombra} />

                       </View>

                     
 
                      )



                    }


                      return (
                    
                    <ImageBackground     source={require('../assets/fondos/carton/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >

                          <Image source={require('../assets/fondos/carton/volcan.png')} resizeMode="contain"  style={{bottom:'-33%',width:'100%',height:'100%'}} />

                          <Image source={require('../assets/fondos/carton/luz.png')}   style={{bottom:'103%',width:'100%',height:'100%'}} />

                          <Image source={require('../assets/fondos/carton/cerro.png')}  resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}} />

                          <Image source={require('../assets/fondos/carton/nubes.png')}  resizeMode="contain" style={{bottom:'295%',width:'100%',height:'11%'}} />

                          <View  style={{bottom:'297%',width:'100%',height:'40%',
                        justifyContent:"center" ,alignItems:'center'     
                            }} >  
                            
                          {



                            pagina?
                            <TouchableOpacity
                            disabled={estadoBoton}
                            onPress={()=>soltarBtnEscoger()} 
                            style={{width:'50%',height:'100%',alignItems:'center',justifyContent:'center'}}
                            >
                            <Animatable.Image animation={animacionCarta} easing="ease-out" iterationCount="infinite" source={require('../assets/juego/tarjeta.png')} resizeMode="contain" style={styles.sombra} />

                            </TouchableOpacity>

                               :
                               
                               <Animatable.View animation={anim}   style={{backgroundColor:'#321C53',bottom:'-1%',width:'45%',height:'83%',alignContent:"center",alignItems:"center"}}  >

                          
                                                                                                                 
                                          {
                               cartonMatriz.map((row,rowIndex)=> {

  
 

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

                                       
                                         <TouchableOpacity 

                                         >

                                           
                                         <Image 
                                       

                                            
                                       source={{
                                        uri: col.dat,
                                   

                                     
                                     }} style={{width:'100%',height:'100%'}}

                                     resizeMode='contain'

                                         
                                         
                                         />
                                   

                                       
                                         </TouchableOpacity>
                                         </View>
                                       )



                                     })}
                                   </View>
                               );
                                   
                               })
                             
                              }
                             
                                                                                           
                                   </Animatable.View> 




                          }

                               
                              
                               
                           
                               
                               
                                                
                          
                              
                              
                          
                                  
 
              

                                </View>

                           
                               

                              
                                   {/*  <Carousel
                            resizeMode="contain"
                            delay={variable}
                            style={{bottom:'297%',width:'100%',height:'40%',
                            justifyContent:"center"      
                                }}
                            autoplay={true}
                            swipe={false}


                            >

                                              

                            {
                            pagina?

                            car.map(im=>{
                            return(
                            <Image key={im.id} source={im.dat} resizeMode="contain" style={styles.sombra} />        

                            )

                            })



                            :
                            car2.map(im=>{
                              return(

                              <Animatable.Image key={im.id} animation={anim}  source={giro} resizeMode="contain" style={styles.sombra} />        
                        
                              )
  
                              })
  

                            }


                                                                      
                                      
                                        
                            </Carousel> */}





      <Image source={require('../assets/fondos/carton/sombra.png')}  resizeMode="contain" style={{bottom:'300%',width:'100%',height:'38%'}} />


      <Image source={require('../assets/fondos/carton/cadejo.png')}  resizeMode="contain" style={{bottom:'313%',width:'100%',height:'13%'}} />

      <Image source={require('../assets/fondos/carton/titulo.png')}  resizeMode="contain" style={{right:'29%',bottom:'307%',width:'100%',height:'3%'}} />


                                  <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBoton()}
                                    onPress={()=>soltarBtn()} 
                                                           >

                                                             <View
                                                             style={{left:'40%',width:'14.5%',height:'7%',bottom:'403%'}}
                                                             >

                                                             <Image  source={botonsalir} resizeMode="contain" style={{width:'100%',height:'100%'}} />   

                                                             </View>



                                    </TouchableWithoutFeedback>



                                    
                                    { segundosact!=null  && 
                              <View style={{bottom:'405%',backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:8,width:'50%',justifyContent:"center",alignContent:"center",alignItems:"center"}} >

                                      
                                  <Text style={{fontWeight: "bold",fontSize:RFValue(15),textAlign:'center'}}>El Juego Iniciará En:</Text>
                                  <Text style={{textAlign:'center'}}  >{minutos}:{segundos}</Text>
                                                                 
                                </View>
                                    }

                                { bandera2==2&&
                              <View style={{bottom:'405%',backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:25,width:'50%',justifyContent:"center",alignContent:"center",alignItems:"center"}} >

                                      
                                  <Text style={{fontWeight: "bold",fontSize:RFValue(15),textAlign:'center'}}>El Juego Ha Iniciado</Text>
                                  
                                                                 
                                </View>
                                }


                               

                              {!estadoBoton&&
                                 <TouchableWithoutFeedback  
                                 onPressIn={()=>presionarBotonEscoger()}
                                 onPress={()=>soltarBtnEscoger()} 
                                >

                                  <View
                                  style={{right:'35%',bottom:'6%',width:'30%',height:'5%',position:"absolute"}}
                                  >
                                  <Image  source={botonescoger} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                  </View>

                                  </TouchableWithoutFeedback>

                              } 



                             {/*    
                                  <View  style={{bottom:'396.5%',width:'100%',height:'40%', justifyContent:"center" ,alignItems:'center',opacity:0.1,backgroundColor:'transparent',zIndex:1   }}>

                               
                                  </View> */}

                    


 </ImageBackground>



      
    )
}





const styles=StyleSheet.create({

    sombra:{
      width:'100%',height:'83%',
      borderRadius:10,
      bottom:'-1%'
   
    }



  });




export default TarjetaRandom;


