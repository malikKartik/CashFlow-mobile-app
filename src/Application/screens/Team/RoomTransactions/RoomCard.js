import React, {useEffect, useState} from 'react';
import Card from '../../../components/Card';
import TextComp from '../../../components/Text';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {checkGreen} from '../../../constants/ColorConstants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';

const RoomCard = (props) => {
  console.log('Again');
  const timestamp = props._id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const fullDate =
    date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
  const swipeLeft = (progress, dragX, id) => {
    return (
      <Card
        height={70}
        width={100}
        marginVertical={7}
        elevation={0}
        backgroundColor={checkGreen}
        center={
          <TouchableWithoutFeedback
            onPress={() => {
              props.handleSettleTransaction(id);
            }}>
            <Icon name="checkcircle" size={30} color="white"></Icon>
          </TouchableWithoutFeedback>
        }></Card>
    );
  };
  return (
    <TouchableWithoutFeedback>
      {props.settled ? (
        <Card
          left={
            <TextComp type="content" color="white">
              {props.to.username} owes {props.from.username}
            </TextComp>
          }
          marginVertical={7}
          right={
            <>
              <TextComp type="content" color="white" textAlign="right">
                {props.userId == props.to._id
                  ? '-'
                  : props.userId === props.from._id
                  ? '+'
                  : ''}
                {props.amount.toFixed(2)} Rs
              </TextComp>
              <TextComp type="sub-content" color="white" textAlign="right">
                {fullDate}
              </TextComp>
            </>
          }
          height={70}
          backgroundColor={checkGreen}></Card>
      ) : (
        <Swipeable
          friction={1.5}
          renderRightActions={(progress, dragX) =>
            swipeLeft(progress, dragX, props._id)
          }>
          <Card
            left={
              <TextComp type="content">
                {props.to.username} owes {props.from.username}
              </TextComp>
            }
            marginVertical={7}
            right={
              <>
                <TextComp
                  type="content"
                  amountType={
                    props.userId == props.to._id
                      ? 'debit'
                      : props.userId === props.from._id
                      ? 'credit'
                      : ''
                  }
                  textAlign="right">
                  {props.userId == props.to._id
                    ? '-'
                    : props.userId === props.from._id
                    ? '+'
                    : ''}
                  {props.amount.toFixed(2)} Rs
                </TextComp>
                <TextComp type="sub-content" textAlign="right">
                  {fullDate}
                </TextComp>
              </>
            }
            height={70}></Card>
        </Swipeable>
      )}
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userData.userId,
  };
};

export default connect(mapStateToProps)(RoomCard);
