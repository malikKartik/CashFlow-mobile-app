import React, {useState} from 'react'
import {Text, Dimensions, Button, AsyncStorage} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Card from './Card'

const IntroductionsScreens = (props) =>{
    const [currentItem,setCurrentItem] = useState(0)
    const {height, width} = Dimensions.get('window');
    const data = [
        {
            text: "Kartik Malik lorem ipsum 1"
        },
        {
            text: "Kartik Malik lorem ipsum 2"
        },
        {
            text: "Kartik Malik lorem ipsum 3"
        },
        {
            text: "Kartik Malik lorem ipsum 4"
        },
    ]

    const skip = async () =>{
        try{
            await AsyncStorage.setItem("isIntroduced","true")
            props.setIsIntroduced(AsyncStorage.getItem("isIntroduced"))
        }catch(e){
            props.setIsIntroduced(null)
        }
    }
    return(
    <>
        <Carousel
            ref={(ref)=> carousel = ref}
            data={data}
            renderItem={({item,index})=><Card item={item} index={index}/>}
            sliderWidth={width}
            itemWidth={width - 40}
            onSnapToItem = { index => setCurrentItem(index) }
        />
        <Text onPress={() => { carousel.snapToNext(); }}>{data[currentItem].text}</Text>

        <Button onPress={skip}
            title = "Skip"
        />
    </>
    )
}

export default IntroductionsScreens