import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { normalize, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';

export default class CityDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            totalCities: 0,
            openModal: false,
            onPressCity: undefined
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            cities: props.hasOwnProperty("cities") ? props.cities : [],
            totalCities: props.cities.length,
            onPressCity: props.hasOwnProperty('onPressCity') ? props.onPressCity : undefined
        }
    }

    componentDidMount() {
        // this.replacePosition()
    }

    // replacePosition = () => {
    //     const cities = this.props.cities

    //     const filter_not_active = cities.filter(item => item.isActive === false)
    //     const filter_active = cities.filter(item => item.isActive === true)

    //     const array = filter_active.concat(filter_not_active)
    //     console.log("replacePosition ===> ",array);
    //     this.setState({
    //         cities: array
    //     })
    // }

    showModalContent = () => {

        return (
            <View style={styles.modal}>
                {
                    this.state.cities.map((item, index) => {
                        if (index > 2) {
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.cityBtn,
                                        styles.modalBtn,
                                        (item.isActive) && styles.activeCity
                                    ]}
                                    key={index}
                                    onPress={() => this.onSelectCity(index)}
                                >
                                    <Text style={[
                                        styles.cityName,
                                        (item.isActive) && styles.activeCityText
                                    ]}>
                                        {item.city_name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </View>
        )
    }

    onSelectCity = (index) => {
        this.setState({ openModal: !this.state.openModal })
        this.state.onPressCity(index)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, paddingHorizontal: normalize(15) }} showsHorizontalScrollIndicator={false}>
                        {
                            this.state.cities.map((item, index) => {
                                if (item.isActive) {
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.cityBtn,
                                                styles.activeCity,
                                                (this.state.totalCities <= 3) && styles.fixed_button_3
                                            ]}
                                            key={index}
                                            onPress={() => this.onSelectCity(index)}
                                        >
                                            <Text
                                                style={[
                                                    styles.cityName,
                                                    styles.activeCityText
                                                ]}
                                            >
                                                {item.city_name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                                if (index <= 2 && !item.isActive) {
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.cityBtn,
                                                (this.state.totalCities <= 3) && styles.fixed_button_3
                                            ]}
                                            key={index}
                                            onPress={() => this.onSelectCity(index)}
                                        >
                                            <Text
                                                style={[
                                                    styles.cityName,
                                                ]}
                                            >
                                                {item.city_name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </ScrollView>
                    {
                        (this.state.cities.length > 3) &&
                        <>
                            <TouchableOpacity style={[styles.showmoreBtn]} onPress={() => this.setState({ openModal: !this.state.openModal })}>
                                <Text style={[styles.showmoreText]}>Show More</Text>
                                <AntDesign name='caretdown' size={setWidth(4)} color={colors.white} style={{ marginLeft: 5 }} />
                            </TouchableOpacity>
                            {
                                this.state.openModal &&
                                this.showModalContent()
                            }
                        </>
                    }

                </View>

            </View>
        )
    }
}