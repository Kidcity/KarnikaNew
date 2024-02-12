import { Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { styles } from './style';
import CustomImage from '../FastImage';
import { images } from '../../utils/variables';

export default class ProductImageSliderItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomImage
                    source={images.product_view1}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        )
    }
}