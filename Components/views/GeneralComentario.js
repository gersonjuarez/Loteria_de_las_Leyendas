            import React,{useState,useEffect} from 'react'
            import { View, SafeAreaView,Text,Image,TouchableWithoutFeedback,ScrollView, StyleSheet,Platform,Dimensions,Modal,Linking} from 'react-native';
            import {
                Avatar
              
              } from 'react-native-paper';
              import { Rating, AirbnbRating } from 'react-native-ratings';
              import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

            const GeneralComentario = () => {

                const [comentarios,setComentarios]=useState([]);


                const cargar=async()=>{

    
                    await  fetch('https://api-loteria-heroku.herokuapp.com/comentario_todo/',{
                      method: "GET",
                      headers: { 'Content-Type': 'application/json'}
                    })
                    .then(response => response.json()) 
                    .then(json =>{
              
                 
                 
              
                      setComentarios(json);
               
                     
              
                    } )   
                    .catch(err => console.log('Request Failed', err)); 
              
                    }

                    

                    useEffect(() => {
                        
                        cargar();
                      
                    }, [])



                return (
                    <SafeAreaView  style={{flex:1}} >

                    <ScrollView>


                                                {

                            comentarios.map((item,index)=>{

                            return(


                            <View key={index} style={{ padding: 20,

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




                    </ScrollView>


                    </SafeAreaView>
                )
            }

            export default GeneralComentario
            const styles = StyleSheet.create({
                categories: {
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                  }


            })