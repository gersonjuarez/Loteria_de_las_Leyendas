

                          import React , {useState,useEffect} from 'react'
                          import FastImage from 'react-native-fast-image'

                          import AsyncStorage from '@react-native-community/async-storage';


                          const imagenes=[];
                          const listado=[];
                          const aux=true;
                        const  cartas_juego=[46,33,14,21,22,23,25,34,9,1,31,40,36,37,
                          20,42,48,28,2,8,51,11,41,6,10,16,13,4,29,49,24,45,26,15,7,27,
                          3,52,50,12,38,30,17,18,19,5,47,35,43,44,32,53,54,39,6,26,53,
                          14,15,16,23,24,25,7,27,3,36,37,38,44,48,49,8,34,1,42,54,19,5,
                          17,28,9,29,47,52,18,35,45,4,43,10,46,33,12,39,13,20,21,22,11,31,
                          32,40,41,30,50,51,2





                        ]


                                const Image=async(data,setFotos,setFotos2)=>{

                                 data.map(dato=>{

                                  const temp={id:dato.id,dat:dato.urlC,estado:false};
                                   setFotos(anterior=>[...anterior,temp ]) 
                                  listado.push(temp);
                      

                                 })

                                 await AsyncStorage.setItem('arreglo_imagenes',JSON.stringify(listado));





                                  let pasadas=0;
                                 while(cartas_juego.length>0){
                                    
                                    var eliminado = cartas_juego.shift();
                                        
                                    imagenes.push({clave:pasadas,id:data[eliminado-1].id,dat:data[eliminado-1].urlC,estado:false})
                                    pasadas=pasadas+1;


                                  } 

                                  await AsyncStorage.setItem('arreglo_cartones',JSON.stringify(imagenes));

                                  setFotos2(imagenes);

                                   
                                  
/*                                   setFotos2(anterior=>[...anterior,temporal]);
 */
                                    
                           
                                  
                                  
                                  
                                 



                                }

                                export default Image;


                                                    

                                                  
                                                    
                                                    
                                                  

                                                    /* [
                                                        {id:'1',"dat":require("./assets/img/1.jpg"),estado:false},
                                                        {id:'2',"dat":require("./assets/img/2.jpg"),estado:false},
                                                        {id:'3',"dat":require("./assets/img/3.jpg"),estado:false},
                                                        {id:'4',"dat":require("./assets/img/4.jpg"),estado:false},
                                                        {id:'5',"dat":require("./assets/img/5.jpg"),estado:false},
                                                        {id:'6',"dat":require("./assets/img/6.jpg"),estado:false},
                                                        {id:'7',"dat":require("./assets/img/7.jpg"),estado:false},
                                                        {id:'8',"dat":require("./assets/img/8.jpg"),estado:false},
                                                        {id:'9',"dat":require("./assets/img/9.jpg"),estado:false},
                                                        {id:'10',"dat":require("./assets/img/10.jpg"),estado:false},
                                                        {id:'11',"dat":require("./assets/img/11.jpg"),estado:false},
                                                        {id:'12',"dat":require("./assets/img/12.jpg"),estado:false},
                                                        {id:'13',"dat":require("./assets/img/13.jpg"),estado:false},
                                                        {id:'14',"dat":require("./assets/img/14.jpg"),estado:false},
                                                        {id:'15',"dat":require("./assets/img/15.jpg"),estado:false},
                                                        {id:'16',"dat":require("./assets/img/16.jpg"),estado:false},
                                                        {id:'17',"dat":require("./assets/img/17.jpg"),estado:false},
                                                        {id:'18',"dat":require("./assets/img/18.jpg"),estado:false},
                                                        {id:'19',"dat":require("./assets/img/19.jpg"),estado:false},
                                                        {id:'20',"dat":require("./assets/img/20.jpg"),estado:false},
                                                        {id:'21',"dat":require("./assets/img/21.jpg"),estado:false},
                                                        {id:'22',"dat":require("./assets/img/22.jpg"),estado:false},
                                                        {id:'23',"dat":require("./assets/img/23.jpg"),estado:false},
                                                        {id:'24',"dat":require("./assets/img/24.jpg"),estado:false},
                                                        {id:'25',"dat":require("./assets/img/25.jpg"),estado:false},
                                                        {id:'26',"dat":require("./assets/img/26.jpg"),estado:false},
                                                        {id:'27',"dat":require("./assets/img/27.jpg"),estado:false},
                                                        {id:'28',"dat":require("./assets/img/28.jpg"),estado:false},
                                                        {id:'29',"dat":require("./assets/img/29.jpg"),estado:false},
                                                        {id:'30',"dat":require("./assets/img/30.jpg"),estado:false},
                                                        {id:'31',"dat":require("./assets/img/31.jpg"),estado:false},
                                                        {id:'32',"dat":require("./assets/img/32.jpg"),estado:false},
                                                        {id:'33',"dat":require("./assets/img/33.jpg"),estado:false},
                                                        {id:'34',"dat":require("./assets/img/34.jpg"),estado:false},
                                                        {id:'35',"dat":require("./assets/img/35.jpg"),estado:false},
                                                        {id:'36',"dat":require("./assets/img/36.jpg"),estado:false},
                                                        {id:'37',"dat":require("./assets/img/37.jpg"),estado:false},
                                                        {id:'38',"dat":require("./assets/img/38.jpg"),estado:false},
                                                        {id:'39',"dat":require("./assets/img/39.jpg"),estado:false},
                                                        {id:'40',"dat":require("./assets/img/40.jpg"),estado:false},
                                                        {id:'41',"dat":require("./assets/img/41.jpg"),estado:false},
                                                        {id:'42',"dat":require("./assets/img/42.jpg"),estado:false},
                                                        {id:'43',"dat":require("./assets/img/43.jpg"),estado:false},
                                                        {id:'44',"dat":require("./assets/img/44.jpg"),estado:false},
                                                        {id:'45',"dat":require("./assets/img/45.jpg"),estado:false},
                                                        {id:'46',"dat":require("./assets/img/46.jpg"),estado:false},
                                                        {id:'47',"dat":require("./assets/img/47.jpg"),estado:false},
                                                        {id:'48',"dat":require("./assets/img/48.jpg"),estado:false},
                                                        {id:'49',"dat":require("./assets/img/49.jpg"),estado:false},
                                                        {id:'50',"dat":require("./assets/img/50.jpg"),estado:false},
                                                        {id:'51',"dat":require("./assets/img/51.jpg"),estado:false},
                                                        {id:'52',"dat":require("./assets/img/52.jpg"),estado:false},
                                                        {id:'53',"dat":require("./assets/img/53.jpg"),estado:false},
                                                        {id:'54',"dat":require("./assets/img/54.jpg"),estado:false}

                                                      
                                                    ]; */





                                                /*     export const tableroimg= [
                                                      {id:'46',"dat":require("./assets/img/46.jpg"),estado:false},
                                                      {id:'33',"dat":require("./assets/img/33.jpg"),estado:false},
                                                      {id:'14',"dat":require("./assets/img/14.jpg"),estado:false},
                                                      {id:'21',"dat":require("./assets/img/21.jpg"),estado:false},
                                                      {id:'22',"dat":require("./assets/img/22.jpg"),estado:false},
                                                      {id:'23',"dat":require("./assets/img/23.jpg"),estado:false},
                                                      {id:'25',"dat":require("./assets/img/25.jpg"),estado:false},
                                                      {id:'34',"dat":require("./assets/img/34.jpg"),estado:false},
                                                      {id:'9',"dat":require("./assets/img/9.jpg"),estado:false},

                                                      {id:'1',"dat":require("./assets/img/1.jpg"),estado:false},
                                                      {id:'31',"dat":require("./assets/img/31.jpg"),estado:false},
                                                      {id:'40',"dat":require("./assets/img/40.jpg"),estado:false},
                                                      {id:'36',"dat":require("./assets/img/36.jpg"),estado:false},
                                                      {id:'37',"dat":require("./assets/img/37.jpg"),estado:false},
                                                      {id:'20',"dat":require("./assets/img/20.jpg"),estado:false},
                                                      {id:'42',"dat":require("./assets/img/42.jpg"),estado:false},
                                                      {id:'48',"dat":require("./assets/img/48.jpg"),estado:false},
                                                      {id:'28',"dat":require("./assets/img/28.jpg"),estado:false},

                                                      {id:'2',"dat":require("./assets/img/2.jpg"),estado:false},
                                                      {id:'8',"dat":require("./assets/img/8.jpg"),estado:false},
                                                      {id:'51',"dat":require("./assets/img/51.jpg"),estado:false},
                                                      {id:'11',"dat":require("./assets/img/11.jpg"),estado:false},
                                                      {id:'41',"dat":require("./assets/img/41.jpg"),estado:false},
                                                      {id:'6',"dat":require("./assets/img/6.jpg"),estado:false},
                                                      {id:'10',"dat":require("./assets/img/10.jpg"),estado:false},
                                                      {id:'16',"dat":require("./assets/img/16.jpg"),estado:false},
                                                      {id:'13',"dat":require("./assets/img/13.jpg"),estado:false},

                                                      {id:'4',"dat":require("./assets/img/4.jpg"),estado:false},
                                                      {id:'29',"dat":require("./assets/img/29.jpg"),estado:false},
                                                      {id:'49',"dat":require("./assets/img/49.jpg"),estado:false},
                                                      {id:'24',"dat":require("./assets/img/24.jpg"),estado:false},
                                                      {id:'45',"dat":require("./assets/img/45.jpg"),estado:false},
                                                      {id:'26',"dat":require("./assets/img/26.jpg"),estado:false},
                                                      {id:'15',"dat":require("./assets/img/15.jpg"),estado:false},
                                                      {id:'7',"dat":require("./assets/img/7.jpg"),estado:false},
                                                      {id:'27',"dat":require("./assets/img/27.jpg"),estado:false},

                                                      {id:'3',"dat":require("./assets/img/3.jpg"),estado:false},
                                                      {id:'52',"dat":require("./assets/img/52.jpg"),estado:false},
                                                      {id:'50',"dat":require("./assets/img/50.jpg"),estado:false},
                                                      {id:'12',"dat":require("./assets/img/12.jpg"),estado:false},
                                                      {id:'38',"dat":require("./assets/img/38.jpg"),estado:false},
                                                      {id:'30',"dat":require("./assets/img/30.jpg"),estado:false},
                                                      {id:'17',"dat":require("./assets/img/17.jpg"),estado:false},
                                                      {id:'18',"dat":require("./assets/img/18.jpg"),estado:false},
                                                      {id:'19',"dat":require("./assets/img/19.jpg"),estado:false},

                                                      {id:'5',"dat":require("./assets/img/5.jpg"),estado:false},
                                                      {id:'47',"dat":require("./assets/img/47.jpg"),estado:false},
                                                      {id:'35',"dat":require("./assets/img/35.jpg"),estado:false},
                                                      {id:'43',"dat":require("./assets/img/43.jpg"),estado:false},
                                                      {id:'44',"dat":require("./assets/img/44.jpg"),estado:false},
                                                      {id:'32',"dat":require("./assets/img/32.jpg"),estado:false},
                                                      {id:'53',"dat":require("./assets/img/53.jpg"),estado:false},
                                                      {id:'54',"dat":require("./assets/img/54.jpg"),estado:false},
                                                      {id:'39',"dat":require("./assets/img/39.jpg"),estado:false},

                                                      {id:'6',"dat":require("./assets/img/6.jpg"),estado:false},
                                                      {id:'26',"dat":require("./assets/img/26.jpg"),estado:false},
                                                      {id:'53',"dat":require("./assets/img/53.jpg"),estado:false},
                                                      {id:'14',"dat":require("./assets/img/14.jpg"),estado:false},
                                                      {id:'15',"dat":require("./assets/img/15.jpg"),estado:false},
                                                      {id:'16',"dat":require("./assets/img/16.jpg"),estado:false},
                                                      {id:'23',"dat":require("./assets/img/23.jpg"),estado:false},
                                                      {id:'24',"dat":require("./assets/img/24.jpg"),estado:false},
                                                      {id:'25',"dat":require("./assets/img/25.jpg"),estado:false},

                                                      {id:'7',"dat":require("./assets/img/7.jpg"),estado:false},
                                                      {id:'27',"dat":require("./assets/img/27.jpg"),estado:false},
                                                      {id:'3',"dat":require("./assets/img/3.jpg"),estado:false},
                                                      {id:'36',"dat":require("./assets/img/36.jpg"),estado:false},
                                                      {id:'37',"dat":require("./assets/img/37.jpg"),estado:false},
                                                      {id:'38',"dat":require("./assets/img/38.jpg"),estado:false},
                                                      {id:'44',"dat":require("./assets/img/44.jpg"),estado:false},
                                                      {id:'48',"dat":require("./assets/img/48.jpg"),estado:false},
                                                      {id:'49',"dat":require("./assets/img/49.jpg"),estado:false},

                                                      {id:'8',"dat":require("./assets/img/8.jpg"),estado:false},
                                                      {id:'34',"dat":require("./assets/img/34.jpg"),estado:false},
                                                      {id:'1',"dat":require("./assets/img/1.jpg"),estado:false},
                                                      {id:'42',"dat":require("./assets/img/42.jpg"),estado:false},
                                                      {id:'54',"dat":require("./assets/img/54.jpg"),estado:false},
                                                      {id:'19',"dat":require("./assets/img/19.jpg"),estado:false},
                                                      {id:'5',"dat":require("./assets/img/5.jpg"),estado:false},
                                                      {id:'17',"dat":require("./assets/img/17.jpg"),estado:false},
                                                      {id:'28',"dat":require("./assets/img/28.jpg"),estado:false},

                                                      {id:'9',"dat":require("./assets/img/9.jpg"),estado:false},
                                                      {id:'29',"dat":require("./assets/img/29.jpg"),estado:false},
                                                      {id:'47',"dat":require("./assets/img/47.jpg"),estado:false},
                                                      {id:'52',"dat":require("./assets/img/52.jpg"),estado:false},
                                                      {id:'18',"dat":require("./assets/img/18.jpg"),estado:false},
                                                      {id:'35',"dat":require("./assets/img/35.jpg"),estado:false},
                                                      {id:'45',"dat":require("./assets/img/45.jpg"),estado:false},
                                                      {id:'4',"dat":require("./assets/img/4.jpg"),estado:false},
                                                      {id:'43',"dat":require("./assets/img/43.jpg"),estado:false},

                                                      {id:'10',"dat":require("./assets/img/10.jpg"),estado:false},
                                                      {id:'46',"dat":require("./assets/img/46.jpg"),estado:false},
                                                      {id:'33',"dat":require("./assets/img/33.jpg"),estado:false},
                                                      {id:'12',"dat":require("./assets/img/12.jpg"),estado:false},
                                                      {id:'39',"dat":require("./assets/img/39.jpg"),estado:false},
                                                      {id:'13',"dat":require("./assets/img/13.jpg"),estado:false},
                                                      {id:'20',"dat":require("./assets/img/20.jpg"),estado:false},
                                                      {id:'21',"dat":require("./assets/img/21.jpg"),estado:false},
                                                      {id:'22',"dat":require("./assets/img/22.jpg"),estado:false},

                                                      {id:'11',"dat":require("./assets/img/11.jpg"),estado:false},
                                                      {id:'31',"dat":require("./assets/img/31.jpg"),estado:false},
                                                      {id:'32',"dat":require("./assets/img/32.jpg"),estado:false},
                                                      {id:'40',"dat":require("./assets/img/40.jpg"),estado:false},
                                                      {id:'41',"dat":require("./assets/img/41.jpg"),estado:false},
                                                      {id:'30',"dat":require("./assets/img/30.jpg"),estado:false},
                                                      {id:'50',"dat":require("./assets/img/50.jpg"),estado:false},
                                                      {id:'51',"dat":require("./assets/img/51.jpg"),estado:false},
                                                      {id:'2',"dat":require("./assets/img/2.jpg"),estado:false},

                                                      
                                                      
                                                    ];




                                                    export const cuadros=[
                                                      {id:'1',"dat":require("./assets/carton/1.jpg")},
                                                      {id:'2',"dat":require("./assets/carton/2.jpg")},
                                                      {id:'3',"dat":require("./assets/carton/3.jpg")},
                                                      {id:'4',"dat":require("./assets/carton/4.jpg")},
                                                      {id:'5',"dat":require("./assets/carton/5.jpg")},
                                                      {id:'6',"dat":require("./assets/carton/6.jpg")},
                                                      {id:'7',"dat":require("./assets/carton/7.jpg")},
                                                      {id:'8',"dat":require("./assets/carton/8.jpg")},
                                                      {id:'9',"dat":require("./assets/carton/9.jpg")},
                                                      {id:'10',"dat":require("./assets/carton/10.jpg")},
                                                      {id:'11',"dat":require("./assets/carton/11.jpg")},
                                                      {id:'12',"dat":require("./assets/carton/12.jpg")},

                                                    ]
 */




