                                        import React,{useState,useEffect,useRef} from 'react';
                                        import {StyleSheet, Text,View,TouchableWithoutFeedback,Animated,Dimensions,Easing,Image,ImageBackground} from 'react-native';
                                        import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                        import LottieView from 'lottie-react-native';
                                        import { Avatar} from 'react-native-paper';
                                        import AsyncStorage from '@react-native-community/async-storage';
                                        import Snackbar from 'react-native-snackbar';
                                        import TypeWriter from 'react-native-typewriter'
                                        import * as Animatable from 'react-native-animatable';



                                        const Ganador =({usuario,foto,ganador,color,estrellas,setModalVisibleJuego,setModalVisible3})=> {

                                          const [circulo,setCirculo]=useState(require('../Tabs/assets/fondos/premios/estrellad.png'));
                                          const  [botonsalir,setBotonSalir]=useState(require('../Tabs/assets/fondos/cambio/salir.png'))

                                          const [mensaje,setMensaje]=useState('');
                                          const frases=[
                                          '¡Suerte tienen, los que no se bañan!',
                  
                                '¡La suerte es una flecha que golpea al que menos la espera!',
                  
                                '¡La buena suerte es la hermana gemela del trabajo duro!',
                  
                                '¡La buena suerte no necesita explicación!',
                  
                                '¡El campeón hace su propia suerte!',
                  
                                '¡El día que decides hacerlo, es tu día de suerte!',
                  
                                '¡Algunas personas reciben su suerte untada con mantequilla!',
                  
                                '¡Suerte es cuando la oportunidad llama a tu puerta y tú respondes!',
                  
                                'No justifiques un golpe de buena suerte. ¡Acéptalo y sonríe!',
                  
                                '¡Una persona afortunada es más rara que un cuervo blanco!'
                  
                                     ]
                  
                  
                  
                                     useEffect(() => {


                                        if(color==="amarillo"){
                                          setCirculo(require('../Tabs/assets/fondos/premios/estrellad.png'))
                                        }

                                        if(color==="morado"){
                                          setCirculo(require('../Tabs/assets/fondos/premios/estrellae.png'))
                                        }

                                        if(color==="blanco"){
                                          setCirculo(require('../Tabs/assets/fondos/premios/estrellaf.png'))
                                        }

                                        if(color==="rojo"){
                                          setCirculo(require('../Tabs/assets/fondos/premios/estrellag.png'))
                                        }

                                      let target=0+Math.floor(frases.length*Math.random())
                                      console.log('entra '+target)
                                      setMensaje(frases[target]);
                  
                  
                                     }, [])

                                     const spinValue = useRef(new Animated.Value(1)).current;
        

                                     Animated.timing(
                                       spinValue,
                                     {
                                       toValue: -100,
                                       duration: 180000,
                                       useNativeDriver: true // Add This line
                           
                                     }
                                ).start()
                           
                           
                                const spin = spinValue.interpolate({
                                 inputRange: [0, 1],
                                 outputRange: ['0deg', '360deg']
                            })

                                          const cargar=async()=>{

                                            const id=await AsyncStorage.getItem("id");
                        
                                            console.log('entra')
                                            const token = await AsyncStorage.getItem("userToken")
                                            fetch('https://api-loteria-heroku.herokuapp.com/maiz/'+`${id}`,{
                                            headers:new Headers({
                                              Authorization:"Bearer "+token
                                            })
                                            }).then(res=>res.json())
                                            .then(data=>{
                                       
                                          RealizarCangeo(data[0]._id);
                                       
                                            }
                                            )
                        
                                          }


                                          const cargar2=async()=>{

                                            const id=await AsyncStorage.getItem("id");
                        
                                            console.log('entra')
                                            const token = await AsyncStorage.getItem("userToken")
                                            fetch('https://api-loteria-heroku.herokuapp.com/maiz2/'+`${id}`,{
                                            headers:new Headers({
                                              Authorization:"Bearer "+token
                                            })
                                            }).then(res=>res.json())
                                            .then(data=>{
                                       
                                          AsignarMaiz(data[0]._id);
                                          console.log('maices en la aplicacion: '+data);
                                              
                                            }
                                            )
                        
                                          }
                        
                                          useEffect(() => {
                                            console.log(ganador);
                                            if(ganador){
                                              console.log('entra el primero')
                                              cargar()
                                            }
                                            
                        
                                          }, [])


                                          const AsignarMaiz=async(id)=>{

                                            if(ganador==false){
                                              return;
                                            }
                                            console.log('id de maices en la aplicacion: '+id);

                                            const id_usuario=await AsyncStorage.getItem("id");

                                        fetch('https://api-loteria-heroku.herokuapp.com/ganar/maiz2/'+`${id}`,{
                                          
                                          method:"PUT",
                                          headers:{
                                        'Content-Type': 'application/json'
                                          },
                                          body:JSON.stringify({
                                            "color":color,
                                            "id_usuario":id_usuario

                                       
                                          })
                                        })
                                      
                                        .then(res=>res.json())
                                      .then(async data=>{
                                        
                                      
                                       
                                      
                                        try{
                                                                                                                                
                                      

                                        } catch(e){
        
                                          alert(e);
                                        }
                                      
                                      }).catch((error)=>{
        
                                        Snackbar.show({
                                          text: 'Ocurrió un error con el premio.',
                                        
                                          duration: Snackbar.LENGTH_SHORT,
                                        });                               });
                                      


                                          }

                                   
                                          
                          const RealizarCangeo=async(id)=>{

                                   
                                    if(ganador==false){
                                      return;
                                    }
                                    const id_usuario=await AsyncStorage.getItem("id");

                                      console.log('color: '+color)
                                fetch('https://api-loteria-heroku.herokuapp.com/ganar/maiz/'+`${id}`,{
                                  
                                  method:"PUT",
                                  headers:{
                                'Content-Type': 'application/json'
                                  },
                                  body:JSON.stringify({
                                   
                                    "color":color,
                                    "cantidad":estrellas,
                                    "id_usuario":id_usuario
                               
                                  })
                                })
                              
                                .then(res=>res.json())
                              .then(async data=>{
                                
                              
                               
                              
                                try{
                                                                                                                        

                                if(color==="amarillo"){
                                  console.log('entra para cargar 2 es amarillo')
                                  cargar2();
                                }


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
                               
                                 setModalVisible3(false);
                                 setModalVisibleJuego(false);
  
                                
                                }
                          
                                          
                                                return (
                                                  <ImageBackground  source={require('../Tabs/assets/ganador/fondo.png')} style={{flex:1,backgroundColor:'white',alignItems:"center",justifyContent:"center"}}>
                  
               
                                                  <LottieView 
                                             resizeMode='cover' source={require('../Tabs/assets/fondo.json')}  autoPlay loop speed={9} />
                                 
                                     

                                                          <View style={{ height:'10%',width:'70%',justifyContent:"center",alignItems:"center"}} >

                                                            <Animatable.Image animation="pulse" easing="ease-in-back" iterationCount="infinite" resizeMode='contain' source={require('../Tabs/assets/ganador/loteria.png')} style={{width:'100%',height:'100%'}}  />

                                                          </View>
                                     
                                                          <View style={{ marginVertical:'12%',backgroundColor: '#E5EAEF',opacity: 0.7,borderRadius:10, width:'70%',height:'30%',justifyContent:"center",alignItems:"center"}} >
                                                          <Animated.Image resizeMode='contain' source={circulo} style={{width:'35%',height:'35%',transform: [{rotate: spin}]}}   />
                                 
                                                          <Text style={{fontWeight:"bold",fontSize:RFValue(30)}} >Ganaste</Text>
                                 
                                                                         <View style={{justifyContent:"center",alignItems:"center",alignContent:"center",flexDirection: 'row'}}>
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
                                 
                                                    <Image resizeMode='contain' source={require('../Tabs/assets/ganador/flor2.png')} style={{width:'25%',height:'25%',bottom:'-5%',right:'45%'}}   />
                                                    <Image resizeMode='contain' source={require('../Tabs/assets/ganador/flor.png')} style={{width:'25%',height:'25%',bottom:'20%',left:'45%'}}   />
                                 
                                                                                          
                                                          </View>
                                 
                                                          <View style={{ bottom:'3%',height:'10%',width:'70%',backgroundColor: '#E5EAEF',opacity: 0.7,justifyContent:"center",alignItems:"center"}} >
                                 
                                                          <TypeWriter typing={1} style={{fontWeight:"bold",fontSize:RFValue(15),textAlign: "center"}}>{mensaje}</TypeWriter>
                                 
                                                          </View>
                                 
                                 
                                                          <View style={{bottom:'3%',width:'100%',height:'35%',alignItems:'center'}} >
                                                          <Image
                                                          resizeMode="contain"
                                                          style={{width:'100%',height:'100%'}}
                                                                            source={require('../Tabs/assets/ganador/sombreron.gif')} />    

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


export default Ganador;
