                                      import React,{useEffect,useState,useRef} from 'react';
                                      import { View, Text, SafeAreaView,StyleSheet,Animated,ImageBackground,Image,Modal,ScrollView,TouchableWithoutFeedback,Dimensions,TouchableOpacity,Linking} from 'react-native';
                                      import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
                                      import Timeline from 'react-native-timeline-flatlist';
                                      import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                      import LottieView from 'lottie-react-native';
                                      import Sound from 'react-native-sound';
                                      import RNPickerSelect from 'react-native-picker-select';
                                      import ImageViewer from 'react-native-image-zoom-viewer';
                                      import ImageZoom from 'react-native-image-pan-zoom';
                                      import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
                                      import Llegar from 'react-native-vector-icons/FontAwesome5';

                                      import Snackbar from 'react-native-snackbar';
                                      import AsyncStorage from '@react-native-community/async-storage';
                                      var count=0;
                                      var siguienteS;
                                      var atrasS;
                                      var data_amarillo=[];
                                      var advertencia;

                                      var data_morado=[];

                                      var data_blanco=[];
                                      var ismounted=0;
                                       var items=[
                                      



                                      ]

                                      var items2=[




                                      ] 
              
            





                const Calificar = ({navigation}) => {

                  const placeholdermunicipio = {
                    label: '',
                    value: null,
                    color: '#9EA0A4',
                  };
                  const [isMounted,setIsMounted]=useState(false);
                  const [cooredenada,setCoordenada]=useState(14.83584758900336);
                  const [cooredenada1,setCoordenada1]=useState(-91.52109149990743);
                  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                  const latLng = `${cooredenada},${cooredenada1}`;
                  const label = 'Custom Label';
                  const url = Platform.select({
                    ios: `${scheme}${label}@${latLng}`,
                    android: `${scheme}${latLng}(${label})`
                  });





               
                  const [selectedValue, setSelectedValue] = useState('');
                  const [selectedValue2, setSelectedValue2] = useState('');

                  const [estadocambio,setEstadoCambio]=useState(false);
               /*    const [estadocambio2,setEstadoCambio2]=useState(false);
                  const [modalImagen,setModalImagen]=useState(false);

                  const [loadCambio,setLoadCambio]=useState(require('../views/Tabs/assets/carga.json')); */

                  const [amarillo,setAmarillo]=useState(0);
                  const [blanco,setBlanco]=useState(0);
                  const [rojo,setRojo]=useState(0);
                  const [morado,setMorado]=useState(0);
                /*   const [idUser,setIdUser]=useState('');
                  const [nombrePremio,setNombrePremio]=useState('');
                  const [ayuda,setAyuda]=useState(false);
                  const [tiempo,setTiempo]=useState('');
                  const [fecha,setFecha]=useState('');
                  const [departamento,setDepartamento]=useState('');
                  const [direccion,setDireccion]=useState('');
                  const [color,setColor]=useState('');
                  const [maiz,setMaiz]=useState(null);
                  const [imagen,setImagen]=useState('');
                  const [cupon,setCupon]=useState(null);
                  const [idCupon,setIdCupon]=useState(''); */

                  const [id2,setId2]=useState('');
                  const [loadCambio,setLoadCambio]=useState(require('../views/Tabs/assets/carga.json'));
                  const [nivelAnterior,setNivelAnterior]=useState(4);
                  const [nivelSiguiente,setNivelSiguiente]=useState(2);
                  const [nivelActual,setNivelActual]=useState(1);

                  const [dataglobal,setDataGlobal]=useState([]);
                  const [siguiente,setSiguiente]=useState(require('../views/Tabs/assets/fondos/premios/siguiente.png'));
                  const [atras,setAtras]=useState(require('../views/Tabs/assets/fondos/premios/atras.png'));
                  const [circulo,setCirculo]=useState(require('../views/Tabs/assets/fondos/premios/estrellad.png'));
                  const [icon,setIcon]=useState(require('../views/Tabs/assets/fondos/premios/cuadrado1.png'));
                  const [icon2,setIcon2]=useState(require('../views/Tabs/assets/fondos/premios/cuadrado2.png'));
                  const [icon3,setIcon3]=useState(require('../views/Tabs/assets/fondos/premios/cuadrado3.png'));
                  const [icon4,setIcon4]=useState(require('../views/Tabs/assets/fondos/premios/cuadrado4.png'));

                                        const spinValue = useRef(new Animated.Value(0)).current;
                            

                                        Animated.timing(
                                          spinValue,
                                        {
                                          toValue: 100,
                                          duration: 180000,
                                          useNativeDriver: true // Add This line
                              
                                        }
                                  ).start()
        
        
                                    const spin = spinValue.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: ['0deg', '360deg']
                                })

                    //time e imageurl los unicos usados
                       

                

            

                          const Departamentos=async()=>{

                          
                  
                            await setEstadoCambio(!estadocambio)

                                

                          await  fetch('https://secret-brushlands-88440.herokuapp.com/departamentos',{
                            method: "GET",
                            headers: {"Content-type": "application/json;charset=UTF-8"}                                             
                          
                          })
                          .then(response => response.json()) 
                          .then(async(json) =>{
                            items=[];

                              json.map(async(dato)=>{
                                console.log('Lista de departamentos'+dato);

                              await  items.push({label:dato.departamento,value:dato.valor})
 

                              })

                       


                          }).catch((error)=>{
                            setEstadoCambio(false)

                            Snackbar.show({
                              text: 'Error al cargar Departamentos.',
                            
                              duration: Snackbar.LENGTH_LONG,
                            });   
                                      
                          
                          });   

                          }

                          const Municipios=async()=>{
                           
                            await setEstadoCambio(!estadocambio)


                          await  fetch('https://secret-brushlands-88440.herokuapp.com/municipios/dep/xela',{
                            method: "GET",
                            headers: {"Content-type": "application/json;charset=UTF-8"}                                             
                            
                          })
                          .then(response => response.json()) 
                          .then(async(json) =>{
                            items2=[];
                            json.map(async(dato)=>{

                              console.log('Lista de municipioss'+JSON.stringify(dato));

                             await items2.push({label:dato.municipio,value:dato.valorM})


                            })
                            cargarr(items2[0].value)

                          }).catch((error)=>{
                            setEstadoCambio(false)

                            Snackbar.show({
                              text: 'Error al cargar Municipios.',
                            
                              duration: Snackbar.LENGTH_LONG,
                            });   
                                      
                          
                          });   

                          }

                      

                          const Municipios2=async(itemValue)=>{
                            data_amarillo=[];
                            data_blanco=[];
                            data_rojo=[];
                            data_morado=[];
                           await setDataGlobal([]);
                            await setSelectedValue(itemValue)
                            
                      

                          await  fetch('https://secret-brushlands-88440.herokuapp.com/municipios/dep/'+`${itemValue}`,{
                            method: "GET",
                            headers: {"Content-type": "application/json;charset=UTF-8"}                                             
                            
                          })
                          .then(response => response.json()) 
                          .then(async(json) =>{
                            items2=[]
                           
                           
                            json.map(async(dato)=>{
                              console.log('datos2: '+JSON.stringify({label:dato.municipio,value:dato.valorM}))

                             await items2.push({label:dato.municipio,value:dato.valorM})


                            })

                            setSelectedValue2(items2[0].value)

                          }).catch((error)=>{
                            setEstadoCambio(false)

                            Snackbar.show({
                              text: 'Error al cargar Municipios.',
                            
                              duration: Snackbar.LENGTH_LONG,
                            });   
                                      
                          
                          });   

                          }


                          const funciones=async()=>{
                           await setIsMounted(true)
                            await Departamentos();
                           await Municipios();
                   

                          
                          }
                          useEffect(() => {
                         funciones();
                          
                         }, [])


                     



                          const cargarr=async(itemValue)=>{

/*                             await setSelectedValue2(itemValue);
 */                           await setIsMounted(true)
                            data_amarillo=[];
                            data_blanco=[];
                            data_rojo=[];
                            data_morado=[];
                           await setDataGlobal([]);

                           await setEstadoCambio(!estadocambio)
                           /*  const controller = new AbortController();
                            const { signal } = controller;
                       
                            
                                   setTimeout(
                           
                                                               
                                     () => controller.abort()
                                   
                                     , 15000); */

                          await  fetch('https://secret-brushlands-88440.herokuapp.com/premios/dep/'+`${itemValue}`,{
                            method: "GET",
                            headers: {"Content-type": "application/json;charset=UTF-8"}                                             
                          /*   ,signal */
                          })
                          .then(response => response.json()) 
                          .then(async(json) =>{
                            
                            console.log('listado de premios: '+JSON.stringify(json))
                            data_amarillo=[];
                            data_blanco=[];
                            data_rojo=[];
                            data_morado=[];
                           await setDataGlobal([]);

                            json.map(item=>{
                              if(item.tipo==='amarillo'){
                                data_amarillo.push(

                             {_id:item._id,nombrePremio:item.nombre,time:item.descripcion,title:'',description:' ',lineColor: '#FF3AA0', icon: icon,
                             imageUrl:item.imagen,imagen2:item.imagen2,imagen3:item.imagen3,imagen4:item.imagen4,longitud:item.longitud,latitud:item.latitud,fecha:item.vencimiento, departamento:item.departamento,direccion:item.direccion, color:item.tipo, maiz:item.fichas,cupones:item.cantidad
                            
                            })

                              }
                              
                              if(item.tipo==='morado'){
                                data_morado.push(
                                  {_id:item._id,nombrePremio:item.nombre,time:item.descripcion,title:'',description:' ',lineColor: '#FF3AA0', icon: icon2,
                                  imageUrl:item.imagen,imagen2:item.imagen2,imagen3:item.imagen3,imagen4:item.imagen4,longitud:item.longitud,latitud:item.latitud,fecha:item.vencimiento, departamento:item.departamento,direccion:item.direccion, color:item.tipo, maiz:item.fichas,cupones:item.cantidad
                                 
                                 })

                              }
                              
                              if(item.tipo==='blanco'){
                                data_blanco.push(
                                  {_id:item._id,nombrePremio:item.nombre,time:item.descripcion,title:'',description:' ',lineColor: '#FF3AA0', icon: icon3,
                                  imageUrl:item.imagen,imagen2:item.imagen2,imagen3:item.imagen3,imagen4:item.imagen4,longitud:item.longitud,latitud:item.latitud,fecha:item.vencimiento, departamento:item.departamento,direccion:item.direccion, color:item.tipo, maiz:item.fichas,cupones:item.cantidad
                                 
                                 })

                              }
                              
                              if(item.tipo==='rojo'){

                                data_rojo.push(
                                  {_id:item._id,nombrePremio:item.nombre,time:item.descripcion,title:' ',description:' ',lineColor: '#FF3AA0', icon: icon4,
                                  imageUrl:item.imagen,imagen2:item.imagen2,imagen3:item.imagen3,imagen4:item.imagen4,longitud:item.longitud,latitud:item.latitud,fecha:item.vencimiento, departamento:item.departamento,direccion:item.direccion, color:item.tipo, maiz:item.fichas,cupones:item.cantidad
                                 
                                 })

                              }


                            })  

                     
                            setDataGlobal(data_amarillo) 
                            setIsMounted(false)
                            setEstadoCambio(false)
                            
                            return;

                          } ).catch((error)=>{
                            setEstadoCambio(false)

                            Snackbar.show({
                              text: 'Error al cargar premios.',
                            
                              duration: Snackbar.LENGTH_LONG,
                            });   
                                      
                          
                          });   
                         
        
                          }

                          
      


                          useEffect(() => {
                                 
                            siguienteS = new Sound('adelante.mp3',Sound.MAIN_BUNDLE,(error)=>{
                              if(error){
                              console.log('Error loading sound: ' + error);
                              return;
                              }else{
                              siguienteS.setVolume(1);
                              siguienteS.stop();
                              
                              }
                              });


                              atrasS = new Sound('atras.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                if(error){
                                console.log('Error loading sound: ' + error);
                                return;
                                }else{
                                atrasS.setVolume(1);
                                atrasS.stop();
                                
                                }
                                });


                             

                          }, [])

                          const Cambio=(valor)=>{

                            count=count+(valor);

                            if(count>3){
                              count=0;
                              
                            }
                          
                          console.log(count)            
                
                            if(count<0){
                              console.log('entra a negativo: '+count)
                              count=3;
                              
                            }

                              if(count==0){
                                setNivelActual(1);
                                setNivelSiguiente(2)
                                setNivelAnterior(4)
                                setDataGlobal([])
                                let copia1=[...data_amarillo]
                              
                                 setDataGlobal(copia1) 
                                 setCirculo(require('../views/Tabs/assets/fondos/premios/estrellad.png'))

                              }

                              if(count==1){
                                setNivelActual(2);
                                setNivelSiguiente(3)
                                setNivelAnterior(1)
                                setDataGlobal([])
                                let copia2=[...data_morado]
                                console.log('valor morado: '+data_morado)
                                console.log('premios morados: '+copia2)
                                 setDataGlobal(copia2) 
                                setCirculo(require('../views/Tabs/assets/fondos/premios/estrellae.png'))
                              }

                              if(count==2){
                                setNivelActual(3);
                                setNivelSiguiente(4)
                                setNivelAnterior(2)
                                setDataGlobal([])
                                let copia3=[...data_blanco]
                              
                                 setDataGlobal(copia3) 
                                 setCirculo(require('../views/Tabs/assets/fondos/premios/estrellaf.png'))

                              }

                              if(count==3){
                                setNivelActual(4);
                                setNivelSiguiente(1)
                                setNivelAnterior(3)
                                setDataGlobal([])
                                let copia4=[...data_rojo]
                              
                                 setDataGlobal(copia4) 
                                 setCirculo(require('../views/Tabs/assets/fondos/premios/estrellag.png'))

                              }

                          }


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
                              setId2(data[0]._id);
                                             
                       
                            }
                            ).catch((error)=>{
                                                
                              Snackbar.show({
                                text: 'Ocurrió un error',
                              
                                duration: Snackbar.LENGTH_LONG,
                              }); 


                            });

                          }

                          useEffect(() => {
                         cargar()

                          }, [])


                          const datos=async(data)=>{

                  /*           setTiempo('');
                            setFecha('')
                            setDepartamento('');
                            setDireccion('');
                            setNombrePremio('');
                            setColor('');
                            setImagen('');
                            setIdCupon('');
                            setMaiz(null);
                            setCupon(null);

                            setTiempo(data.tiempo);                         
                            setImagen(data.imagen);
                            setFecha(data.fecha);
                            setDepartamento(data.departamento);
                            setDireccion(data.direccion);
                            setNombrePremio(data.premio_nombre);
                            setColor(data.color);
                            setMaiz(data.maiz);
                            setCupon(data.cupon)
                            setIdCupon(data._id); */
                           
                            const img=[];
                            img.push(
                              {url:data.imagen2},{url:data.imagen3},
                              {url:data.imagen4},
                              )

                              const lat=await parseFloat(data.latitud);
                              const long=await parseFloat(data.longitud);
                            const premio=await{
                              
                            id_premio:data._id,cupones:data.cupon,maiz:data.maiz,color:data.color,premio:data.premio_nombre,departamento:data.departamento,
                            fecha:data.fecha,imagenes:data.imagen,img,
                            latitud:lat,longitud:long,descripcion:data.tiempo
                            
                            }

                            navigation.navigate('DetalleProducto', premio)
                         }


                        


                           

                            const Siguiente=()=>{

                            setSiguiente(require('../views/Tabs/assets/fondos/premios/asiguiente.png')) 

                            }

                            const SoltarSiguiente=()=>{

                              setSiguiente(require('../views/Tabs/assets/fondos/premios/siguiente.png')) 
                              

                              }



                            const Atras=()=>{

                              setAtras(require('../views/Tabs/assets/fondos/premios/aatras.png')) 



                            }

                            
                            const SoltarAtras=()=>{

                              setAtras(require('../views/Tabs/assets/fondos/premios/atras.png')) 
                        


                            }
