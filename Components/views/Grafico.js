import React from 'react'
import { View, SafeAreaView,Text,Image,StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Grafico = ({ starText, percentage }) => {
    return (
        <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text style={styles.progressText}>{starText}</Text>
      <FontAwesome
      name="star" 
      color='#FFCC48'
      size={RFValue(17)}
      >

      </FontAwesome>
      <View style={styles.progressMiddle}>
        <View style={styles.progressWrap}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentage}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
    )
}

export default Grafico

const styles = StyleSheet.create({
    
    sectionLarge: {
      minHeight: 300,
    },
    
      progressText: {
        width: 50,
        fontWeight:'bold',
        fontSize: RFValue(14),
        color: "black",
        
      },
      progressPercentText: { width: 40, fontSize: RFValue(14), color: "#323357" },
      progressMiddle: {
        height: 18,
        flex: 1,
        marginHorizontal: 10,
      },
      progressWrap: {
        backgroundColor: "#F5F8FF",
        borderRadius: 18,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        padding: 2,
      },
      progressBar: {
        flex: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "#ffcc48",
        shadowOpacity: 1.0,
        shadowRadius: 4,
        backgroundColor: "#FFCC48",
        borderRadius: 18,
        minWidth: 3,
      },
    
  });