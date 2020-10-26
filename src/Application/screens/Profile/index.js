import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import * as colors from '../../constants/ColorConstants';
import Card from '../../components/Card';
import UserImage from '../../components/UserImage';
import TextComp from '../../components/Text';
import Button from '../../components/Button';

const {height, width} = Dimensions.get('window');
const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.design}></View>
      <View style={styles.profileMain}>
        <Card
          width={width - 40}
          height={200}
          center={
            <>
              <View style={{alignSelf: 'center'}}>
                <UserImage
                  firstName="Prerna"
                  lastName="Budhraja"
                  height={100}
                  width={100}
                  fontSize={30}
                  backgroundColor={colors.primary}></UserImage>
              </View>
              <TextComp type="content" textAlign="center">
                Prerna_Budh
              </TextComp>
              <TextComp type="sub-heading" textAlign="center">
                Prerna Budhraja
              </TextComp>
            </>
          }></Card>
      </View>
      <View style={styles.contact}>
        <Card
          width={width - 40}
          height={100}
          center={
            <>
              <TextComp type="content">9113425273</TextComp>
              <TextComp type="content">prernabudhraja8@gmail.com</TextComp>
            </>
          }></Card>
        <Button
          title="View/Edit documents"
          alignSelf="center"
          width={width - 40}
          height={50}
          marginVertical={20}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  design: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileMain: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    width: '100%',
  },
  contact: {
    position: 'absolute',
    top: 340,
    width: '100%',
    alignItems: 'center',
  },
});

export default Profile;
