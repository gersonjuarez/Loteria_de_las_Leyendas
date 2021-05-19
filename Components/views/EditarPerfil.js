import React,{useState} from 'react'
import {StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity,ScrollView,Dimensions,Modal,TouchableWithoutFeedback} from 'react-native';
import Cupon from './Tabs/Screen/Cupon';
import Canjeo from './Tabs/Screen/Canjeo';
import Premios from './Tabs/Screen/Premios';

const EditarPerfil = ({navigation}) => {



    const [modalVisibleCupon, setModalVisibleCupon] = useState(false);
    const [modalVisibleCanjeo, setModalVisibleCanjeo] = useState(false);
    const [modalVisiblePremio, setModalVisiblePremio] = useState(false);


                    return (
                      <ImageBackground source={require('./Tabs/assets/fondos/consejos/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center"}} >


                           
                      <Image source={require('./Tabs/assets/fondos/consejos/nubes.png')} resizeMode="contain" style={{bottom:'-6%',width:'100%',height:'11%',alignContent:"center",alignItems:"center"}}  />
  
  
                      <Image source={require('./Tabs/assets/fondos/consejos/volcan.png')} resizeMode="contain"  style={{ bottom:'-20%',width:'100%',height:'100%'}}   />
  
  
                      <Image source={require('./Tabs/assets/fondos/consejos/luz.png')}   style={{bottom:'115%', width:'100%',height:'100%'}} />
  
                      <Image source={require('./Tabs/assets/fondos/consejos/cerro.png')} resizeMode="contain" style={{bottom:'172%',width:'100%',height:'100%'}}   />


                              
                                                      <TouchableOpacity
                                style={{bottom:'290%',width:'68%',height:'10%',justifyContent:"center",alignItems:"center"}}
                                  onPress={()=>setModalVisibleCupon(!modalVisibleCupon)} 
                                 >

                        <Image source={require('./Tabs/assets/fondos/consejos/recompensa.png')} resizeMode="contain" style={{width:'100%',height:'100%'}}   />


                                </TouchableOpacity>

                                
                                <TouchableOpacity
                                style={{bottom:'285%',width:'68%',height:'10%',justifyContent:"center",alignItems:"center"}}
                                 onPress={()=>setModalVisibleCanjeo(!modalVisibleCanjeo)}
                                >

                        <Image source={require('./Tabs/assets/fondos/consejos/tienda.png')} resizeMode="contain" style={{width:'100%',height:'100%'}}   />


                                </TouchableOpacity>


                                   
                                <TouchableOpacity
                                style={{bottom:'280%',width:'68%',height:'10%',justifyContent:"center",alignItems:"center"}}
                                 onPress={()=>navigation.navigate('Empresa')}
                                >

                        <Image source={require('./Tabs/assets/fondos/consejos/tienda.png')} resizeMode="contain" style={{width:'100%',height:'100%'}}   />


                                </TouchableOpacity>
                          

                                    
                                <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleCupon}
                                onRequestClose={() => {
                                setModalVisibleCupon(!modalVisibleCupon)
                                }}
                                >


                                <View style={styles.modalTablero}>


                                <Cupon/>

                                </View>


                                </Modal>

                                <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleCanjeo}
                                onRequestClose={() => {
                                setModalVisibleCanjeo(!modalVisibleCanjeo)
                                }}
                                >


                                <View style={styles.modalTablero}>


                                <Canjeo
                                modalVisibleCanjeo={modalVisibleCanjeo}
                                setModalVisibleCanjeo={setModalVisibleCanjeo}
                                modalVisiblePremio={modalVisiblePremio}
                                setModalVisiblePremio={setModalVisiblePremio}


                                />

                                </View>

                            </Modal>




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
        
       
      
        
    }
  
  
  })
export default EditarPerfil


{/* <TouchableOpacity
style={{width:'70%',height:'30%',justifyContent:"center"}}
onPress={()=>setModalVisibleCupon(!modalVisibleCupon)}
>



</TouchableOpacity>

<TouchableOpacity
style={{bottom:'-8%',width:'70%',height:'30%',justifyContent:"center",backgroundColor:'red'}}
onPress={()=>setModalVisibleCanjeo(!modalVisibleCanjeo)}
>



</TouchableOpacity>



    
<Modal
animationType="slide"
transparent={true}
visible={modalVisibleCupon}
onRequestClose={() => {
setModalVisibleCupon(!modalVisibleCupon)
}}
>


<View style={styles.modalTablero}>


<Cupon/>

</View>


</Modal>

<Modal
animationType="slide"
transparent={true}
visible={modalVisibleCanjeo}
onRequestClose={() => {
setModalVisibleCanjeo(!modalVisibleCanjeo)
}}
>


<View style={styles.modalTablero}>


<Canjeo
modalVisibleCanjeo={modalVisibleCanjeo}
setModalVisibleCanjeo={setModalVisibleCanjeo}

/>

</View>

</Modal> */}