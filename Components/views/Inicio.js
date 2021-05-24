                                          import React, {useState,useEffect} from 'react'
                                          import { View, Text, StyleSheet,ImageBackground,TouchableWithoutFeedback,Image,Modal,TouchableOpacity,Linking,ScrollView,Dimensions} from 'react-native';
                                          import * as Animatable from 'react-native-animatable';
                                          import cerrar from 'react-native-vector-icons/FontAwesome';
                                          import AsyncStorage from '@react-native-community/async-storage';
                                          import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
                                          import Creditos from './Tabs/Screen/Creditos';
                                          import LottieView from 'lottie-react-native';
                                          import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                          import Pruebas from '../Pruebas';

                                          import Ripple from 'react-native-material-ripple';

                                          import {TouchableRipple } from 'react-native-paper';

                                          const Inicio = ({navigation}) => {



                                          const [boton,setBoton]=useState(require('./Tabs/assets/fondos/jugar.png'));
                                          const [botoncredito,setBotonCredito]=useState(require('./Tabs/assets/fondos/credito.png'));
                                          const [botontienda,setBotonTienda]=useState(require('./Tabs/assets/fondos/inicio/tienda.png'));

                                          const [modalVisible3, setModalVisible3] = useState(false);
                                          const [modalUpdate, setModalUpdate] = useState(false);
                                          const [modalPrueba, setModalPrueba] = useState(false);
                                          const [modalCarta, setModalCarta] = useState(false);
                                            const [result,setResult]=useState([]);


                                          const imagenesList=([

                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612669362/e3liubhese8e2xa6jbzn.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612669390/jxstmh4dpfqwth5hm0wa.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612729987/ijvhiwpqfjrpprde8ufv.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730030/jytumz1awfyaeoofgtcq.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730114/idm24rtake6qpwgfqk5s.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1616714024/qpf4le9cxhpwwjuyg0dx.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730218/wg8jy8qwls2npdec9rkc.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730242/cxqxcog4jbwwuoxhcjmi.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730255/vsfgjqypbyinvavwqzie.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730284/ajaicwjojd38kvluo36g.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730301/guqgywufyi7ayqsakhfc.jpg',
                                            'https://res.cloudinary.com/dxj44eizq/image/upload/v1612730316/yr53miapqzwalotogn3b.jpg'


                                          ]);

                                      
                                          const resultado2=[];
                                          const temp=[];
                                          useEffect(() => {
                                         

                                            for(let i=1;i<=6;i++){

                                              let temporal=Math.floor(Math.random() * (11 - 0)) + 0;

                                              resultado2.push( {clave:i+temporal,id:i,dat:imagenesList[temporal],estado:false})

                                              resultado2.push( {clave:i+temporal,id:i,dat:imagenesList[temporal],estado:false})

                                            }

                                       
                                           resultado2.sort(function() { return Math.random() - 0.5 }); 
                               

                                            conversion(resultado2,4)


                                          }, [])


                                          const conversion=(list, elementsPerSubArray)=>{

                                           
                                              var matrix = [], i, k;
                                             
                                       
                                              for (i = 0, k = -1; i < list.length; i++) {
                                                  if (i % elementsPerSubArray === 0) {
                                                      k++;
                                                      matrix[k] = [];
                                                  }
                                       
                                                  matrix[k].push(list[i]);
                                              }
                        
                        
                                      
                        
                                              setResult(matrix);
                                      
                        
                                      

                                          }


                                     
                                          const presionarBoton=()=>{
                                          setBoton(require('./Tabs/assets/fondos/ajugar.png'))

                                          }


                                          const soltarBtn=()=>{


                                            setBoton(require('./Tabs/assets/fondos/jugar.png'))


                                          }


                                          const presionarBotoncredito=()=>{


                                            setBotonCredito(require('./Tabs/assets/fondos/acredito.png'))
                                            
                                            }
                                            
                                            
                                            const soltarBtncredito=()=>{
                                              setBotonCredito(require('./Tabs/assets/fondos/credito.png'))
                                            
                                            
                                            }


                                            
                                          const presionarBotontienda=()=>{


                                            setBotonTienda(require('./Tabs/assets/fondos/inicio/atienda.png'))
                                            
                                            }
                                            
                                            
                                            const soltarBtntienda=()=>{
                                              setBotonTienda(require('./Tabs/assets/fondos/inicio/tienda.png'))
                                            
                                            
                                            }


                                            const remover=async()=>{

                                              await AsyncStorage.removeItem('arreglo_imagenes');
                                              await AsyncStorage.removeItem('arreglo_cartones');

                                            }

                                            const actualizar=async()=>{


                                              await  fetch('https://secret-brushlands-88440.herokuapp.com/actualizaciones/playstore',{
                                               
                                                headers:new Headers({
                                                  Authorization:"Bearer "
                                                })                                             
                                              })
                                              .then(response => response.json()) 
                                              .then(json =>{
  

                                                if(json[3].numero===3){
                                                  setModalUpdate(true);
                                                }
  
                                              })


                                            }
                                            useEffect(() => {
                                          

                                              remover();
                                              actualizar();

                                              
                                              
                                            }, [])





                                           useEffect(() => {
                                           
                                     

                                      


                                         /*      if(dato[].valor===1){

                                             

                                              }
                                          */




                                            }, []) 
 


                                              return (
                                                


                                              

                                                          <ImageBackground source={require('./Tabs/assets/fondos/inicio/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >




                                                      <Image source={require('./Tabs/assets/fondos/inicio/volcan.png')} resizeMode="contain"  style={{bottom:'-30%',width:'100%',height:'100%'}} />


                                                      <Image  source={require('./Tabs/assets/fondos/inicio/hexagono.png')} resizeMode="contain"  style={{bottom:'92%',width:'100%',height:'40%'}} />

                                                      <Image source={require('./Tabs/assets/fondos/inicio/Luces.png')}  style={{bottom:'150%',width:'100%',height:'100%'}} />

                                                      <Image source={require('./Tabs/assets/fondos/inicio/cerro.png')} resizeMode="contain"  style={{bottom:'197%',width:'100%',height:'100%'}} />

                                                      <Image source={require('./Tabs/assets/fondos/inicio/nubes.png')} resizeMode="contain"  style={{bottom:'338%',width:'100%',height:'8%'}} />
                                                                

                                                    
                                                    <Image source={require('./Tabs/assets/fondos/creditos/logo.png')} resizeMode="contain"  style={{bottom:'326%',width:'100%',height:'12%'}} />
                                              



                                                    <Image source={require('./Tabs/assets/fondos/inicio/1.png')} resizeMode="contain" style={{left:'9%',bottom:'322%',width:'100%',height:'50%'}}  />



                                               <TouchableWithoutFeedback  
                                                onPressIn={()=>presionarBoton()}
                                                onPressOut={()=>soltarBtn()} 
                                                onPress={()=>navigation.navigate("Juego")
                                              }
                                                >
                                                  <View
                                                  style={{right:'18%',width:'45%',height:'6%',bottom:'368%'}} 

                                                  >
                                                  <Image  source={boton} resizeMode="contain"  style={{width:'100%',height:'100%'}} />

                                                  </View>

                                              
                                                </TouchableWithoutFeedback>


                                                <TouchableWithoutFeedback  
                                                    onPressIn={()=>presionarBotontienda()}
                                                    onPressOut={()=>soltarBtntienda()} 
                                               onPress={()=>navigation.navigate("Calificar")}
                                           
                                             
                                                             >

                                                               <View style={{right:'18%',width:'45%',height:'6%',bottom:'366%'}}>
                                                              <Image  source={botontienda} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                                               </View>

                                               
                                               </TouchableWithoutFeedback>



                                                <TouchableWithoutFeedback  
                                                onPressIn={()=>presionarBotoncredito()}
                                                onPressOut={()=>soltarBtncredito()} 
/*                                                 onPress={()=>setModalVisible3(!modalVisible3)}
 */                                            
                                                  onPress={()=>setModalVisible3(!modalVisible3)}
                                              
                                                              >

                                                                <View style={{right:'18%',width:'45%',height:'6%',bottom:'364%'}}>
                                                               <Image  source={botoncredito} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                                                </View>

                                                
                                                </TouchableWithoutFeedback>


                                            


                                                <Image  source={require('./Tabs/assets/fondos/inicio/titulo.png')} resizeMode="contain"  style={{right:'25%',bottom:'332.5%',width:'100%',height:'3%'}}  />



                                                            <Modal
                                                            animationType="slide"
                                                            transparent={false}
                                                            visible={modalUpdate}
                                                            onRequestClose={() => {
                                                              return;
                                                            }}
                                                          >


                                                            <View style={{flex:1,alignItems:'center'}} >


                                                            <View style={{width:'100%',height:'55%',justifyContent:'center'}} >

                                                            <LottieView source={require('../views/Tabs/assets/update.json')} autoPlay loop />


                                                            </View>


                                                            <Text style={{fontWeight:'bold',fontSize:RFValue(17),textAlign:'center'}} >Nueva versión disponible, presione la imagen de abajo.</Text>


                                                            <TouchableOpacity
                                                            style={{width:'100%',height:'100%',alignItems:'center'}}
                                                            onPress={
                                                              
                                                              ()=> Linking.openURL(`market://details?id=com.loteria`)  
                                                                                                                   
                                                          }
                                                            >
                                                            <Image source={require('../views/Tabs/assets/play.png')}  style={{width:'50%',height:'20%'}} resizeMode='contain'  />
                                                            </TouchableOpacity>

                                                            </View>
                                                            


                                                            

                                                              
                                                              
                                                          </Modal>

                                                    <View style={styles.centeredView}>
                                                              <Modal
                                                            animationType="slide"
                                                            transparent={true}
                                                            visible={modalVisible3}
                                                            onRequestClose={() => {
                                                              setModalVisible3(!modalVisible3);
                                                            }}
                                                          >



                                                                <Creditos
                                                                modalVisible3={modalVisible3}
                                                                setModalVisible3={setModalVisible3}
                                                                />



                                                            

                                                              
                                                              
                                                          </Modal>


                                                      
                                                
                                                      </View>


                                                  
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


                                          })

                                          export default Inicio;








