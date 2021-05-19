                                import React from 'react'
                                import Snackbar from 'react-native-snackbar';

                                const Marcado = (marcado_no,marcado,resultado,setResultado,id,idd,valorMarcado) => {
                                  


                                    marcado_no.stop();
                                    marcado.stop();
                                
                                    var pasadas=0;
                                    var pasadas2=0;

                                    // Marcar 4-1

                                    if(valorMarcado==1){
                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[0][0].id==id||resultado[0][2].id==id||resultado[1][1].id==id||resultado[2][0].id==id||resultado[2][2].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }

                                    }





                                    //Marcar 4-2
                                    if(valorMarcado==2){

                                        
                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[0][1].id==id||resultado[1][0].id==id||resultado[1][1].id==id||resultado[1][2].id==id||resultado[2][1].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }



                                    }






                                //Marcado 5-1
                                    if(valorMarcado==3){

                                        
                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[0][0].id==id||resultado[2][0].id==id||resultado[0][2].id==id||resultado[2][2].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }




                                    }



                                    // Marcar 5-2
                                    if(valorMarcado==4){


                                       

                                        
                                            for (var i in resultado){
                                        
                                                for(var j in resultado[i]){
                                                 
                                                 
                                                  if(resultado[i][j].id===id && id===idd){
          
                                                 if(resultado[0][1].id==id||resultado[1][0].id==id||resultado[1][2].id==id||resultado[2][1].id==id){
                                                   marcado_no.play();
                                                  Snackbar.show({
                                                    text:'Revise las figuras a marcar.',
                                                  
                                                  duration: Snackbar.LENGTH_LONG,
                                                  });
                                                  return;
                                              
                                                }
          
                                                  
          
                                                    let copia = [...resultado];
                                                    copia[i][j].estado = true;
                                                    setResultado(copia);
                                                    copia=[];
                                                    pasadas2=1;
                                                   
                                                    }else{
                                                      pasadas=pasadas+1
                                                     
                                                   
          
                                                    }
                                                }
                                              
          
                                              }


                                        
                                    
                                }



                                    //Marcar 6-1
                                    if(valorMarcado==5){
                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[0][2].id==id||resultado[1][0].id==id||resultado[2][2].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }
                                        
                                    }



                                    // Marcar 6-2
                                    if(valorMarcado==6){



                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[1][0].id==id||resultado[1][1].id==id||resultado[1][2].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }

                                        
                                    }






                                    //Marcar 6-3
                                    if(valorMarcado==7){
                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
      
                                             if(resultado[0][1].id==id||resultado[1][1].id==id||resultado[2][1].id==id){
                                               marcado_no.play();
                                              Snackbar.show({
                                                text:'Revise las figuras a marcar.',
                                              
                                              duration: Snackbar.LENGTH_LONG,
                                              });
                                              return;
                                          
                                            }
      
                                              
      
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                               
      
                                                }
                                            }
                                          
      
                                          }
                                        
                                    }



                                    //Marcar todos
                                    if(valorMarcado==8){

                                        for (var i in resultado){
                                    
                                            for(var j in resultado[i]){
                                             
                                             
                                              if(resultado[i][j].id===id && id===idd){
                                                 
                                                let copia = [...resultado];
                                                copia[i][j].estado = true;
                                                setResultado(copia);
                                                copia=[];
                                                pasadas2=1;
                                               
                                                }else{
                                                  pasadas=pasadas+1
                                                 
                                                 
                                                }
                                            }
                                          
      
                                          }
                                    }



                                









                                    if(pasadas2===1){
                                      marcado.play();
                                    }else if(pasadas>0){

                                      marcado_no.play();
                                    }








                                }

                                export default Marcado
