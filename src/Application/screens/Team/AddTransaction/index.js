import React, {useState} from 'react';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import {View, StyleSheet} from 'react-native';
import T1 from './T1';
import T2 from './T2';
import T3 from './T3';
const AddTransaction = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    type: {label: 'Paid by you split equally', id: 'T1'},
  });

  return (
    <View style={styles.container}>
      <Input
        label="Transaction Name"
        onChangeText={(val) => setFormData({...formData, placeName: val})}
        value={formData.placeName}
        placeholder="Enter Transaction Name"></Input>
      <Dropdown
        selectedValue={formData.type}
        width="100%"
        label="Paid by"
        onChange={({id, label}) =>
          setFormData({...formData, type: {label, id}})
        }
        options={[
          {label: 'Paid by you split equally', id: 'T1'},
          {label: 'Paid by multiple split equally', id: 'T2'},
          {label: 'Paid by you split unequally', id: 'T3'},
          {label: 'Paid by multiple split unequally', id: 'T4'},
        ]}></Dropdown>

      {formData.type.id === 'T1' ? (
        <T1
          placeName={formData.placeName}
          setPlaceName={setFormData}
          placeName={formData}></T1>
      ) : null}
      {formData.type.id === 'T2' ? (
        <T2
          placeName={formData.placeName}
          setPlaceName={setFormData}
          placeName={formData}></T2>
      ) : null}
      {formData.type.id === 'T3' ? (
        <T3
          placeName={formData.placeName}
          setPlaceName={setFormData}
          placeName={formData}></T3>
      ) : null}
      {formData.type.id === 'T4' ? <Text>T4</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});

export default AddTransaction;
