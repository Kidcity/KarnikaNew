import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { normalize, setWidth } from '../../utils/variables';
import { colors } from '../../utils/colors';

function TabIcon(routeName, isFocused) {
  if (routeName === "Home") {
    if (!isFocused)
      return <AntDesign name="home" size={normalize(20)} color={colors.black} />
    else
      return <Entypo name="home" size={normalize(20)} color={colors.white} />
  }
  if (routeName === "Cart") {
    if(!isFocused)
    return <AntDesign name="shoppingcart" size={normalize(20)} color={colors.black} />
    else 
    return <Entypo name="shopping-cart" size={normalize(20)} color={colors.white} />
  }
  if (routeName === "Filter") {
    if(!isFocused)
    return <MaterialCommunityIcons name="filter-outline" size={normalize(20)} color={colors.black} />
    else
    return <MaterialCommunityIcons name="filter" size={normalize(20)} color={colors.white} />
  }
  if (routeName === "Account") {
    if(!isFocused)
    return <MaterialCommunityIcons name="account-circle-outline" size={normalize(20)} color={colors.black} />
    else
    return <MaterialCommunityIcons name="account-circle" size={normalize(20)} color={colors.white} />
  }
  if (routeName === "Settings") {
    if(!isFocused)
    return <Ionicons name="settings-outline" size={normalize(20)} color={colors.black} />
    else
    return <Ionicons name="settings" size={normalize(20)} color={colors.white} />
  }
}

export default function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[styles.tabBtn, isFocused && styles.isFocusedBtn]}
            key={index}
          >
            {
              TabIcon(route.name, isFocused)
            }
            <Text style={[styles.tabBtnText, isFocused && styles.isFocusedBtnText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

    </View>
  )
}