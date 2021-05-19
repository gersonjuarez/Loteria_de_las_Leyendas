                              import React , {useState,useEffect} from 'react'
                              import Image from './Image'

                              import {StyleSheet,View,Dimensions,Modal} from 'react-native';
                              import Tarjeta from './Tarjeta';
                              import Juego from './Juego';
                              import Espera from './Screen/Espera';
                              import TarjetaRandom from './Screen/TarjetaRandom';
                              import CrearServidor from './Screen/CrearServidor';
                              import Consejo from './Screen/Consejo';
                              const {width, height} = Dimensions.get('window');
                              import io from 'socket.io-client/dist/socket.io.js'
                              import NetInfo from '@react-native-community/netinfo';
                              import Snackbar from 'react-native-snackbar';
                              import Premios from './Screen/Premios';
                              import AsyncStorage from '@react-native-community/async-storage';
                              import RNFetchBlob from 'rn-fetch-blob'

                              //http://10.0.2.2:3000
                              //https://api-loteria-heroku.herokuapp.com
                              //https://servidor-loteria-nuevo-api.herokuapp.com/
                              //https://backendloteriaxtrema.tk
                              const backend= io('https://servidor-loteria-nuevo-api.herokuapp.com/', {  
                                


                                jsonp: false



                              });  


  



                      const Listado = ({navigation}) => {

                          const [fotos2,setFotos2]=useState([])
                          const [cuadro,setCuadro]=useState()                        
                          const [modalVisible, setModalVisible] = useState(false);
                          const [modalVisible2, setModalVisible2] = useState(false);
                          const [modalVisible3, setModalVisible3] = useState(false);
                          const [modalVisiblejuego, setModalVisibleJuego] = useState(false);
                          const [resultado,setResultado]=useState([]);
                        const  [socket,setSocket]=useState(backend);
                        const [connectStatus,setConnectStatus]=useState(false);
                          const [empieza,setEmpieza]=useState(false);
                          const [modalVisiblePremio, setModalVisiblePremio] = useState(false);
                          const [fotos,setFotos]=useState([])


                          const cargar=async()=>{

                            console.log('peticion para imagenes')
                          await  fetch('https://secret-brushlands-88440.herokuapp.com/imagenes',{
                            method: "GET",
                            headers: {"Content-type": "application/json;charset=UTF-8"}
                          })
                          .then(response => response.json()) 
                          .then(json =>{

                          Image(json,setFotos,setFotos2)


                     
                           

                          } )   
                          .catch(err => console.log('Request Failed', err)); 
        
                          }

                          
        
                       useEffect(() => {
                        cargar();
                       }, [])


                    

                     
                       
                              useEffect(() => {
                                  
                   

                            
                                NetInfo.addEventListener(state => {
                                
                                  setConnectStatus(state.isInternetReachable)
                          
                                  if(state.isInternetReachable===false){

                             
                                      Snackbar.show({
                                        text:'Revise su conexión de internet 😓.',
                                      
                                        duration: Snackbar.LENGTH_SHORT,
                                      });
                              
                                  
                                  


                                  }
                              
                                });


                              


                              }, [])


  



                                  return (



      
                                            <View style={{flex:1}}>





                                            <CrearServidor

                                            modalVisible3={modalVisible3}
                                            setModalVisible3={setModalVisible3}
                                            socket={socket}
                                            navigation={navigation}
                                            connectStatus={connectStatus}
                                            modalVisiblePremio={modalVisiblePremio}
                                            setModalVisiblePremio={setModalVisiblePremio}
                                            fotos2={fotos2}
                                            fotos={fotos}
                                            />





                                                                                                <Modal
                                                                                              animationType="slide"
                                                                                              transparent={true}
                                                                                              visible={modalVisiblePremio}
                                                                                              onRequestClose={() => {
                                                                                              setModalVisiblePremio(!modalVisiblePremio)
                                                                                              }}
                                                                                              >

                                                                                              <Premios/>


                                                                                              </Modal>

                                            <View >
                                                      <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    visible={modalVisible}
                                                    onRequestClose={() => {
                                                      Snackbar.show({
                                                        text:'Presione el botón para cerrar.',
                                                      
                                                        duration: Snackbar.LENGTH_SHORT,
                                                      });
                                                    }}
                                                  >


                                            <View style={styles.modalViewcard}>



                                            <TarjetaRandom 
                                            setModalVisible={setModalVisible}
                                            modalVisible={modalVisible} 
                                            setModalVisible2={setModalVisible2} 
                                            modalVisible2={modalVisible2} 
                                            modalVisiblejuego={modalVisiblejuego}
                                            setModalVisibleJuego={setModalVisibleJuego} 
                                              setResultado={setResultado}
                                              fotos2={fotos2}
                                              setFotos2={setFotos2}
                                              setFotos={setFotos}
                                              cuadro={cuadro}
                                              setCuadro={setCuadro}
                                              socket={socket}
                                              connectStatus={connectStatus}
                                              setEmpieza={setEmpieza}
                                              empieza={empieza}
                                              />
                                              
                                            </View>



                                            </Modal>
                                            </View>




                                            <View >
                                                      <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    visible={modalVisible2}
                                                    onRequestClose={() => {
                                                      Snackbar.show({
                                                        text:'Presione el botón para cerrar.',
                                                      
                                                        duration: Snackbar.LENGTH_SHORT,
                                                      });
                                                    }}
                                                  >


                                            <View style={styles.modalViewcard}>

                                            <Espera 
                                            setModalVisible={setModalVisible2} 
                                            modalVisible={modalVisible2}
                                            modalVisiblejuego={modalVisiblejuego}
                                            setModalVisibleJuego={setModalVisibleJuego} 
                                            socket={socket}
                                            connectStatus={connectStatus}
                                            empieza={empieza}
                                            
                                            />

                                            </View>






                                            </Modal>
                                            </View>



                                            <View >
                                                      <Modal
                                                    animationType="slide"
                                                    transparent={true}
                                                    visible={modalVisible3}
                                                    onRequestClose={() => {
                                                      Snackbar.show({
                                                        text:'Presione Aceptar.',
                                                      
                                                        duration: Snackbar.LENGTH_SHORT,
                                                      });
                                                    }}
                                                  >


                                            <View style={styles.modalViewcard}>
                                            <Consejo
                                            modalVisible3={modalVisible3}
                                            setModalVisible3={setModalVisible3}
                                            modalVisible={modalVisible}
                                            setModalVisible={setModalVisible}
                                            connectStatus={connectStatus}
                                            socket={socket}

                                            />

                                            </View>

                                            </Modal>
                                            </View>



                                              
                                              
                                              
                                              {modalVisiblejuego&&
                                                <Juego 
                                              
                                                fotos={fotos}
                                                setFotos={setFotos}
                                                setFotos2={setFotos2}
                                                fotos2={fotos2}
                                                resultado={resultado}
                                                setResultado={setResultado}
                                                modalVisiblejuego={modalVisiblejuego}
                                                setModalVisibleJuego={setModalVisibleJuego}
                                                socket={socket}
                                                connectStatus={connectStatus}
                                                />       
                                                                      

                                              }



                                            </View>


                                                


                                                )
                                            }


                                            const styles = StyleSheet.create({
                                                listado:{
                                                  flexDirection:'row',
                                                  flexWrap: 'wrap',
                                                  justifyContent:"center",
                                                  alignItems:"center",
                                                  width:width,
                                                  paddingTop:100,
                                                  
                                                    },
                                                    centeredView: {
                                                      flex: 1,
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      marginTop: 22
                                                    },
                                                    modalViewcard: {
                                                      flex: 1,
                                                        backgroundColor: "white",

                                                      
                                                              
                                                    },
                                                    
                                                    
                                                    
                                              });

                                            export default Listado;


                                            {/* <View style={styles.listado}>
                                                
                                                {
                                                  
                                                  fotos.map((foto)=>(
                                                
                                                
                                                <Tarjeta key={foto.id} foto={foto} />
                                                
                                                ))
                                                }
                                                
                                                
                                                
                                                
                                                </View> */}