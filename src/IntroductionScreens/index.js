import React, {useState} from 'react'
import {Text,Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import Card from './Card'

const IntroductionsScreens = () =>{
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
    return(
    <>
        <Carousel
            ref={ref => carousel = ref}
            data={data}
            renderItem={({item,index})=><Card item={item} index={index}/>}
            sliderWidth={width}
            itemWidth={width - 40}
            onSnapToItem = { index => setCurrentItem(index) }
        />
        <Text>{data[currentItem].text}</Text>
    </>
    )
}

export default IntroductionsScreens