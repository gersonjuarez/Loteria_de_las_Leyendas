                                import React, {useState,useEffect} from 'react';
                                import {View, SafeAreaView, StyleSheet,KeyboardAvoidingView,TouchableOpacity,ImageBackground,ScrollView,Alert} from 'react-native';
                                import {
                                  Avatar,
                                  Title,
                                  Caption,
                                  Text,
                                  TouchableRipple,
                                  TextInput,Button
                                } from 'react-native-paper';
                                import AsyncStorage from '@react-native-community/async-storage';
                                import ImagePicker from 'react-native-image-crop-picker';
                                import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
                                import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
                                import Snackbar from 'react-native-snackbar';
                                 import NetInfo from '@react-native-community/netinfo';
 
                                import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

                                
                                

                                /* import Share from 'react-native-share';
                                */

                                const ProfileScreen = () => {





                                  const [email,setEmail] = useState('')
                                  const [nom,setNom]=useState('');
                                  const [fotPerfil,setFotPerfil]=useState('');

                                  const [usuario, setUsuario] = useState('');
                                  const [name, setName] = useState('');
                                  const [id,setId]=useState('');

                                  const [image, setImage] = useState('');
                                  const [temporal,setTemporal]=useState('');
                                const [bloquear,setBloquear]=useState(true);

                                const [estado,setEstado]=useState(false);
                                const [opacity,setOpacity]=useState(0.2);
                                const [load,setLoad]=useState(false);
                                const [internet,setInternet]=useState(false);
                                const habilitar=()=>{



                                setBloquear(false);
                                setEstado(true);
                                setOpacity(1)



                                }






                                  const choosePhotoFromLibrary =async () => {
                                    ImagePicker.openPicker({
                                      width: 300,
                                      height: 300,
                                      cropping: true,
                                      compressImageQuality: 0.7,
                                      includeBase64: true
                                    }).then(image => {
                                      
                                      setImage(image.data);
                                      setTemporal(image.path)                                   

                                    });
                                  }



                                  const User= async ()=>{
                                

                                    const foto=await AsyncStorage.getItem("foto")
                                    const email=await AsyncStorage.getItem("email")
                                    const nombre=await AsyncStorage.getItem("nombre")
                                    const id=await AsyncStorage.getItem("id");

                                    console.log('tipo de variable foto: '+typeof(foto))
                                    
                                    setId(id);
                                //usando para perfil
                                    setEmail(email);
                                      setNom(nombre);
                                      setFotPerfil(foto);

                                      setUsuario(nombre);
                                    setName(email)
                                    setImage(foto);
                                    setTemporal(foto)
                                  
                                  }


                                useEffect(()=>{
                                  User()
                                },[])   

                                const Cancelar=()=>{




                                  User();  
                                  setBloquear(true);
                                  setEstado(false);
                                  setOpacity(0.2)
                                  setLoad(false);
                                  
                                  
                                  }


                                const editar=async()=>{

                             
                          
                                    
                                  const controller = new AbortController();
                                  const { signal } = controller;

                            


                                  if(usuario.trim().length==0){
                                    Snackbar.show({
                                      text: 'Debe ingresar un nombre.',
                                    
                                      duration: Snackbar.LENGTH_SHORT,
                                    }); 
                                    return;
                                  }
                                





                                  setTimeout(

                                    
                                    () => controller.abort()
                                  
                                    , 10000);


                                  setBloquear(true);

                                setLoad(true);
                                  fetch('https://api-loteria-heroku.herokuapp.com/user/'+`${id}`,{
                                    
                                    method:"PUT",
                                    headers:{
                                      Accept: 'application/json',

                                  'Content-Type': 'application/json'
                                    },
                                    
                                    body:JSON.stringify({
                                      "email":name,
                                      "nombre":usuario,
                                      "foto":image
                                    }),
                                    signal
                                  })

                                  .then(res=>res.json())
                                .then(async data=>{
                                  

                                

                                  try{

                                 
                                  AsyncStorage.setItem('foto',data.foto)                                   
                                  AsyncStorage.setItem('email',data.email) 
                                  AsyncStorage.setItem('nombre',data.nombre)

                                  await User();
                                  setBloquear(true);
                                  setEstado(false);
                                setOpacity(0.2)
                                setLoad(false);

                                  } catch(e){
                                    setBloquear(true);
                                    setOpacity(0.2)
                                    setBloquear(true);
                                    setEstado(false);
                                    setLoad(false);
                                    alert(e);
                                  }

                                }).catch((error)=>{

                                  User()
                                  setOpacity(0.2)
                                  setBloquear(true);
                                  setEstado(false);
                                  setLoad(false);
                                  Snackbar.show({
                                    text: 'Ocurrió un problema al guardar los cambios.',
                                  
                                    duration: Snackbar.LENGTH_SHORT,
                                  });                                 });






                                }







                                  return (
                                    <SafeAreaView style={styles.container}>

                                      <View style={{paddingHorizontal:15,flexDirection: 'row'}}>
                                       
                                          <Avatar.Image 
                                          style={{backgroundColor:'#F2ECF5'}}
                                            source={{
                                              uri:fotPerfil
                                            }}
                                            size={RFValue(65)}
                                          />
                                          <View style={{marginLeft: '2%'}}>
                                          <Text style={{fontWeight:"bold",fontSize:RFValue(25)}}>{nom}</Text>

                                            
                                           <Caption style={styles.caption}>{email}</Caption>

                                        </View>
                                     
                                      </View>



                                    

                                <ScrollView
                                keyboardShouldPersistTaps='handled'

                                >

                                <View style={{alignItems:"center",alignContent:"center"}}>

                                  {
                                    !estado&&
                                    (
                                <View   style={{marginBottom:10,marginTop:10}}>
                                <MaterialCommunityIcons.Button
                                              name="account-edit"
                                              size={RFValue(25)}
                                            
                                              onPress={() => habilitar()}
                                            />

                                </View>
                                    )
                                  }
                                

                                <TouchableOpacity disabled={bloquear} onPress={choosePhotoFromLibrary} style={{
                                                height: 100,
                                                width: 100,
                                                borderRadius: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                              
                                              }}>
                                            <View
                                              style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                               
                                              }}>
                                              <ImageBackground
                                                source={{
                                                  uri: temporal,
                                                }}
                                                
                                                style={{height: '100%', width: '100%',  opacity: opacity,
                                                }}
                                                imageStyle={{borderRadius: 15}}>
                                                <View
                                                  style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                  }}>
                                                  <Icon
                                                    name="camera"
                                                    size={RFValue(35)}
                                                    color="#fff"
                                                    style={{
                                                      opacity: 0.7,
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      borderWidth: 1,
                                                      borderColor: '#fff',
                                                      borderRadius: 10,
                                                    }}
                                                  />
                                                </View>
                                              </ImageBackground>
                                            </View>
                                          </TouchableOpacity>
                                </View>





                                <KeyboardAvoidingView
                                behavior="position"
                                >

                                <TextInput
                                      label="Usuario"
                                      value={usuario}
                                      maxLength={10}
                                      mode="outlined"
                                      disabled={bloquear}
                                      onChangeText={usuario => setUsuario(usuario)}
                                      style={{marginLeft:18,marginRight:18,marginTop:18}}
                                    />
                               

                                </KeyboardAvoidingView>


                                <Button  mode="contained" disabled={bloquear}  loading={load} onPress={() => editar()}
                                      style={{marginLeft:18,marginRight:18,marginTop:18}}

                                >
                                  Guardar Cambios
                                  </Button>

                                {
                                estado&&
                                (
                                  <Button  mode="contained" disabled={bloquear}  onPress={() => Cancelar()}
                                  style={{marginLeft:18,marginRight:18,marginTop:18,marginBottom:25}}

                                >
                                Cancelar
                                </Button>
                                )
                                }
                                


                                  </ScrollView>






                                    
                                    </SafeAreaView>
                                  );
                                };

                                export default ProfileScreen;

                                const styles = StyleSheet.create({
                                  container: {
                                    flex: 1,
                                  },
                                
                                  title: {
                                    fontSize: RFValue(24),
                                    fontWeight: 'bold',
                                  },
                                  caption: {
                                    fontSize:RFValue(13),
                                    lineHeight: RFValue(15),
                                    fontWeight: '500',
                                  },
                                  row: {
                                    flexDirection: 'row',
                                    marginBottom: 10,
                                  },
                                  infoBoxWrapper: {
                                    borderBottomColor: '#dddddd',
                                    borderBottomWidth: 1,
                                    borderTopColor: '#dddddd',
                                    borderTopWidth: 1,
                                    flexDirection: 'row',
                                    height: 100
                                  },
                                  infoBox: {
                                    width: '50%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                  menuWrapper: {
                                    marginTop: 10,
                                  },
                                  menuItem: {
                                    flexDirection: 'row',
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                  },
                                  menuItemText: {
                                    color: '#777777',
                                    marginLeft: 20,
                                    fontWeight: '600',
                                    fontSize: 16,
                                    lineHeight: 26,
                                  },
                                });
