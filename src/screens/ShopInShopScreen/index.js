import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import CustomHeader from '../../component/CustomHeader'
import HomeService from '../../services/HomeService';
import { setHeight, setWidth } from '../../utils/variable';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import { connect } from 'react-redux';
import { clearProductListData } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';

class ShopInShopScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            all_sis_brand: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {

        }
    }

    componentDidMount() {
        this._getShopINShopBrand()
    }

    _getShopINShopBrand = async () => {

        await HomeService._AllshopINshopBrandService().then(response => {
          
            if (response.data.length > 0) {
                this.setState({
                    all_sis_brand: response.data
                })
            }
        }, error => {

        })
    }

    renderBrandItems = ({ item, index }) => {
       
        return (
            <TouchableOpacity style={[styles.row, styles.itemContainer]} onPress={() => this._navigateToProductList(item)} >
                <View style={[styles.alignItemsCenter, styles.itemLeft]}>
                    <Image source={{ uri: item.image }} resizeMode="contain" style={styles.itemImage} />
                </View>
                <View style={[styles.itemRight]}>
                    <Text style={[styles.itemTitle,, styles.top_gap, { fontWeight: 'bold' }]} adjustsFontSizeToFit numberOfLines={1}>{item.brand_name}</Text>
                    {/* <Text style={[styles.itemTitle, styles.top_gap]} adjustsFontSizeToFit numberOfLines={1}>{item.category}</Text> */}
                    <Text style={[styles.itemTitle, styles.top_gap]} adjustsFontSizeToFit numberOfLines={1}>{item.city_name}</Text>
                    <Text style={[styles.itemTitle, styles.top_gap]} adjustsFontSizeToFit numberOfLines={1}>Minimum Order Value: ₹{item.brand_mov}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    async _navigateToProductList(item) {
        
        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()
        
        let param = this.props.filter
        
        param = {
            ...param,
            city: item?.city_id.toString() ?? '',
            brand: item?.brand_id.toString() ?? '',
        }
      
        setScreenActivity({ action_type: "brandwise_list", action_id: item?.brand_id, city_id: item?.city_id ?? '' })
        await this.props.setProductFilterAction(param)
        this.props.navigation.navigate("ProductListing")
    }


    handleBackButtonClick() {

        setScreenActivity({ action_type: "going_back", action_id: '' })

        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } else {
            this.props.navigation.goBack();
        }
        return true;
    }


    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    showFavouriteIcon={true}
                    showSearchIcon
                    showBackButton={true}
                    onPressBack={() => {
                        this.handleBackButtonClick()
                    }}
                />
                <View style={styles.content}>
                    <Text style={styles.heading}>Super Brands</Text>
                    <FlatList
                        ref={this.flatListRef}
                        data={this.state.all_sis_brand}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderBrandItems}
                        nestedScrollEnabled
                        style={{
                            flex: 1,
                            marginHorizontal: setWidth(4),
                            marginTop: setHeight(2)
                        }}
                        contentContainerStyle={{
                            paddingBottom: setHeight(4)
                        }}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
                        onScroll={(event) => this.handleScroll(event)}
                        scrollEventThrottle={16}
                    />

                </View>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {    
        filter: state.commonReducer.filter,   
    }
}

const mapDispatchToProps = dispatch => ({
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    clearProductListData: () => dispatch(clearProductListData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ShopInShopScreen)
