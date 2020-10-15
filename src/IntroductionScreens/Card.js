import React from 'react'
import { View,Text} from 'react-native';
const Card = ({item,imdex}) =>{
    return(
        <View style={{
            backgroundColor:'blue',
            borderRadius: 5,
            height: 250,
            width: "100%",
            padding: 50,
            marginTop: "10%",
            }}>
          <Text style={{fontSize: 30}}>{item.text}</Text>
          <Text>{item.text}</Text>
        </View>
    )
}

export default Card