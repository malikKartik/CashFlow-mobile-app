import React, {useState} from 'react';
import {View} from 'react-native';
import Switch from '../../components/Switch';
const Home = () => {
  const [switchButton, setSwitchButton] = useState(false);

  const onClick = () => {
    setSwitchButton(!switchButton);
  };
  return (
    <View>
      <Switch
        onPress={onClick}
        active={switchButton}
        inactiveBackgroundColor={'#a2f2a2'}
        activeBackgroundColor={'#11e211'}
        switchColor={'white'}></Switch>
    </View>
  );
};

export default Home;
