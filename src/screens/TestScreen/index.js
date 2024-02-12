import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export default class TestScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          name: "abc"
        },
        {
          name: "bca"
        }
      ]
    }
    // console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("nextProps   ===> ", nextProps);
    console.log("nextState   ===> ", nextState);
    
    return true
  }


  addList = () => {
    const list = this.state.list
    let add_list = [
      ...list,
      {
        name: "xyz"
      }
    ]
    this.setState({list: add_list})
  }

  render() {
    console.log("render");
    return (
      <View>
        {
          this.state.list.map((item, index) =>
            <Text key={index}>{item.name}</Text>)
        }
        <TouchableOpacity onPress={this.addList} style={{ marginTop: 10, backgroundColor: 'pink' }}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    )
  }
}