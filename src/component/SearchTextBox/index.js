import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Keyboard, FlatList, NativeModules } from 'react-native';
import colors from '../../utils/colors';
import { setHeight, setWidth } from '../../utils/variable';
import { styles } from './style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import CommonService from '../../services/CommonService';
import { errorAlert } from '../../helper/ToastHelper';
import { store } from '../../redux/store'
import { clearProductListData } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { NavigationState } from '@react-navigation/native';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';

const { StatusBarManager } = NativeModules

export default class SearchTextBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userSearchText: "",            
            city_id: '',
            searchText: '',
            suggestions: [],
            placeholder: '',
            showCrossBtn: false,
            searchIconColor: colors.grey3,
            statusbarheight: 0,
            suggestionBoxTopGap: 53,
            suggestionBox: null,
            searchboxContainer: null,
            onPressCrossBtn: undefined,
            onSearch: undefined,
            shouldRedirectToSelfScreen: false,
            shouldShowSuggesstionDropdown: true,
            shouldShowUpperPaddingForIOS: true,
            shouldFilterOnSamePage: false
        };
        this.isTapped = false
        this.timer;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            city_id: props.city_id ? props.city_id : '',
            placeholder: props.placeholder ? props.placeholder : "Search here...",
            userSearchText: props.userSearchText? props.userSearchText : "",
            showCrossBtn: props.showCrossBtn ? props.showCrossBtn : false,
            searchIconColor: props.searchIconColor ? props.searchIconColor : colors.grey3,
            suggestionBoxTopGap: props.suggestionBoxTopGap ? props.suggestionBoxTopGap : 53,
            searchboxContainer: props.searchboxContainer ? props.searchboxContainer : null,
            suggestionBox: props.suggestionBox ? props.suggestionBox : null,
            onPressCrossBtn: props.onPressCrossBtn ? props.onPressCrossBtn : undefined,
            onSearch: props.onSearch ? props.onSearch : undefined,
            shouldRedirectToSelfScreen: props.hasOwnProperty("shouldRedirectToSelfScreen") ? props.shouldRedirectToSelfScreen : false,
            shouldShowSuggesstionDropdown: props.hasOwnProperty("shouldShowSuggesstionDropdown") ? props.shouldShowSuggesstionDropdown : true,
            shouldShowUpperPaddingForIOS: props.hasOwnProperty("shouldShowUpperPaddingForIOS") ? props.shouldShowUpperPaddingForIOS : true,
            shouldFilterOnSamePage: props.hasOwnProperty("shouldFilterOnSamePage") ? props.shouldFilterOnSamePage : false
        }
    }

    onPressCrossBtn = () => {

        this.setState({ searchText: '', suggestions: [] })
        Keyboard.dismiss()
        if (this.state.onPressCrossBtn) {
            this.state.onPressCrossBtn()
        }
    }

    getActiveRouteState = function (route) {
        if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
            return route;
        }

        const childActiveRoute = route.routes[route.index];
        return this.getActiveRouteState(childActiveRoute);
    }

    onSearch = () => {
        if (this.state.searchText != '') {
            this._navigate(this.state.searchText, '')
        }
    }

    debounce = (func) => {
        // console.log('debounce ');
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            const context = this;
            func.apply(context);
        }, 1000);

    };

    onChangeText = (e) => {
        this.setState({
            searchText: e,
        }, () => {
            if(this.state.shouldShowSuggesstionDropdown && this.state.shouldFilterOnSamePage){
                this.debounce(this._getSuggestions)
                this.onSearch()
            }
            else if (this.state.shouldShowSuggesstionDropdown) {
                this.debounce(this._getSuggestions)
            } else {
                this.onSearch()
            }
        })
    }


    onPressBackDrop = () => {
        this.setState({ searchText: '' })
        Keyboard.dismiss()
    }

    onPressSuggessionItem(item) {
        this.setState({ searchText: "", suggestions: [] }, async () => {
            this._navigate(item.name, item.city_id)
            this.isTapped= true
        })
    }

    async _navigate(searchText, city_id = '') {

        if (this.props.navigation) {
            // if (this.state.city_id == '') {
                await store.dispatch(clearProductListData())
                await store.dispatch(clearProductFilterAction())
            // }
            let filter = store.getState().loginReducer.data.cust_manu_id
            filter = {
                ...filter,
                city: (this.state.city_id != '') ? this.state.city_id : (city_id != '') ? city_id : '',
                searchValue: searchText
            }

            await store.dispatch(setProductFilterAction(filter))


            if(this.state.shouldFilterOnSamePage){
                this.state.onSearch(searchText)
            }
            else if (this.state.shouldRedirectToSelfScreen) {
                this.state.onSearch(searchText)
            }
            
            if(this.isTapped) {
                this.setState({ searchText: this.state.userSearchText ?? "", suggestions: [] })
                Keyboard.dismiss()
                setScreenActivity({ action_type: "searchwise_list", action_id: '', city_id: "" })
                this.props.navigation.navigate("ProductListing")
            }

        }
    }

    _getSuggestions = () => {

        const retailer_id = store.getState().loginReducer.data?.cust_manu_id
        if(this.state.searchText == ''){
            return
        }

        const param = {
            retailer_id: retailer_id ?? "",
            name: this.state.searchText,
            city: this.state.city_id
        }

        // console.log('param  ==> ',param);

        CommonService._getSuggestionsService(param).then(response => {
            // console.log(response);
            this.setState({
                suggestions: response
            })
        }, error => {
            errorAlert("Sorry", error.message)
        })
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight(response =>
                this.setState({
                    statusbarheight: response.height
                })
            )
        }
    }

    render() {

        return (
            <>
                {
                    (this.state.shouldShowUpperPaddingForIOS && Platform.OS === "ios") &&
                    <View style={{ height: this.state.statusbarheight, backgroundColor: colors.white }}>

                    </View>
                }
                <View style={[styles.searchBoxContainer, (this.state.searchboxContainer) && this.state.searchboxContainer]}>
                    <TouchableOpacity style={[styles.justifyCenter]} onPress={() => {Keyboard.dismiss(); this.isTapped = true; this.onSearch()}}>
                        <Ionicons name='search' size={setWidth(7)} color={this.state.searchIconColor} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.searchbox]}
                        placeholderTextColor={colors.grey5}
                        placeholder={this.state.placeholder}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={() => {Keyboard.dismiss(); this.isTapped = true; this.onSearch()}}
                        value={this.state.searchText}
                    />
                    {
                        (this.state.showCrossBtn || this.state.searchText != '') &&
                        <TouchableOpacity style={[styles.justifyCenter]} onPress={this.onPressCrossBtn}>
                            <Entypo name='cross' size={setWidth(7)} color={colors.dark_charcoal} />
                        </TouchableOpacity>
                    }
                </View>
                {
                    (this.state.searchText != '' && this.state.suggestions.length != 0) &&
                    <TouchableOpacity style={[styles.suggestionBox, (this.state.suggestionBox) && this.state.suggestionBox, { marginTop: this.state.statusbarheight, top: this.state.suggestionBoxTopGap }]} activeOpacity={1} onPress={this.onPressBackDrop}>

                        <View style={styles.suggestionContainer}>
                            <FlatList
                                data={this.state.suggestions}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity style={styles.suggestionTextView} onPress={() => this.onPressSuggessionItem(item)}>
                                        <Text style={[styles.suggestionText]}>{item.name}</Text>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: setHeight(10)
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                }
            </>
        );
    }
}
