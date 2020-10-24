import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const JoinATeam = () => {
  const [formData, setFormData] = useState({teamName: '', teamCode: ''});
  return (
    <>
      <View style={styles.container}>
        <Input
          label="Team Name"
          onChangeText={(val) => setFormData({...formData, teamName: val})}
          value={formData.teamName}
          placeholder="Enter Team Name"
          width="90%"></Input>
        <Input
          label="Team Code"
          onChangeText={(val) => setFormData({...formData, teamCode: val})}
          value={formData.teamCode}
          placeholder="Enter Team Code"
          width="90%"></Input>
        <Button title="Join" marginVertical={10}></Button>
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

export default JoinATeam;