/* 
                            const aceptar=()=>{

                              setTiempo('');
                              setFecha('')
                              setDepartamento('');
                              setDireccion('');
                              setNombrePremio('');
                              setColor('');
                              setImagen('');
                              setIdCupon('');
                              setMaiz(null);
                              setCupon(null);
                         
                              setAyuda(!ayuda);


                            } */

                          
                        

            const renderDetail = (rowData, sectionID, rowID) => {
              let title = <Text style={[styles.title]}>{rowData.title}</Text>;
              let desc = '';
              if (rowData.description && rowData.imageUrl)
                desc = (
                  <View style={styles.descriptionContainer}>
                    <Image source={{uri:rowData.imageUrl }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>

                  </View>
                );
                  

              return (
                <View style={{ flex: 1 }}>
           
                  {desc}
                </View>
              )
            };



                    

                    return (
                   
                
                     

                 

                    

                      
                          
                          <ImageBackground source={require('../views/Tabs/assets/fondos/premios/fondo.png')} style={{flex: 1,backgroundColor:'white',alignContent:"center",alignItems:"center"}}>
                  


                          <Image source={require('../views/Tabs/assets/fondos/premios/volcan.png')} resizeMode="contain" style={{bottom:'-33%',width:'100%',height:'100%'}} />

<Image source={require('../views/Tabs/assets/fondos/premios/luz.png')}  style={{bottom:'108%',width:'100%',height:'100%'}} />
<Image source={require('../views/Tabs/assets/fondos/premios/cerro.png')} resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}} />




