              import  React,{useState,useEffect} from 'react';
              import { Text, View, Image, TouchableWithoutFeedback,ImageBackground,Modal,Switch,TouchableOpacity,Keyboard} from 'react-native';
              import {TextInput,Button} from 'react-native-paper';
              import AsyncStorage from '@react-native-community/async-storage';
              import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
              import NumericInput from 'react-native-numeric-input'
              import Snackbar from 'react-native-snackbar';
              import LottieView from 'lottie-react-native';
              import Figuras from './Figuras';
              import NetInfo from '@react-native-community/netinfo';


                      import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                      import Loading from '../../Loading';


                 
        

                    const ConfiguracionSala = ({socket,modalVisibleSala,setModalVisibleSala, modalVisible3,setModalVisible3,mySound,setCambio}) => {
                        
                        const [usuario,setUsuario]=useState('');
                        const [mesa, setMesa] = useState('');
                        const [tiempo, setTiempo] = useState(1);
                        const [switchValue, setSwitchValue] = useState(false);
                        const [botoncrear,setBotonCrear]=useState(require('../assets/fondos/crear/bcrear.png'));
                        const [estadoalerta,setEstadoAlerta]=useState(false);
                        const [color1,setColor1]=useState('black');
                        const [color2,setColor2]=useState('black');
                        const [color3,setColor3]=useState('black');
                        const [color4,setColor4]=useState('black');
                        const [figuras, setFiguras] = useState(false);
                        const [connectStatus,setConnectStatus]=useState(false);
                        const [estadoboton, setEstadoBoton] = useState(false);
                        const [carga, setCarga] = useState(false);

                        const [amarillo,setAmarillo]=useState(0);
                        const [blanco,setBlanco]=useState(0);
                        const [rojo,setRojo]=useState(0);
                        const [morado,setMorado]=useState(0);

                        const [valorFigura,setValorFigura]=useState(8); // este es el valor a mandar al servidor...
                        const [estadofigura,setEstadoFigura]=useState();
                        const [data, setData] = React.useState({
                         mesa:''
                      });

                        useEffect(() => {
                          mySound.play()
                          setColor4('red')
                          setValorFigura(8);
                              
                                             
                        }, [])



                      




                        const cargar=async()=>{

                          const id=await AsyncStorage.getItem("id");
      
                          console.log('entra')
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
                   
                     
                          }
                          )
      
                        }
      
                        useEffect(() => {
                       cargar()
      
                        }, [])

                   
                        const nombreMesa=(nombre)=>{
                      
                         

                        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ /s]*$/.test(nombre)) {

                          setMesa(nombre);
                          setData({
                            ...data,
                            mesa:nombre
  
                           })               
                           
                          }

                       

                        }


                    const EstadoFiguras=(valorestado)=>{

                      setFiguras(!figuras);
                      setEstadoFigura(valorestado);



                    }


                      const checkMalasPalabras = (palabra) => {
                        const regex = /\[?\b(?:puto|puta|mierda|serote|culo|mala|caca|cacas|kaka|kakas|menso|sopenco|)\b\]?/gi;
                    
                        
                     
                        const aux= palabra.replace(regex, '');
                        console.log('check: '+aux)
                      return aux.indexOf(palabra);
                      }

                      const presionarBotonCrear=()=>{

                        setBotonCrear(require('../assets/fondos/crear/acrear.png'))
                        
                        }
                        


                        
                        const soltarBtnCrear=()=>{


                         


                          setCarga(true);
                          setBotonCrear(require('../assets/fondos/crear/bcrear.png'))
                          setEstadoBoton(true);

              
                        
                          if(checkMalasPalabras(mesa)==-1){
                            setCarga(false);
                            setEstadoAlerta(!estadoalerta);

                            setTimeout(() => {
                              setEstadoAlerta(false);
                              setEstadoBoton(false);

                            }, 3000);

                            Snackbar.show({
                              text: '🤯 No se permiten malas palabras 😤',
                            
                              duration: Snackbar.LENGTH_SHORT,

                            });
                        

                            return;
                          }


      
        

              if(mesa.trim().length==0){
                setEstadoBoton(false);
                setCarga(false);
                Snackbar.show({
                  text: 'Debe ingresar un nombre para la mesa',
                
                  duration: Snackbar.LENGTH_SHORT,
      
                });
                return;
              }
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
            
        
            setConnectStatus(true);
            setEstadoBoton(false);
            crear(true);

          }).catch((error)=>{
            console.log(error)
              setConnectStatus(false);
              setEstadoBoton(false);
              setCarga(false);
            Snackbar.show({
              text: 'Ocurrió un error, revise su conexión de internet.',
            
              duration: Snackbar.LENGTH_SHORT,
            });

          })

               
              

       
        
      
      }





    const toggleSwitch = (value) => {
        console.log('valor: '+value);
        setSwitchValue(value);
        console.log('valor de switch: '+switchValue);

      };


            const crear=async(estado)=>{


             try {

              await AsyncStorage.removeItem('creadormaiz');

           
            
              const color='amarillo';
                const fondo='#C98B2E';
                const cantidad=1;
              const data={nombre:usuario,nombresala:mesa,tiempo:tiempo,estado:switchValue,figuras:valorFigura,color:color,fondo:fondo,estrellas:cantidad}
                

        

 
             if(estado){
        socket.emit('jugador',data)
              }





        socket.on('join',async data => { 
            
          try {
            await AsyncStorage.setItem("CodSala",data)
           console.log(data)
           mySound.stop();
           setCambio(0)
           setCarga(false);
          await AsyncStorage.setItem('creadormaiz','acreditar') 

          setEstadoBoton(false);
          setModalVisible3(!modalVisible3);

           setModalVisibleSala(!modalVisibleSala);

          } catch (error) {
            setEstadoBoton(false);

            Snackbar.show({
              text: 'Ocurrió un error, intente mas tarde.',
            
              duration: Snackbar.LENGTH_SHORT,
            });
          }


           });

      } catch (error) {
        setEstadoBoton(false);

        Snackbar.show({
          text: 'Ocurrió un error, intente mas tarde.',
        
          duration: Snackbar.LENGTH_SHORT,
        });
      }







            }

                                                      const nom=async()=>{
                                                            const nombre=await AsyncStorage.getItem("nombre")
                                                            setUsuario(nombre);
                                                        }

                                                        useEffect(() => {
                                                          
                                                            nom();
                                                        }, [])


                                            const cerrarteclado=()=>{

                                              console.log('entra para cerrar teclado')
                                              Keyboard.dismiss();
                                              

                                            }
    

                        return (
                                  <TouchableWithoutFeedback
                                  onPress={()=>cerrarteclado()}
                                  >
                                    <View style={{flex:1}} >

                                   
                            <ImageBackground source={require('../assets/fondos/sala/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >


                            <Image source={require('../assets/fondos/sala/volcan.png')} resizeMode="contain"  style={{ bottom:'-36%',width:'100%',height:'100%'}}   />
                  
                  
                  
                          <Image source={require('../assets/fondos/sala/luz.png')}   style={{bottom:'106%' , width:'100%',height:'100%'}} />
                  
                          <Image source={require('../assets/fondos/sala/cerro.png')} resizeMode="contain" style={{bottom:'160%' ,width:'100%',height:'100%'}}   />
                  
                          <Image source={require('../assets/fondos/sala/nubes.png')} resizeMode="contain" style={{bottom:'295%',width:('100%'),height:('11%')}}  />



                          <View style={{bottom:'306%',width:'100%',height:'20%',alignContent:"center",alignItems:"center"}} >

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










                            <View style={{bottom:'318%',width:'100%',height:'100%'}}>
                            <Image source={require('../assets/fondos/crear/crear.png')} resizeMode="contain" style={{marginRight:'8%',width:'100%',height:'3%'}}  />

                                <TextInput
                                                    label="Nombre De La Sala"
                                                    value={data.mesa}
                                                    mode="outlined"
                                                    maxLength={10}
                                                    onChangeText={mesa => nombreMesa(mesa)}
                                                   style={{marginLeft:'8%',marginRight:'8%'}}
                                                    /> 
                     
                    

                     <Image source={require('../assets/fondos/crear/tiempo.png')} resizeMode="contain" style={{bottom:'-1%',width:'100%',height:'4.5%'}}  />



                                                    <View style={{bottom:'-2%',alignItems:"center",alignContent:'center'}}>
                                                    <NumericInput 
                                                                value={tiempo} 
                                                                onChange={value => setTiempo(value)} 
                                                                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                                        
                                                            
                                                                editable={false}
                                                                step={1}
                                                                minValue={1}
                                                                maxValue={6}
                                                                valueType='integer'
                                                                rounded 
                                                                textColor='#B0228C' 
                                                                containerStyle={{totalWidth:'30%',totalHeight:'15%'}}
                                                                inputStyle={{
                                                                    backgroundColor:'white'
                                                                }}
                                                                iconStyle={{ color: 'white' }} 
                                                                rightButtonBackgroundColor='#EA3788' 
                                                                leftButtonBackgroundColor='#E56B70'/>

                                                                <Text style={{bottom:'27%',color:'#B0228C',fontSize:RFValue(13)}} >Min</Text>
                                                    </View>
                                                                        
                
                                        <Image source={require('../assets/fondos/crear/figuras.png')} resizeMode="contain" style={{bottom:'-2%',width:'100%',height:'4.5%'}}  />


                                                               <View style={{bottom:'-3%',width:'100%',height:'8%',alignItems:"center",justifyContent:"center",flexDirection:"row"}}>

                                                                    
                                                                <TouchableOpacity
                                                                onPress={()=>EstadoFiguras(4)}
                                                                > 
                                                                  <Text style={{marginHorizontal:'5%',fontSize:RFValue(38),fontWeight: "bold",color:color1}} >4</Text>
                                                                   </TouchableOpacity> 

                                                                   <TouchableOpacity
                                                                   onPress={()=>EstadoFiguras(5)}
                                                                   > 
                                                                  <Text style={{marginHorizontal:'5%',fontSize:RFValue(38),fontWeight: "bold",color:color2}} >5</Text>
                                                                   </TouchableOpacity> 

                                                                   <TouchableOpacity
                                                                   onPress={()=>EstadoFiguras(6)}
                                                                   > 
                                                                  <Text style={{marginHorizontal:'5%',fontSize:RFValue(38),fontWeight: "bold",color:color3}} >6</Text>
                                                                   </TouchableOpacity> 

                                                                   <TouchableOpacity
                                                                   onPress={()=>EstadoFiguras(9)}
                                                                   > 
                                                                  <Text style={{fontSize:RFValue(38),fontWeight: "bold",color:color4}} >9</Text>
                                                                   </TouchableOpacity> 

                                                           



                                                               </View>
                                                                

                                                               <Image source={require('../assets/fondos/crear/tipo.png')} resizeMode="contain" style={{bottom:'-4%',width:'100%',height:'2.2%'}}  />


                                                                <View style={{bottom:'-4.5%',alignContent:"center",alignItems:"center"}}>

                                                                <Text style={{fontWeight: "bold",fontSize:RFValue(13),textAlign:'center',flexDirection:'row'}} >{switchValue ? 'Mesa Privada (con código)' : 'Mesa Pública (libre a todos )'}</Text>
      
                                                                    <Switch
                                                                            trackColor={{ false: "#EFE0CB", true: "#EFE0CB" }}

                                                                    thumbColor={switchValue ? "#348CD3" : "#182B49"}

                                                                style={{bottom:'-15%',transform: [{ scaleX: 2 }, { scaleY: 2 }]}}
                                                                    onValueChange={toggleSwitch}
                                                                    value={switchValue}
                                                                    />




                                                                     </View>
                                                               
         

                                      
                                           <View style={{bottom:'-8%',width:'100%',height:'31%',alignContent:"center",alignItems:"center",justifyContent:"center"}}>

                                           <Image source={require('../assets/fondos/crear/sombreron.png')}  resizeMode="contain"  style={{left:'0%',bottom:'-6%',width:'100%',height:'68%'}} />

                                          <TouchableWithoutFeedback
                                          onPressIn={()=>presionarBotonCrear()}
/*                                           onPressOut={()=>soltarBtnCrear()} 
 */                                          disabled={estadoboton}
                                           onPress={()=>soltarBtnCrear()} 
                                          >
                                            <View 
                                            resizeMode="contain"  style={{left:'0%',bottom:'23%',width:'45%',height:'16%'}}
                                            >
                                            <Image source={botoncrear}  resizeMode="contain"  style={{width:'100%',height:'100%'}} />

                                            </View>

                                          </TouchableWithoutFeedback>
                                             </View>                           
                                     


                                                                      </View>
                                                   
                                                    {estadoalerta&&
                                                      <View style={{bottom:'400%',width:'45%',height:'25%'}}>
                                                      <LottieView source={require('../assets/warning.json')} autoPlay loop />
        
                                                      </View>
                                                    }

                                                   {
                                                     carga&&
                                                <View style={{width:'100%',height:'100%',bottom:'431%',justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8,zIndex:1}} >
                                                    <View style={{width:'50%',height:'55%',justifyContent:'center'}} >

                                                    <LottieView source={require('../assets/loading.json')} autoPlay loop />


                                                    </View>
                                                    </View>

                                                   }
                                                      
                                                       
                                  <Image source={require('../assets/fondos/sala/titulo.png')}  resizeMode="contain"  style={{right:'15%',bottom:'337%',width:'100%',height:'2.9%'}}  />


                                              <Modal
                                              animationType="slide"
                                              transparent={true}
                                              visible={figuras}
                                              onRequestClose={() => {
                                                setFiguras(!figuras)
                                              }}
                                            >



                                                  <Figuras
                                                  setColor1={setColor1}
                                                  setColor2={setColor2}
                                                  setColor3={setColor3}
                                                  setColor4={setColor4}
                                                  setValorFigura={setValorFigura}
                                                  estadofigura={estadofigura}
                                                  valorFigura={valorFigura}
                                                  figuras={figuras}
                                                  setFiguras={setFiguras}
                                                  />
                                             

                                                                                     
                                            </Modal>
                                           



                          </ImageBackground>
                          </View>
                          </TouchableWithoutFeedback>
                        )
                    }

export default ConfiguracionSala
