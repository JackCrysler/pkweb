import React, { Component } from 'react'
import socket from '../socket'
export default class pkstart extends Component {
    state={
        nickname:"我",
        username:"",
        countTime:3,
        pkusername:"",
    }
    timer=null
  render() {
      let {nickname,countTime,pkusername} = this.state
    return (
      <div>
        <h3>pkroom </h3>
        {countTime}
        <div>
        <span>{nickname}</span>
        开始匹配...对手
        <span>{pkusername}</span>
        </div>
      </div>
    )
  }
  componentDidMount(){
    socket.on('pkinfo',data=>{
      console.log(data)
      this.setState({
        pkusername:data.nickname
      })
      // let count =1
      // function step(){
      //   count+=1
      //   setTimeout(()=>{
      //     console.log(test)
      //     if(count>3){

      //     }else{
      //       step()
      //     }
      //   },1000)
      // }
      

      this.timer = setInterval(()=>{
        if(this.state.countTime<=1){
          clearInterval(this.timer);
          setTimeout(()=>{
            this.props.history.push('/pkroom',{
              pknickname: data.nickname,
              pkuid:data.uid,
              uid:this.props.location.state.uid
            })
          },500)
          
        }
        this.setState({
          countTime:this.state.countTime-=1
        })
      },1000)
      console.log(this.timer)
    })
  }
  componentWillUnmount(){
    console.log(this.timer)
    clearInterval(this.timer)
  }
}
