                        import React, {useState,useEffect} from 'react'
                        import { ImageBackground,Image,TouchableWithoutFeedback,Text,TouchableOpacity,Linking,ScrollView} from 'react-native';
                        import { View } from 'react-native-animatable';
                        import adjust from "../Screen/adjust";
                        import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

                      
                        const Creditos = ({modalVisible3,setModalVisible3}) => {


                            const  [botonsalir,setBotonSalir]=useState(require('../assets/fondos/cambio/salir.png'))                     
                            const [anio,setAnio]=useState();
                                


                            useEffect(() => {
                            const today = new Date();
                            let year = today.getFullYear();
                                setAnio(year);

                            }, [])

                            const presionarBoton=()=>{
                                setBotonSalir(require('../assets/fondos/cambio/asalir.png'))
                                
                                }
                                
                                
                                const soltarBtn=()=>{
                                  
                                    
                                    setBotonSalir(require('../assets/fondos/cambio/salir.png'))
                                
                                }
        
                            return (
                                <ImageBackground source={require('../assets/fondos/creditos/fondo.png')}   style={{flex:1,alignContent:"center",alignItems:"center",backgroundColor:'white'}} >

               

                                <Image source={require('../assets/fondos/creditos/volcan.png')} resizeMode="contain"  style={{bottom:'-33%',width:'100%',height:'100%'}} />
                    
                    
                    
                                <Image source={require('../assets/fondos/creditos/Luces.png')}  style={{bottom:'106%',width:'100%',height:'100%'}} />
                    
                                <Image source={require('../assets/fondos/creditos/cerro.png')} resizeMode="contain"  style={{bottom:'160%',width:'100%',height:'100%'}} />

                                <TouchableWithoutFeedback  
                                    onPressIn={()=>presionarBoton()}
                                    onPressOut={()=>soltarBtn()} 
                                    onPress={()=>setModalVisible3(!modalVisible3)
                                    }
                                   
                                                                   
                                                    >
                                                        <View
                                                        style={{left:'40%',width:'14%',height:'7%',bottom:'299%'}} 
                                                        >
                                                        <Image  source={botonsalir} resizeMode="contain" style={{width:'100%',height:'100%'}} />

                                                        </View>

                                    
                                    </TouchableWithoutFeedback>
                    
                                <Image source={require('../assets/fondos/creditos/nubes.png')} resizeMode="contain"  style={{bottom:'295%',width:'100%',height:'12%'}} />
                                          
                    
                               
                              <Image source={require('../assets/fondos/creditos/cuadro.png')} resizeMode="contain"  style={{bottom:'312%',width:'83%',height:'53%',alignContent:"center",alignItems:"center"}} />

                            

                                <View style={{right:'2%',bottom:'363%',width:'60%',height:'45%',alignItems:"center"}}>

                                 
                                <Image source={require('../assets/fondos/creditos/logo.png')} resizeMode="contain"  style={{bottom:'-3%',width:'100%',height:'17%'}} />


                                <View
                                style={{bottom:'-5%',width:'100%',height:'5.5%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/version.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>


                                <View
                                style={{bottom:'-6%',width:'100%',height:'5.4%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/lluvia.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>


                                <View
                                style={{bottom:'-6%',width:'100%',height:'6.1%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/idea.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>


                                <View
                                style={{bottom:'-6%',width:'100%',height:'6.3%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/nombre1.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>



                                <View
                                style={{bottom:'-6%',width:'100%',height:'5.8%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/nombre2.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>

                                <View
                                style={{bottom:'-9%',width:'100%',height:'6.5%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/contacto.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>

                                <View
                                style={{bottom:'-8%',width:'100%',height:'5.3%',alignItems:'center'}}
                                >

                            <Image  source={require('../assets/creditos/contacto2.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />
                                </View>



                             


                                    <TouchableOpacity 
                                 style={{bottom:'-10%',width:'100%',height:'11%',alignItems:'center'}}
                                onPress={()=>{

                                    Linking.openURL('http://www.lluviadeideaseditorial.com')
                                }}
                                >
                            <Image  source={require('../assets/creditos/enlace1.png')} resizeMode="contain"  style={{width:'100%',height:'50%'}}   />
                            <Image  source={require('../assets/creditos/enlace2.png')} resizeMode="contain"  style={{width:'100%',height:'50%'}}   />

                                </TouchableOpacity>
                            


                                <TouchableOpacity
                               style={{bottom:'-11.5%',width:'100%',height:'6.5%',alignItems:'center'}}

                            onPress={()=>{

                                Linking.openURL('https://www.xelacode.com.gt')
                            }}
                            >
                            <Image  source={require('../assets/creditos/xelacode.png')} resizeMode="contain"  style={{width:'100%',height:'100%'}}   />

                            </TouchableOpacity>



                           
                     
                             
                                </View>
                               
                                
                            


                                <Image source={require('../assets/fondos/creditos/ziguanaba.png')} resizeMode="contain" style={{right:'2%',bottom:'355%',width:'100%',height:'32%'}} />
                                <Image source={require('../assets/fondos/creditos/llorona.png')} resizeMode="contain" style={{left:'9%',bottom:'387%',width:'100%',height:'32%'}} />
                                <Image source={require('../assets/fondos/creditos/cadejo.png')} resizeMode="contain" style={{left:'25%',bottom:'401%',width:'100%',height:'13%'}} />
                                <Image source={require('../assets/fondos/creditos/sombreron.png')} resizeMode="contain" style={{right:'20%',bottom:'420%',width:'100%',height:'20%'}} />

                         </ImageBackground>
                            )
                        }

                        export default Creditos
