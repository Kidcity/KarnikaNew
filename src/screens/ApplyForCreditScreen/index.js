import React, { Component } from 'react';
import { View, Text, FlatList, Image, Alert, Linking, BackHandler } from 'react-native';
import { styles } from './style';
import Entypo from 'react-native-vector-icons/Entypo'
import { rupifi_status, setHeight, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import Checkbox from '../../component/Checkbox';
import ApplyForCreditService from '../../services/ApplyForCreditService';
import { errorAlert, retryAlert, successToast } from '../../helper/ToastHelper';
import FullScreenLoader from '../../component/FullScreenLoader';
import { connect } from 'react-redux';
import RupifiServices from '../../services/RupifiServices';
import CustomHeader from '../../component/CustomHeader';
import CreditTermConditionView from '../../component/CreditTermConditionView';
import WebViewModal from '../../component/WebViewModal';
import RupifiApplicationStatusModal from '../../component/RupifiApplicationStatusModal';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader'
const test_num = "7602144797"

class ApplyForCreditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit_agencies: [],
      showLoader: false,
      // isOpenModal: false,
      credit_agency_details: null,
      user_mobile: '',
      user_id: '',
      showTermModal: false,
      rupifi_account_status: '',
      rupifi_activation_url: "",
      showWebView: false,
      showStatusModal: false,
      // rupifi_application_status: ''
    };
  }

  static getDerivedStateFromProps(props, state) {

    return {
      credit_agencies: (props.credit_agencies) ? props.credit_agencies : [],
      user_mobile: props.hasOwnProperty("user_number") ? props.user_number : '',
      user_id: props.hasOwnProperty("user_id") ? props.user_id : '',
      rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : ''
    }
  }

  renderItem = ({ item, index }) => {
    const status = this.state.rupifi_account_status
    const statusBgColor = status == rupifi_status.ACTIVE ? styles.yellowBG :
      status == rupifi_status.REJECTED ? styles.redBG :
        status == rupifi_status.INCOMPLETE ? styles.blueBG :
          status == rupifi_status.UNDER_REVIEW ? styles.greenBG :
            styles.darkGreyBG

    return (
      <View style={[styles.row, styles.card]}>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <View style={styles.cardImageView}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="contain" />
          </View>
          <Text style={styles.cardText}>{item.credit_partner}</Text>
        </View>
        <View style={[styles.row, { alignItems: 'center' }]}>
          {/* {
            (status) ?
              <View style={[styles.statusView, statusBgColor]}>
                <Text style={styles.statusText} >{status}</Text>
              </View>
              :
              null
          } */}

          <Checkbox isChecked={item.isChecked} onPressCheckBox={() => this.onChooseCreditPartner(item, index)} />
        </View>
      </View>
    )
  }

  onChooseCreditPartner(item, index) {
    const credit_agencies = this.state.credit_agencies
    credit_agencies.map((item, index) => {
      item.isChecked = false
    })
    credit_agencies[index].isChecked = !credit_agencies[index].isChecked

    this.setState({ credit_agency_details: item, showTermModal: true })
  }

  onCloseTermModal = () => {
    const credit_agencies = this.state.credit_agencies
    credit_agencies.map((item, index) => {
      item.isChecked = false
    })
    this.setState({ showTermModal: false })
  }

  gmvShare = () => {
    const param = {
      retailer_id: this.state.user_id
    }
    RupifiServices._gmvService(param).then(response => {
    }, error => {
    })
  }

  applyForCredit = async () => {

    const credit_agency_details = this.state.credit_agency_details

    this.setState({ showTermModal: false, showLoader: true })

    if (credit_agency_details.credit_partner == "Rupifi") {

      const param = {
        merchant_customer_id: this.state.user_mobile,
        phone: this.state.user_mobile,
        retailer_id: this.state.user_id
      }

      RupifiServices._checkCustomerEligibility(param).then(response => {
        this.gmvShare()
        if (response.application_status === rupifi_status.PRE_APPROVED) {
          Alert.alert("Welcome", response.message, [
            {
              text: "Cancel"
            },
            {
              text: "Go to Link",
              onPress: () => {
                this.setState({
                  showWebView: true,
                  rupifi_activation_url: response.activation_url
                })
              }
            }
          ])
        } else if (response.application_status === rupifi_status.INCOMPLETE) {
          Alert.alert("Welcome", response.message, [
            {
              text: "Cancel"
            },
            {
              text: "Go to Link",
              onPress: () => {
                this.setState({
                  showWebView: true,
                  rupifi_activation_url: response.activation_url
                })
              }
            }
          ])
        }
        else {
          // alert(JSON.stringify(response))
          // successToast("Process", response.message)
          this.setState({
            showStatusModal: true,
          })
        }
        this.setState({ showLoader: false })

      }, error => {
        if (error.message == "server_error") {
          retryAlert(() => this.applyForCredit())
        } else {
          errorAlert("Error", JSON.stringify(error.message))
        }
        this.setState({ showLoader: false })
      })
    }

  }

  async checkCustomerAccountStatus(status = false) {

    const param = {
      merchant_customer_id: this.state.user_mobile,
      phone: this.state.user_mobile,
      retailer_id: this.state.user_id
    }
    this.setState({ showLoader: true })
    await RupifiServices._getCustomerApplicationStatus(param).then(response => {
      this.setState({ showLoader: false })
      if (status && response != rupifi_status.PRE_APPROVED) {
        this.setState({
          showStatusModal: true,
        })
      }
    }, error => {
      if (error.message == "server_error") {
        retryAlert(() => this.checkCustomerAccountStatus())
      } else {
        errorAlert("Error", JSON.stringify(error.message))
      }
      this.setState({ showLoader: false })
    })
  }

  async getCreditAgencies() {
    this.setState({ showLoader: true })
    await ApplyForCreditService._getCreditAgenciesService().then(response => {

      this.setState({ showLoader: false })
    }, error => {
      this.setState({ showLoader: false })
      if (error.message == "server_error") {
        retryAlert(() => this.getCreditAgencies())
      } else {
        errorAlert("Error", error.message)
      }
    })
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getCreditAgencies()
        // this.checkCustomerAccountStatus()
      })
  }
  componentWillUnmount() {
    this.willFocusSubscription()
    this.backHandler.remove()
  }

  backAction = () => {
    this.setState({
      showTermModal: false,
      showStatusModal: false
    })
    setScreenActivity({ action_type: "going_back", action_id: '' })
    if (!this.props.navigation.canGoBack()) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    } else {
      this.props.navigation.goBack();
    }
    return true
  };

  render() {

    return (
      <View style={styles.container}>
        {/* <CustomHeader
          heading="Apply For Credit"
          headingStyle={{
            textAlign: "center"
          }}
          onPressBack={this.backAction}
          showBackButton={true}
        /> */}
        <AppHeader
          showBackBtn
          showSearch
          showWishList
          showLogo
          navigation={this.props.navigation}
        />
        <View style={styles.content}>
          <View style={styles.subHeaderView}>
            <Text style={[styles.heading, { paddingLeft: setWidth(6) }]}>Choose Your Credit Partner</Text>
            {
              (this.state.credit_agencies.length > 1) &&
              <View style={[styles.row, { alignItems: 'center', paddingLeft: setWidth(6) }]}>
                <Entypo name='dot-single' size={setWidth(4)} color={colors.red} />
                <Text style={styles.subHeading}> You can apply credit with ONLY One Agency</Text>
              </View>
            }
            <View style={[styles.row, styles.mr_t_1, { alignItems: 'center', paddingLeft: setWidth(6) }]}>
              <Entypo name='dot-single' size={setWidth(4)} color={colors.red} />
              <Text style={styles.subHeading}> Credit Limit is decided by the Credit Agency Only</Text>
            </View>
          </View>

          <FlatList
            data={this.state.credit_agencies}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ marginTop: setHeight(2) }} />}
            style={{
              marginTop: setHeight(5),
              marginHorizontal: setWidth(3)
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: setHeight(5)
            }}
          />
        </View>
        {
          this.state.showTermModal &&
          <CreditTermConditionView
            credit_agency_details={this.state.credit_agency_details}
            onPressApply={this.applyForCredit}
            onCloseModal={this.onCloseTermModal}
          />
        }
        {
          this.state.showWebView &&
          <WebViewModal
            url={this.state.rupifi_activation_url}
            onClose={(status) => {
              this.setState({ showWebView: false })
              this.checkCustomerAccountStatus(status)
            }}
          />
        }
        {
          this.state.showStatusModal &&
          <RupifiApplicationStatusModal
            fromScreen="ApplyForCredit"
            rupifi_account_status={this.state.rupifi_account_status}
            onCloseModal={() => {
              this.setState({ showStatusModal: false })
              this.props.navigation.navigate("Home")
            }}
          />
        }
        {
          this.state.showLoader &&
          <FullScreenLoader />
        }
      </View>
    );
  }
}

const mapStateToProps = state => {

  return {
    credit_agencies: state.applyForCreditReducer.credit_agencies,
    user_number: state.loginReducer.data.phone,
    user_id: state.loginReducer.data.cust_manu_id,
    rupifi_account_status: state.applyForCreditReducer.rupifi_account_status
  }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ApplyForCreditScreen)
