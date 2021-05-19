    import React,{useState,useEffect,useRef} from 'react'
    import {Text,View,Dimensions,ImageBackground, Image,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,Modal,Alert,ScrollView,FlatList} from 'react-native';
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
    import * as Animatable from 'react-native-animatable';
    import Snackbar from 'react-native-snackbar';
    import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
    import LottieView from 'lottie-react-native';

    import AsyncStorage from '@react-native-community/async-storage';
import Premios from './Premios';



                                   

                                    const Salas = ({navigation,socket,modalVisible3,setModalVisible3,modalVisibleTorneo, setModalVisibleTorneo,modalVisiblePremio,setModalVisiblePremio,mySound,setCambio}) => {

                                        const [botonpremio,setBotonPremio]=useState(require('../assets/fondos/torneo/premio.png'));
                                        const [usuario,setUsuario]=useState('');
                                        const [estado,setEstado]=useState(false);
                                        const [salas,setSalas]=useState([
                                      ]);
                                      const [amarillo,setAmarillo]=useState(0);
                                      const [blanco,setBlanco]=useState(0);
                                      const [rojo,setRojo]=useState(0);
                                      const [morado,setMorado]=useState(0);
                                      const [id,setId]=useState('');

                                        const [copiasalas,setCopiaSalas]=useState([]);
                                        const [carga, setCarga] = useState(false);
                                        const isMounted = useRef(false);
                                        const isMounted1 = useRef(false);
                                        const isMounted2 = useRef(false);


                                        const cargar=async()=>{
                                          mySound.play();

                                          const id=await AsyncStorage.getItem("id");
                      
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

                                    


/*                                             setModalVisiblePremio(!modalVisiblePremio);
 */         

                                              setModalVisibleTorneo(!modalVisibleTorneo)
                                              navigation.navigate('Calificar');
                                            mySound.stop();
                                            setCambio(0);
                                            
                                            setBotonPremio(require('../assets/fondos/torneo/premio.png'))
                                          
                                          }

                                        const JuegoPublico=async(cod,color)=>{


                                          setEstado(true);

                                          if(color=='morado' && morado<1){

                                            Snackbar.show({
                                              text: 'Maiz insuficiente. Mínimo 1 morado',
                                            
                                              duration: Snackbar.LENGTH_SHORT,
                                            });         
                                            setCarga(false);
                                  
                                             setEstado(false);

                                            return;

                                          }

                                          if(color=='blanco' && blanco<1){
                                            Snackbar.show({
                                              text: 'Maiz insuficiente. Mínimo 1 blanco',
                                            
                                              duration: Snackbar.LENGTH_SHORT,
                                            });   
                                            setCarga(false);

                                            setEstado(false);

                                            return;

                                          }

                                          if(color=='rojo' && rojo<1){
                                            Snackbar.show({
                                              text: 'Maiz insuficiente. Mínimo 1 rojo',
                                            
                                              duration: Snackbar.LENGTH_SHORT,
                                            });   
                                            setCarga(false);

                                            setEstado(false);

                                            return;

                                          }


                                        await AsyncStorage.removeItem('creadormaiz');
                                        const id_usuario=await AsyncStorage.getItem("id");

                                        setCarga(true);
                                          const controller = new AbortController();
                                          const { signal } = controller;
                                     
                                          
                                    setTimeout(
                            
                                                                
                                      () => controller.abort()
                                    
                                      , 6000);
                            
                                    fetch('https://api-loteria-heroku.herokuapp.com/descontar/entra_sala/'+`${id}`,{

                                      method:"PUT",
                                      headers:{
                                        'Content-Type': 'application/json'
                                          },   body:JSON.stringify({
                                           
                                            "color":color,
                                            "id_usuario":id_usuario
                                          }),
                                      signal
                                      }).then(res=>res.json())
                                      .then(data=>{
                                        
                                        setCambio(0);
                                        mySound.stop();
                                        Jugar(cod,color)
                                     
                            
                                      }).catch((error)=>{
                                        setCarga(false);
                                        setEstado(false);
                                        Snackbar.show({
                                          text: 'Ocurrió un error, revise su conexión de internet.',
                                        
                                          duration: Snackbar.LENGTH_SHORT,
                                        });
                            
                                      })
                                  
                                        }




                                        const Jugar=async(cod,color)=>{

                                       

                                          console.log(cod);
                                          await AsyncStorage.setItem('CodSala',cod);
                                          const data={nombre:usuario,sala:cod}
                                  
                                          socket.emit('publico',data)

                                          socket.on('iniciado', error=>{

                                            if(error){
                                              setCarga(false);

                                              setEstado(false);
                                              Snackbar.show({
                                                text: `${error}`,
                                              
                                                duration: Snackbar.LENGTH_SHORT,
                                              });
                                
                                            }
                                          })

                                          socket.on('salaexistente',async()=>{
                                            setCarga(false);

                                              setEstado(true);
                                              setModalVisible3(!modalVisible3);

                                            setModalVisibleTorneo(!modalVisibleTorneo);
                                
                                
                                          })
                                       


                                        }




                                        //Usar este llenar el arreglo con las salas creadas desde el panel
                                    /*     useEffect(() => {
                                         
                                          const copia=[
                                            {nombre:'Martillo',cantidad:0,codigo:'SWERTG',figuras:1,color:'#AA0000'},
                                            {nombre:'Reloj',cantidad:0,codigo:'DSXCVB',figuras:2,color:'#DBDEE3'},
                                            {nombre:'Premio',cantidad:0,codigo:'QTRECB',figuras:3,color:'#660080'},
                                            {nombre:'Teclado',cantidad:0,codigo:'QTRECB',figuras:4,color:'#C98B2E'},
                                          ]

                                          setSalas(copia);

                                        }, []) */

                                        useEffect(() => {
                                         
                                          
                                          socket.emit('envioreal');



                                        }, [])

                                        useEffect(() => {
       
                                         
                                          isMounted2.current=true;
                                            console.log('recibo salas: XD')
                                          socket.on('cantidad',({cantidad,sala,cod,es,color,fondo}) => {
                                        

                                            if(isMounted2.current){
                                                if(es){
                                                
                                          let nuevoarray={nombre:sala,cantidad:cantidad,codigo:cod,color:color,fondo:fondo};
                                            
                                         
                                          setSalas(anterior=>[...anterior,nuevoarray]) 
                                                  
    
                                                }
                                              }

                                

                                            })

                                            return function cleanup() {
                                              console.log('desmontado en Sala mostrar sala')

                                              isMounted2.current = false                                            
                                            }

                                 
                                        },[])


                                     


                                        useEffect(() => {
                                        
                                         
                                          isMounted1.current = true; 

                                          
                                         
                                         
                                          socket.on('aumentarcantidad',({cantidad,sala,cod}) => {

                                            if(isMounted1.current){
                                            console.log('salas: '+salas);

                                        /*     let copia = [...salaglobal];
                                            setSalas(copia); */

                                            salas.map(function(dato,index){
                                              
                                              if(dato.codigo===cod && cantidad>0){
                                                let copia2 = [...salas];
                                                
                                              copia2[index].cantidad = cantidad;
                                       
                                              setSalas(copia2);
                                              copia=[];
                                              }
                                        
                                            
                                          })
                                        } 
                                  
     
                                            
                                          });
                                          return function cleanup() {
                                            console.log('desmontado en Sala aumentar cantidad')

                                            isMounted1.current = false                                            
                                          }
                                  
                                        },[salas]) 



                                        useEffect(() => {
                                          
                                          isMounted.current = true; 

                                          
                                         
                                          socket.on('eliminasala',({cantidad,sala,cod}) => {

                                            if(isMounted.current){

                                              
                                              
                                            setSalas((item)=>{
                                              return item.filter(item=>item.codigo!=cod);          
                                              })
                                            }

                                          
                                        });
                                     
                                        return function cleanup() {
                                          console.log('desmontado en Sala eliminar sala')

                                          isMounted.current = false                                            
                                        }
                                        }, [salas])
                                       




                                        useEffect(() => {
                                        
                                          socket.on('lleno', error=>{

                                            if(error){
                                              setCarga(false);
                                              setEstado(false);
                                              socket.emit('envioreal');
                                              Snackbar.show({
                                                text: `${error}`,
                                              
                                                duration: Snackbar.LENGTH_SHORT,
                                              });
                                
                                            }
                                          })

                                        }, [])



                                        useEffect(() => {
    
                                            const nom=async()=>{
                                              const nombre=await AsyncStorage.getItem("nombre")
                                              setUsuario(nombre);
                                        
                                            }
                                          nom();
                                    
                                        }, [])


                                        return (
                                        
                                    <ImageBackground  source={require('../assets/fondos/torneo/fondo.png')} style={{flex:1,alignContent:"center",alignItems:"center"}} >




                        <Image source={require('../assets/fondos/torneo/volcan.png')}  resizeMode="contain" style={{bottom:'-35%',width:'100%',height:'100%'}} />

                        <Image source={require('../assets/fondos/torneo/luz.png')}   style={{bottom:'100%',width:'100%',height:'100%'}} />                                       
                            
                                        

                            <Image source={require('../assets/fondos/torneo/cerro.png')}  resizeMode="contain" style={{bottom:'160%',width:'100%',height:'100%'}}/>                                       
                              
                            <Image source={require('../assets/fondos/torneo/nubes.png')} resizeMode="contain" style={{bottom:'290%',width:'100%',height:'10%'}} />     


                                                <View style={{bottom:'305%',width:'100%',height:'20%',alignContent:"center",alignItems:"center"}} >

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


                           <Image source={require('../assets/fondos/torneo/titulo.png')} resizeMode="contain" style={{right:'15%',bottom:'315%',width:'100%',height:'5%'}} />     
 
                      



                                            
                                   
    
                              <View    style={{backgroundColor:'#321C53',bottom:'313%',width:'83%',height:'52%',alignItems:"center"}} >



                                                                            
                                    
                                    

                                    
                                                                        <View style={{width:'100%',justifyContent:'center'}}>


                                                                          
                                                                                          <FlatList
                                                                                              distanceBetweenItem={12}
                                                                                              data={salas}
                                                                                              keyExtractor={item => item.codigo}

                                                                                              renderItem={({item}) => 
                                                                                              
                                                                                              

                                                                                              
                                                                                              
                                                                                             
                                                                                              <TouchableOpacity
                                                                                              onPress={()=>JuegoPublico(item.codigo,item.color)}
                                                                                               disabled={estado}

                                                                                              >

                                                                                                <Animatable.View animation="zoomIn" 
                                                                                                style={{width:'100%',alignItems:'center'}}
                                                                                                >

                                                                                              <View   style={{marginTop:'5%',width:'90%',height:50,backgroundColor:item.fondo,borderRadius:10}}>

                                                                                     
                                                                                              <View  resizeMode="contain" style={{bottom:'-15%',left:'17%',width:'60%',height:'65%',borderRadius:8,backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center"}} >
                                                      
                                                                                                                                        <Text style={{fontSize:RFValue(15)}} >{item.nombre}</Text>
                                                                                                                                          </View>
                                                      
                                                      
                                                                                                                                          <View style={{bottom:'50%',left:'81%',width:'15%',height:'65%',borderRadius:8,backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center"}}>
                                                                                                                                          <Text style={{fontSize:RFValue(12)}} >{item.cantidad}/12</Text>
                                                      
                                                                                                                                          </View>
                                                      
                                                                                                                                          <ImageBackground source={require('../assets/fondos/torneo/circulo.png')} resizeMode="contain"   style={{bottom:'112%',left:'1%',width:'39%',height:'80%'}}>
                                                      
                                                                                                                                          </ImageBackground>
                                                      
                                                                                            
                                                                        
                                                      
                                                                                              </View>
                                                                                              </Animatable.View>

                                                                                            </TouchableOpacity>
                                                                                            
                                                                                            }
                                                                                            
                                                                                            />
                                                                                                  </View>                          

                                                                                  

                                                                                  
                                                                              
                                                                             
                                                                          
                                                                      

                                                                 

                                                                          </View>
                              
                                                                        

                                    

                                          

                                            <TouchableWithoutFeedback
                                             onPressIn={()=>presionarBotonPremio()}
                                             onPress={()=>soltarBtnPremio()} 
                                             
                                            >
                                                <Image  source={botonpremio}  resizeMode="contain" style={{bottom:'311%',width:'45%',height:'6%'}}  />
                                            </TouchableWithoutFeedback>


                                          {carga&&


                                          
                                                <View style={{width:'100%',height:'100%',bottom:'393%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8,zIndex:1}} >
                                                    <View style={{width:'50%',height:'55%',justifyContent:'center'}} >

                                                    <LottieView source={require('../assets/loading.json')} autoPlay loop />


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
                                         
                                        
                                          
                                      }
                                    });


                                    export default Salas




/* 




 {
                                                                              salas.map(sala=>{


                                                                                return(


                                                                                  <TouchableOpacity
                                                                                  onPress={()=>JuegoPublico(sala.codigo)}
                                                                                  >
                                                                                    

                                                                                  

                                                                                  
                                                                                  <ImageBackground source={require('../assets/fondos/torneo/amarillo.png')} resizeMode="contain"       style={{marginLeft:18,marginRight:18,marginTop:'5%',width:wp('70%'),height:50}}>


                                     
                                                                                  <ImageBackground  resizeMode="contain" style={{bottom:'-25%',left:'15%',width:'60%',height:'50%',borderRadius:8,backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center"}} >
                                          
                                                                                                                            <Text style={{fontSize:wp(3)}} >{sala.nombre}</Text>
                                                                                                                              </ImageBackground>
                                          
                                          
                                                                                                                              <ImageBackground style={{bottom:'25%',left:'80%',width:'15%',height:'50%',borderRadius:8,backgroundColor:'white',alignContent:"center",alignItems:"center",justifyContent:"center"}}>
                                                                                                                              <Text style={{fontSize:wp(3)}} >{sala.cantidad}/12</Text>
                                          
                                                                                                                              </ImageBackground>
                                          
                                                                                                                              <ImageBackground source={require('../assets/fondos/torneo/circulo.png')} resizeMode="contain"   style={{bottom:'84%',left:'0%',width:'39%',height:'80%'}}>
                                          
                                                                                                                              </ImageBackground>
                                          
                                                                                
                                                            
                                          
                                                                                  </ImageBackground>
                                                                                  </TouchableOpacity>
                                                                                  
                                                                          
                                                                                )
                                                                          
                                                                          
                                                                              })
                                                                          } 







   <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisibleTorneo(!modalVisibleTorneo);
        }}
      >
        <Text style={styles.textStyle}>Cerrar</Text>
      </TouchableHighlight>




  } */