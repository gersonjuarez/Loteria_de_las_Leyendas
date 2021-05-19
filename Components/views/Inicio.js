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

                                            const [guarda,setGuarda]=useState(require('../views/Tabs/assets/sticker/poke.json'));

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
                                                  onPress={()=>setModalCarta(!modalCarta)}
                                              
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


                                                          <Modal
                                                            animationType="slide"
                                                            transparent={false}
                                                            visible={modalCarta}
                                                            onRequestClose={() => {
                                                              return;
                                                            }}
                                                          >
                                                              <View style={{flex:1}}>

                                    
                                                              <ScrollView>
                                                              
                                                              
                                                            <View style={{width:'100%',height:500,alignItems:'center'}}>

                                                            <Image source={require('../views/Tabs/assets/fondos//creditos/llorona.png')}  style={{width:'70%',height:'50%'}} resizeMode='contain'  />
                                                              <Text style={{fontWeight:'bold',fontSize:20}}>La Llorona</Text>
                                                              <ScrollView
                                                              nestedScrollEnabled = {true}
                                                              >
                                                                <TouchableWithoutFeedback>

                                                              <Text
                                                              style={{fontWeight:'bold',textAlign:'center',backgroundColor:'#E9EDF0'}}
                                                              >


                                                            Una de las leyendas más populares de Guatemala es la leyenda de la Llorona. Se le describe como una mujer que perdió a sus hijos. Luego se convirtió en alma en pena que los busca en vano para toda la eternidad, aterrorizando con su llanto a todo el que la escucha.
                                                            Una de las leyendas más populares de Guatemala es la leyenda de la Llorona. Se le describe como una mujer que perdió a sus hijos. Luego se convirtió en alma en pena que los busca en vano para toda la eternidad, aterrorizando con su llanto a todo el que la escucha.
                                                            Una de las leyendas más populares de Guatemala es la leyenda de la Llorona. Se le describe como una mujer que perdió a sus hijos. Luego se convirtió en alma en pena que los busca en vano para toda la eternidad, aterrorizando con su llanto a todo el que la escucha.
                                                            Una de las leyendas más populares de Guatemala es la leyenda de la Llorona. Se le describe como una mujer que perdió a sus hijos. Luego se convirtió en alma en pena que los busca en vano para toda la eternidad, aterrorizando con su llanto a todo el que la escucha.
                                                            Una de las leyendas más populares de Guatemala es la leyenda de la Llorona. Se le describe como una mujer que perdió a sus hijos. Luego se convirtió en alma en pena que los busca en vano para toda la eternidad, aterrorizando con su llanto a todo el que la escucha.
                                                                </Text>
                                                                </TouchableWithoutFeedback>
                                                              </ScrollView>


                                                            </View>

                                                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Tipo</Text>
                                                            <View style={{alignItems:'center',justifyContent:'center'}}>

                                                            <Image source={{uri:'http://vignette3.wikia.nocookie.net/es.pokemon/images/e/e2/Medalla_Reliquia.png/revision/latest?cb=20090913184435'}}  style={{width:'20%',height:100}} resizeMode='contain'  />

                                                            </View>
                                                            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Poderes</Text>

                                                            <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginTop:10,alignItems:'center',justifyContent:'center',justifyContent:'space-between'}} >
                                                              <Image source={{uri:'https://i.pinimg.com/originals/ed/ab/fb/edabfbd7eea52b6fca421d21daba3f26.png'}}  style={{width:'20%',height:100}} resizeMode='contain'  />
                                                              <Image source={{uri:'data:image/jpeg;base64,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'}}  style={{width:'20%',height:100}} resizeMode='contain'  />
                                                              <Image source={{uri:'data:image/jpeg;base64,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'}}  style={{width:'20%',height:100}} resizeMode='contain'  />
                                                              <Image source={{uri:'data:image/jpeg;base64,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'}}  style={{width:'20%',height:100}} resizeMode='contain'  />

                                                              </View>
                                                              <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',marginBottom:20}}>fuego: poder de ataque 12</Text>


                                                              <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Debilidad</Text>
                                                            <View style={{alignItems:'center',justifyContent:'center',marginBottom:25}}>

                                                            <Image source={{uri:'https://i.pinimg.com/originals/c2/e1/e5/c2e1e5fdc0d2f1c5d660f1b640ed2c47.png'}}  style={{width:'20%',height:100}} resizeMode='contain'  />

                                                            </View>


                                                              </ScrollView>
                                                            
                                                            



                                                          
                                                              
                                                              

                                                              </View>
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








