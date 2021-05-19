                  import React,{useState,useEffect} from 'react'
                 import { View, SafeAreaView,Text,Image,TouchableWithoutFeedback,ScrollView, StyleSheet,Platform,Dimensions,Modal,Linking,ImageBackground} from 'react-native';
               import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
               import ImageViewer from 'react-native-image-zoom-viewer';
               import {
                Avatar

              } from 'react-native-paper';
                    import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
                    import AsyncStorage from '@react-native-community/async-storage';

              import { Rating, AirbnbRating } from 'react-native-ratings';
                   import { TouchableOpacity } from 'react-native-gesture-handler';
              import Llegar from 'react-native-vector-icons/FontAwesome5';
                  import Icono from 'react-native-vector-icons/Ionicons';
              import Grafico from './Grafico';
              import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
              import ImageZoom from 'react-native-image-pan-zoom';
              import Snackbar from 'react-native-snackbar';
              import Sound from 'react-native-sound';
              import LottieView from 'lottie-react-native';


              const numStar=5;
              var advertencia;

              const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
              const MAX_HEIGHT = 250;
              const DetalleProducto = ({navigation,route}) => {

              
               const {id_premio}=route.params;
               const {cupones}=route.params;
               const {maiz} =route.params;
               const {color}=route.params;
               const {premio}=route.params;
               const {fecha} =route.params;
                const {imagenes}=route.params;
                const {descripcion}= route.params;
                const {img}=route.params;
                const {longitud}= route.params;
                const {latitud}=route.params;
                const {departamento}=route.params;


                const [modalImagen2,setModalImagen2]=useState(false);
                const [modalCarga,setModalCarga]=useState(false);
                const [porcentaje1,setPorcentaje1]=useState(0);
                const [porcentaje2,setPorcentaje2]=useState(0);
                const [porcentaje3,setPorcentaje3]=useState(0);
                const [porcentaje4,setPorcentaje4]=useState(0);
                const [porcentaje5,setPorcentaje5]=useState(0);
                const [miComentario,setMiComentario]=useState([]);
                  const [comentarios,setComentarios]=useState([]);
                  const [estrellas,setEstrellas]=useState(0);
                  const [usuarios,setUsarios]=useState(0);
                  const [cooredenada,setCoordenada]=useState(14.83584758900336);
                  const [cooredenada1,setCoordenada1]=useState(-91.52109149990743);
                  const [modalImagen,setModalImagen]=useState(false);
                  const [detalleProducto,setDetalleProducto]=useState([]);
                  const [id2,setId2]=useState('');
                  const [amarillo,setAmarillo]=useState(0);
                  const [blanco,setBlanco]=useState(0);
                  const [rojo,setRojo]=useState(0);
                  const [morado,setMorado]=useState(0);
                  const [estadocambio,setEstadoCambio]=useState(false);
                  const [estadocambio2,setEstadoCambio2]=useState(false);
                  const [loadCambio,setLoadCambio]=useState(require('../views/Tabs/assets/carga.json'));
                  const [index,setIndex]=useState(0);
                  const [mostrarEstrellas,setMostrarEstrellas]=useState(false);
                  const [icono,setIcono]=useState('eye-slash');

                  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
              const latLng = `${latitud},${longitud}`;
              const label = 'Custom Label';
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`
              });
                  const [imageness,setImagenes]=useState([
                    
                  ])



                    useEffect(() => {
                     
                      console.log('descripcion: '+descripcion)
                      setImagenes(img);



                      advertencia = new Sound('advertencia.mp3',Sound.MAIN_BUNDLE,(error)=>{
                        if(error){
                        console.log('Error loading sound: ' + error);
                        return;
                        }else{
                        advertencia.setVolume(1);
                        advertencia.stop();
                        
                        }
                        });


                    }, [])

                  const cargar_maices=async()=>{

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
                      setId2(data[0]._id);
                                     
               
                    }
                    ).catch((error)=>{
                                        
                      Snackbar.show({
                        text: 'Ocurrió un error con las estrellas',
                      
                        duration: Snackbar.LENGTH_LONG,
                      }); 


                    });

                  }

                  useEffect(() => {
                 cargar_maices()

                  }, [])


                  const Comprar=async()=>{
                    //no olvidar hacer nuevamente la consulta y verificar si hay existencias de cupones
                    //y si los maices son suficientes
                    
                  
                    const id=await AsyncStorage.getItem("id");
                 
                    fetch('https://api-loteria-heroku.herokuapp.com/compra/',{
                      method:"POST",
                      headers:{
                    'Content-Type': 'application/json'
                      },
                      body:JSON.stringify({
                        "foto":imagenes,
                        "fecha":fecha,
                        "departamento":departamento,
                        "color":color,
                        "descripcion":descripcion,  
                        "longitud":longitud,
                        "latitud":latitud,                                 
                        "user":id,
                       
                        
                        
                      })
                      
                    }).then(res=>res.json())
                    .then(async data=>{
                 
                      try{
                        
                        cargar_maices()
                        setLoadCambio(require('../views/Tabs/assets/exito.json'));
                        setEstadoCambio(false)
                        setEstadoCambio2(true);
                        setTimeout(() => {
                          setEstadoCambio2(false)
                          setModalCarga(false);
                          setLoadCambio(require('../views/Tabs/assets/carga.json'));
                       
                        }, 1000);
                        
                       
                      } catch(e){
                        setModalCarga(false);
                        Snackbar.show({
                          text: 'Ocurrió un error con la compra local .',
                        
                          duration: Snackbar.LENGTH_LONG,
                        }); 
                      }

                    }).catch((error)=>{
                      setModalCarga(false);
                      advertencia.stop();
                      advertencia.play();
                      Snackbar.show({
                        text: `${error}`,
                      
                        duration: Snackbar.LENGTH_LONG,
                      }); 


                    });
                    

                  }




                  const DescontarMaiz=async()=>{

                    
                      


                  if(color =='amarillo'&&amarillo<maiz){
                      advertencia.stop();
                      advertencia.play();
                      Snackbar.show({
                        text: 'Estrellas insuficientes, sigue jugando.',
                      
                        duration: Snackbar.LENGTH_LONG,
                      }); 
                      return;

                    }


                    
                    if(color =='morado'&&morado<maiz){

                        advertencia.stop();
                        advertencia.play();
                       
                      Snackbar.show({
                        text: 'Estrellas insuficientes, sigue jugando.',
                      
                        duration: Snackbar.LENGTH_LONG,
                      }); 
                      return;
                    
                      
                    }
                    
                    if(color=='blanco'&&blanco<maiz){

                      advertencia.stop();
                      advertencia.play();
                        
                      Snackbar.show({
                        text: 'Estrellas insuficientes, sigue jugando.',
                      
                        duration: Snackbar.LENGTH_LONG,
                      }); 
                      return;
                      
                    }
                    
                    if(color =='rojo'&&rojo<maiz){

                     
                      advertencia.stop();
                      advertencia.play();

                        Snackbar.show({
                          text: 'Estrellas insuficientes, sigue jugando.',
                        
                          duration: Snackbar.LENGTH_LONG,
                        }); 
                        return;

                      
                    }  
                    const email=await AsyncStorage.getItem("email")
                    const nombre=await AsyncStorage.getItem("nombre")
                    const id_usuario=await AsyncStorage.getItem("id");
                    setModalCarga(true);
                  setLoadCambio(require('../views/Tabs/assets/carga.json'));
                   setEstadoCambio(!estadocambio)

                   const controller = new AbortController();
                   const { signal } = controller;
              
                   
                          setTimeout(
                  
                                                      
                            () => controller.abort()
                          
                            , 10000);
                    
                    fetch('https://api-loteria-heroku.herokuapp.com/actualiza/compra/'+`${id2}`,{
                      
                      method:"PUT",
                      headers:{
                    'Content-Type': 'application/json'
                      },
                      body:JSON.stringify({
                    
                        "maiz":maiz,
                        "color":color,
                        "cupon":cupones,
                        "id_usuario":id_usuario,
                        "id_premio":id_premio,
                        "email":email,
                        "nombre":nombre,
                        "descripcion":descripcion,
                        "nombrepremio":premio
                      }),
                      signal
                    }).then(res=>res.json())
                    .then(async data=>{
                      
                    
                     
                    
                      try{

                        Comprar();

                      } catch(e){
                        advertencia.stop();
                        advertencia.play();
                        setEstadoCambio(false)
                        setModalCarga(false);
                        Snackbar.show({
                          text: 'Ocurrió un error.',
                        
                          duration: Snackbar.LENGTH_LONG,
                        });    
                      }
                    
                    }).catch((error)=>{
                      
                      setModalCarga(false);
                      setEstadoCambio(false)
                     setTimeout(() => {
                      advertencia.stop();
                      advertencia.play();
                      Snackbar.show({
                        text: 'Error al procesar su premio.',
                      
                        duration: Snackbar.LENGTH_LONG,
                      });   
                           
                     }, 300);
                       
                    
                    });





                  }















                  useEffect(() => {
                    if (route.params?.comentado) {
                      console.log('entra')
                    cargar();
                    }
                  }, [route.params?.comentado]);



                  useEffect(() => {
                    if (route.params?.comentadoedit) {
                     
                    cargar();
                    }
                  }, [route.params?.comentadoedit]);

                  

                    const cargar=async()=>{
                       const id=await AsyncStorage.getItem("id");
                   
                    await  fetch('https://api-loteria-heroku.herokuapp.com/comentario_todo/'+`${id_premio}`,{
                      method: "GET",
                      headers: { 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json()) 
                    .then(async(json)  =>{

                
                      const results =await json.filter(function (usuario) { return usuario.id_Usuario == id; });
                      setMiComentario(results)                      
                      Calcular(json);
                    

                    } )   
                    .catch(err => console.log('Request Failed', err)); 




                    await  fetch('https://api-loteria-heroku.herokuapp.com/listado_comentarios/'+`${id_premio}`,{
                      method: "GET",
                      headers: { 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json()) 
                    .then(json =>{

                
                

                      setComentarios(json);
                    

                    } )   
                    .catch(err => console.log('Request Failed', err)); 



                    }



                    const Calcular=async(json)=>{

                      let cantidad=json.length;
                      setUsarios(cantidad);
                      let estrella1=0;
                      let estrella2=0;
                      let estrella3=0;
                      let estrella4=0;
                      let estrella5=0;

                        if(cantidad){
                      json.map(item=>{
                        console.log(item.calificacion);
                      if(item.calificacion==1){
                        estrella1=estrella1+1
                      }

                      if(item.calificacion==2){
                        estrella2=estrella2+1
                      }
                      if(item.calificacion==3){
                        estrella3=estrella3+1
                      }
                      if(item.calificacion==4){
                        estrella4=estrella4+1
                      }
                      if(item.calificacion==5){
                        estrella5=estrella5+1
                      }

                      })





                      let valor1=await 1*estrella1;
                      let valor2=await 2*estrella2;
                      let valor3=await 3*estrella3;
                      let valor4=await 4*estrella4;
                      let valor5=await 5*estrella5;

                    let  suma= await (valor1+valor2+valor3+valor4+valor5)/cantidad;

                      let promedio1=await (estrella1*100)/cantidad
                      let promedio2=await (estrella2*100)/cantidad
                      let promedio3=await (estrella3*100)/cantidad
                      let promedio4=await (estrella4*100)/cantidad
                      let promedio5=await (estrella5*100)/cantidad


                      setPorcentaje1(Math.floor(promedio1));
                      setPorcentaje2(Math.floor(promedio2));
                      setPorcentaje3(Math.floor(promedio3));
                      setPorcentaje4(Math.floor(promedio4));
                      setPorcentaje5(Math.floor(promedio5));

                      setEstrellas(suma.toFixed(2));

                    }else if(!cantidad){

                      setPorcentaje1(0)
                      setPorcentaje2(0)
                      setPorcentaje3(0)
                      setPorcentaje4(0)
                      setPorcentaje5(0)
                      setEstrellas(0)

                    }




                    }
                    

                useEffect(() => {
                  cargar();
                }, [])



                const editar=async()=>{

                  const id=await miComentario[0]._id;
                  const comenta=await miComentario[0].comentario;
                  const califica=await miComentario[0].calificacion;
                
                  const datos=await {id,comenta,califica}

                  navigation.navigate('EditarComentario',datos)



                }


                const posicion=(index)=>{

                  setIndex(index)
                  setModalImagen(true)


                }


                const mostrar=()=>{


                  setMostrarEstrellas(!mostrarEstrellas)
                  if(icono==='eye-slash'){
                    setIcono('eye')
                  }else if(icono==='eye'){
                    setIcono('eye-slash')
                  }


                }



                  return (
                      <SafeAreaView
                      style={{flex:1}}
                      >


                  
                          <ImageHeaderScrollView
                                      maxHeight={MAX_HEIGHT}
                                      minHeight={MIN_HEIGHT}
                                    
                                      headerImage={{uri:img[0].url}}
                                    
                                
                                      >

                              <TriggeringView
                                    style={styles.section}
                                    onHide={() => navTitleView.current.fadeInUp(200)}
                                    onDisplay={() => navTitleView.current.fadeOut(100)}>
                                    <View style={{flexDirection: 'row',justifyContent:'center'}}>
                                      <Text style={{fontSize:RFValue(16),fontWeight:'bold',marginHorizontal:3}}>{estrellas}/5</Text>
                                      <AirbnbRating
                                      count={5}
                                      defaultRating={estrellas}
                                      showRating={false}
                                      isDisabled={true}
                                      size={RFValue(16)}
                                      />
                                  
                                    </View>
                              
                                      <Text style={{textAlign:'center',fontWeight:'bold',fontSize:RFValue(16)}}>{usuarios} opiniones</Text>
                                  
                                  
                                  </TriggeringView>


                                  <View style={{marginHorizontal:10}}>

                                      <ScrollView
                                      horizontal
                                      >

                                          {img.map((item,key)=>{

                                            return(
                                              <TouchableOpacity
                                              key={key}
                                              onPress={()=>posicion(key)}
                                        
                                              >
                                              <Image resizeMode='cover' style={{width:Dimensions.get("window").height * 0.40,height:Dimensions.get("window").height * 0.40,marginHorizontal:5}}  source={{uri:item.url}}   />

                                              </TouchableOpacity>
                                            )

                                          })

                                

                                          }
                                      


                                        <Modal visible={modalImagen} transparent={true}
                                          onRequestClose={() => {
                                            setModalImagen(!modalImagen)
                                          }}
                                        >
                                        <ImageViewer
                                         index={index}
                                        imageUrls={imageness}
                                   
                                        />

                                          </Modal>

                                      </ScrollView>

                                              </View>
                                  <Text style={{textAlign:'center',fontWeight:'bold',fontSize:RFValue(20),marginTop:15}} >{premio}</Text>

                                  <View style={styles.section}>
                        <View style={styles.categories}>




                                          <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>



                                          <TouchableOpacity
                            onPress={()=>setModalImagen2(true)}
                                          style={{width: Dimensions.get("window").width * 0.50,height: Dimensions.get("window").height * 0.26}}
                            >
                                          <Image style={{width:'100%',height:'100%'}} resizeMode='contain' source={{uri:imagenes}}  />

                            </TouchableOpacity>
                      
                            <Modal 
                            visible={modalImagen2} transparent={false}
                             onRequestClose={() => {
                              setModalImagen2(!modalImagen2)
                            }}
                           >
                             <View style={{flex:1,backgroundColor:'black'}} >

                             
                         <ImageZoom 
                         cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={Dimensions.get('window').width}
                       imageHeight={Dimensions.get('window').height}
                    
                       >
                <Image resizeMode='contain' style={{width:'100%', height:'100%'}}
                       source={{uri:imagenes}}/>
                        </ImageZoom>
                        </View>

                             </Modal>

                                          </View>
                      


                      <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}  >

                      <Text style={{fontWeight:'bold',fontSize:RFValue(15),textAlign:'center'}}>Departamento: <Text style={{color:'blue'}} >{departamento}</Text> </Text>

                      <Text style={{fontWeight:'bold',fontSize:RFValue(15),textAlign:'center'}}>Fecha de vencimiento: <Text style={{color:'blue'}} >{fecha}</Text> </Text>
                      <Text style={{fontWeight:'bold',fontSize:RFValue(15),textAlign:'center'}}>Estrellas necesarias: <Text style={{color:'blue'}} >{maiz} {color}(s)</Text> </Text>

                      <Text style={{marginTop:10,fontWeight:'bold',fontSize:RFValue(15),textAlign:'center'}}>Mis estrellas </Text>
                           

                           <TouchableOpacity
                           onPress={()=>mostrar()}
                           >
                           <Llegar
                              name={icono}
                              color='black'
                              size={RFValue(30)}
                              >
                                </Llegar>
                           </TouchableOpacity>
                           
                           {mostrarEstrellas&&

                         
                           <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold',fontSize:RFValue(15),marginHorizontal:5}} >Amarillo: <Text style={{color:'blue'}} >{amarillo}</Text></Text>
                            <Text style={{fontWeight:'bold',fontSize:RFValue(15),marginHorizontal:5}}>morado: <Text style={{color:'blue'}} >{morado}</Text></Text>
                            <Text style={{fontWeight:'bold',fontSize:RFValue(15),marginHorizontal:5}}>blanco: <Text style={{color:'blue'}} >{blanco}</Text></Text>
                            <Text style={{fontWeight:'bold',fontSize:RFValue(15),marginHorizontal:5}}>rojo: <Text style={{color:'blue'}} >{rojo}</Text></Text>
                           </View>
                              }

                      <Text style={{fontWeight:'bold',textAlign:'center',marginTop:15,fontSize:RFValue(15)}}>¿Desea adquirir este cupón?</Text>
                      


       
                      <TouchableOpacity

                          style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:7, alignItems: "center",width:'30%',padding:3,
                          backgroundColor: "green",borderRadius:8,elevation:8,marginRight:10}}
                          onPress={() => DescontarMaiz() } 

                          >
                          <Text  style={{color:'white',marginHorizontal:5,fontSize:RFValue(15)}}  >Aceptar</Text>

                            <Llegar
                              name="check" 
                              color='white'
                              size={RFValue(26)}
                              >
                                </Llegar>





                          </TouchableOpacity>


                                          






                                          </View> 
                        </View>
                      </View>



                  {/*    <View style={styles.section}>
                        <View style={styles.categories}>
                    
                        </View>
                      </View>
              */}





                      <View style={[styles.section, {height:300}]}>
                      
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

                      <View style={styles.section}>
                      
                      
                            <View style={{alignItems:'center'}}>


                          {

                            !miComentario.length ?
                          <>
                            <Text style={{fontWeight:'bold',fontSize:RFValue(18),textAlign:'center'}} >Califica este producto </Text>

                                      <TouchableOpacity

                              style={{flexDirection:'row',alignItems:'center',top:5, alignItems: "center",width:'45%',padding:3,
                              backgroundColor: "blue",borderRadius:8,elevation:10}}
                              onPress={()=> navigation.navigate('Comentarios',id_premio)}

                              >
                              <Text  style={{color:'white',marginHorizontal:10,fontSize:RFValue(15)}}  >Calificar</Text>

                                <Llegar
                                  name="pencil-alt" 
                                  color='white'
                                  size={RFValue(26)}
                                  >
                                  </Llegar>





                              </TouchableOpacity>
                              </>
                              :
                              <>
                              <Text style={{fontWeight:'bold',fontSize:RFValue(18),textAlign:'center'}} >Editar Comentario </Text>
  

                            {
                              
                        miComentario.map((item,index)=>{

                          return(


              <View key={index}  style={{ padding: 20,
                  
                    backgroundColor: 'white',}}>
                        
                        <View style={styles.categories}>

                        <View style={{padding:5,marginTop:0,flexDirection: 'row'}}>
                                                    
                                                    <Avatar.Image 
                                                    style={{backgroundColor:'#F2ECF5'}}
                                                      source={{
                                                        uri:item.foto
                                                      }}
                                                      size={RFValue(48)}
                                                    />

                                                    <View style={{marginLeft: '2%',marginTop:10}}>
                                                    <Text style={{fontWeight:"bold",fontSize:RFValue(20)}}>{item.nombre}</Text>
                                                  

                                                  </View>

                                                  
                                                
                                                </View>        
                        </View>

                    
                        <View style={{padding:5,flexDirection: 'row'}}>

                        <AirbnbRating
                          count={5}
                          defaultRating={item.calificacion}
                          showRating={false}
                          isDisabled={true}
                          size={RFValue(12)}
                          />
                          <Text style={{fontWeight:'bold',marginLeft:5,fontSize:RFValue(14)}} >{item.fecha}</Text>

                          </View>

                          
                          <View style={styles.categories}>
                      <Text  style={{padding:6,fontSize:RFValue(13)}}>
                        {item.comentario}
                        </Text>
                      
                        </View>
                  

                      </View>



                          )

                        })
                            }



                                        <TouchableOpacity
  
                                style={{flexDirection:'row',alignItems:'center',top:5, alignItems: "center",width:'45%',padding:3,
                                backgroundColor: "blue",borderRadius:8,elevation:10}}
                                onPress={()=> editar()}
  
                                >
                                <Text  style={{color:'white',marginHorizontal:10,fontSize:RFValue(15)}}  >Editar</Text>
  
                                  <Llegar
                                    name="pencil-alt" 
                                    color='white'
                                    size={RFValue(26)}
                                    >
                                    </Llegar>
  
  
  
  
  
                                </TouchableOpacity>
                                </>

                          }
                              </View>

                      </View>
                      <Text style={{fontWeight:'bold',fontSize:RFValue(18),textAlign:'center',marginTop:10}}>Calificaciones y opiniones</Text>
                      {
                        usuarios?
                      <View style={{padding:20,marginTop:5 }}>
                      <View style={{marginVertical:0}}>
                        <Grafico  starText="5 " percentage={porcentaje5} />
                      </View>

                      <View style={{marginVertical:0}}>
                        <Grafico  starText="4 " percentage={porcentaje4} />
                      </View>
                      
                      <View style={{marginVertical:0}}>
                        <Grafico  starText="3" percentage={porcentaje3} />
                      </View>
                      
                      <View style={{marginVertical:0}}>
                        <Grafico  starText="2" percentage={porcentaje2} />
                      </View>
                      
                      <View style={{marginVertical:0}}>
                        <Grafico  starText="1" percentage={porcentaje1} />
                      </View>
                      </View>
                      :
                      <Text style={{fontWeight:'bold',color:'blue',fontSize:RFValue(15),textAlign:'center',marginTop:10,marginBottom:15}}>Sin opiniones aún.</Text>

                      }

                      {

                        comentarios.map((item,index)=>{

                          return(


              <View key={index}  style={{ padding: 20,
                  
                    backgroundColor: 'white',}}>
                        
                        <View style={styles.categories}>

                        <View style={{padding:5,marginTop:0,flexDirection: 'row'}}>
                                                    
                                                    <Avatar.Image 
                                                    style={{backgroundColor:'#F2ECF5'}}
                                                      source={{
                                                        uri:item.foto
                                                      }}
                                                      size={RFValue(48)}
                                                    />

                                                    <View style={{marginLeft: '2%',marginTop:10}}>
                                                    <Text style={{fontWeight:"bold",fontSize:RFValue(20)}}>{item.nombre}</Text>
                                                  

                                                  </View>

                                                  
                                                
                                                </View>        
                        </View>

                    
                        <View style={{padding:5,flexDirection: 'row'}}>

                        <AirbnbRating
                          count={5}
                          defaultRating={item.calificacion}
                          showRating={false}
                          isDisabled={true}
                          size={RFValue(12)}
                          />
                          <Text style={{fontWeight:'bold',marginLeft:5,fontSize:RFValue(14)}} >{item.fecha}</Text>

                          </View>

                          
                          <View style={styles.categories}>
                      <Text  style={{padding:6,fontSize:RFValue(13)}}>
                        {item.comentario}
                        </Text>
                      
                        </View>
                  

                      </View>



                          )

                        })
                  
                      
                  }


                  {usuarios>3&&

                  
                  <TouchableOpacity
                  
                  onPress={()=>navigation.navigate('GeneralComentario')}
                  
                  >
                    <Text style={{fontWeight:'bold',color:'blue',fontSize:RFValue(15),textAlign:'center',marginBottom:25}} >Ver todas las opiniones</Text>
                  </TouchableOpacity>
                }


                        <Modal
                        
                        visible={modalCarga} transparent={true}
                        >


                    {
                                              estadocambio&& 
                                              <View style={{width:'100%',height:'100%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.9}} >
                                            <View style={{width:'80%',height:'55%',justifyContent:'center'}} >
                                            <LottieView 
                                            
                                            
                                            source={loadCambio}  autoPlay loop />

                                            </View>
                                            </View>
                                     } 
                                        {
                                              estadocambio2&&
                                              <View style={{width:'100%',height:'100%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.9}} >

                                            <View style={{width:'80%',height:'69%',justifyContent:'center'}} >
                                            <LottieView 
                                           
                                            
                                            source={loadCambio}  autoPlay loop />

                                            </View>
                                            </View>
                                        }
                   


                        </Modal>

                        </ImageHeaderScrollView>


                   

                    
                      </SafeAreaView>
                  )
              }

              export default DetalleProducto 
              const styles = StyleSheet.create({
                  container: {
                    flex: 1,
                  },
                  image: {
                    height: MAX_HEIGHT,
                    width: Dimensions.get('window').width,
                    alignSelf: 'stretch',
                    resizeMode: 'cover',
                  },
                  title: {
                    fontSize: 20,
                  },
                  name: {
                    fontWeight: 'bold',
                  },
                  section: {
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    backgroundColor: 'white',
                  },
                  sectionTitle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                  sectionContent: {
                    fontSize: 16,
                    textAlign: 'justify',
                  },
                  categories: {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                  },
                  categoryContainer: {
                    flexDirection: 'row',
                    backgroundColor: '#FF6347',
                    borderRadius: 20,
                    margin: 10,
                    padding: 10,
                    paddingHorizontal: 15,
                  },
                  category: {
                    fontSize: 14,
                    color: '#fff',
                    marginLeft: 10,
                  },
                  titleContainer: {
                    flex: 1,
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  imageTitle: {
                    color: 'white',
                    backgroundColor: 'transparent',
                    fontSize: 24,
                  },
                  navTitleView: {
                    height: MIN_HEIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: Platform.OS === 'ios' ? 40 : 5,
                    opacity: 0,
                  },
                  navTitle: {
                    color: 'white',
                    fontSize: 18,
                    backgroundColor: 'transparent',
                  },
                  sectionLarge: {
                    minHeight: 300,
                  },
                  openButton: {
                    backgroundColor: "red",
                    borderRadius: 10,
                    marginHorizontal:0,
                    elevation:10,
                    width:100,
                    height:35,
                    justifyContent:"center"
                
                  },
                  textStyle: {
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize:RFValue(14)
                  },
                  
              
                });
                