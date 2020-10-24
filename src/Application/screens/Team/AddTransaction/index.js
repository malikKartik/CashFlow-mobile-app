import React, {useState} from 'react';
import Text from '../../../components/Text';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import {View, StyleSheet} from 'react-native';
const AddTransaction = () => {
  const [formData, setFormData] = useState({
    transactionName: '',
    type: {label: 'Paid by you split equally', id: 'T1'},
  });

  return (
    <View style={styles.container}>
      <Input
        label="Transaction Name"
        onChangeText={(val) => setFormData({...formData, transactionName: val})}
        value={formData.transactionName}
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

      {formData.type.id === 'T1' ? <Text>T1</Text> : null}
      {formData.type.id === 'T2' ? <Text>T2</Text> : null}
      {formData.type.id === 'T3' ? <Text>T3</Text> : null}
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
