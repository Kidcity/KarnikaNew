import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import CustomHeader from '../../component/CustomHeader';
import GridViewItem from '../../component/GridViewItem';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import ProductListingService from '../../services/ProductListingService'
import { retryAlert, successToast } from '../../helper/ToastHelper';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';

class SeeAllProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cust_manu_id: '',
            city_id: '',
            products: (this.props.route.params.all_similer_product)?this.props.route.params.all_similer_product: []
        };
        this.param = this.props.route.params
        this.flatListRef = React.createRef()
    }

    static getDerivedStateFromProps(props, state) {
        return {            
            cust_manu_id: props.cust_manu_id,
            city_id: props.route.params.city_id ? props.route.params.city_id : ''
        }
    }

    renderGridViewItem = ({ item, index }) => {
        return (
            <GridViewItem
                item={item}
                onPressProduct={() =>{
                    this.props.navigation.navigate("ProductDetails", { product_id: item.id })}}
                onPressFavBtn={(value) => this._addToFavourite(value, item.id, index)}
            />
        )
    }

    _addToFavourite(flag, product_id, productIndex) {
        const param = {
            liked_products_id: product_id,
            liked_retailers_id: this.state.cust_manu_id,
            status: flag
        }
        
        ProductListingService._productLikeUnlikeService(param).then(response => {
            const product = this.state.products            
            product[productIndex].isFavourite = flag
            this.setState({
                products: product
            })
            successToast("Added!", "Product added to wishlist")
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._addToFavourite())
            } else {
                errorAlert("Error", error.message)
            }
        })
    }

    async _navigateToProductList(searchText = '') {
        await this.props.clearProductFilterAction()
        
        let param = this.props.filter
        param = {
          ...param,
          searchValue: searchText
        }
        
        await this.props.setProductFilterAction(param)
        // return
        this.props.navigation.navigate("ProductListing")
      }

    render() {
        return (
            <View style={styles.contianer}>
                {/* <CustomHeader
                    city_id={this.state.city_id}
                    heading="SIMILAR PRODUCTS"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    navigation={this.props.navigation}
                    showSearchIcon={true}
                    showCartIcon={true}
                    onSearch={(searchText) => {
                        this._navigateToProductList(searchText)
                    }}                   
                    onPressBack={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                    onPressCartIcon={() => {
                        this.props.navigation.navigate("Cart")}}
                /> */}
                  <AppHeader
                    showBackBtn
                    showSearch
                    showCart
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    <FlatList
                        ref={this.flatListRef}
                        key={'#'}
                        data={this.state.products}
                        keyExtractor={(item, index) => '#' + index}
                        renderItem={this.renderGridViewItem}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between'
                        }}
                        contentContainerStyle={{
                            paddingBottom: setWidth(10),
                            paddingTop: setWidth(5)
                        }}   
                        ItemSeparatorComponent={()=> <View style={{marginTop: normalize(12)}} />}                   
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        filter: state.commonReducer.filter,
        cust_manu_id: state.loginReducer.data.cust_manu_id,
    }
}

const mapDispatchToProps = dispatch => ({
    setProductFilterAction: (param) => dispatch(setProductFilterAction(param)),
    clearProductFilterAction: () => dispatch(clearProductFilterAction())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(SeeAllProductScreen)

