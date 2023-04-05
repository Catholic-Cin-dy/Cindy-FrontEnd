import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator(); //상단 탭

import RecruitAll from './RecruitAll';
import RecruitTop from './RecruitTop';
import RecruitBottom from './RecruitBottom';
import RecruitOuter from './RecruitOuter';
import RecruitCap from './RecruitCap';
import RecruitBag from './RecruitBag';
import RecruitAccessories from './RecruitAccessories';

function RecruitScreen({ navigation }) {


  return (
    <Tab.Navigator
      initialRouteName="All"
      tabBarOptions={{
        scrollEnabled: true, // 스크롤 가능하게 설정
        tabStyle: { width: 100, alignItems: 'flex-start' }, // 왼쪽 정렬
        indicatorStyle: { backgroundColor: 'black' }, // 선택된 탭 하단에 라인 표시
      }}>
      <Tab.Screen
        name="All"
        component={RAllScreen}
        options={{
          tabBarLabel: 'All',
        }}/>
      <Tab.Screen
        name="Top"
        component={RTopScreen}
        options={{
          tabBarLabel: 'Top',
        }}/>
      <Tab.Screen
        name="Bottom"
        component={RBottomScreen}
        options={{
          tabBarLabel: 'Bottom',
        }}/>
      <Tab.Screen
        name="Outer"
        component={ROuterScreen}
        options={{
          tabBarLabel: 'Outer',
        }}/>
      <Tab.Screen
        name="Cap"
        component={RCapScreen}
        options={{
          tabBarLabel: 'Cap',
        }}/>
      <Tab.Screen
        name="Bag"
        component={RBagScreen}
        options={{
          tabBarLabel: 'Bag',
        }}/>
      <Tab.Screen
        name="Accessories"
        component={RAccesoriesScreen}
        options={{
          tabBarLabel: 'Accessories',
        }}/>
    </Tab.Navigator>
  );
}
function RAllScreen({navigation}) {
  return (

    <View>
      <RecruitAll/>
    </View>

  );
}
function RTopScreen() {
  return (
    <RecruitTop/>
  );
}
function RBottomScreen() {
  return (
    <RecruitBottom/>
  );
}
function ROuterScreen() {
  return (
    <RecruitOuter/>
  );
}
function RCapScreen() {
  return (
    <RecruitCap/>
  );
}
function RBagScreen() {
  return (
    <RecruitBag/>
  );
}
function RAccesoriesScreen() {
  return (
    <RecruitAccessories/>
  );
}

export default function RecruitPage() {
  return(
    <RecruitScreen/>
  );
};

const styles = StyleSheet.create({
  Product : {
    width: 156,
    height: 168,
    borderRadius: 8,
  }
});
