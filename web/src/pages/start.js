import React, { Component } from 'react'
import socket from '../socket'
export default class Start extends Component {
  render() {
    return (
      <div>
        <button onClick={this.startConnect}>开始匹配</button>
      </div>
    )
  }
  startConnect=()=>{
      socket.open()
      
      this.props.history.push('/pkstart',{
        uid:window.location.search.substring(1).split('=')[1]
      })
  }
  componentDidMount(){

  }
}
