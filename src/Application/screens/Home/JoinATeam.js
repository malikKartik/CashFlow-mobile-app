import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';

const JoinATeam = (props) => {
  const [formData, setFormData] = useState({teamid: '', secret: ''});
  return (
    <>
      <View style={styles.container}>
        <Input
          label="Team ID"
          onChangeText={(val) => setFormData({...formData, teamid: val})}
          value={formData.teamid}
          placeholder="Enter Team ID"
          width="90%"></Input>
        <Input
          label="Team Code"
          onChangeText={(val) => setFormData({...formData, secret: val})}
          value={formData.secret}
          placeholder="Enter Team Code"
          width="90%"></Input>
        <Button
          title="Join"
          marginVertical={10}
          onPress={() =>
            props.onJoinTeam({
              teamid: formData.teamid,
              secret: formData.secret,
              userid: props.auth.userData.userId,
            })
          }></Button>
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
