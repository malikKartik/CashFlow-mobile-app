import React, {useState, useEffect} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  View,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import Text from '../../components/Text';
import Card from '../../components/Card';
import Input from '../../components/Input';
import {primary} from '../../constants/ColorConstants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import io from 'socket.io-client';
import url from '../../constants/url';
import SplashScreen from 'react-native-splash-screen';
const socket = io(url, {transports: ['websocket']});

const Teams = (props) => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchResult, setSearchResult] = useState(props.teams);
  console.log(props.teams);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    socket.emit('joinRoom', {
      userId: props.userId,
    });
    socket.on('notification', async (payload) => {
      const token = await AsyncStorage.getItem('token');
      if (payload.type === 'ADDED_TO_TEAM')
        props.onValidate({
          token,
          hideSplashScreen: () => {
            SplashScreen.hide();
          },
        });
    });
  }, []);
  const handleSearch = (val) => {
    setSearch(val);
    let tempArr = props.teams.filter((team) => {
      return team.teamName.toLowerCase().includes(val.toLowerCase());
    });
    setSearchResult(tempArr);
  };

  useEffect(() => {
    setSearchResult(props.teams);
  }, [props.teams]);

  const swipeLeft = (progress, dragX, secret, teamId) => {
    return (
      <RectButton style={{display: 'flex', justifyContent: 'center'}}>
        <Card
          height={94}
          width={200}
          marginVertical={4}
          elevation={0}
          backgroundColor={primary}
          center={
            <>
              <Text style={{color: 'white'}} type={'sub-content'}>
                Secret: {secret}
              </Text>
              <Text style={{color: 'white'}} type={'sub-content'}>
                Team ID: {teamId}
              </Text>
            </>
          }></Card>
      </RectButton>
    );
  };

  return (
    <>
      <View style={{width: '90%'}}>
        <Input
          onChangeText={(val) => handleSearch(val)}
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
        {searchResult
          ? searchResult.map((team) => {
              return (
                <Swipeable
                  friction={1.5}
                  key={team._id}
                  renderRightActions={(progress, dragX) =>
                    swipeLeft(progress, dragX, team.secret, team.teamId)
                  }
                  key={team._id}>
                  <Card
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
    userId: state.auth.userData.userId,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    onSelectTeam: ({id}) => dispatch(actions.setCurrentTeam({id})),
    onValidate: ({token, hideSplashScreen}) =>
      dispatch(actions.validate({token, hideSplashScreen})),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Teams);
