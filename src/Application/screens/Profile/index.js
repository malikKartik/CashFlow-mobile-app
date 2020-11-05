import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import * as colors from '../../constants/ColorConstants';
import Card from '../../components/Card';
import UserImage from '../../components/UserImage';
import TextComp from '../../components/Text';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

const {height, width} = Dimensions.get('window');
const Profile = (props) => {
  console.log(props.userData);
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
                  firstName={
                    props.userData.firstName ? props.userData.firstName : null
                  }
                  lastName={
                    props.userData.lastName ? props.userData.lastName : null
                  }
                  height={100}
                  width={100}
                  fontSize={30}
                  backgroundColor={colors.primary}></UserImage>
              </View>
              <TextComp type="content" textAlign="center">
                {props.userData.username}
              </TextComp>
              <TextComp type="sub-heading" textAlign="center">
                {props.userData.firstName ? props.userData.firstName : null}{' '}
                {props.userData.lastName ? props.userData.lastName : null}
              </TextComp>
            </>
          }></Card>
      </View>
      <View style={styles.contact}>
        <Card
          width={width - 40}
          height={100}
          left={
            <>
              <TextComp type="content" width="100%">
                Total Teams:{' '}
                {props.userData.teams ? props.userData.teams.length : null}
              </TextComp>
              <TextComp type="content" width="100%">
                {props.userData.email}
              </TextComp>
            </>
          }></Card>
        <Button
          title="View/Edit documents"
          alignSelf="center"
          width={width - 40}
          height={50}
          marginVertical={20}></Button>
        <Button
          title="Logout"
          alignSelf="center"
          width={width - 40}
          height={50}
          marginVertical={0}
          buttonColor={'red'}
          onPress={props.onLogout}></Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
