import React,{Component} from 'react'

export default class Login extends Component{
    state={
        username:"13333333333",
        password:'123456'
    }
    render(){
        let {username,password} = this.state
        return (
            <div>
                用户名：<input type="test" name="username" value={username} onChange={(e)=>{this.handleChange(e)}}/>
                密码：<input type="password" name="password" value={password}  onChange={(e)=>{this.handleChange(e)}} />
                <button onClick={this.goLogin}>登陆</button>

            </div>
        )
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    goLogin=()=>{
        let data = JSON.stringify({
            ...this.state
        })
        fetch('/login',{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            body:data
        })
        .then(res=>res.json())
        .then(res=>{

            this.props.history.push('/start?uid='+res.data.uid,{
                uid:res.data.uid,
                nickname: res.data.nickname,
                username: res.data.username,
            })
        })
    }
}