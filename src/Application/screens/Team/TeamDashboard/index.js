import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import TextComp from '../../../components/Text';
import Button from '../../../components/Button';
import MemberCard from './MemberCard';
import {connect} from 'react-redux';

const TeamDashboard = (props) => {
  const renderItem = ({item, index}) => {
    return <MemberCard item={item}></MemberCard>;
  };
  return (
    <>
      <View style={styles.container}>
        <TextComp type="heading" marginVertical={1}>
          {props.teamData.teamName}
        </TextComp>
        <TextComp type="sub-heading">Team Dashboard</TextComp>
      </View>
      <View style={styles.horizontalLine}></View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TextComp type="content">Taken by you: </TextComp>
          <TextComp type="content" amountType="debit">
            300 Rs
          </TextComp>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextComp type="content">Given by you: </TextComp>
          <TextComp type="content" amountType="credit">
            300 Rs
          </TextComp>
        </View>
        <View style={{marginTop: 15, marginBottom: 10}}>
          <TextComp>Members: </TextComp>
        </View>
        <FlatList
          data={props.teamData.users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={{maxHeight: 250}}
          showsVerticalScrollIndicator={false}></FlatList>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Button
            title="Add Member"
            onPress={() => props.navigation.navigate('Add Member')}></Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 12,
  },
  horizontalLine: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    teamData: state.team.currentTeamData,
  };
};

export default connect(mapStateToProps)(TeamDashboard);
