                            
                              /*     'heart_eyes', 'kissing_heart', 'blush', 'sunglasses',
                                  'kissing_closed_eyes', 'rage', 'disappointed_relieved',
                                  'stuck_out_tongue_winking_eye', 'innocent',
                                  'grin', 'smiley', 'sweat_smile', */
                            import React, { Component,useState,useEffect } from 'react';
                            import {
                            StyleSheet,
                            Dimensions,
                            View,
                            TouchableOpacity,
                            Text
                            } from 'react-native';
                            import { AnimatedEmoji } from 'react-native-animated-emoji';

                            const randomEmojis = [
                                'heart_eyes', 'kissing_heart', 'blush'
                            ];

                            const captura=[];

                            const WINDOW_HEIGHT = Dimensions.get('window').height;
                            const EMOJI_AMOUNT = 5;
                            var emojiIndex=0;
                            const Pruebas = () => {

                                const [emojiArray,setEmojiArray]=useState([]);
                                const [valor,setValor]=useState(0);
                                 const _emojis={};
               


 
                          const generateEmoji =async(emojix) => {
                  

                            const newEmojis =  Object.assign(emojiArray, []);
                        
                                let index =  emojix
                                const emoji = {
                                key: emojiIndex,
                                name: randomEmojis[emojix],
                                size: Math.floor(Math.random() * Math.floor(20)) + 20,
                                duration: 2000,
                                yPosition: 50 + Math.random() * (WINDOW_HEIGHT - 60)
                                };
                                 newEmojis.push(emoji);
                                emojiIndex += 1;
                               
                                setValor(emojiIndex);
                                 setEmojiArray(newEmojis)
                                 

                             
                              
                            };

                       
                           const  onAnimationCompleted =async (index) => {

                            console.log('index: '+index)

                                let newEmojis =Object.assign(emojiArray, []);
                               newEmojis.shift();

                        
                           
                                     setEmojiArray(newEmojis);

                          

                                        
                                  


                             
                                 
                            };



                           const render=()=> {
                                emojiArray.map((emoji) => {
                                return (
                                    <AnimatedEmoji
                                    key={emoji.key}
                                    index={emoji.key}
/*                                     ref={ref => _emojis[emoji.key] = ref}
 */                                    style={{ bottom: emoji.yPosition }}
                                    name={emoji.name}
                                    size={emoji.size}
                                    duration={emoji.duration}
                                    onAnimationCompleted={onAnimationCompleted}
                                    />
                                )
                                });

                            }

                                return (
                                <View style={{flex:1}}>
                                     
                                     
                                   <TouchableOpacity
                                        onPress={()=>generateEmoji(0)}
                                        >
                                        <Text >Presionar1</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                        onPress={()=>generateEmoji(1)}
                                        >
                                        <Text >Presionar2</Text>
                                        </TouchableOpacity>
                                        

                                        <TouchableOpacity
                                        onPress={()=>generateEmoji(2)}
                                        >
                                        <Text >Presionar3</Text>
                                        </TouchableOpacity>
                                 
                                   {valor>0&&

                                        emojiArray.map((emoji) => {
                                            return (
                                                <AnimatedEmoji
                                                key={emoji.key}
                                                index={emoji.key}
                                                ref={ref => _emojis[emoji.key] = ref}
                                                style={{ bottom: emoji.yPosition }}
                                                name={emoji.name}
                                                size={emoji.size}
                                                duration={emoji.duration}
                                                onAnimationCompleted={onAnimationCompleted}
                                                />
                                            )
                                            })


                                   }

                                
                                     

                                </View>
                                );
                            






                            }




                            export default Pruebas;


                            const styles = StyleSheet.create({
                            container: {
                                flex: 1,
                                backgroundColor: '#F5FCFF',
                            }
                        });