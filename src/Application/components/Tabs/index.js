import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../Button';
import * as colors from '../../constants/ColorConstants';
const Tabs = (props) => {
  const styles = styleSheet(props);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <Button
            title={props.leftLabel}
            height={30}
            width="32%"
            borderRadius={props.radius ? props.radius : 6}
            buttonColor={
              props.activeTab === 'left'
                ? props.tabColor
                  ? props.tabColor
                  : 'white'
                : props.backgroundColor
                ? props.backgroundColor
                : colors.primary
            }
            textColor={
              props.activeTab === 'left'
                ? props.activeTextColor
                  ? props.activeTextColor
                  : 'black'
                : props.inactiveTextColor
                ? props.inactiveTextColor
                : 'white'
            }
            onPress={props.onTapLeft}></Button>
          <Button
            title={props.midLabel}
            height={30}
            width="32%"
            borderRadius={props.radius ? props.radius : 6}
            buttonColor={
              props.activeTab === 'mid'
                ? props.tabColor
                  ? props.tabColor
                  : 'white'
                : props.backgroundColor
                ? props.backgroundColor
                : colors.primary
            }
            textColor={
              props.activeTab === 'mid'
                ? props.activeTextColor
                  ? props.activeTextColor
                  : 'black'
                : props.inactiveTextColor
                ? props.inactiveTextColor
                : 'white'
            }
            onPress={props.onTapMid}></Button>
          <Button
            title={props.rightLabel}
            height={30}
            width="32%"
            borderRadius={props.radius ? props.radius : 6}
            buttonColor={
              props.activeTab === 'right'
                ? props.tabColor
                  ? props.tabColor
                  : 'white'
                : props.backgroundColor
                ? props.backgroundColor
                : colors.primary
            }
            textColor={
              props.activeTab === 'right'
                ? props.activeTextColor
                  ? props.activeTextColor
                  : 'black'
                : props.inactiveTextColor
                ? props.inactiveTextColor
                : 'white'
            }
            onPress={props.onTapRight}></Button>
        </View>
      </View>
    </>
  );
};

const styleSheet = (props) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    tabsContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: props.width ? props.width : '90%',
      height: 35,
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : colors.primary,
      borderRadius: props.radius ? props.radius : 6,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
};

export default Tabs;
