import { Animated, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style'
import FastImageComponent from '../FastImageComponent'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ageList, setHeight, setWidth } from '../../utils/variable'
import colors from '../../utils/colors'
import { FlatList } from 'react-native-gesture-handler'

export default class ShopForModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            downArrowYAxis: new Animated.Value(5),
            genders: null,
            prevSelectedGender: null,
            initialSelecteGender: null,
            selectedGender: null,
            selectedAge: "",
            showAgeList: false,
            showModal: false,
            onApply: undefined,
            modalBottomPosition: 0
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            genders: props.hasOwnProperty("genders") ? props.genders : null,
            initialSelecteGender: props.hasOwnProperty("initialSelecteGender") ? props.initialSelecteGender : null,
            onApply: props.hasOwnProperty("onApply") ? props.onApply : undefined,
            modalBottomPosition: props.hasOwnProperty("modalBottomPosition") ? props.modalBottomPosition : 0
        }
    }

    componentDidMount() {
        // this._bounce()
    }

    _bounce() {
        Animated.loop(
            Animated.sequence([
                Animated.spring(this.state.downArrowYAxis, {
                    toValue: 5,
                    duration: 500,
                    friction: 1,
                    tension: 20,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }

    renderGenders = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.onSelectGender(item)}>
                <View style={[styles.genderImageContainer, this.state.selectedGender?.id === item.id && styles.selectedOption]}>
                    <FastImageComponent
                        style={[styles.genderImage]}
                        source={{
                            uri: item.image,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                </View>
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    renderAge = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.onSelectAge(item.title)}>
                {/* <View style={[styles.ageImageContainer, this.state.selectedAge === item.title && styles.selectedOption]}> */}
                <View style={[styles.ageImageContainer,  (this.state.prevSelectedGender?.title === this.state.selectedGender?.title && this.state.selectedAge  === item.title )&& styles.selectedOption  ]}>
                    <FastImageComponent
                        style={[styles.ageImage]}
                        source={item.image}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                </View>
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    onSelectGender = (data) => {
        this.setState({
            selectedGender: data,
            // showAgeList: true
        },() => this.onPressNextButton())        
    }

    onSelectAge = (title) => {
        this.setState({
            selectedAge: title,
            prevSelectedGender: this.state.selectedGender
        }, () => this.onPressNextButton())
    }

    onPressNextButton = () => {

        // if no gender selected
        if (!this.state.selectedGender) {
            return
        }

        // if (this.state.showAgeList) {

            // if no age selected
            // if (this.state.selectedAge == '') {
            //     return
            // }

            if (this.state.onApply) {
                this.resetState()
                this.state.onApply({ 
                    selectedGender: this.state.selectedGender?.id, 
                    // selectedAge: this.state.selectedAge 
                })                
            }
            
        // }
        // else {
        //     this.setState({
        //         showAgeList: true
        //     })
        // }
    }

    resetState = () => {
        this.setState({
            // showAgeList: false,
            showModal: false
        })
    }

    back = () => {

        this.setState({
            showAgeList: false,
            selectedAge: '',
            // selectedGender: null
        })
    }

    render() {

        const downArrowTrans = {
            transform: [
                { translateY: this.state.downArrowYAxis }
            ]
        }


        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.row]} activeOpacity={0.6} onPress={() => this.setState({ showModal: true })}>
                    <View style={[styles.row,]}>
                        <View style={styles.baseImageContainer}>
                            <FastImageComponent
                                style={[styles.baseImage]}
                                source={{
                                    uri: this.state.selectedGender ? this.state.selectedGender?.image : this.state.initialSelecteGender?.image,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Buying For</Text>
                            <Text style={styles.subHeading}>
                                {
                                    this.state.selectedGender ?
                                        this.state.selectedGender?.title :
                                        this.state.initialSelecteGender?.title
                                }
                                <Animated.View style={[styles.downArrowContainer, downArrowTrans]}>
                                    <MaterialIcons name='keyboard-arrow-down' size={setWidth(5)} color={colors.black} />
                                </Animated.View>
                            </Text>
                        </View>
                        {/*
                            (this.state.selectedAge !== '') &&
                            <View style={styles.selectedAgeNameView}>
                                <Text style={styles.selectedAge}>
                                    {
                                        this.state.selectedAge
                                    }
                                </Text>
                            </View>
                                */}

                    </View>

                </TouchableOpacity>

                {
                    this.state.showModal &&
                    <View style={[styles.modal]}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }]}>

                            <TouchableOpacity style={styles.backButton} onPress={this.back}>
                                {
                                    this.state.showAgeList &&
                                    <AntDesign name='arrowleft' size={setWidth(7)} color={colors.black} />
                                }
                            </TouchableOpacity>


                            {
                                this.state.showAgeList ?
                                    <Text style={[styles.heading, { color: colors.dark_charcoal, flex: 1, }]}>
                                        Select an age group
                                    </Text>
                                    :
                                    <>
                                        <Text style={[styles.heading, { color: colors.dark_charcoal, flex: 1, }]}>
                                            Select One
                                        </Text>
                                    </>
                            }

                            <TouchableOpacity style={[styles.crossButton]} onPress={this.resetState}>
                                <Entypo name='cross' size={setWidth(7)} color={colors.black} />
                            </TouchableOpacity>

                        </View>


                        <View style={styles.listContainer}>
                            {
                                // !this.state.showAgeList ?
                                    <FlatList
                                        data={this.state.genders}
                                        keyExtractor={(item, index) => index}
                                        renderItem={this.renderGenders}
                                        horizontal
                                        showsHorizontalScrollIndicator
                                        contentContainerStyle={{
                                            flex: 1,
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                        }}
                                        ItemSeparatorComponent={() => <View style={{ marginHorizontal: 3 }} />}
                                    />
                                    // :
                                    // <FlatList
                                    //     data={ageList}
                                    //     keyExtractor={(item, index) => index}
                                    //     renderItem={this.renderAge}
                                    //     horizontal
                                    //     showsHorizontalScrollIndicator
                                    //     contentContainerStyle={{
                                    //         flex: 1,
                                    //         justifyContent: 'space-evenly',
                                    //         alignItems: 'center',
                                    //     }}                                    
                                    // />
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }
}