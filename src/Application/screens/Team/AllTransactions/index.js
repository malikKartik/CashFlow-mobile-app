import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TextComp from '../../../components/Text';
import TransactionCard from './TransactionCard';
import {connect} from 'react-redux';

const AllTransactions = (props) => {
  const renderItem = ({item, index}) => {
    return <TransactionCard item={item} {...props}></TransactionCard>;
  };
  return (
    <View style={styles.container}>
      <TextComp type="heading" marginVertical={1}>
        {props.team.teamName}
      </TextComp>
      <View style={{marginTop: 20}}>
        <FlatList
          data={props.team.places}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 12,
  },
});

const mapStateToProps = (state) => {
  return {
    team: state.team.currentTeamData,
  };
};

export default connect(mapStateToProps)(AllTransactions);
