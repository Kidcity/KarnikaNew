import { Text, View, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import React, { Component } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { setHeight, setWidth } from '../../utils/variable'
import colors from '../../utils/colors'
import CustomButton from '../CustomButton'
import { styles } from './style'
import WebViewCustomeHtmlRender from '../WebViewCustomeHtmlRender'

export default class CreditTermConditionView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isExpand: false,
      credit_agency_details: {},
      detailesContainerHeight: 0,
      loadContent: false
    }
    this.animatedHeight = new Animated.Value(0)
    this.opacity = new Animated.Value(1)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      credit_agency_details: props.credit_agency_details ? props.credit_agency_details : {}
    }
  }

  animate = () => {
    return new Promise(async resolve => {
      try {
        const isExpand = this.state.isExpand

        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: isExpand ? 1 : 0,
            duration: 3000,
            useNativeDriver: false
          }),
          Animated.spring(this.animatedHeight, {
            toValue: isExpand ? this.state.detailesContainerHeight : 0,
            duration: 15000,
            useNativeDriver: false
          })
        ]).start(() => {
          resolve({ success: true })
        });

      } catch (error) {
        resolve({ success: false, error })
      }
    })
  }

  onExpand = async (height) => {

    const isExpand = await !this.state.isExpand
    await this.setState({ isExpand })
    setTimeout(() => {
      this.animate().then(data => {
        // console.log(data);
        if (data.success) {
          // console.log(11, this.animatedHeight, this.state.isExpand, this.state.detailesContainerHeight);
        }
      })
    }, 100);
  }

  render() {

    if (!this.state.credit_agency_details) {
      return (
        <></>
      )
    }
    // console.log(JSON.stringify(this.animatedHeight));
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => this.props.onCloseModal()}>
          <Entypo name='cross' size={setWidth(10)} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.termConditionContainer}>

          <View style={[styles.card, this.state.isExpand && { flex: 1 }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Terms & Condition</Text>
            </View>
            <View style={[styles.cardBody]}>
              <Text style={styles.cardText}>{this.state.credit_agency_details.commission}% Processing Fee Will Be Applied on Invoice.</Text>
              <View style={[styles.row, styles.mr_t_2]}>
                <Text style={[styles.cardText]}>Credit Partner: </Text>
                <Text style={[styles.cardText, styles.cardTextBold]}>{this.state.credit_agency_details.credit_partner}</Text>
              </View>
              <View style={[styles.row, styles.mr_t_2]}>
                <Text style={[styles.cardText]}>Credit Period: </Text>
                <Text style={[styles.cardText, styles.cardTextBold]}>{this.state.credit_agency_details.credit_period}</Text>
              </View>
              <View style={[styles.row, styles.mr_t_2]}>
                <Text style={[styles.cardText]}>Estemated Processing Time: </Text>
                <Text style={[styles.cardText, styles.cardTextBold]}>2 - 4 Days</Text>
              </View>
              {/* <Text>detailesContainerHeight: {JSON.stringify(this.state.detailesContainerHeight)}</Text>
              <Text>animatedHeight: {JSON.stringify(this.animatedHeight)}</Text> */}
            </View>
            {/* {
              this.state.isExpand && */}
            <View style={[styles.termConditionDetails, this.state.isExpand && styles.pad_v_2, this.state.isExpand && styles.sideborder_of_3]} onLayout={async (e) => {
              let h = e.nativeEvent.layout.height
              await this.setState({ detailesContainerHeight: h, loadContent: !this.state.loadContent })
            }}>
              <Animated.View style={{ height: this.animatedHeight, opacity: this.opacity, paddingBottom: setHeight(2) }}>
                <WebViewCustomeHtmlRender
                  htmlbody={this.state.credit_agency_details.term_conditions}
                  containerStyle={{
                    flex: 1
                  }}
                />
              </Animated.View>
            </View>
            {/* } */}
            <View style={styles.cardFooter}>
              <TouchableOpacity style={[styles.row, { alignItems: 'center', paddingVertical: setHeight(2) }]} onPress={() => this.onExpand(this.state.detailesContainerHeight)}>
                <Text style={[styles.cardText, { color: colors.red }]}>See {this.state.isExpand ? "Less" : "More"} </Text>
                <MaterialIcons name={this.state.isExpand ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={setWidth(5)} color={colors.red} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.footerBtnView}>
            <CustomButton
              container={{
                backgroundColor: colors.red,
                paddingHorizontal: setWidth(7),
                paddingRight: setWidth(9),
              }}
              label="AGREE TO APPLY"
              labelStyle={{ color: colors.white }}
              iconColor={colors.white}
              onPress={this.props.onPressApply}
              leftIcon
            />
          </View>
        </View>
      </View>
    )
  }
}