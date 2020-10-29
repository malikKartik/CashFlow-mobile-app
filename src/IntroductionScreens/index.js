import React, {useState} from 'react';
import {
  Text,
  Dimensions,
  Button,
  AsyncStorage,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card from './Card';
import createTeam from '../../asstes/icons/createteam.png';
import splitBills from '../../asstes/icons/splitbills.png';
import simplifyTrans from '../../asstes/icons/simplifytrans.png';
import TextComp from '../Application/components/Text';

const IntroductionsScreens = (props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const {height, width} = Dimensions.get('window');
  const data = [
    {
      source: createTeam,
      title: 'Welcome',
      text: 'Create teams with your friends',
    },
    {
      source: splitBills,
      title: 'Split Bills',
      text: 'Upload and split bills in groups',
    },
    {
      source: simplifyTrans,
      title: 'Simplify',
      text: 'Get your transactions in the simplest form',
    },
  ];

  const skip = async () => {
    try {
      await AsyncStorage.setItem('isIntroduced', 'true');
      props.setIsIntroduced(AsyncStorage.getItem('isIntroduced'));
    } catch (e) {
      props.setIsIntroduced(null);
    }
  };
  return (
    <View style={styles.container}>
      <Carousel
        ref={(ref) => (carousel = ref)}
        data={data}
        renderItem={({item, index}) => <Card {...item} index={index} />}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setCurrentItem(index)}
      />
      <TextComp type="content">CashFlow</TextComp>
      <Text
        onPress={() => {
          carousel.snapToNext();
        }}>
        {data[currentItem].text}
      </Text>

      <Button onPress={skip} title="Skip" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
});

export default IntroductionsScreens;
