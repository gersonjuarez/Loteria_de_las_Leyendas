                        import React,{useEffect,useState} from 'react'
                        import { View, SafeAreaView,Image,TouchableWithoutFeedback,ScrollView,KeyboardAvoidingView, StyleSheet,Platform,Dimensions,Modal,Linking} from 'react-native';
                        import { Rating, AirbnbRating } from 'react-native-ratings';
                        import AsyncStorage from '@react-native-community/async-storage';
                        import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                        import Snackbar from 'react-native-snackbar';

                        import {
                            Avatar,
                            Text,
                            Caption,
                            TextInput,
                            Button

                        } from 'react-native-paper';
                        const EditarComentario = ({navigation,route}) => {

                            const actualizar='actualizado';
                            const [foto,setFoto]=useState('');
                            const [nombre,setNombre]=useState('');
                            const [idUsuario,setIdUsuario]=useState('');
                            const [comentario, setComentario] = useState('');
                            const [largo,setLargo]=useState(0);
                            const [calificacion,setCalificacion]=useState(0);
                            const [estadoBoton,setEstadoBoton]=useState(false);
                             const {id}=route.params;
                             const {comenta}=route.params;
                             const {califica}=route.params;
                     
                            const User= async ()=>{
                                                        

                                const fotos=await AsyncStorage.getItem("foto")
                                const nombres=await AsyncStorage.getItem("nombre")

                                setFoto(fotos);
                                setNombre(nombres);
                              
                            
                            }


                            useEffect(() => {
                            console.log('mi comentario: '+JSON.stringify(route.params))
                            setComentario(comenta);
                            setCalificacion(califica)
                                User();
                            
                     
                                
                            }, [])




                            const Comentar=async()=>{


                                const id_usuario=await AsyncStorage.getItem("id");

                                             
                                fetch('https://api-loteria-heroku.herokuapp.com/editar/comentario/'+`${id}`,{
                                  
                                  method:"PUT",
                                  headers:{
                                'Content-Type': 'application/json'
                                  },
                                  body:JSON.stringify({
                                                                
                                    "comentario":comentario,
                                    "calificacion":calificacion,
                                    "id_usuario":id_usuario
                               
                                  })
                                }).then(res=>res.json())
                                .then(async data=>{

                                
                            
                                try{
                                    navigation.navigate(
                                    
                                    {
                                        name: 'DetalleProducto',
                                        params: { comentadoedit: comentario },
                                        merge: true,
                                    })

                                    
                                } catch(e){
                                    Snackbar.show({
                                    text: 'Ocurrió un al editar comentar.',
                                    
                                    duration: Snackbar.LENGTH_SHORT,
                                    }); 
                                }

                                }).catch((error)=>{

                                console.log(error)

                                Snackbar.show({
                                    text: 'Ocurrió un error al editar comentar.',
                                
                                    duration: Snackbar.LENGTH_SHORT,
                                }); 


                                });




                            }




                            return (
                            <SafeAreaView style={{flex:1}}>
                        <ScrollView>

                                            <View style={{padding:20,flexDirection: 'row'}}>
                                                            
                                                            <Avatar.Image 
                                                            style={{backgroundColor:'#F2ECF5'}}
                                                                source={{
                                                                uri:foto
                                                                }}
                                                                size={RFValue(65)}
                                                            />

                                                            <View style={{marginLeft: '2%'}}>
                                                            <Text style={{fontWeight:"bold",fontSize:RFValue(25)}}>{nombre}</Text>
                                                            <View style={styles.caption} > 
                                                        <Text style={{ textAlign:'center',fontSize:RFValue(13)}} >Las opiniones son públicas, todos los usuarios podrán verla.</Text>

                                                        </View>

                                                            </View>

                                                            
                                                        
                                                        </View>
                                                        
                                                    

                        <View style={styles.section}>
                                <View style={{alignItems:'center'}}>
                                            <AirbnbRating
                                    count={5}
                                    reviews={["Malo", "Regular", "Bueno","Muy Bueno", "Excelente"]}
                                    defaultRating={califica}
                                    onFinishRating={rating=>{
                                    
                                    
                                    setCalificacion(rating)
                                    if(rating>0){
                                        setEstadoBoton(false);
                                    }
                                    
                                    }}

                                    size={RFValue(25)}
                                    />

                                
                                </View>
                                </View>


                                                

                                            

                                                        <TextInput
                                                            label="Describe tu opinión (opcional)"
                                                            value={comentario}
                                                            maxLength={500}
                                                            mode="outlined"
                                                            multiline={true}
                                                                
                                                            onChangeText={comentario => 
                                                                {
                                                                setComentario(comentario),setLargo(comentario.length)
                                                            
                                                                }}
                                                            style={{marginLeft:18,marginRight:18,marginTop:18}}
                                                            />
                                                            <Text style={{textAlign:'center',fontSize:RFValue(13)}} >{largo}/500</Text>
                                                    
                                                                
                                                            <Button 
                                                            
                                                            disabled={estadoBoton}
                                                            mode="contained"  onPress={() => Comentar()}
                                                            style={{marginLeft:18,marginRight:18,marginTop:18,marginBottom:25}}

                                                        >
                                                            Guardar Cambios
                                                            </Button>

                                                    

                                                        </ScrollView>
                            </SafeAreaView>
                            )
                        }

                        export default EditarComentario
                        const styles = StyleSheet.create({

                            section: {
                            padding: 20,
                            
                            
                            },
                            caption: {
                            
                                fontSize:RFValue(13),
                                width:200,
                        
                            }


                        });