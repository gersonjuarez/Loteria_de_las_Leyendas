                        import React,{useState,useEffect} from 'react'
                        import { Text, View, Image,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';

                        const Figuras = ({setColor1,setColor2,setColor3,setColor4,setValorFigura,estadofigura,valorFigura,figuras,setFiguras}) => {

                    
                            const [cuadro1,setCuadro1]=useState('white');
                            const [cuadro2,setCuadro2]=useState('white');
                            const [cuadro3,setCuadro3]=useState('white');
                            const [cuadro4,setCuadro4]=useState('white');
                            const [cuadro5,setCuadro5]=useState('white');
                            const [cuadro6,setCuadro6]=useState('white');
                            const [cuadro7,setCuadro7]=useState('white');
                            const [cuadro8,setCuadro8]=useState('white');

                            useEffect(() => {
                              
                            EscogerFigura(valorFigura);

                            }, [])
                            const EscogerFigura=(valor)=>{

                                setCuadro1('white');
                                setCuadro2('white');
                                setCuadro3('white');
                                setCuadro4('white');
                                setCuadro5('white');
                                setCuadro6('white');
                                setCuadro7('white');
                                setCuadro8('white');
                                setColor1('black');
                                setColor2('black');
                                setColor3('black');
                                setColor4('black');
            
                                if(valor==1 ){
            
                                  setCuadro1('red');           
                                  setColor1('red');
                                  setValorFigura(valor)
            
                                }
                                if(valor==2){
                                  setCuadro2('red');
                                  setColor1('red');
                                  setValorFigura(valor)
                                }
                                if(valor==3 ){
            
                                  setCuadro3('red');           
                                  setColor2('red');
                                  setValorFigura(valor)
            
                                }
                                if(valor==4){
                                  setCuadro4('red');
                                  setColor2('red');
                                  setValorFigura(valor)
                                }
            
                                if(valor==5){
                                  setCuadro5('red');
                                  setColor3('red');
                                  setValorFigura(valor)
                                }
                                if(valor==6){
                                  setCuadro6('red');
                                  setColor3('red');
                                  setValorFigura(valor)
                                } if(valor==7){
                                  setCuadro7('red');
                                  setColor3('red');
                                  setValorFigura(valor)
                                } if(valor==8){
                                  setCuadro8('red');
                                  setColor4('red');
                                  setValorFigura(valor)
                                }
            
            
            
            
            
                              }     





                            return (
                              <TouchableWithoutFeedback
                              onPress={()=>setFiguras(!figuras)}
                              >
                                <View style={{  flex:1,justifyContent: "center",alignItems: "center"}} >

                                             
                                                      <View style={{width:'90%',height:'40%',backgroundColor: 'white',opacity:0.9, borderRadius:15,alignItems:"center",justifyContent:"center",alignContent:"center",flexDirection:"row"}}>
                                                        
                                                    
                                                      {
                                                        estadofigura==4&&
                                                        <>
                                                      <TouchableOpacity
                                                      style={{width:'40%',height:'65%',marginHorizontal:'5%'}}
                                                      onPress={()=>EscogerFigura(1)}
                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/1.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro1,borderWidth:5}}    />
                                                      </TouchableOpacity>

                                                              
                                                      <TouchableOpacity
                                                      style={{width:'40%',height:'65%',marginHorizontal:'5%'}}
                                                      onPress={()=>EscogerFigura(2)}

                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/2.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro2,borderWidth:5}}    />
                                                      </TouchableOpacity>
                                                      </>
                                                      }
                                                        

                                                          
                                                      {
                                                        estadofigura==5&&
                                                        <>
                                                      <TouchableOpacity
                                                      style={{width:'40%',height:'65%',marginHorizontal:'5%'}}
                                                      onPress={()=>EscogerFigura(3)}
                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/3.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro3,borderWidth:5}}    />
                                                      </TouchableOpacity>

                                                              
                                                      <TouchableOpacity
                                                      style={{width:'40%',height:'65%',marginHorizontal:'5%'}}
                                                      onPress={()=>EscogerFigura(4)}

                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/4.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro4,borderWidth:5}}    />
                                                      </TouchableOpacity>
                                                      </>
                                                      }


                                                      {
                                                        estadofigura==6&&
                                                        <>
                                                      <TouchableOpacity
                                                      style={{width:'30%',height:'48%',marginHorizontal:'1%'}}
                                                      onPress={()=>EscogerFigura(5)}
                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/5.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro5,borderWidth:5}}    />
                                                      </TouchableOpacity>

                                                              
                                                      <TouchableOpacity
                                                      style={{width:'30%',height:'48%',marginHorizontal:'1%'}}
                                                      onPress={()=>EscogerFigura(6)}

                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/6.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro6,borderWidth:5}}    />
                                                      </TouchableOpacity>

                                                      <TouchableOpacity
                                                      style={{width:'30%',height:'48%',marginHorizontal:'1%'}}
                                                      onPress={()=>EscogerFigura(7)}

                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/7.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro7,borderWidth:5}}    />
                                                      </TouchableOpacity>
                                                      </>
                                                      }

                                                        {
                                                         estadofigura==9&&
                                                        <>
                                                      <TouchableOpacity
                                                      style={{width:'40%',height:'65%'}}
                                                      onPress={()=>EscogerFigura(8)}
                                                      >
                                                        <Image  source={require('../assets/fondos/figuras/8.png')}  resizeMode="contain" style={{width:'100%',height:'100%',borderColor:cuadro8,borderWidth:5}}    />
                                                      </TouchableOpacity>

                                                              
                                                   
                                                      </>
                                                      }




                                                      </View>

                                                      </View>


                                                      </TouchableWithoutFeedback>
                            )
                        }

                        export default Figuras
