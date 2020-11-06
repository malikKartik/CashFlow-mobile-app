import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {inputChangeHandler} from '../../constants/utilityFunctions';

const CreateATeam = (props) => {
  const [input, setInput] = useState({
    teamName: {
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
          label="Team Name"
          onChangeText={(val) => handleInputChange(val, 'teamName')}
          value={input.teamName.value}
          placeholder="Enter Team Name"
          width="90%"></Input>

        {/* <Dropdown
          selectedValue={{label: 'General', id: 'general'}}
          width="100%"
          options={[{label: 'General', id: 'general'}]}></Dropdown> */}

        <Button
          title="Create"
          marginVertical={10}
          onPress={() =>
            props.onCreateTeam({
              name: input.teamName.value,
              userId: props.auth.userData.userId,
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
    onCreateTeam: ({name, userId}) =>
      dispatch(actions.createTeam({name, userId})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateATeam);
