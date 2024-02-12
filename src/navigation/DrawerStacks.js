import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    NotificationScreen,
    PurchaseHistoryScreen,
    MyOnlineShopScreen,
    ContactUsScreen,    
    AllBrandsScreen,
    StoreByCityScreen,
    EditProfileScreen,
    ProductListingScreen,
    ProductDetailsScreen,
    MyOrdersScreen,
    OrderDetailsScreen,
    PromoCodeScreen,
    ChangeAddressScreen,
    AddNewAddressScreen,
    WishListScreen,
    ReturnOrderScreen,
    CityWalletScreen,
    AddTeamMemberScreen,
    SeeAllProductScreen,
    HomeScreen,
    CartScreen,
    SettingsScreen,
    ProfileScreen,
    ApplyForCreditScreen,
    TransactionHistoryScreen,
    SearchScreen,
    TestScreen,
    ShopInShopScreen,
    FilterScreen
} from '../screens';
import CustomDrawerMenu from '../component/CustomDrawerMenu';
import { setWidth } from '../utils/variable';


const Drawer = createDrawerNavigator();
export function DrawerStacks() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerStyle={{
                width: setWidth(80),
            }}
            backBehavior="history"

            drawerContent={props => {
                return (
                    <CustomDrawerMenu {...props} />
                );
            }}
            initialRouteName="Home"
        >
            <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name='Cart' component={CartScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='Settings' component={SettingsScreen} />
            <Drawer.Screen name='Profile' component={ProfileScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen component={SearchScreen} name='Search' />
            <Drawer.Screen component={NotificationScreen} name='Notification' />
            <Drawer.Screen component={FilterScreen} name='Filter' />
            <Drawer.Screen component={PurchaseHistoryScreen} name='PurchaseHistory' />
            <Drawer.Screen component={MyOnlineShopScreen} name='MyOnlineShop' />
            <Drawer.Screen component={ContactUsScreen} name="ContactUs" />
            <Drawer.Screen name='AllBrands' component={AllBrandsScreen} options={{
                unmountOnBlur: true
            }}/>           
            <Drawer.Screen name='StoreByCity' component={StoreByCityScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='EditProfile' component={EditProfileScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='ProductListing' component={ProductListingScreen} options={{
                // unmountOnBlur: true
            }} />
            <Drawer.Screen name='ProductDetails' component={ProductDetailsScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='MyOrders' component={MyOrdersScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='OrderDetails' component={OrderDetailsScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='PromoCode' component={PromoCodeScreen} />
            <Drawer.Screen name='ChangeAddress' component={ChangeAddressScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='AddNewAddress' component={AddNewAddressScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='WishList' component={WishListScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='ReturnOrder' component={ReturnOrderScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='CityWallet' component={CityWalletScreen} />
            <Drawer.Screen name='AddTeamMember' component={AddTeamMemberScreen} />
            <Drawer.Screen name='SeeAllProduct' component={SeeAllProductScreen} options={{
                unmountOnBlur: true
            }} />
            <Drawer.Screen name='ApplyForCredit' component={ApplyForCreditScreen} />
            <Drawer.Screen name='TransactionHistory' component={TransactionHistoryScreen} />
            <Drawer.Screen name='ShopInShop' component={ShopInShopScreen} />
        </Drawer.Navigator>
    );
}

