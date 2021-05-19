

                      import React, {useState} from 'react';

                      //React Navigation

                      import { createDrawerNavigator } from '@react-navigation/drawer';
                      import { TextInput,Button } from 'react-native-paper';
                      import { View, Text, Keyboard,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,ScrollView,Image,SafeAreaView} from 'react-native';
                      import AsyncStorage from '@react-native-community/async-storage';
                      import * as Animatable from 'react-native-animatable';
                      import FormInput from './Social/FormInput';
                      import SocialButton from './Social/SocialButton'
                      import FormButton from './Social/FormButton'
                      import Snackbar from 'react-native-snackbar';
                      import Feather from 'react-native-vector-icons/Feather';

                      import { AuthContext } from './context';



                      const Signup = ({navigation}) => {

                        const [bloquear,setBloquear]=useState(false);


                        const [data, setData] = React.useState({
                          usuario: '',
                          name:'', //correo XD
                          password: '',
                          repassword: '',
                          check_textInputChange: false,
                          check_email:false,
                          email_correcto:false,
                          check_password:false,
                          check_password_largo:false,
                          check_repassword:false,
                          confirma_password:false,
                          secureTextEntry: true,
                          confirm_secureTextEntry: true,
                      });

                 
                 
                        const [foto,setFoto]=useState('https://res.cloudinary.com/dzs6u1kal/image/upload/v1612367624/unscreen-001_udvrrv.png')

                       
                        const { signUp } = React.useContext(AuthContext);


                        const textInputChange = (val) => {
                          if( val.length !== 0 ) {

                            
                              setData({
                                  ...data,
                                  usuario: val,
                                  check_textInputChange: false
                              });


                          } else {
                              setData({
                                  ...data,
                                  usuario: val,
                                  check_textInputChange: true
                              });
                          }
                      }




                              const textemailChange = (val) => {

                                const  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


                                
                                if( val.length !== 0 ) {


                                    
                                    data.check_email=false;
                                
                                  if(emailRegex.test(val)){
                                    setData({
                                      ...data,
                                      name: val,
                                      email_correcto: false
                                  });
                                  }else{
                                    setData({
                                      ...data,
                                      email_correcto:true
                                    })
                                  }
                                    
                              
                                } else {

                                    setData({
                                        ...data,
                                        name: val,
                                        check_email: true
                                    });

                                }
                              }




                          const textpasswordChange = (val) => {
                            if( val.length !== 0 ) {

                              
                                setData({
                                    ...data,
                                    password: val,
                                    check_password: false
                                });


                            } else {
                                setData({
                                    ...data,
                                    password: val,
                                    check_password: true
                                });
                            }


                            if( val.length >7) {

                              
                              setData({
                                  ...data,
                                  password: val,
                                  check_password_largo: false
                              });


                          } else {
                              setData({
                                  ...data,
                                  password: val,
                                  check_password_largo: true
                              });
                          }


                          }






                      const textpasswordconfirma = (val) => {

                    

                        if( val.length !== 0 ) {


                            
                            data.check_repassword=false;
                        
                          if(val===data.password){
                            setData({
                              ...data,
                              repassword: val,
                              confirma_password: false
                          });
                          }else{
                            
                            setData({
                              ...data,
                              confirma_password:true
                            })
                          }
                            
                      
                        } else {

                            setData({
                                ...data,
                                repassword: val,
                                check_repassword: true
                            });

                        }
                      }

                                                  //Inicia en envio de datos

                                                  const sendData=async()=>{


                                                    Keyboard.dismiss();
                                                    setBloquear(true);
                                                    let contador=0;
                                                    if( data.usuario.length !== 0 ) {

                                                      data.check_textInputChange=false
                                                   /*   setData({
                                                      ...data,
                                                      check_textInputChange: false
                                                     }
                                                      

                                                     )  */



                                                  } else {
                                                    contador=contador+1;
                                                    data.check_textInputChange=true

                                                  /*   setData({
                                                      ...data,
                                                      check_textInputChange: true
                                                     }
                                                     )  */                                                   
                                                  }


                                                
                                                  const  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;


                                                            
                                                  if( data.name.length !== 0 ) {
                                                    data.check_email=false
                                                    /* setData({
                                                      ...data,
                                                      check_email:false
                                                     }
                                                     )    
                                                       */
                                                  
                                                    if(emailRegex.test(data.name)){
                                                      setData({
                                                        ...data,
                                                        email_correcto:false
                                                       }
                                                       )  
                                                  
                                                  
                                                    }else{
                                                      contador=contador+1;

                                                      setData({
                                                        ...data,
                                                       email_correcto:true
                                                       }
                                                       ) 
                                                      
                                                    }
                                                      
                                                
                                                  } else {
                                                    contador=contador+1;
                                                    data.check_email=true  
                                                 /*    setData({
                                                      ...data,
                                                     check_email:true  
                                                     }
                                                     ) 
                                                   */
                                                         
                                                      

                                                  }



                                                  if( data.password.length !== 0 ) {                                                        
                                                    data.check_password=false

                                
                                                } else {
                                                  contador=contador+1;
                                                  data.check_password=true
                                                    
                                                }

                                                if( data.password.length >7 ) {                                                        
                                                  data.check_password_largo=false

                              
                                              } else {
                                                contador=contador+1;
                                                data.check_password_largo=true
                                                  
                                              }

                                                
                                                if( data.repassword.length !== 0 ) {


                                                  setData({
                                                    ...data,
                                                    check_repassword:false
                                                  }
                                                   ) 
                                              
                                                if(data.repassword===data.password){
                                                 
                                                  setData({
                                                    ...data,
                                                    confirma_password:false
                                                  }
                                                   ) 
                                                   
                                                
                                                }else{
                                                  contador=contador+1;

                                                  setData({
                                                    ...data,
                                                    confirma_password:true
                                                  }
                                                   ) 
                                                  
                                                }
                                                  
                                            
                                              } else {
                                                contador=contador+1;

                                                setData({
                                                  ...data,
                                                  check_repassword:true
                                                }
                                                 ) 
                                                      data.check_repassword=true
                                                 

                                              }

                                              if(contador>=1){
                                                setBloquear(false);

                                                return;
                                              }

                                                  fetch("https://api-loteria-heroku.herokuapp.com/signup",{
                                                    method:"POST",
                                                    headers:{
                                                  'Content-Type': 'application/json'
                                                    },
                                                    body:JSON.stringify({
                                                      "email":data.name,
                                                      "nombre":data.usuario,
                                                      "password":data.password,
                                                      "foto":foto
                                                    })
                                                    
                                                  }).then(res=>res.json())
                                                  .then(async data=>{
                                                    console.log(data);
                                                    try{
                                                      setBloquear(true);

                                                      await signUp(data.token);

                                                    } catch(e){
                                                      setBloquear(false);

                                                      Snackbar.show({
                                                        text: 'Ocurrió un error al ingresar los datos',
                                                      
                                                        duration: Snackbar.LENGTH_SHORT,
                                                      }); 
                                                    }

                                                  }).catch((error)=>{
                                                    setBloquear(false);

                                                    Snackbar.show({
                                                      text: 'El correo ya se encuentra en uso.',
                                                    
                                                      duration: Snackbar.LENGTH_SHORT,
                                                    }); 


                                                  });

                                                    }



                                                      const cerrarteclado=()=>{


                                                        Keyboard.dismiss();
                                                        

                                                      }

                      return (

                          <TouchableWithoutFeedback
                          onPress={()=>cerrarteclado()}
                          >
                    <View style={styles.container} >

                          <ScrollView 
                  keyboardShouldPersistTaps='handled'
                    >

                      <View style={{alignItems:"center"}}>
                      <Image
                            source={ require('./Tabs/assets/fondos/logo.png') }
                            style={styles.logo}
                          />
                          <Text style={styles.text}>Crear Cuenta</Text>
                      </View>
                         



                  
                    <View style={{flex:1,  justifyContent: 'center', alignItems: 'center'}} >
                          <FormInput
                            onChangeText={(val) => textInputChange(val)}
                                  placeholderText="Nombre de usuario"
                            iconType="user"
                            maxLength={10}
                            autoCorrect={false}
                          />
                        {data.check_textInputChange &&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                    </Animatable.View>}


                                    


                    <FormInput
                            onChangeText={(val) => textemailChange(val)}
                            placeholderText="Correo"
                            iconType="form"
                            keyboardType="email-address"
                          
                            autoCorrect={false}
                          />
                          {data.check_email &&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                    </Animatable.View>}
                                    {data.email_correcto &&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Ingrese un correo válido</Text>
                                    </Animatable.View>}





                    <FormInput
                            onChangeText={(val) => textpasswordChange(val)}
                            placeholderText="Contraseña"
                            iconType="lock"
                            secureTextEntry={true}
                          />
                        {data.check_password&&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                    </Animatable.View>
                                    
                               
                                    }
                                    {     data.check_password_largo&&
                                    <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>La contraseña debe tener al menos 8 caracteres</Text>
                                    </Animatable.View>}



                    <FormInput
                                  onChangeText={(val) => textpasswordconfirma(val)}

                            placeholderText="Repetir Contraseña"
                            iconType="lock"
                            secureTextEntry={true}
                          />
                        {data.check_repassword &&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                    </Animatable.View>}
                                    {data.confirma_password &&
                                  <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Las contraseñas no coinciden</Text>
                                    </Animatable.View>}

                    <FormButton
                                                disabled={bloquear}

                            buttonTitle="Registrarse"
                            onPress={() => sendData()}
                          />





                    <TouchableOpacity
                            disabled={bloquear}
                            style={styles.forgotButton}
                            onPress={()=>navigation.navigate("SignUpScreen")}>
                            <Text style={styles.navButtonText}>
                              Ya tengo cuenta, iniciar sesión
                            </Text>
                          </TouchableOpacity>

                          </View>

                          </ScrollView>

                    </View>

</TouchableWithoutFeedback>




                      );
                    };

                    const styles = StyleSheet.create({
                      container: {
                        backgroundColor: '#f9fafd',
                        flex: 1,
                      
                        padding: 20,
                      },
                      logo: {
                        height: 150,
                        width: 150,
                        resizeMode: 'contain',
                      },
                      text: {
                        fontFamily: 'Kufam-SemiBoldItalic',
                        fontSize: 28,
                        marginBottom: 10,
                        color: '#051d5f',
                      },
                      navButton: {
                        marginTop: 15,
                      },
                      forgotButton: {
                        marginVertical: 35,
                      },
                      navButtonText: {
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#2e64e5',
                        fontFamily: 'Lato-Regular',
                      },
                      errorMsg: {
                        color: '#FF0000',
                        fontSize: 14,
                    },
                    });

                    export default Signup;
