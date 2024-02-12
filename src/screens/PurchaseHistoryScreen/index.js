import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { setWidth } from '../../utils/variable';
import { styles } from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import Dropdown from '../../component/Dropdown';
import { connect } from 'react-redux';
import PruchaseHistoryService from '../../services/PruchaseHistoryService';
import { errorAlert } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';

class PurchaseHistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            period: [
                { label: 'Item 1', value: '1' },
                { label: 'Item 2', value: '2' },
                { label: 'Item 3', value: '3' },
                { label: 'Item 4', value: '4' },
                { label: 'Item 5', value: '5' },
                { label: 'Item 6', value: '6' },
                { label: 'Item 7', value: '7' },
                { label: 'Item 8', value: '8' },
            ],
            selectedPeriod: "",
            no_of_details: this.props.purchaseHistoryReducer.no_of_details,
            quantity_set: this.props.purchaseHistoryReducer.quantity_set,
            quantity_piece: this.props.purchaseHistoryReducer.quantity_piece,
            total_amount: this.props.purchaseHistoryReducer.total_amount,
            showLoader: false
        };
    }

    async _getPurchaseData() {
        const param = {
            retailer_id:  this.props.loginReducer.data.cust_manu_id,
            filter_day: 365
        }
        this.setState({ showLoader: true })
        await PruchaseHistoryService._getPurchaseDataService(param).then(response => {
            this.setState({ showLoader: false })
        }, error => {
            this.setState({ showLoader: false })
            errorAlert("Error", error.message)
        })
    }

    componentDidMount() {        
        this._getPurchaseData()
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader
                    heading="PURCHASE HISTORY"
                    headingStyle={{
                        textAlign: 'center'
                    }}
                    onPressBack={() => this.props.navigation.goBack()}
                />
                <View style={styles.content}>
                    <View style={[styles.row, { marginTop: setWidth(5) }]}>
                        <View style={styles.subHeadingView}>
                            <Text style={styles.subHeading}>Analytics</Text>
                            <View style={styles.borderBottom} />
                        </View>
                        <View style={styles.dropdownView}>
                            <Dropdown
                                data={this.state.period}
                                onChange={(v) => this.setState({ selectedPeriod: v })}
                            />
                        </View>
                    </View>

                    <View style={[styles.row, styles.justifyContentBetween, { marginTop: setWidth(5) }]}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.gradient1} style={styles.cardBlock}>
                            <Text style={styles.cardText1}>No. Of Details</Text>
                            <Text style={styles.cardText2}>{this.state.no_of_details}</Text>
                        </LinearGradient>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.gradient2} style={styles.cardBlock}>
                            <Text style={styles.cardText1}>Quantity In Sets</Text>
                            <Text style={styles.cardText2}>{this.state.quantity_set}</Text>
                        </LinearGradient>
                    </View>

                    <View style={[styles.row, styles.justifyContentBetween, { marginTop: setWidth(5) }]}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.gradient3} style={styles.cardBlock}>
                            <Text style={styles.cardText1}>Quantity In Pieces</Text>
                            <Text style={styles.cardText2}>{this.state.quantity_piece}</Text>
                        </LinearGradient>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors.gradient4} style={styles.cardBlock}>
                            <Text style={styles.cardText1}>Total Amount</Text>
                            <Text style={styles.cardText2}>{this.state.total_amount}</Text>
                        </LinearGradient>
                    </View>
                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader

                    />
                }
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        purchaseHistoryReducer: state.purchaseHistoryReducer
    }
}

const mapDispatchToProps = dispatch => ({
    //clearLoginData: () => dispatch(clearLoginData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(PurchaseHistoryScreen)