/* export const tableroimg={

  card1:{
    data:[{id:'1',"img":require("./assets/img/1-02.jpg"),estado:false},{id:'2',"img":require("./assets/img/1-03.jpg"),estado:false},{id:'3',"img":require("./assets/img/1-04.jpg"),estado:false},
    {id:'4',"img":require("./assets/img/1-05.jpg"),estado:false},{id:'5',"img":require("./assets/img/1-06.jpg"),estado:false},{id:'6',"img":require("./assets/img/1-07.jpg"),estado:false},
    {id:'7',"img":require("./assets/img/1-08.jpg"),estado:false},{id:'8',"img":require("./assets/img/1-09.jpg"),estado:false},{id:'9',"img":require("./assets/img/1-11.jpg"),estado:false},
  ]
    
  },
  card2:{
    data:[
    {id:'10',"img":require("./assets/img/1-12.jpg"),estado:false},{id:'11',"img":require("./assets/img/1-13.jpg"),estado:false},{id:'12',"img":require("./assets/img/1-14.jpg"),estado:false},
    {id:'13',"img":require("./assets/img/1-17.jpg"),estado:false},{id:'14',"img":require("./assets/img/1-18.jpg"),estado:false},{id:'15',"img":require("./assets/img/1-19.jpg"),estado:false},
    {id:'16',"img":require("./assets/img/1-20.jpg"),estado:false},{id:'17',"img":require("./assets/img/1-21.jpg"),estado:false},{id:'18',"img":require("./assets/img/1-22.jpg"),estado:false}
  ]
    
  },
 
}; */


