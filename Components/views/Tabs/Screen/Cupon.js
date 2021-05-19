                  import React,{useState,useEffect} from 'react'
                  import {StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity,Linking,Platform,ScrollView,Alert,Modal,TouchableWithoutFeedback} from 'react-native';
                  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
                  import AsyncStorage from '@react-native-community/async-storage';
                  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                  import LottieView from 'lottie-react-native';
                  import * as Animatable from 'react-native-animatable';
                  import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
                  import Llegar from 'react-native-vector-icons/FontAwesome5';
                  import Cancelar from 'react-native-vector-icons/MaterialIcons';

                  var count=0;
                  const Cupon = () => {
                    const [estadocambio,setEstadoCambio]=useState(false);
                    const [estadocambio2,setEstadoCambio2]=useState(false);
                    const [estadocambio3,setEstadoCambio3]=useState(false);
                    const [estadocambio4,setEstadoCambio4]=useState(false);

                    const [loadCambio,setLoadCambio]=useState(require('../assets/carga.json'));

                    const [fecha,setFecha]=useState('');
                    const [departamento,setDepartamento]=useState('');
                    const [direccion,setDireccion]=useState('');
                    const [descripcion,setDescripcion]=useState('');
                    const [longitud,setLongitud]=useState(0);
                    const [latitud,setLatitud]=useState(0);
                    const [color,setColor]=useState('');
                    const [imagen,setImagen]=useState('');
                    const [idPremio,setIdPremio]=useState('');
                    const [premios,setPremios]=useState([]);
                    const [siguiente,setSiguiente]=useState(require('../assets/fondos/premios/siguiente.png'));
                    const [atras,setAtras]=useState(require('../assets/fondos/premios/atras.png'));
                    const [tamanio,setTamanio]=useState(0);
                    const [circulo,setCirculo]=useState(require('../assets/fondos/premios/estrellad.png'));
                    const [modalPremio,setModalPremio]=useState(false);
                    const [amarillo,setAmarillo]=useState(0);
                    const [blanco,setBlanco]=useState(0);
                    const [rojo,setRojo]=useState(0);
                    const [morado,setMorado]=useState(0);
              

                    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                    const latLng = `${latitud},${longitud}`;
                    const label = 'Custom Label';
                    const url = Platform.select({
                      ios: `${scheme}${label}@${latLng}`,
                      android: `${scheme}${latLng}(${label})`
                    });







                    const cargar=async()=>{

                      const id=await AsyncStorage.getItem("id");

                      const token = await AsyncStorage.getItem("userToken")
                      fetch('https://api-loteria-heroku.herokuapp.com/maiz/'+`${id}`,{
                      headers:new Headers({
                        Authorization:"Bearer "+token
                      })
                      }).then(res=>res.json())
                      .then(data=>{
                          
                          
                          setAmarillo(data[0].amarillo);
                        setBlanco(data[0].blanco);
                        setMorado(data[0].morado);
                        setRojo(data[0].rojo); 
                        
                                       
                 
                      }
                      ).catch((error)=>{
                                          
                        Snackbar.show({
                          text: 'Ocurrió un error',
                        
                          duration: Snackbar.LENGTH_SHORT,
                        }); 


                      });

                    }

                    useEffect(() => {
                   cargar()

                    }, [])



                    const canjear=()=>{

                      setLoadCambio(require('../assets/carga.json'));
                      setModalPremio(!modalPremio)
                      setEstadoCambio(!estadocambio)

                      const controller = new AbortController();
                      const { signal } = controller;
                 
                      
                             setTimeout(
                     
                                                         
                               () => controller.abort()
                             
                               , 8000);

                      fetch("https://api-loteria-heroku.herokuapp.com/eliminarpremio/",{
                        method:"DELETE",
                        headers:{
                      'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                          "id_premio":idPremio,
                       
                        }),
                        signal
                        
                      }).then(res=>res.json())
                      .then(async data=>{
                      
                        try{
                         await ConsultaPremios();
                         setLoadCambio(require('../assets/exito.json'));
                         setEstadoCambio(false)
                         setEstadoCambio2(true);
                         setTimeout(() => {
                           setEstadoCambio2(false)
                           setLoadCambio(require('../assets/carga.json'));
                          setEstadoCambio3(true);
                            setTimeout(() => {
                              setEstadoCambio3(false);
                              ConsultaPremios();
                            },3000);

                         }, 1000);

                        } catch(e){

                          Snackbar.show({
                            text: 'Ocurrió un error al procesar el cambio.',
                          
                            duration: Snackbar.LENGTH_SHORT,
                          }); 
                        }

                      }).catch((error)=>{
                        setEstadoCambio(false)

                        Alert.alert(
                          "No se puede entregar el premio",
                          "Ocurrió un error al querer procesar el premio, revise su conexión de internet.",
                          [
                       
                            { text: "Aceptar", onPress: () => console.log("OK Pressed") }
                          ],
                          { cancelable: false }
                        );


                      });





                    }

                    const Cambio=(valor)=>{
                      count=count+(valor);
                      console.log(count)
                      
/*                       console.log('listado de premios: '+JSON.stringify(premios))
 */                     
                        if(!idPremio.length){
                          return;  

                        }
                                            


                      if(count<0){
                        console.log('entra a count<0')
                        setFecha(premios[tamanio].fecha)
                        setImagen(premios[tamanio].foto)
                        setIdPremio(premios[tamanio]._id)
                        setDepartamento(premios[tamanio].departamento);
                        setDireccion(premios[tamanio].direccion);
                        setDescripcion(premios[tamanio].descripcion)
                        setLongitud(parseFloat(premios[tamanio].longitud))
                        setLatitud(parseFloat(premios[tamanio].latitud))

                        circunferencia(premios[tamanio].color)
                        count=tamanio;
                        return;
                      }
                      if(count>tamanio){
                        console.log('entra a count>tamanio')

                        setFecha(premios[0].fecha)
                        setImagen(premios[0].foto)
                        setIdPremio(premios[0]._id)
                        setDepartamento(premios[0].departamento);
                        setDireccion(premios[0].direccion)
                        setDescripcion(premios[0].descripcion)
                        setLongitud(parseFloat(premios[0].longitud))
                        setLatitud(parseFloat(premios[0].latitud))
                        circunferencia(premios[0].color)

                        count=0;
                        return;
                      }  
                      if(count<=tamanio){
                        console.log('entra a count<=tamanio')

                        setFecha(premios[count].fecha);
                        setImagen(premios[count].foto)
                        setIdPremio(premios[count]._id)
                        setDepartamento(premios[count].departamento);
                        setDireccion(premios[count].direccion)

                        setDescripcion(premios[count].descripcion)
                        setLongitud(parseFloat(premios[count].longitud))
                        setLatitud(parseFloat(premios[count].latitud))
                        circunferencia(premios[count].color)

                      }
                   
                     



                    }

                    const circunferencia=(color)=>{

                        if(color=="amarillo"){
                          setCirculo(require('../assets/fondos/premios/estrellad.png'))

                        }
                        if(color=="morado"){
                          setCirculo(require('../assets/fondos/premios/estrellae.png'))

                        }
                        if(color=="blanco"){
                          setCirculo(require('../assets/fondos/premios/estrellaf.png'))

                        }
                        if(color=="rojo"){
                          setCirculo(require('../assets/fondos/premios/estrellag.png'))

                        }


                    }

                    const ConsultaPremios=async()=>{

                      const id=await AsyncStorage.getItem("id");

                     
                      const token = await AsyncStorage.getItem("userToken")
                      fetch('https://api-loteria-heroku.herokuapp.com/premios/'+`${id}`,{
                      headers:new Headers({
                        Authorization:"Bearer "+token
                      })
                      }).then(res=>res.json())
                      .then((data)=>{
                        if(data.length){

                          setEstadoCambio4(true);
                        setTamanio(data.length-1)
                        setIdPremio(data[0]._id)
                        setFecha(data[0].fecha);
                        setDepartamento(data[0].departamento);
                        setDireccion(data[0].direccion)
                        setLongitud(parseFloat(data[0].longitud))
                        setLatitud(parseFloat(data[0].latitud))
                        setDescripcion(data[0].descripcion)
                        setColor(data[0].color);
                        setImagen(data[0].foto)
                        setPremios(Object.assign({},data))

                        setTimeout(() => {
                          setEstadoCambio4(false)
                        },2000);

                        }else{
                          setTamanio(0)
                        setIdPremio('')
                        setFecha('');
                        setDepartamento('');
                        setDireccion('');
                        setDescripcion('');
                        setLongitud(0);
                        setLatitud(0);
                        setColor('');
                        setImagen('');
                        setPremios([]);
                        }
                      
                      }
                      )


                    }

                    useEffect(() => {
                      ConsultaPremios();
                    
                    }, [])


                    const Siguiente=()=>{

                      setSiguiente(require('../assets/fondos/premios/asiguiente.png')) 

                      }

                      const SoltarSiguiente=()=>{

                        setSiguiente(require('../assets/fondos/premios/siguiente.png')) 
                        Cambio(1)

                        }



                      const Atras=()=>{

                        setAtras(require('../assets/fondos/premios/aatras.png')) 



                      }

                      
                      const SoltarAtras=()=>{

                        setAtras(require('../assets/fondos/premios/atras.png')) 
                        Cambio(-1)


                      }

                      return (
                          <ImageBackground source={require('../assets/fondos/canje/fondo.png')} style={{flex: 1,backgroundColor:'white',alignContent:"center",alignItems:"center"}}>
                          <Image source={require('../assets/fondos/canje/volcan.png')} resizeMode="contain" style={{bottom:'-33%',width:'100%',height:'100%'}} />

                          <Image source={require('../assets/fondos/canje/luz.png')}  style={{bottom:'106%',width:'100%',height:'100%'}} />
                          <Image source={require('../assets/fondos/canje/cerro.png')} resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}} />


                          <View style={{bottom:'297%',width:'100%',height:'20%',alignContent:"center",alignItems:"center"}} >

