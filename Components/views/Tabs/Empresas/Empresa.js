                                   
                                   import React,{useEffect,UseState} from 'react'
                                   import { View, Text, StyleSheet,ImageBackground,TouchableWithoutFeedback,Image,Modal,TouchableOpacity,Linking,ScrollView,Dimensions,PixelRatio} from 'react-native';
                                   import Snackbar from 'react-native-snackbar';
                                      const size = PixelRatio.getPixelSizeForLayoutSize(20);

                                    const Empresa = ({navigation,route}) => {


                                        const cargarEmpresas=async()=>{

                                            await  fetch('https://secret-brushlands-88440.herokuapp.com/empresas',{
                                                method: "GET",
                                                headers: {"Content-type": "application/json;charset=UTF-8"}                                             
                                              
                                              })
                                              .then(response => response.json()) 
                                              .then(json =>{
                                                console.log('Lista de Empresas: '+JSON.stringify(json));
                  
                                          
                  
                                              }).catch((error)=>{
                                                setEstadoCambio(false)
                  
                                                Snackbar.show({
                                                  text: 'Error al cargar Empresas.',
                                                
                                                  duration: Snackbar.LENGTH_LONG,
                                                });   
                                                          
                                              
                                              });  


                                        }


                                        useEffect(() => {
                                          


                                            cargarEmpresas();


                                   /*          Image.getSize('https://blog.hubspot.es/hs-fs/hubfs/ES%20Blog%20images/Los%2015%20logos%20m%C3%A1s%20creativos%20e%20inspiradores%20del%20mundo/logo_creativo_coca_cola.png?width=650&name=logo_creativo_coca_cola.png',
                                              
                                              (width, height) => {
                                                console.log('ancho: '+width+' '+'alto'+height)
                                                if (width && !height) {
                                                  setAncho(width);
                                                  setAlto(height* (width / width));
                                               
                                              } else if (!width && height) {
                                                setAncho(width* (height / height));
                                                setAlto(height);
                                              
                                              } else {
                                                
                                                setAncho(width);
                                                setAlto(height);
                                              }
                                               
                                              
                                              }); */
                                            
                                        }, [])





                                        return (
                                           <View style={{flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>

                                          <ScrollView
                                          style={{ flex:1,width: '90%',      alignSelf: 'center'
                                        }}
                                 
                                          >
                                         
                            
                                   
                                        <TouchableOpacity  onPress={()=>navigation.navigate('Productos')}   >
                                    
                                    <View
                                         style={styles.img}

                                          >


                                          <Image  resizeMode='cover'  style={{height:'100%',width:'100%',borderRadius:2,overflow:'visible'
                                           }}   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWhzwibktvt8w2jzIeFGi5NDLh43KG1T9nkVTrhvJwgyCZvbK0Sg7b93Ql_DD5RTtILs&usqp=CAU'}}  />
                                          </View>
                                 
                                  
                                    </TouchableOpacity>

                                 
                                        <TouchableOpacity    >
                                    
                                        <View
                                             style={styles.img}

                                              >


                                              <Image  resizeMode='cover'  style={{height:'100%',width:'100%',borderRadius:2,overflow:'visible'
                                               }}   source={{uri:'https://1.bp.blogspot.com/-kmK23muKZHI/X6yy7RcMRNI/AAAAAAAADKM/dE85fkw2f9IDqsef7lGinwpO0VwReuolgCLcBGAsYHQ/s1200/pollo%2Bcampero%2Botro%2Blogo%2Bsii.jpg'}}  />
                                              </View>
                                     
                                      
                                        </TouchableOpacity>
                                 
                                          
                                        <TouchableOpacity    >
                                    
                                    <View
                                         style={styles.img}

                                          >


                                          <Image  resizeMode='cover'  style={{height:'100%',width:'100%',borderRadius:2,overflow:'visible'
                                           }}   source={{uri:'https://tienda.sophosenlinea.com/imagenes/9789202/978920263187.GIF'}}  />
                                          </View>
                                 
                                  
                                    </TouchableOpacity>
                                         
                                 
                                 {/*   1280*720
                                   1200*628 */}
                                    <TouchableOpacity    >
                                    
                                    <View
                                         style={styles.img}

                                          >


                                          <Image  resizeMode='cover'  style={{height:'100%',width:'100%',borderRadius:2,overflow:'visible'
                                           }}   source={{uri:'https://i.ytimg.com/vi/vyYred1jbd0/maxresdefault.jpg'}}  />
                                          </View>
                                 
                                  
                                    </TouchableOpacity>

                                      

                                       {/*      <TouchableOpacity
                                            >

                                              <View
                                             style={styles.img}

                                              >


                                              <Image  resizeMode='contain'  style={{height:'100%',width:'100%',borderRadius:2,overflow:'visible'
                                               }}   source={{uri:'https://cdn.freelogovectors.net/wp-content/uploads/2018/03/kfc-logo03.png'}}  />
                                              </View>
                                           
                                            </TouchableOpacity> */}
                                          

                                         

                                          
                                          </ScrollView>



                                           </View>
                                        )
                                    }

                                    export default Empresa


                                    const styles = StyleSheet.create({

                                      img:{
                                        height: Dimensions.get("window").height * 0.26,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginVertical: 10,
                                      
                                        shadowColor: '#999',
                                        shadowOffset: {width: 0, height: 1},
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 5,
                                        borderRadius:8,
                                        

                                      },
                                      row:{
                                        flexDirection:'row'
                                      },
                                      imageContent:{
                                     
                                        height:Dimensions.get("window").height * 0.2, 
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginVertical: 10,
                                        flexDirection: 'row',
                                        shadowColor: '#999',
                                        shadowOffset: {width: 0, height: 1},
                                        shadowOpacity: 0.8,
                                        shadowRadius: 2,
                                        elevation: 2,
                                        borderRadius:2,
                                      },
                                      imageContent1:{
                                        width:'100%'
                                      },
                                      image:{
                                        width:'100%',
                                        height:'100%',
                                      },

                                    })