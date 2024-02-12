import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image';
import { styles } from './style';
import FastImageComponent from '../FastImageComponent';
import { fonts, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextAnimator from '../TextAnimator';

export default class HorizontalBrandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            onPressBrand: undefined,
            contentOffset: { x: 0, y: 0 },
            contentSize: 0,
            scrollViewWidth: 0,
            selectedGender: null
        };
        this.dataListRef = React.createRef()
        this.scrollToFirst = this.scrollToFirst.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            list: props.hasOwnProperty("list") ? props.list : null,
            onPressBrand: props.hasOwnProperty("onPressBrand") ? props.onPressBrand : undefined,
            selectedGender: props.hasOwnProperty("selectedGender") ? props.selectedGender : null
        }
    }

    onPressBrand = (brand) => {
        if (this.state.onPressBrand) {
            this.state.onPressBrand(brand)
        }
    }

    renderItem = ({ item, index }) => {

        if (item.brand_name == "view_more") {
            return (
                <TouchableOpacity style={[styles.viewMore, { backgroundColor: "#F0F1F3" }]} onPress={() => this.onPressBrand(item)}>
                    <Text style={styles.animatedTextStyle}>
                        View More
                    </Text>
                    {/* <TextAnimator
                        content={"View More"}
                        textStyle={styles.animatedTextStyle}
                        style={styles.animatedTextContainerStyle}
                        duration={100}
                    /> */}
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={[styles.imageView]} onPress={() => this.onPressBrand(item)}>
                <View style={{ overflow: 'hidden', flex: 1, borderRadius: setWidth(3) }}>
                    <FastImageComponent
                        style={[styles.image]}
                        source={{
                            uri: item.brandimage,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={styles.footer}>
                    <FastImageComponent
                        style={[styles.logo]}
                        source={{
                            uri: item.brandlogo,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
            </TouchableOpacity>
        )
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedGender !== this.props.selectedGender) {
            this.scrollToFirst()
        }
    }


    scrollToFirst = () => {
        // alert(1)
        if(this.state.list.length > 0){
            this.dataListRef.current.scrollToIndex({ animated: true, index: 0 });
        }
            
    };

    render() {
        const scrollPerc = (this.state.contentOffset.x / (this.state.contentSize - this.state.scrollViewWidth))
            * (100);

        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <FlatList
                    ref={this.dataListRef}
                    data={this.state.list}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderItem}
                    horizontal
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingTop: setHeight(1),
                        paddingHorizontal: setWidth(2),
                        paddingBottom: setHeight(7.8),
                    }}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ marginRight: setWidth(2) }} />}
                    onScroll={e => {
                        this.setState({
                            contentOffset: e.nativeEvent.contentOffset
                        })
                    }}
                    onContentSizeChange={(width, height) => {
                        this.setState({
                            contentSize: width
                        })
                    }}
                    onLayout={e => {
                        this.setState({
                            scrollViewWidth: e.nativeEvent.layout.width
                        })
                    }}
                />
                <View
                    style={{
                        backgroundColor: colors.white,
                        marginHorizontal: setWidth(40),
                        // marginTop: setWidth(5),
                        borderRadius: setWidth(10),
                        // borderColor: colors.grey1,
                        // borderWidth: setWidth(0.1)
                    }}
                >
                    <View
                        style={{
                            width: (scrollPerc < 0 || isNaN(scrollPerc)) ? 0 : `${scrollPerc}%`,
                            backgroundColor: colors.themeColor,
                            height: 5
                        }}
                    />
                </View>
            </View>
        )
    }
}