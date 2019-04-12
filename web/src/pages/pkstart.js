import React, { Component } from 'react'
import socket from '../socket'
export default class pkstart extends Component {
  state = {
    nickname: "我",
    username: "",
    countTime: 5,
    pkusername: "",
  }
  timer = null
  render() {
    let { nickname, countTime, pkusername } = this.state
    return (
      <div>
        <h3>{countTime}秒后开始 </h3>
        <div>
          <span>{nickname}</span>
          <span>开始匹配...对手</span>
          <span>{pkusername}</span>
        </div>
      </div>
    )
  }
  componentDidMount() {
    socket.on('pkinfo', data => {
      console.log(data)
      this.setState({
        pkusername: data.nickname
      })

      this.timer = setInterval(() => {
        if (this.state.countTime <= 1) {
          clearInterval(this.timer);
          setTimeout(() => {
            this.props.history.push('/pkroom', {
              pknickname: data.nickname,
              pkuid: data.uid,
              uid: this.props.location.state.uid
            })
          }, 500)
        }
        this.setState({
          countTime: this.state.countTime -= 1
        })
      }, 1000)
    })
  }
}
