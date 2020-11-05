import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import addMember from '../../../../../asstes/icons/addMember.png';
import TextComp from '../../../components/Text';
import * as colors from '../../../constants/ColorConstants';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import * as actions from '../../../../store/actions';
import {connect} from 'react-redux';

const AddMember = (props) => {
  const [username, setUsername] = useState('');
  const inputChangeHandler = (e) => {
    setUsername(e);
  };
  return (
    <View style={styles.container}>
      <View style={styles.sub}>
        <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../../../../../asstes/icons/back.png')}></Image>
        </TouchableWithoutFeedback>
        <Image source={addMember} style={styles.memberImage}></Image>
        <TextComp type="heading" color={colors.primary} textAlign="center">
          Add Member
        </TextComp>
        <Input
          label="Username/Email"
          placeholder="Enter username/Email"
          value={username}
          onChangeText={inputChangeHandler}></Input>
        <Button
          title="Add"
          marginVertical={20}
          alignSelf="center"
          onPress={async () => {
            await props.onAddMember({
              teamid: props.currentTeam,
              username: username,
            });
            props.navigation.navigate('Team');
          }}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  sub: {
    marginTop: 20,
    width: '90%',
  },
  memberImage: {
    height: 240,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    currentTeam: state.team.currentTeam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMember: ({teamid, username}) =>
      dispatch(actions.addMember({teamid, username})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