<View style={{left:5,flexDirection:'row',width:'100%',height:'30%',alignContent:'center',justifyContent:'center',alignItems:'center'}}>




                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizr.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{rojo}</Text>           
                              </View>  
            </ImageBackground>     
                        </View>



                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizb.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{blanco}</Text>           
                              </View>  
            </ImageBackground>     
                        </View>


                        <View  style={{width:'20%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                        <ImageBackground source={require('../assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'85%',height:'100%'}} >
            <Image source={require('../assets/fondos/torneo/maizm.png')} resizeMode="contain" style={{bottom:'7%',right:'33%',width:'100%',height:'100%'}} />     
            <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                          <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{morado}</Text>           
                              </View>  
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




                                <View style={{bottom:'302%',width:'100%',height:'100%',alignContent:"center",alignItems:"center"}}>
                                <Image source={require('../assets/fondos/premios/titulo.png')} resizeMode="contain" style={{width:'100%',height:'3%',bottom:'9%'}} />


                                <Image style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:25,width:'90%',height:'13%',bottom:'8%'}}  />
                                <Image source={circulo} resizeMode="contain" style={{bottom:'20%',width:'100%',height:'11%'}} />

                                  <TouchableWithoutFeedback
                                  onPressIn={()=>Siguiente()}
                                  onPressOut={()=>SoltarSiguiente(1)} 
                                  >
                                  <Image source={siguiente} resizeMode="contain" style={{left:'28%',bottom:'27%',width:'30%',height:'4%'}} />

                                  </TouchableWithoutFeedback>

                                  <TouchableWithoutFeedback
                                    onPressIn={()=>Atras()}
                                    onPressOut={()=>SoltarAtras(-1)} 
                                  >
                                  <Image source={atras} resizeMode="contain" style={{right:'28%',bottom:'30.9%',width:'30%',height:'4%'}} />

                                  </TouchableWithoutFeedback>
                                </View>



                        
                                <View style={{bottom:'390%',width:'90%',height:'60%' ,alignContent:"center",alignItems:"center",justifyContent:"center", backgroundColor: '#E5EAEF', opacity: 0.7, borderRadius:15,}}>
                               
                               
                               {
                                 
                                 idPremio.length?
                                 <View style={{width:'100%',height:'100%',alignContent:"center",alignItems:"center",justifyContent:"center"}}>
                                <Text style={{fontWeight: 'bold',textAlign:'center',marginVertical:5,fontSize:RFValue(14)}}>{descripcion}</Text>


                              <TouchableOpacity
                              style={{width:'75%',height:'64%',zIndex:1}}
                              onPress={()=>setModalPremio(!modalPremio)}
                              >
                              <Image source={{uri:imagen}} resizeMode="contain" style={{width:'100%',height:'100%',opacity:1,zIndex:1}} />

                              </TouchableOpacity>
 

                                   <Text style={{fontWeight: 'bold',fontSize:RFValue(14)}}>vence: {fecha}</Text>
                                   </View>
                                   :
                                  
                                   <Text style={{fontWeight: 'bold',fontSize:RFValue(14)}}>Sin premios.</Text>
                                  
                               
                               }
                    
                                </View>
                                


                                             <Modal
                                              animationType="slide"
                                              transparent={true}
                                              visible={modalPremio}
                                              onRequestClose={() => {
                                                setModalPremio(!modalPremio);
                                              }}
                                            >
                                              
                                              <View style={{  flex:1,alignItems: "center",backgroundColor: '#FFB13F',padding:10,opacity:0.97}} >
                                              
                                              <ScrollView>

                                             
                                              <Text style={{fontWeight:'bold',fontSize:RFValue(16),textAlign: "center",marginVertical:5}} >
                                                
                                              Debes estar en el punto de canje y presentar tu teléfono
                                              junto a este cupón para hacer valida esta recompensa.
                                              
                                              </Text>
                                              <View style={{width:'100%',height:200,alignItems:'center',justifyContent:'center'}}>

                                              <Image source={{uri:imagen}} resizeMode="contain" style={{width:'50%',height:'80%',zIndex:1}} />

                                              </View>


                                              <Text style={{fontWeight:'bold',fontSize:RFValue(15),textAlign: "center",marginVertical:10}} >
                                                Tu centro de canje está en:                                               
                                                </Text>



                                                
                      <View style={ {height:250}}>
                      
                      <MapView
                          style={{flex: 1}}
                          provider={PROVIDER_GOOGLE}
                              initialRegion={{
                              latitude: latitud,
                              longitude: longitud,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                              }}
                              >
                                  
                            <Marker
                            
                            coordinate={{
                              latitude: latitud,
                              longitude: longitud,
                            }}
                            />

                          
                              </MapView>
                      <View style={{alignItems:'center',justifyContent:'center'}}>

                    
                      <TouchableOpacity

                      style={{flexDirection:'row',alignItems:'center',alignContent:'center',marginTop:7, alignItems: "center",width:'35%',padding:3,
                      backgroundColor: "blue",borderRadius:8,elevation:10}}
                      onPress={()=>Linking.openURL(url) 
                      }
                      >
                        
                        <Llegar
                          name="walking" 
                          color='white'
                          size={RFValue(26)}
                          >
                            </Llegar>
                            <Text  style={{color:'white',marginLeft:5,fontSize:RFValue(15)}}  >Indicaciones</Text>

                    
                    
                      

                      </TouchableOpacity>
                      </View>
                  


                        



                      </View>
                                                
                                               

                      <Text style={{marginTop:35,fontWeight:'bold',fontSize:RFValue(15),textAlign: "center",marginVertical:10}} >
                                                ¿Estás seguro que vas a cambiar esta recompensa?                                              
                                                </Text>

                                                <View style={{height:50,flexDirection:"row",justifyContent:'center',marginVertical:5}}  >
                                                  
                                                <TouchableOpacity

                                                    style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:7, alignItems: "center",width:'30%',padding:0,
                                                    backgroundColor: "green",borderRadius:8,elevation:8,marginRight:10}}
                                                    onPress={()=>canjear()
                                                    }
                                                    >
                                                    <Text  style={{color:'white',marginHorizontal:5,fontSize:RFValue(15)}}  >Aceptar</Text>

                                                      <Llegar
                                                        name="check" 
                                                        color='white'
                                                        size={RFValue(20)}
                                                        >
                                                          </Llegar>





                                                    </TouchableOpacity>
                                             


                                                    <TouchableOpacity

                                                            style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:7, alignItems: "center",width:'30%',padding:0,
                                                            backgroundColor: "red",borderRadius:8,elevation:8,marginLeft:10}}
                                                            onPress={() =>setModalPremio(!modalPremio)} 

                                                            >
                                                            <Text  style={{color:'white',marginHorizontal:5,fontSize:RFValue(15)}}  >Cancelar</Text>

                                                              <Cancelar
                                                                name="cancel" 
                                                                color='white'
                                                                size={RFValue(20)}
                                                                >
                                                                  </Cancelar>





                                                            </TouchableOpacity>


                                               
                                        
                                              </View>

                                              </ScrollView>
                                                </View>


                                              </Modal>

                                              
                                                        {
                                                      estadocambio&&
                                                      <View style={{width:'100%',height:'100%',bottom:'480%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8}} >
                                                    <View style={{width:'80%',height:'55%',justifyContent:'center'}} >
                                                    <LottieView 
                                                    
                                                    
                                                    source={loadCambio}  autoPlay loop />

                                                    </View>
                                                    </View>
                                                       }
                                              
                                                {
                                                      estadocambio2&&
                                                      <View style={{width:'100%',height:'100%',bottom:'480%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8}} >

                                                    <View style={{width:'80%',height:'69%',justifyContent:'center'}} >
                                                    <LottieView 
                                                   
                                                    
                                                    source={loadCambio}  autoPlay loop />

                                                    </View>
                                                    </View>
                                                }


                                                {estadocambio3&&
                                            <Animatable.Image animation="zoomIn"   source={require('../assets/fondos/canje/felicidades.png')} resizeMode="contain" style={{bottom:'470%',width:'90%',height:'100%'}}  />
                                                }

                           {   estadocambio4&&                 
                        <View style={{bottom:'420%',width:'40%',height:'20%',justifyContent:'center'}} >
                              <LottieView   source={require('../assets/touch.json')}  autoPlay loop />
                                </View>
                  }
                        
                        </ImageBackground>
                      )
                  }


                  const styles = StyleSheet.create({


                  openButton: {
                    backgroundColor: "red",
                    borderRadius: 20,
                    padding: '5%',
                    marginHorizontal:'2%',
                    elevation: 2,
                    width:'40%',
                    height:'40%',
                    justifyContent:"center"
                
                  },
                  textStyle: {
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize:RFValue(13)
                  },
              

                });

                  export default Cupon
