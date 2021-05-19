                                import React,{useState,useEffect} from 'react'
                                import { View,Text,TouchableOpacity,Image,Dimensions,StyleSheet,ImageBackground,TouchableWithoutFeedback,Modal } from 'react-native'

                                const CartaRandom = ({setModalVisible,modalVisible,setModalVisible2,connectStatus,fotos2,setResultado,cuadro,socket,modalVisiblejuego,setModalVisibleJuego,setEmpieza}) => {
                                   
                                   const [estado,setEstado]=useState(false);
                                   
                                   const presiona=()=>{
                                    setModalVisible(!modalVisible);
                                    console.log('estado: '+estado);
                                    setEstado(true);
                                    console.log('estado despues del cambio: '+estado);

                                    setEstado(false);
                                    console.log('estado despues del cambio nuevo a false: '+estado);


                                   }
                                   
                                   
                                   
                                    return (
                                       
                                                            <Modal
                                                            animationType="slide"
                                                            transparent={true}
                                                            visible={modalVisible}
                                                            onRequestClose={() => {
                                                                Snackbar.show({
                                                                text:'Presione el boton para cerrar.',
                                                                
                                                                duration: Snackbar.LENGTH_SHORT,
                                                                });
                                                            }}
                                                            >
                                            <View style={{flex:1,backgroundColor:'white'}} >

                                            <TouchableOpacity
                                            onPress={()=>presiona()}
                                            
                                            >
                                                <Text>Presionar</Text>
                                            </TouchableOpacity>

                                            </View>


                                            </Modal>


                                    )
                                }

                                export default CartaRandom
