import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { styles } from './style';
import Pdf from 'react-native-pdf';
import CustomHeader from '../CustomHeader';
import colors from '../../utils/colors';
import { setWidth } from '../../utils/variable';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AppHeader from '../AppHeader';

export default class PDFViewerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    backAction = () => {
        this.props.onPressBack()
        return true;
    };

    render() {        
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading={this.props.heading}
                    headingStyle={{
                        textAlign: "center"
                    }}
                    onPressBack={() => this.props.onPressBack()}
                    containerStyle={{
                        borderBottomColor: colors.grey1,
                        borderBottomWidth: setWidth(0.3),
                    }}
                /> */}
                 <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <Pdf
                    trustAllCerts={false}
                    source={{ uri: this.props.url }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        //console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        //console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        //console.log(error);
                    }}
                    onPressLink={(uri) => {
                        //console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf} />

                <View style={styles.footerBtnView}>
                    <TouchableOpacity style={styles.footerBtn} onPress={() => this.props.onShare()}>
                        <EvilIcons name='share-google' size={setWidth(10)} color={colors.white} />                       
                            <Text style={styles.btnText}>SHARE</Text>                      
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
