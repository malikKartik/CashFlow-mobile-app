import React, {useState} from 'react';
import {Animated, Image, ScrollView, View, RefreshControl} from 'react-native';
import Text from '../../components/Text';
import Card from '../../components/Card';
import Input from '../../components/Input';
import {primary} from '../../constants/ColorConstants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
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

  const swipeLeft = (progress, dragX, secret) => {
    return (
      <RectButton style={{display: 'flex', justifyContent: 'center'}}>
        <Card
          height={94}
          width={200}
          marginVertical={4}
          elevation={0}
          backgroundColor={primary}
          center={
            <Text style={{color: 'white'}} type={'sub-content'}>
              Secret:{secret}
            </Text>
          }></Card>
      </RectButton>
    );
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
        <Text type="sub-content" textAlign="center" size={12} color="#aaa">
          Swipe the card left to see the team password
        </Text>
        {props.teams
          ? props.teams.map((team) => {
              return (
                <Swipeable
                  friction={1.5}
                  renderRightActions={(progress, dragX) =>
                    swipeLeft(progress, dragX, '12345')
                  }>
                  <Card
                    key={team._id}
                    height={100}
                    marginVertical={4}
                    onPress={() => {
                      props.onSelectTeam({id: team._id});
                      props.navigateTo('Team');
                    }}
                    center={<Text size={16}>{team.teamName}</Text>}></Card>
                </Swipeable>
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
