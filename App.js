
                                import 'react-native-gesture-handler';

                                import React,{useState,useEffect} from 'react';

                                //React Navigation

                                import {NavigationContainer, StackActions} from '@react-navigation/native';
                                import { createDrawerNavigator } from '@react-navigation/drawer';
                                import { StyleSheet,View,Modal} from 'react-native';
                                import { createStackNavigator } from '@react-navigation/stack';

                                import MenuTab from './Components/views/MenuTab'

                                import Loading from './Components/views/Loading';
                                import AsyncStorage from '@react-native-community/async-storage';
                                import RootStackScreen from './Components/views/RootStackScreen';
                                import { DrawerContent } from './Components/views/DrawerContent';
                                import { AuthContext } from './Components/views/context';

                                const Drawer = createDrawerNavigator();


                                const Stack = createStackNavigator();


                                const App = () => {




                                  const initialLoginState = {
                                    isLoading: true,
                                    userName: null,
                                    userToken: null,
                                  };


                                const loginReducer = (prevState, action) => {
                                    switch( action.type ) {
                                      case 'RETRIEVE_TOKEN': 
                                        return {
                                          ...prevState,
                                          userToken: action.token,
                                          isLoading: false,
                                        };
                                      case 'LOGIN': 
                                        return {
                                          
                                          ...prevState,
                                /*           userName: action.id,
                                */          userToken: action.token,
                                          isLoading: false,
                                        };
                                      case 'LOGOUT': 
                                        return {
                                          ...prevState,
                                /*           userName: null,
                                */          userToken: null,
                                          isLoading: false,
                                        };
                                      case 'REGISTER': 
                                        return {
                                          ...prevState,
                                /*           userName: action.id,
                                */          userToken: action.token,
                                          isLoading: false,
                                        };
                                    }
                                  };
                                  
                                /*   AsyncStorage.removeItem('userToken');
                                */  

                                const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

                                  const authContext = React.useMemo(() => ({
                                    signIn: async(foundUser) => {
                                      // setUserToken('fgkj');
                                      // setIsLoading(false);
                                      console.log('entra al signin')
                                      const userToken = foundUser;

                                      try {

                                        await AsyncStorage.setItem('userToken', userToken);
                                      } catch(e) {
                                        console.log(e);
                                      }
                                      console.log('user token: ', userToken);


                                      dispatch({ type: 'LOGIN', /* id: userName, */ token: userToken });
                                    },
                                    signOut: async() => {
                                      // setUserToken(null);
                                      // setIsLoading(false);
                                      try {
                                        await AsyncStorage.removeItem('userToken');
                                        await AsyncStorage.removeItem('foto');
                                        await AsyncStorage.removeItem('nombre');
                                        await AsyncStorage.removeItem('email');
                                        await AsyncStorage.removeItem('id');
                                        await AsyncStorage.removeItem('creadormaiz');

                                      } catch(e) {
                                        console.log(e);
                                      }
                                      dispatch({ type: 'LOGOUT' });
                                    },
                                    signUp: async (foundUser) => {
                                      const userToken = foundUser;
                                      try {

                                        await AsyncStorage.setItem('userToken', userToken);
                                      } catch(e) {
                                        console.log(e);
                                      }
                                      console.log('user token: ', userToken);


                                      dispatch({ type: 'REGISTER', /* id: userName, */ token: userToken });
                                    },
                                  

                                  }), []);

                                  useEffect(() => {
                                    setTimeout(async() => {
                                      let userToken;
                                      userToken = null;
                                      try {
                                        userToken = await AsyncStorage.getItem('userToken');
                                        console.log(userToken)
                                      } catch(e) {
                                        console.log(e);
                                      }
                                      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
                                    }, 1300);
                                  }, []);






                                  if( loginState.isLoading ) {
                                    return(
                                      <Loading/>
                                    );
                                  }

                                  return (


                                < >


                                  

                                <AuthContext.Provider value={authContext}>

                                <NavigationContainer >
                                      { loginState.userToken !== null? (

                                          
                                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>

                                          <Drawer.Screen name="MenuTab" component={MenuTab} />

                                  

                                        </Drawer.Navigator>

                                      )
                                    :

                                    
                                    <RootStackScreen />


                                    }
                                    </NavigationContainer>
                                    </AuthContext.Provider>







                                  
                                  






                                </>






                                  );
                                };


                                export default App;