<View style={{bottom:'298%',width:'100%',height:'20%',alignContent:"center",alignItems:"center"}} >

<View style={{left:10,flexDirection:'row',width:'100%',height:'30%',alignContent:'center',justifyContent:'center',alignItems:'center'}}>




                <View  style={{width:'23%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                <ImageBackground source={require('../views/Tabs/assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'82%',height:'100%'}} >
    <Image source={require('../views/Tabs/assets/fondos/premios/estrellar.png')} resizeMode="contain" style={{bottom:'7%',right:'32%',width:'76%',height:'100%'}} />     
    <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                  <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{rojo}</Text>           
                      </View>  
    </ImageBackground>     
                </View>



                <View  style={{width:'23%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                <ImageBackground source={require('../views/Tabs/assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'82%',height:'100%'}} >
    <Image source={require('../views/Tabs/assets/fondos/premios/estrellab.png')} resizeMode="contain" style={{bottom:'7%',right:'32%',width:'76%',height:'100%'}} />     
    <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                  <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{blanco}</Text>           
                      </View>  
    </ImageBackground>     
                </View>


                <View  style={{width:'23%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                <ImageBackground source={require('../views/Tabs/assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'82%',height:'100%'}} >
    <Image source={require('../views/Tabs/assets/fondos/premios/estrellam.png')} resizeMode="contain" style={{bottom:'7%',right:'32%',width:'76%',height:'100%'}} />     
    <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                  <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{morado}</Text>           
                      </View>  
    </ImageBackground>     
                </View>


                <View  style={{width:'23%',height:'98%',justifyContent:'center',alignItems:'center'}} >
                <ImageBackground source={require('../views/Tabs/assets/fondos/torneo/campo.png')} resizeMode="contain" style={{width:'82%',height:'100%'}} >
    <Image source={require('../views/Tabs/assets/fondos/premios/estrella.png')} resizeMode="contain" style={{bottom:'7%',right:'32%',width:'76%',height:'100%'}} />     
    <View  style={{bottom:'75%',left:'40%',width:'40%',height:'45%',alignItems:"center",justifyContent:"center"}} >
                  <Text style={{color:'blue',fontWeight:"bold",fontSize:RFValue(13)}}>{amarillo}</Text>           
                      </View>  
    </ImageBackground>     
                </View>






            

        
