import { icons } from "../utils/Variables";

export default class BottomTabHelper {
  static setTabIcon(routeName) {
    if (routeName === 'Menu') {
      return "home";
    }
    if (routeName === 'Home') {
      return "home";
    }
    if (routeName === 'Settings') {
      return "settings";
    }
    if (routeName === 'Profile') {
      return "user";
    }
    if (routeName === 'Cart') {
      return "shopping-cart";
    }
    if (routeName === 'Filter') {
      return "filter";
    }
  }

  static setTabName(routeName) {
    if (routeName === 'Home') {
      return 'Home';
    }
    if (routeName === 'Settings') {
      return 'Settings';
    }
    if (routeName === 'Profile') {
      return 'Profile';
    }
    if (routeName === 'Cart') {
      return "Cart";
    }
  }
}