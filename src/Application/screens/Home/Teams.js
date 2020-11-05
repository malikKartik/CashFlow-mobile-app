import React, {useState} from 'react';
import {Image, ScrollView, View, RefreshControl, Text} from 'react-native';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';

const Teams = (props) => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  console.log(props.teams);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <>
      <View style={{width: '90%'}}>
        <Input
          onChangeText={(val) => setSearch(val)}
          value={search}
          icon={
            <Image
              source={require('../../../../asstes/icons/search.png')}></Image>
          }
          borderRadius={20}
          placeholder="Search a team"
          marginVertical={5}
          height={40}
          width="90%"></Input>
      </View>

      <ScrollView
        style={{width: '90%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {props.teams
          ? props.teams.map((team) => {
              return (
                <Card
                  key={team._id}
                  height={100}
                  marginVertical={4}
                  onPress={() => {
                    props.onSelectTeam({id: team._id});
                    props.navigateTo('Team');
                  }}
                  center={<Text>{team.teamName}</Text>}
                  key={team._id}></Card>
              );
            })
          : null}
      </ScrollView>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    teams: state.auth.userData.teams,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    onSelectTeam: ({id}) => dispatch(actions.setCurrentTeam({id})),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Teams);
