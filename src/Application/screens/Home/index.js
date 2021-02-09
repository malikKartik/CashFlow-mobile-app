import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Tabs from '../../components/Tabs';
import Teams from './Teams';
import Join from './JoinATeam';
import Create from './CreateATeam';
const {height, width} = Dimensions.get('window');
const Home = (props) => {
  const [activeTab, setActiveTab] = useState('left');
  const onTapLeft = () => {
    setActiveTab('left');
  };
  const onTapMid = () => {
    setActiveTab('mid');
  };
  const onTapRight = () => {
    setActiveTab('right');
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../../../../asstes/icons/back.png')}></Image> */}
      <Tabs
        width="90%"
        activeTab={activeTab}
        onTapLeft={onTapLeft}
        leftLabel="Teams"
        onTapMid={onTapMid}
        midLabel="Create a team"
        onTapRight={onTapRight}
        rightLabel="Join a team"></Tabs>
      {activeTab === 'left' ? (
        <Teams navigateTo={props.navigation.navigate}></Teams>
      ) : null}
      {activeTab === 'mid' ? <Create></Create> : null}
      {activeTab === 'right' ? <Join></Join> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    height: height - 100,
  },
});

export default Home;
