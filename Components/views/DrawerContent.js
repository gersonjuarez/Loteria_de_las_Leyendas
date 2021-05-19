                            import React,{useState,useEffect} from 'react';
                            import { View, StyleSheet,Dimensions,Modal,Alert } from 'react-native';
                            import {
                                useTheme,
                                Avatar,
                                Title,
                                Caption,
                                Paragraph,
                                Drawer,
                                Text,
                                TouchableRipple,
                                Switch
                            } from 'react-native-paper';
                            import {
                                DrawerContentScrollView,
                                DrawerItem
                            } from '@react-navigation/drawer';
                            const {width,height}=Dimensions.get('window');

                            import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
                            import AsyncStorage from '@react-native-community/async-storage';

                            import { Context } from './context';
                            import { AuthContext } from './context';
                            import Premios from './Tabs/Screen/Premios';
                            import EditarPerfil from './EditarPerfil';

export function DrawerContent(props) {



    const { signOut } = React.useContext(AuthContext);

    const [email,setEmail] = useState('cargando...')
    const [nom,setNom]=useState('cargando...');
    const [fotPerfil,setFotPerfil]=useState('https://st4.depositphotos.com/18657574/21819/v/450/depositphotos_218193530-stock-illustration-reload-arrow-vector-icon-isolated.jpg');
    const [id,setId]=useState('');
    const [modalVisiblePremio, setModalVisiblePremio] = useState(false);









  const refresh=async()=>{


    const foto=await AsyncStorage.getItem("foto")
    const email=await AsyncStorage.getItem("email")
    const nombre=await AsyncStorage.getItem("nombre")


    setEmail(email);
    setNom(nombre);
    setFotPerfil(foto);
  }

    const User= async ()=>{
       const token = await AsyncStorage.getItem("userToken")
     fetch('https://api-loteria-heroku.herokuapp.com/',{
     headers:new Headers({
       Authorization:"Bearer "+token
     })
     }).then(res=>res.json())
     .then(async data=>{
       
   
      await  AsyncStorage.setItem('foto',data.foto)        
      await AsyncStorage.setItem('email',data.email) 
      await AsyncStorage.setItem('nombre',data.nombre) 
      await AsyncStorage.setItem('id',data.id)
     }
     )
    }
 useEffect(()=>{
    User()
    refresh()
 },[])   


 refresh()



    return(
        <View style={{flex:1}}>


            <DrawerContentScrollView
            {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                            style={{backgroundColor:'#F5F8F6'}}
                                source={{
                                    uri:fotPerfil
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column',width:width*0.45}}>
                                <Title style={styles.title}>{nom}</Title>
                                <Caption style={styles.caption}>{email}</Caption>

                       </View>
                        </View>

                   
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Inicio"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Perfil"
                            onPress={() => {props.navigation.navigate('Perfil')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="gift" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Premios"
                            onPress={() =>{props.navigation.navigate('Calificar')} }
                        />

                              <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Tienda"
                            onPress={async() =>{
                              
                              props.navigation.navigate('Perfil')
                              
                              setTimeout(() => {
                                props.navigation.navigate('EditarPerfil')

                              }, 100);
                            
                            
                            }}
                        />  
                     
                    </Drawer.Section>
                 
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Cerrar Sesión"
                    onPress={() => {props.navigation.navigate('Home'),signOut()}}
                />
                  </Drawer.Section>
      {modalVisiblePremio&&
                  <View style={styles.centeredView}>
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
         </View>
}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalTablero: {
      flex: 1,
         backgroundColor: "white",
         paddingTop:10,
      justifyContent: "center",
      alignItems: "center",
       
      
        
    }
  });