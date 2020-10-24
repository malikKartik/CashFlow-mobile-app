import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';

const CreateATeam = () => {
  const [formData, setFormData] = useState({teamName: '', teamType: ''});
  return (
    <>
      <View style={styles.container}>
        <Input
          label="Team Name"
          onChangeText={(val) => setFormData({...formData, teamName: val})}
          value={formData.teamName}
          placeholder="Enter Team Name"
          width="90%"></Input>

        <Dropdown
          selectedValue={{label: 'General', id: 'general'}}
          width="100%"
          options={[{label: 'General', id: 'general'}]}></Dropdown>

        <Button title="Create" marginVertical={10}></Button>
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

export default CreateATeam;
