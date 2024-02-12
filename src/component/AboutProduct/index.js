import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { styles } from './style'
import CircleIconButton from '../CircleIconButton'
import { commonStyle } from '../../helper/commonStyle'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'

import colors from '../../utils/colors'
import ColorCodeCircle from '../ColorCodeCircle'
import { normalize } from '../../utils/variable'
import BlinkText from '../BlinkText'

export class AboutProduct extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            spreadPrice: false,
            productDetails: null,
            onPressFavBtn: undefined
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            spreadPrice: props.hasOwnProperty("spreadPrice") ? props.spreadPrice : false,
            productDetails: props.hasOwnProperty("productDetails") ? props.productDetails : null,
            onPressFavBtn: props.hasOwnProperty("onPressFavBtn") ? props.onPressFavBtn : undefined,
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {
                    (this.state.productDetails?.brand_mov !== 0) &&
                    <BlinkText
                        text="Shop In Shop"
                        duration={700}
                        style={styles.movView}
                    />

                }
                {
                    this.state.productDetails?.item_left !== '' &&
                    <View style={styles.itemsLeftContainer}>
                        <Text style={[commonStyle.fontBold, commonStyle.textWhite, commonStyle.text12]} >{this.state.productDetails?.item_left}</Text>
                    </View>
                }
                <CircleIconButton
                    icon={<Octicons name={this.state.productDetails?.isFavourite ? "heart-fill" : "heart"} size={normalize(20)} color={colors.red} />}
                    buttonContainer={styles.heartBtn}
                    onPress={() => this.state.onPressFavBtn(!this.state.productDetails?.isFavourite)}
                />

                <View style={[commonStyle.row, commonStyle.alignItemsCenter, 
                    // this.state.spreadPrice && commonStyle.justifyContentEvenly, commonStyle.justifyContentBetween
                    ]}>
                    <View style={{borderColor: colors.red, borderWidth: normalize(1)}}>
                        <Text style={styles.price}>₹{this.state.productDetails?.price}</Text>
                    </View>
                    <View>
                        <Text style={[styles.crossedText, (!this.state.spreadPrice) && commonStyle.gapLeft6]}>₹{parseFloat(this.state.productDetails?.prev_price).toFixed()}</Text>
                    </View>
                    <View>
                        <Text style={[styles.offerText, (!this.state.spreadPrice) && commonStyle.gapLeft6]}>{parseFloat(this.state.productDetails?.off).toFixed()}% Off</Text>
                    </View>
                </View>

                <View style={styles.block} >
                    <Text style={styles.productBrand} numberOfLines={1}>By
                        <Text style={[commonStyle.textCharcoal, commonStyle.fontBold]}> {this.state.productDetails?.brand_name}</Text>
                    </Text>
                </View>

                <View style={[styles.block, commonStyle.row]} >
                    <Text style={[commonStyle.fontBold, commonStyle.text12, commonStyle.textCharcoal]} numberOfLines={1}>SIZE :  </Text>
                    <Text style={[commonStyle.textgrey, commonStyle.fontBold, commonStyle.text12, { flex: 1 }]} numberOfLines={1}>{this.state.productDetails?.size} {this.state.productDetails?.otherSizes}</Text>
                </View>

                <View style={[styles.block, commonStyle.row]} >
                    <Text style={[commonStyle.fontBold, commonStyle.text12, commonStyle.textCharcoal]} numberOfLines={1}>SET QTY :</Text>
                    <Text style={[commonStyle.textgrey, commonStyle.fontBold, commonStyle.text12]}> {this.state.productDetails?.quantity} Pcs</Text>
                </View>

                <View style={[styles.block, commonStyle.row]} >
                    <Text style={[commonStyle.fontBold, commonStyle.text12, commonStyle.textCharcoal]} numberOfLines={1}>MRP :</Text>
                    <Text style={[commonStyle.textgrey, commonStyle.fontBold, commonStyle.text12]}>   {(this.state.productDetails?.mrp != "N/A") && "₹"}{this.state.productDetails?.mrp}</Text>
                </View>

                <View style={[styles.block, commonStyle.row]} >
                    <Text style={[commonStyle.fontBold, commonStyle.text12, commonStyle.textCharcoal]} numberOfLines={1}>MARGIN :</Text>
                    <Text style={[commonStyle.textgrey, commonStyle.fontBold, commonStyle.text12]}>   {this.state.productDetails?.margin}</Text>
                </View>

                {/* <View style={[styles.block, commonStyle.row]} >
                    <Entypo name='location-pin' size={normalize(15)} color={colors.charcoal} />
                    <Text style={[commonStyle.fontBold, commonStyle.text12, commonStyle.textCharcoal, commonStyle.textUpperCase]} numberOfLines={1}> {this.state.productDetails?.city_name}</Text>
                </View> */}


                {/* <View style={[styles.block, commonStyle.row, commonStyle.alignItemsCenter]} >

                    <ColorCodeCircle bgColor={colors.red} />
                    <ColorCodeCircle bgColor={colors.green1} />
                    <ColorCodeCircle bgColor={colors.themeColor} />
                    <ColorCodeCircle bgColor={colors.grey1} moreColorText={4} />
                </View> */}

            </View>
        )
    }
}

export default AboutProduct
