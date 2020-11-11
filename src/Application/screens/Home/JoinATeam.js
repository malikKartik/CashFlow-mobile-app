import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {inputChangeHandler} from '../../constants/utilityFunctions';

const JoinATeam = (props) => {
  const [input, setInput] = useState({
    teamid: {
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: '* required',
    },
    secret: {
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      errorMessage: '* required',
    },
  });
  const [valid, setValid] = useState(false);
  const handleInputChange = (e, type) => {
    const [validity, updatedInput] = inputChangeHandler(input, e, type);
    setValid(validity);
    setInput(updatedInput);
  };
  return (
    <>
      <View style={styles.container}>
        <Input
          label="Team ID"
          onChangeText={(val) => handleInputChange(val, 'teamid')}
          value={input.teamid.value}
          error={input.teamid.touched && !input.teamid.valid}
          errorMessage={input.teamid.errorMessage}
          placeholder="Enter Team ID"
          width="90%"></Input>
        <Input
          label="Team Code"
          onChangeText={(val) => handleInputChange(val, 'secret')}
          value={input.secret.value}
          error={input.secret.touched && !input.secret.valid}
          errorMessage={input.secret.errorMessage}
          placeholder="Enter Team Code"
          width="90%"></Input>
        <Button
          title="Join"
          marginVertical={10}
          onPress={() =>
            props.onJoinTeam({
              teamid: input.teamid.value,
              secret: input.secret.value,
              userid: props.auth.userData.userId,
            })
          }
          disabled={!valid}></Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onJoinTeam: ({teamid, secret, userid}) =>
      dispatch(actions.joinTeam({teamid, secret, userid})),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinATeam);
