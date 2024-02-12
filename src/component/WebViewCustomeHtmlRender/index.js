import { Text, View } from 'react-native'
import React, { Component } from 'react'
import WebView from 'react-native-webview';
import colors from '../../utils/colors';

export default class WebViewCustomeHtmlRender extends Component {
  constructor(props){
    super(props)
    this.state = {
      containerStyle: {},
      htmlbody: ''
    }
  }

  static getDerivedStateFromProps(props, state){
    return{
      containerStyle: props.containerStyle ? props.containerStyle : {},
      htmlbody: props.htmlbody ? props.htmlbody : ""
    }
  }

  render() {
    return (
      <View style={[this.state.containerStyle]}>
        <WebView
          style={{ flex: 1 }}          
          useWebKit
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction
          javaScriptEnabled
          scrollEnabled={true}
          source={{
            html: `
          <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Page Builder</title>                  
              </head>
              <body style="background: ${colors.grey6};">${this.state.htmlbody}</body>
              </html>
          `}}
        />
      </View>
    )
  }
}