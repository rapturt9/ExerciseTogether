import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

export default class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      submit: false
    };
  }
  onChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = e => {
    this.setState({submit:true});

  };
  /*<div>
        <form onSubmit={this.onSubmit}>
          <label>Channel Name</label>
          <input
            placeholder="Channel Name"
            name="channel"
            value={this.state.channel}
            onChange={this.onChange}
          />
          <input type="submit" value="Join Channel" />
        </form>
      </div>*/
  render() {
    if(this.state.submit){
        return <Redirect to={"/video/"+this.state.channel}/>;
    }
    return (
      <div id="cover">
  <form method="get" action="" onSubmit={this.onSubmit} class="meform">
    <div class="tb">
      <div class="td">
        <input type="text" 
      placeholder="Channel Name" 
      required
            name="channel"
            value={this.state.channel}
            onChange={this.onChange} class="meinput"/>
  
            </div>
      <div class="td" id="s-cover">
        <button type="submit" class="mebutton">
          <div id="s-circle"></div>
          <span class="mespan"></span>
        </button>
      </div>
    </div>
  </form>
</div>
      
    );
  }
}