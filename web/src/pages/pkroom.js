import React, { Component } from 'react'
import socket from '../socket'
export default class pkroom extends Component {
    state = {
        pk:"",
        q:[]
    }
    sendAnswer=()=>{
        socket.emit('set score',{
            uid:this.props.location.state.uid, score:Math.floor(Math.random()*80), qid:'123'
        },function(res){
            // console.log(res)
        })
    }
  render() {
      let {q } = this.state
    return (
      <div>
        <div>
            <span>我</span> VS <span>{}</span>
        </div>
        <div>
            <ul>
            {
                q.map(item=><li key={item.qid}>{item.title}</li>)
            }
            </ul>
            <button onClick={this.sendAnswer}>发送答案</button>
        </div>
      </div>
    )
  }
  componentDidMount(){
      let state = this.props.location.state
      let {pkuid,pknickname,uid} = state

        this.setState({
            pk:pknickname
        })
        socket.emit('get question',{uid:pkuid},data=>{
            console.log(data)
            this.setState({
                q:data
            })
        })
        socket.on('pk score',data=>{
            console.log('对手的答题结果：',data)
        })

        
  }
}
