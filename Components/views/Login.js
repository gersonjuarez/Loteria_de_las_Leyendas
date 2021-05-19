

                            import React, {useState,useEffect} from 'react';

                            //React Navigation
                            import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

                            import { createDrawerNavigator } from '@react-navigation/drawer';
                            import { TextInput,Button } from 'react-native-paper';
                            import { View, Text, StatusBar,StyleSheet,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Image,ScrollView,Linking,Platform} from 'react-native';
                            import * as Animatable from 'react-native-animatable';
                            import Snackbar from 'react-native-snackbar';
                            import SafariView from 'react-native-safari-view';

                            import FormInput from './Social/FormInput';
                            import SocialButton from './Social/SocialButton'
                            import FormButton from './Social/FormButton'


                            import { AuthContext } from './context';






                          







                            const Login = ({navigation}) => {

                              const [name, setName] = useState('');
                              const [password, setPassword] = useState('');
                              const [validar,setValidar]=useState(false);
                              const [validar2,setValidar2]=useState(false);
                              const [datos,setDdatos]=useState();
                              const { signIn } = React.useContext(AuthContext);
                              const { signUp } = React.useContext(AuthContext);
                              const [bloquear,setBloquear]=useState(false);

                              const [data, setData] = useState("");



                              useEffect(() => {
                               
                                GoogleSignin.configure({
                                  scopes: ['email','profile'],
                                androidClientId: '83347346468-krhvto51rrpm0erppdfbgcfroalhsj57.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                               
                              });
    

                              }, [])

                            const   Iniciar = async () => {
                                try {
                                 
                                  const userInfo = await GoogleSignin.signIn();
                                   const email=userInfo.user.email;
                                     const nombreaux=userInfo.user.givenName.split(" ",1);
                                     
                                      const foto=userInfo.user.photo; 

                                     InicioGoogle(email,nombreaux,foto)

                                      
                                } catch (error) {
                                  await GoogleSignin.revokeAccess();
                                  await GoogleSignin.signOut();
                                }
                              };
                              



                              const InicioGoogle=(email,nombreaux,foto)=>{


                                fetch("https://api-loteria-heroku.herokuapp.com/signup/google/",{
                                  method:"POST",
                                  headers:{
                                'Content-Type': 'application/json'
                                  },
                                  body:JSON.stringify({
                                    "email":email,
                                    "nombreaux":nombreaux,
                                    "foto":foto
                                  })
                                  
                                }).then(res=>res.json())
                                .then(async data=>{
                                  console.log(data);
                                  try{

                                    await signUp(data.token);
                                    await GoogleSignin.revokeAccess();
                                    await GoogleSignin.signOut();
                                  } catch(e){

                                    Snackbar.show({
                                      text: 'Ocurrió un error al iniciar.',
                                    
                                      duration: Snackbar.LENGTH_SHORT,
                                    }); 
                                  }

                                }).catch((error)=>{

                                  
                                  Snackbar.show({
                                    text: 'Ocurrió un error al iniciar.',
                                  
                                    duration: Snackbar.LENGTH_SHORT,
                                  }); 


                                });

                                  




                              }








                              useEffect(() => {
                                
                              

                              /*  Linking.getInitialURL().then((ev) => {
                                  if (ev) {
                                    handleOpenURL(ev);
                                  }
                                }).catch(err => {
                                    console.log(err);
                                }); */

                                Linking.addEventListener('url', handleOpenURL);

                              
                                

                              





                              }, []);
                              

                              /*  useEffect(() => {
                              
                                
                                Linking.removeEventListener('url', handleOpenURL);
                                
                                
                              }, []); */ 





                              const handleOpenURL = ({ url }) => {

                                if (Platform.OS === 'ios') {
                                  SafariView.dismiss();
                                }

                                if (url.indexOf("?id") !== -1) {

                                  
                                    if (url){
                                    console.log('enlace: '+url)
                                    const token= url.substr(28,url.length)
                                    const llave=token.replace('#','')
                                    console.log('token sin #: '+llave);
                                    signUp(llave);

                                  }
                                  
                                    /* setData(url); */
                                

                                }
                              };

                  







                            const  sendData=async(name,password)=>{
                              Keyboard.dismiss();

                              setBloquear(true)
                                
                            
                                if( name.trim().length >0   ) {
                                  setValidar(false);
                                

                              } else {

                              setValidar(true);
                              


                              }



                              if(  password.trim().length >0  ) {
                              
                                setValidar2(false);

                            } else {


                            setValidar2(true);


                            }


                            if(name.trim().length==0 || password.trim().length==0 || name.trim().length==0 && password.trim().length==0){
                              
                              setBloquear(false)


                            return;

                            }


                                  

                            //http://10.0.2.2:3000
                            //https://api-loteria-heroku.herokuapp.com

                                fetch("https://api-loteria-heroku.herokuapp.com/signin",{
                                  method:"POST",
                                  headers:{
                                'Content-Type': 'application/json'
                                  },
                                  body:JSON.stringify({
                                    "email":name,
                                    "password":password
                                  })
                                }).then(res=>res.json())
                                .then(async data=>{
                                  
                                  try{
                                    setBloquear(true)

                            /*     await   AsyncStorage.setItem('userToken',data.token) 
                            */    await signIn(data.token);


                            /*     signIn(data.token); 
                            */

                                  } catch(e){
                                    setBloquear(false)

                                    Snackbar.show({
                                      text: 'Ocurrió un error, revise su conexión a internet',
                                    
                                      duration: Snackbar.LENGTH_SHORT,
                                    });
                                  }
                                
                                }).catch((error)=>{
                                  setBloquear(false)

                                  Snackbar.show({
                                    text: 'Correo o contraseña incorrecto',
                                  
                                    duration: Snackbar.LENGTH_SHORT,
                                  });    });
                                
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
                                  <Text style={styles.text}>Inicio de Sesión</Text>
                                      </View>
                                  <FormInput
                                    labelValue={name}
                                    onChangeText={(name) => setName(name)}
                                    placeholderText="Correo"
                                    iconType="form"
                                    keyboardType="email-address"
                                  
                                    autoCorrect={false}
                                  />
                                  { validar &&
                                        <Animatable.View animation="fadeInLeft" duration={500}>
                                        <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                        </Animatable.View>
                                        }

                                  <FormInput
                                    labelValue={password}
                                    onChangeText={(password) => setPassword(password)}
                                    placeholderText="Contraseña"
                                    iconType="lock"
                                    secureTextEntry={true}
                                  />
                            { validar2 &&
                                        <Animatable.View animation="fadeInLeft" duration={500}>
                                        <Text style={styles.errorMsg}>El campo no debe estar vacío</Text>
                                        </Animatable.View>
                                        }
                                  <FormButton
                                  disabled={bloquear}
                                    buttonTitle="Iniciar Sesión"       
                                    onPress={() => sendData(name,password)}
                                  />

                              {/*    <SocialButton 
                                    buttonTitle="Iniciar Con Facebook"
                                    btnType="facebook"
                                    color="#4867aa"
                                    backgroundColor="#e6eaf4"
                                    onPress={() => Linking.openURL('https://api-loteria-heroku.herokuapp.com/auth/facebook')}

                                  /> */}
                                  
                                <SocialButton 
                                disabled={bloquear}
                                    buttonTitle="Iniciar Con Google"
                                    btnType="google"
                                    color="#de4d41"
                                    backgroundColor="#f5e7ea"

                                    onPress={()=>Iniciar()}

/*                                     onPress={() => Linking.openURL('https://api-loteria-heroku.herokuapp.com/auth/google')}
 */                                  />
                            


                                  <TouchableOpacity
                                  disabled={bloquear}
                                    style={styles.forgotButton}
                                    onPress={()=>navigation.navigate("SignInScreen")}>
                                    <Text style={styles.navButtonText}>
                                      Crear Cuenta
                                    </Text>
                                  </TouchableOpacity>
                                  
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
                                alignItems:'center'
                              },
                              navButtonText: {
                                fontSize: 18,
                                fontWeight: '500',
                                color: '#2e64e5',
                                fontFamily: 'Lato-Regular'
                              },
                              errorMsg: {
                                color: '#FF0000',
                                fontSize: 14,
                            },
                            });

                            export default Login;



{/*
  
  <StatusBar backgroundColor="red" barStyle="light-content" />


  <Button icon="camera" mode="contained" onPress={() => sendData()}
      style={{marginLeft:18,marginRight:18,marginTop:18}}

>
    Press me
  </Button>



  <TouchableOpacity>
    <Text
          style={{marginLeft:18,marginRight:18,marginTop:18}}
          onPress={()=>navigation.navigate("SignInScreen")}

    >¿Crear cuenta?</Text>
  </TouchableOpacity>





*/}