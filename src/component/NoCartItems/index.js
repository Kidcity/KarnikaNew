import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { images, normalize } from '../../utils/variables';
import { colors } from '../../utils/colors';
import CustomImage from '../FastImage';

export class NoCartItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static getDerivedStateFromProps(props, state) {
    return {

    }
  }

  render() {
    return (
      <View style={[styles.container, commonStyle.shadow]}>
        {/* <FontAwesome name="opencart" size={normalize(25)} color={colors.themeColor} /> */}
        <CustomImage
          source={images.empty_cart}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[commonStyle.fontBold, styles.heading, commonStyle.gapTop6]}>Your cart is empty</Text>
        <Text style={[commonStyle.fontBold, styles.subheading, commonStyle.gapTop6]}>You have no items in your shopping cart.</Text>
        <Text style={[commonStyle.fontBold, styles.subheading, commonStyle.gapTop6]}>Let's go buy something!</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Shop now</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NoCartItems
