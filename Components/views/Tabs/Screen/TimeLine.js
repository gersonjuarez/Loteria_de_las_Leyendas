



import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,Dimensions,ImageBackground,ScrollView } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import AsyncStorage from '@react-native-community/async-storage';
const {width,height}=Dimensions.get("window");
export default class TimeLine extends Component {
  

  
  constructor() {



    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.data = [
      {

        title: 'Primer Premio',
        description:
          'Felicidades Ganó algo.',
        lineColor: '#FF3AA0',
        icon: require('../assets/fondos/premios/cuadrado1.png'),
        "imageUrl":
        require('../assets/logos/campero.jpg')        },
      {
        
        title: 'Segundo Premio',
        description:
        'Felicidades Ganó algo.',
        lineColor: '#FF3AA0',

        icon: require('../assets/fondos/premios/cuadrado1.png'),
        "imageUrl":
        require('../assets/logos/cine.png')      },
      {
    
        title: 'Tercer Premio',
        description:
        'Felicidades Ganó algo.',
        lineColor: '#FF3AA0',

        icon: require('../assets/fondos/premios/cuadrado1.png'),
        "imageUrl":
        require('../assets/logos/mcdonald.png')      },
      {
 
        title: 'Cuarto Premio',
        description:
        'Felicidades Ganó algo.',
        lineColor: '#FF3AA0',
        icon: require('../assets/fondos/premios/cuadrado1.png'),
        "imageUrl":
        require('../assets/logos/subway.png')      },
      {

        title: 'Quinto Premio',
        description:
        'Felicidades Ganó algo.',
        icon: require('../assets/fondos/premios/cuadrado1.png'),
        "imageUrl":
        require('../assets/logos/Taco.jpg')      },
    ];
    this.state = { selected: null };
  }



  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    
    if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{' '}
          {this.state.selected.time}
        </Text>
      );
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    let desc = '';
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={rowData.imageUrl } style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>

        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>



{/* <View style={{flex:1,alignContent:"center",alignItems:"center"}}>

<Image source={require('../assets/fondos/premios/titulo.png')} resizeMode="contain" style={{width:'100%',height:'3%',bottom:'9%'}} />


<Image style={{ backgroundColor: '#E5EAEF',opacity: 0.7, borderRadius:25,width:'100%',height:'13%',bottom:'8%'}}  />
<Image source={require('../assets/fondos/premios/estrellad.png')} resizeMode="contain" style={{bottom:'20%',width:'100%',height:'11%'}} />
<Image source={require('../assets/fondos/premios/siguiente.png')} resizeMode="contain" style={{left:'32%',bottom:'27%',width:'100%',height:'4%'}} />
<Image source={require('../assets/fondos/premios/atras.png')} resizeMode="contain" style={{right:'32%',bottom:'30.9%',width:'100%',height:'4%'}} />

</View> */}


        {/* <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        </Text> */}

        







       {/*  {this.renderSelected()} */}
        

            <View style={{flex:1,alignContent:"center",alignItems:"center"}}>
             
            <Timeline
                      style={{maxHeight:'85%',bottom:'30%',width:'680%'}}
                          data={this.data}
                          circleSize={20}
                          lineWidth={5}
                          circleColor="rgba(0,0,0,0)"
                          lineColor="rgb(45,156,219)"
                        riptionStyle={{ color: 'gray' }}
                          options={{
                            style: { paddingTop: 5 },
                            backgroundColor: '#E5EAEF',
                            opacity: 0.7,
                            borderRadius:15,
                       
                        
                          }}
                          
                          innerCircle={'icon'}
                          onEventPress={this.onEventPress}
                          renderDetail={this.renderDetail}
                     
                          columnFormat="two-column"

                        />
            </View>
               
       

   
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
 
  },
  image: {
    width: 50,
    height: 50,
    resizeMode:'contain'

  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});