</View>
        


                            </View>




    


                    <View style={{bottom:'308%',width:'100%',height:'4.3%' ,justifyContent:'center',alignItems:'center'}}  >
                    <Image source={require('../views/Tabs/assets/fondos/premios/donde.png')} resizeMode="contain" style={{width:'100%',height:'75%',bottom:'20%'}} />

               <View style={{flexDirection:'row',justifyContent:'center'}} >

              
                    <View style={{width:'35%',height:'90%' ,justifyContent:'center',alignItems:"center",backgroundColor:'#E5EAEF',opacity:0.7, borderWidth: 2,
                              borderColor: 'pink',borderRadius:8}}  >
                     <RNPickerSelect

                       
                    placeholder={{}}

                    items={items}
                    onValueChange={itemValue =>
                      
                        
                        Municipios2(itemValue)
                        
                      
                      }
                
                    value={selectedValue}

                   


                     /> 

                            
                      </View>


                      
                      <View style={{width:'14%',height:'100%' ,justifyContent:'center',alignItems:"center"}}  >
                
                <Image source={require('../views/Tabs/assets/fondos/premios/ubicacion.png')} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                            
                      </View>

                      <View style={{width:'35%',height:'90%' ,justifyContent:'center',alignItems:"center",backgroundColor:'#E5EAEF',opacity:0.7, borderWidth: 2,
                              borderColor: 'pink',borderRadius:8}}   >
                      <RNPickerSelect

                       
                    placeholder={{}}

                    items={items2}
                    onValueChange={itemValue =>{
                    
                      if(isMounted===false){
                        setSelectedValue2(itemValue);
                        cargarr(itemValue)

                      }
                    
                    }}
                
                    value={selectedValue2}

                   


                     /> 

                            
                      </View>
              


                      </View>
                    </View>

                    <Image source={require('../views/Tabs/assets/fondos/premios/titulo.png')} resizeMode="contain" style={{width:'100%',height:'3.5%',bottom:'305%'}} />

                    <View style={{bottom:'299%',width:'100%',height:'10%',alignContent:"center",alignItems:"center"}}>


      <View style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:25,width:'90%',height:'100%',bottom:'8%',flexDirection:'row',justifyContent:'center',alignItems:'center'}}  >
      <TouchableWithoutFeedback
      
      onPressIn={()=>Atras()}
      onPressOut={()=>SoltarAtras(-1)} 
      onPress={()=>{Cambio(-1);atrasS.stop();atrasS.play()}}
      >
      <Image source={atras} resizeMode="contain" style={{width:'30%',height:'80%'}} />

      </TouchableWithoutFeedback>
      



        
       <Animated.Image animation="zoomIn" source={circulo} resizeMode="contain" style={{width:'30%',height:'90%',transform: [{rotate: spin}]}} />

       <TouchableWithoutFeedback
         onPressIn={()=>Siguiente()}
         onPressOut={()=>SoltarSiguiente(1)} 
         onPress={()=>{Cambio(1);siguienteS.stop(); siguienteS.play()}}
        >
        <Image source={siguiente} resizeMode="contain" style={{width:'30%',height:'80%'}} />

        </TouchableWithoutFeedback>
                


        </View>
  
                    
        

  
      </View>






      <View style={{bottom:'302%',width:'100%',height:'6%'}} > 

      <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

      <View style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:15,width:'25%',height:'90%',justifyContent:'center',alignItems:'center',marginHorizontal:15}}  >
      <Text style={{fontSize:RFValue(18),fontWeight:'bold'}}>Nivel {nivelAnterior}</Text>

          </View>

          <View style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:1000,width:'10%',height:'90%',justifyContent:'center',alignItems:'center',marginHorizontal:15}}  >
      <Text style={{fontSize:RFValue(20),fontWeight:'bold'}}>{nivelActual}</Text>

          </View>


          <View style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:15,width:'25%',height:'90%',justifyContent:'center',alignItems:'center',marginHorizontal:15}}  >
          <Text style={{fontSize:RFValue(18),fontWeight:'bold'}}>Nivel {nivelSiguiente}</Text>

          </View>
      


      </View>

      
     

      </View>
                   


      <View style={{bottom:'272%',width:'100%',height:'100%' ,alignContent:"center",alignItems:"center"}}>
     
    <Timeline
              style={{maxHeight:'55%',bottom:'30%',width:'90%'}}
              
                  data={dataglobal}
                  circleSize={20}
                  lineWidth={5}
                  circleColor="rgba(0,0,0,0)"
                  lineColor="rgb(45,156,219)"
                riptionStyle={{ color: 'gray' }}
                  options={{
                    style: { paddingTop: 5 },
                    backgroundColor: '#E5EAEF',
                    opacity: 0.7,
                    borderRadius:15,
               
                
                  }}
                  timeStyle={{
                    fontWeight: "bold",
             
                    alignItems:'center',
                    marginRight:'2%',
                    marginLeft:'1%',
                    fontSize:RFValue(13)
                  }}
                  onEventPress={(item) => datos({       

                  _id:item._id,   
                  premio_nombre:item.nombrePremio,                                                                     
                  tiempo:item.time,descripcion:item.description,imagen:item.imageUrl,imagen2:item.imagen2,imagen3:item.imagen3,imagen4:item.imagen4,longitud:item.longitud,latitud:item.latitud,
                  fecha:item.fecha,maiz:item.maiz,departamento:item.departamento,direccion:item.direccion,color:item.color,cupon:item.cupones

                  })}
                  renderDetail={renderDetail}
                  innerCircle={'icon'}
                 
                  detailContainerStyle={{
                    marginBottom: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: '#BBDAFF',
                    borderRadius: 10,
                  }}
                  columnFormat="two-column"

                />
    </View>
       



    {
                                                      estadocambio&& 
                                                      <View style={{width:'100%',height:'100%',bottom:'443.7%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8}} >
                                                    <View style={{width:'80%',height:'55%',justifyContent:'center'}} >
                                                    <LottieView 
                                                    
                                                    
                                                    source={loadCambio}  autoPlay loop />

                                                    </View>
                                                    </View>
                                             } 
                                               

          {/*  <View style={{bottom:'302%'}}>
             <TimeLine/>
       
          </View>  */}


                         {/*               <Modal
                                      animationType="slide"
                                      transparent={false}
                                      visible={ayuda}
                                      onRequestClose={() => {
                                        setAyuda(!ayuda)
                                      }}
                                    >


                                         
                            <View style={{  flex:1,alignItems: "center",backgroundColor:'#E5EAEF',justifyContent:'center'}} >

                                              

                   

                            
                            <View style={{flexDirection:"row"}}  >
                            <Text style={{fontWeight:'bold',fontSize:RFValue(13)}} >Fecha de vencimiento: </Text>
                            <Text style={{fontSize:RFValue(13)}} >{fecha}</Text>

                            </View>

                            <View style={{flexDirection:"row"}}  >
                              <Text style={{fontWeight:'bold',fontSize:RFValue(13)}} >Estrellas necesarias: </Text>
                              <Text style={{fontSize:RFValue(13)}} >{maiz} {color}(s)</Text>

                                      </View>
                              <Text style={{fontWeight:'bold',fontSize:RFValue(13),textAlign: "center"}}>{departamento}:{direccion}</Text>
                              <TouchableOpacity
                    onPress={()=>setModalImagen(true)}
                    style={{width:'50%',height:'20%',alignItems:'center',justifyContent:'center',marginVertical:8
                }}
                    >
                    <Image style={{width:'100%',height:'100%'}} resizeMode='contain' source={{uri:imagen}}   />

                    </TouchableOpacity>
                    <Modal 
                    visible={modalImagen} transparent={false}
                     onRequestClose={() => {
                      setModalImagen(!modalImagen)
                    }}
                   >
                     <View style={{flex:1,backgroundColor:'black'}} >

                     
                 <ImageZoom cropWidth={Dimensions.get('window').width}
               cropHeight={Dimensions.get('window').height}
               imageWidth={200}
               imageHeight={200}>
        <Image style={{width:'100%', height:'100%'}}
               source={{uri:imagen}}/>
                </ImageZoom>
                </View>

                     </Modal>







                     <View style={[styles.section, {height: '35%'}]}>
 
 <MapView
     style={{flex: 1}}
     provider={PROVIDER_GOOGLE}
         initialRegion={{
         latitude: cooredenada,
         longitude: cooredenada1,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
         }}
         >
             
       <Marker
       
       coordinate={{
         latitude: cooredenada,
         longitude: cooredenada1,
       }}
       />

      
         </MapView>
  <View style={{alignItems:'center',}}>


  <TouchableOpacity

  style={{flexDirection:'row',justifyContent:'center',alignItems:'center',top:5, alignItems: "center",width:110,
  backgroundColor: "blue",borderRadius:8}}
  onPress={()=>Linking.openURL(url) 
  }
  >
   
    <Llegar
      name="walking" 
      color='white'
      size={26}
      >
       </Llegar>
       <Text size={15} style={{color:'white',marginLeft:5}}  >Indicaciones</Text>



 

  </TouchableOpacity>
  </View>

 </View>









                            <Text style={{fontWeight:'bold',fontSize:RFValue(13),marginVertical:'1%'}}>¿Desea adquirir este cupón?</Text>

                            <View style={{flexDirection:"row"}}  >
                            <TouchableOpacity
                                  style={styles.openButton }
                                   onPress={() => DescontarMaiz() } 
                                >
                                  <Text style={styles.textStyle}>Aceptar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={styles.openButton }
                                   onPress={() => aceptar()} 
                                >
                                  <Text style={styles.textStyle}>Cancelar</Text>
                                </TouchableOpacity>
                            </View> 
                              

                            
                            </View>             
                                     
                                                                             
                                    </Modal> */}

                                   













                                          
                              </ImageBackground>
               
                     
            
                         

           

      



     



             
                    
                    )
                }

                export default Calificar

                const styles = StyleSheet.create({
                  card: {
                    height: 150,
                    marginVertical: 10,
                    flexDirection: 'row',
                    shadowColor: '#999',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    borderRadius:8
                  
                  },
                  cardImgWrapper: {
                    flex: 1,
                  },
                  cardImg: {
                    height: '100%',
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 1,
                    
                  },
                  cardInfo: {
                    flex: 2,
                    padding: 10,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderBottomRightRadius: 8,
                    borderTopRightRadius: 8,
                    backgroundColor: '#fff',
                  },
                  cardTitle: {
                    fontWeight: 'bold',
                  },
                  cardDetails: {
                    fontSize: 12,
                    color: '#444',
                  },
                  list: {
                    flex: 1,
                    marginTop: 20,
                  },
                  title: {
                    fontSize: wp(5),
                    fontWeight: 'bold',
                  },
                  descriptionContainer: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent:"center"
                   
                 
                  },
                  image: {
                    width: 100,
                    height:100,
                   resizeMode:"contain"
                
                  },
                  textDescription: {
                    marginLeft: 0,
                    color: 'black',
                  },
                  openButton: {
                    backgroundColor: "red",
                    borderRadius: 20,
                    padding: '5%',
                    marginHorizontal:'2%',
                    elevation: 2,
                    width:'30%',
                    height:'20%',
                    justifyContent:"center"
                
                  },
                  textStyle: {
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize:RFValue(15)
                  },
                  section: {
                    width:'100%',
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#cccccc',
                    backgroundColor: '#DADFE3',
                  }
                });
                


     
          