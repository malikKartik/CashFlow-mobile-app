import React, {useState} from 'react';
import {Text, Dimensions, AsyncStorage, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Card from './Card';
import createTeam from '../../asstes/icons/createteam.png';
import splitBills from '../../asstes/icons/splitbills.png';
import simplifyTrans from '../../asstes/icons/simplifytrans.png';
import TextComp from '../Application/components/Text';
import Button from '../Application/components/Button';
import {primary} from '../Application/constants/ColorConstants';
const IntroductionsScreens = (props) => {
  const [currentItem, setCurrentItem] = useState(0);
  const {height, width} = Dimensions.get('window');
  const data = [
    {
      source: createTeam,
      title: 'Welcome',
      text: 'Create teams with your friends',
      isLast: false,
    },
    {
      source: splitBills,
      title: 'Split Bills',
      text: 'Upload and split bills in groups',
      isLast: false,
    },
    {
      source: simplifyTrans,
      title: 'Simplify',
      text: 'Get your transactions in the simplest form',
      isLast: true,
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
      <View style={{height: 350}}>
        <Carousel
          ref={(ref) => (carousel = ref)}
          data={data}
          renderItem={({item, index}) => <Card {...item} index={index} />}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => setCurrentItem(index)}
        />
      </View>
      <View style={{alignItems: 'center', height: 250}}>
        <TextComp type="content">CashFlow</TextComp>
        <TextComp type="heading" size={45} color={primary}>
          {data[currentItem].title}
        </TextComp>
        <TextComp type="content">{data[currentItem].text}</TextComp>
      </View>
      <View
        style={{
          paddingVertical: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{width: 100}}></View>
        <Button
          onPress={skip}
          onPress={() => {
            carousel.snapToNext();
          }}
          title={data[currentItem].isLast ? "Let's Go" : 'Next'}
        />
        {data[currentItem].isLast ? (
          <View style={{width: 100}}></View>
        ) : (
          <Button onPress={skip} title="Skip" type="text" height={40} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default IntroductionsScreens;
