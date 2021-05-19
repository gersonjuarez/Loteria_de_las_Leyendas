
                                      import React,{useState,useEffect,useRef} from 'react';
                                      import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
                                      import {useTheme, Avatar} from 'react-native-paper';
                                      import {View} from 'react-native-animatable';import {createStackNavigator} from '@react-navigation/stack';
                                      import Icon from 'react-native-vector-icons/AntDesign';
                                      import Icon2 from 'react-native-vector-icons/Ionicons';
                                      import Icon3 from 'react-native-vector-icons/MaterialIcons'
                                      import Rate from 'react-native-vector-icons/FontAwesome5'

                                      import IconRegreso from 'react-native-vector-icons/Entypo';
                                      import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
                                      import { TouchableOpacity,AppState} from 'react-native';
                                      import AsyncStorage from '@react-native-community/async-storage';
                                      import Sound from 'react-native-sound';

                                      import Inicio from './Inicio';
                                      import Detalle from './Detalle';
                                      import Listado from './Tabs/Listado';
                                      import Consejos from './Tabs/Consejos';
                                      import Perfil from './Perfil';
                                      import EditarPerfil from './EditarPerfil';
                                      import Calificar from './Calificar';
                                      import Productos from './Tabs/Empresas/Productos';
                                      import DetalleProducto from './DetalleProducto';
                                      import Comentarios from './Comentarios';
                                      import GeneralComentario from './GeneralComentario';
                                      import EditarComentario from './EditarComentario';
                                      import Empresa from './Tabs/Empresas/Empresa';
                                      import ProductoEmpresa from './Tabs/Empresas/ProductoEmpresa';
                                      

                                      const InicioM=createStackNavigator();
                                      const CalificarM=createStackNavigator();

                                      const DetalleM=createStackNavigator();
                                      const ConsejoM=createStackNavigator();
                                      const ProfileStack = createStackNavigator();

                                      const Tab = createMaterialBottomTabNavigator();


                                      var mySound;
                                      var auxiliar=0;
                                    


                                        


                                      
                                      const MainTabScreen = () => (


                                        <Tab.Navigator
                                        
                                        initialRouteName="Inicio"
                                        activeColor="#fff"
                                        onPress={()=>mySound.play()}
                                        >
                                          <Tab.Screen

                                            name="Home"
                                            component={MenuInicio}

                                            options={{
                                            
                                              tabBarLabel: 'Inicio',
                                              tabBarColor: '#440055',
                                            
                                              tabBarIcon: ({color}) => (
                                                
                                                <Icon 
                                                
                                                

                                                name="home" color={color} size={26}

                                                
                                                />
                                                ),
                                            }}
                                          />

                                          
                                          <Tab.Screen

                                            name="Calificar"
                                            component={MenuCalificar}

                                            options={{

                                              tabBarLabel: 'Premios',
                                              tabBarColor: '#E05B89',

                                              tabBarIcon: ({color}) => (
                                                
                                                <Rate 
                                                
                                                

                                                name="gift" color={color} size={26}

                                                
                                                />
                                                ),
                                            }}
                                            />
                                          <Tab.Screen
                                            name="Consejos"
                                            component={MenuConsejo}

                                            options={{
                                              tabBarLabel: 'Instrucciones',
                                              tabBarColor: '#1f65ff',
                                              tabBarIcon: ({color}) => (
                                                
                                                <Icon3 name="my-library-books" color={color} size={26} 
                                                
                                               

                                                />
                                                ),
                                            }}
                                          />
                                        
                                          <Tab.Screen
                                            name="Juego"
                                            component={MenuDetalle}
                                            options={{
                                              tabBarLabel: 'Jugar',
                                              tabBarColor: '#004278',
                                              tabBarIcon: ({color}) => (
                                                <Icon2 name="game-controller" size={26} color={color} />
                                                ),
                                            }}
                                          />

                                      <Tab.Screen
                                            name="Perfil"
                                            component={ProfileStackScreen}
                                            options={{
                                              tabBarLabel: 'Perfil',
                                              tabBarColor: '#694fad',
                                              tabBarIcon: ({color}) => (
                                                <Icon 
                                                onPress={()=>{mySound.stop(),mySound.play()}}
                                                name="user" color={color} size={26} />
                                              ),
                                            }}
                                          />
                                        </Tab.Navigator>
                                      );

                                      export default MainTabScreen;

                                      const MenuInicio = ({navigation}) => {
                                        const {colors} = useTheme();
                                        let estado;
                                        
                                        const appState = useRef(AppState.currentState);
                                        const [appStateVisible, setAppStateVisible] = useState(appState.current);
                                        let inicio2;
                                       
                                  



                                        useEffect(() => {
                                        
                                          navigation.addListener('focus',()=>{
                                            auxiliar=1;

                                            mySound = new Sound('botones.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                              if(error){
                                              console.log('Error loading sound: ' + error);
                                              return;
                                              }else{
                                              mySound.setVolume(0.8);
                                              mySound.stop();
                                              mySound.play();
                                                console.log('sonido cargado')
                                              }
                                              });




                                              inicio = new Sound('inicio.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                                if(error){
                                                console.log('Error loading sound: ' + error);
                                                return;
                                                }else{
                                                inicio.setVolume(1);
                                                inicio.stop();
                                                inicio.play();
                                                inicio.setNumberOfLoops(-1)

                                                  console.log('sonido cargado')
                                                }
                                                });


                                            




                                          })

                                          
                                       

                                        }, [])



                                     

                                        
                                        useEffect(() => {
                                          AppState.addEventListener("change", _handleAppStateChange);
                                      
                                          return () => {
                                            AppState.removeEventListener("change", _handleAppStateChange);
                                          };
                                        }, []);
                                      
                                        const _handleAppStateChange = (nextAppState) => {
                                          if (
                                            appState.current.match(/inactive|background/) &&
                                            nextAppState === "active"
                                            
                                          ) {
                                            console.log("App has come to the foreground!");
                                            
                                           if(auxiliar===1){
                                            inicio = new Sound('inicio.mp3',Sound.MAIN_BUNDLE,(error)=>{
                                              if(error){
                                              console.log('Error loading sound: ' + error);
                                              return;
                                              }else{
                                              inicio.setVolume(1);
                                              inicio.setCurrentTime(estado);
                                              inicio.stop();
                                              inicio.play();
                                              inicio.setNumberOfLoops(-1)

                                              }
                                              });               
                                           }
                                            
                                            }
                                      
                                          appState.current = nextAppState;
                                          setAppStateVisible(appState.current);
                                          inicio.getCurrentTime((segundo)=>estado=segundo);
                                          console.log('segundos: '+estado)
                                    
                                          inicio.stop();
                                          inicio.release();

                                        };
                              

                
  

                                        return (
                                          
                                            

                                          <InicioM.Navigator
                                            screenOptions={{
                                              
                                              headerStyle: {
                                                backgroundColor: colors.background,
                                                shadowColor: colors.background, // iOS
                                                elevation: 0, // Android
                                              },
                                              headerTintColor: colors.text,
                                              headerTitleStyle: {
                                                fontWeight: 'bold',
                                              },
                                            }}>
                                            <InicioM.Screen
                                              name="Home"
                                              component={Inicio}
                                              options={{
                                                title: 'Lotería',
                                                headerLeft: () => (
                                                  <View style={{marginLeft: 10}}>
                                                    <MaterialCommunityIcons.Button
                                                      name="menu"
                                                      size={25}
                                                      color={colors.text}
                                                      backgroundColor={colors.background}
                                                      onPress={() =>{navigation.openDrawer(),inicio.stop()}}
                                                    />
                                                  </View>
                                                ),
                                             
                                              }}
                                            />
                                     
                                          </InicioM.Navigator>

                                          
                                        );
                                      };



                                      const MenuCalificar = ({navigation}) => {

                                        navigation.addListener('focus',()=>{
                                          auxiliar=2;
                                          inicio.stop();
                                          mySound.stop();
                                          mySound.play();

                                        })

                                          return(
                                        <CalificarM.Navigator
                                          screenOptions={{
                                            headerStyle: {
                                              backgroundColor: '#DF5B8A',
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                              fontWeight: 'bold',
                                            },
                                          }}>
                                          <CalificarM.Screen
                                            name="Calificar"
                                            component={Calificar}
                                            options={{
                                              title: 'Premios',
                                              headerLeft: () => (
                                                
                                                <View style={{marginLeft: 10}}>
                                                <MaterialCommunityIcons.Button
                                                  name="menu"
                                                  size={25}
                                                  backgroundColor="#DF5B8A"
                                                  onPress={() => navigation.openDrawer()}
                                                />
                                                </View>
                                              ),
                                            }}
                                          />




                                            
                                                     <CalificarM.Screen 
                                                      name="DetalleProducto"
                                                      component={DetalleProducto}
                                                      options={({route}) => ({
                                                      
                                                        headerBackTitleVisible: false,
                                                        headerTitle: false,
                                                        headerTransparent: true,
                                                        headerTintColor: '#fff'
                                                      })}
                                                    /> 

                                                      <CalificarM.Screen 
                                                      name="Comentarios"
                                                      component={Comentarios}
                                                      options={({route}) => ({
                                                      
                                                        headerBackTitleVisible: false,
                                                        headerTitle: false,
                                                       
                                                        headerTintColor: '#fff'
                                                      })}
                                                    /> 

                                                    <CalificarM.Screen 
                                                      name="EditarComentario"
                                                      component={EditarComentario}
                                                      options={({route}) => ({
                                                      
                                                        headerBackTitleVisible: false,
                                                        headerTitle: false,
                                                       
                                                        headerTintColor: '#fff'
                                                      })}
                                                    /> 

                                                  <CalificarM.Screen 
                                                      name="GeneralComentario"
                                                      component={GeneralComentario}
                                                      options={({route}) => ({
                                                      
                                                        headerBackTitleVisible: false,
                                                        headerTitle: false,
                                                       
                                                        headerTintColor: '#fff'
                                                      })}
                                                    />

                                        </CalificarM.Navigator>

                                        )
                                      }
                                   




                                      const MenuConsejo = ({navigation}) => {

                                        navigation.addListener('focus',()=>{
                                          auxiliar=2;
                                          inicio.stop();
                                          mySound.stop();
                                          mySound.play();

                                        })

                                          return(
                                        <ConsejoM.Navigator
                                          screenOptions={{
                                            headerStyle: {
                                              backgroundColor: '#1f65ff',
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                              fontWeight: 'bold',
                                            },
                                          }}>
                                          <ConsejoM.Screen
                                            name="Instrucciones"
                                            component={Consejos}
                                            options={{
                                              headerLeft: () => (
                                                <View style={{marginLeft: 10}}>
                                                <MaterialCommunityIcons.Button
                                                  name="menu"
                                                  size={25}
                                                  backgroundColor="#1f65ff"
                                                  onPress={() => navigation.openDrawer()}
                                                />
                                                </View>
                                              ),
                                            }}
                                          />
                                        </ConsejoM.Navigator>

                                        )
                                      }
                                   


                                      const MenuDetalle = ({navigation}) => {



                                        navigation.addListener('focus',()=>{
                                          auxiliar=3;
                                          inicio.stop();
                                          mySound.stop();
                                          mySound.play();

                                        })


                                        return(
                                        <DetalleM.Navigator
                                          screenOptions={{
                                            headerStyle: {
                                              backgroundColor: '#004278',
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                              fontWeight: 'bold',
                                            },
                                          }}>
                                          <DetalleM.Screen
                                            name="Jugar"
                                            component={Listado}
                                            options={{
                                              headerLeft: () => (
                                                <View style={{marginLeft: 10}}>


                                                
                                                <MaterialCommunityIcons.Button
                                                  name="menu"
                                                  size={25}
                                                  backgroundColor="#004278"
                                                  onPress={() => navigation.openDrawer()}
                                                />
                                                </View>
                                              ),
                                            }}
                                          />
                                        </DetalleM.Navigator>
                                        )

                                      };

                                      const ProfileStackScreen = ({navigation}) => {
                                        const {colors} = useTheme();
                                        navigation.addListener('focus',()=>{
                                          auxiliar=4;
                                          inicio.stop();
                                          mySound.stop();
                                          mySound.play();

                                        })
                                        return (
                                          <ProfileStack.Navigator
                                            screenOptions={{
                                              headerStyle: {
                                                backgroundColor: colors.background,
                                                shadowColor: colors.background, // iOS
                                                elevation: 0, // Android
                                              },
                                              headerTintColor: colors.text,
                                            }}>
                                            <ProfileStack.Screen
                                              name="Profile"
                                              component={Perfil}
                                              options={{
                                                title: '',
                                                headerLeft: () => (
                                                  <View style={{marginLeft: 10}}>
                                                    <MaterialCommunityIcons.Button
                                                      name="menu"
                                                      size={25}
                                                      backgroundColor={colors.background}
                                                      color={colors.text}
                                                      onPress={() => navigation.openDrawer()}
                                                    />
                                                  </View>
                                                ),
                                                headerRight: () => (
                                                  <View style={{marginRight: 10}}>
                                                    <MaterialCommunityIcons.Button
                                                      name="cart"
                                                      size={25}
                                                      backgroundColor={colors.background}
                                                      color={colors.text}
                                                      onPress={() => navigation.navigate('EditarPerfil')}
                                                    />
                                                  </View>
                                                ),
                                              }}
                                            />
                                            <ProfileStack.Screen
                                              name="EditarPerfil"
                                              options={{
                                                title: 'Cambio Y Cupones',
                                              }}
                                              component={EditarPerfil}
                                            />



                                                      <ProfileStack.Screen
                                                      name="Empresa"
                                                      component={Empresa}
                                                      options={({route}) => ({
                                                      
                                                        title: 'Empresas',

                                                   
                                                      })}
                                                    /> 

                                                      <ProfileStack.Screen
                                                      name="Productos"
                                                      component={Productos}
                                                      options={({route}) => ({
                                                        title:'Productos',
                                                        headerBackTitleVisible: false
                                                      })}
                                                    />

                                                  <ProfileStack.Screen
                                                      name="ProductoEmpresa"
                                                      component={ProductoEmpresa}
                                                      options={({route}) => ({
                                                      
                                                        
                                                        headerBackTitleVisible: false,
                                                        headerTitle: false,
                                                        headerTransparent: true,
                                                        headerTintColor: '#fff'

                                                   
                                                      })}
                                                    /> 

                                          </ProfileStack.Navigator>
                                        );





                                      };





