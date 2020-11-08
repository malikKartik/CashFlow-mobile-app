import React from 'react';
import Card from '../../../components/Card';
import TextComp from '../../../components/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {danger} from '../../../constants/ColorConstants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';

const TransactionCard = (props) => {
  const swipeLeft = (progress, dragX, id) => {
    return (
      <RectButton style={{display: 'flex', justifyContent: 'center'}}>
        <Card
          height={70}
          width={100}
          marginVertical={7}
          elevation={0}
          backgroundColor={danger}
          center={
            <TouchableWithoutFeedback>
              <Icon name="delete" size={22} color="white"></Icon>
            </TouchableWithoutFeedback>
          }></Card>
      </RectButton>
    );
  };
  const item = props.item;
  console.log('Card props');
  console.log(item);
  const timestamp = item._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const fullDate =
    date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onCurrentTeam(item._id);
        props.navigation.navigate('Room Transaction');
      }}>
      <Swipeable
        friction={1.5}
        renderRightActions={(progress, dragX) =>
          swipeLeft(progress, dragX, item._id)
        }>
        <Card
          left={<TextComp type="content">{item.name}</TextComp>}
          marginVertical={7}
          right={<TextComp type="sub-content">{fullDate}</TextComp>}
          height={70}></Card>
      </Swipeable>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCurrentTeam: (id) => dispatch(actions.setCurrentRoom(id)),
  };
};

export default connect(null, mapDispatchToProps)(TransactionCard);
