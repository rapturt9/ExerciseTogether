import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import useUserStatus from "../useUserStatus.js";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {getExerciseReal, listExerciseReals} from '../graphql/queries';
import {updateExerciseReal, deleteExerciseReal, createExerciseReal} from '../graphql/mutations';
import {onUpdateExerciseReal, onDeleteExerciseReal, onCreateExerciseReal} from '../graphql/subscriptions';


import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsmobile from '../aws-exports';

Amplify.configure({
  aws_appsync_graphqlEndpoint: 'https://yavt45ttpnfdvgavqppk6m4lka.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-ml4uyaklvnhjbagwgmqopbqgay'
});

const ms = require('pretty-ms');
//const email = userStatus.attributes.email;


class Timer extends React.Component {
  state = {
      time: 0,
      isOn: false,
      start: 0,
      red: false
    }
  
  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 2);
  }
  stopTimer = () => {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }
  resetTimer = () => {
    this.setState({time: 0, isOn: false})
  }
  render = () => {
    let start = (this.state.time == 0) ?
      <Button variant="contained" style={{backgroundColor: "#F0CF9E"}} onClick={this.startTimer}>Start Workout</Button> :
      null
    let stop = (this.state.time == 0 || !this.state.isOn) ?
      null :
      <Button variant="contained" style={{backgroundColor: "#F0CF9E"}} onClick={this.stopTimer}>Pause</Button>
    let resume = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button variant="contained" style={{backgroundColor: "#F0CF9E"}} onClick={this.startTimer}>Resume</Button>
    let reset = (this.state.time == 0 || this.state.isOn) ?
      null :
      <Button variant="contained" style={{backgroundColor: "#F0CF9E"}} onClick={this.resetTimer}>End Workout</Button>
    let dash = <Button variant="contained" onClick={() => {
        this.setState({red: true})
    }} style={{backgroundColor: "#BCBCBC"}}>Dashboard</Button>
    if(this.state.red){
        console.log(this.state.time);
        return (<Helper time={this.state.time}/>);
    }
    return(
        <Grid container spacing={3} style={{marginTop:"1em"}}>
            <Grid item xs={3}><Button variant="contained" disabled>Timer: {ms(this.state.time)}</Button></Grid>
            <Grid item xs={3}>{start || stop || reset}</Grid>
            <Grid item xs={3}>{resume}</Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>{dash}</Grid>
        </Grid>
    )
  }
}

const Helper = props => {
    const userStatus = useUserStatus();
    console.log(userStatus);
    let d=new Date();
    const day = d.getDay();
    console.log(`${props.time},${day}`);

    
    return <Helper2 userStatus={userStatus} str={`${props.time},${day}`}/>;
}

class Helper2 extends React.Component {
    state={red:false}
    componentDidMount = async () => {
        console.log(this.props.userStatus);
        if(this.props.userStatus){
            console.log("go");
            const res = await API.graphql(graphqlOperation(getExerciseReal,{room: this.props.userStatus.attributes.email}));
                
            console.log(res.data);
            if(!res.data.getExerciseReal){
                const newExercise = await API.graphql(graphqlOperation(createExerciseReal, {input: {
                    room: this.props.userStatus.attributes.email,
                    query: this.props.str,
                    video: "",
                    submit: 0
                }}));
                console.log(newExercise);
                this.setState({red: true});
            } else {
                const newExercise = await API.graphql(graphqlOperation(createExerciseReal, {input: {
                    room: this.props.userStatus.attributes.email,
                    query: `${res.data.getExerciseReal.query},${this.props.str}`,
                    video: "",
                    submit: 0
                }}));
                console.log(newExercise);
                this.setState({red: true});
            }
            console.log(res.data.getExerciseReal.query);
          //console.log(this.props.userStatus.attributes.email);

        } else {
            console.log("no");
        }
    }
    componentDidUpdate = async () => {
        console.log(this.props.userStatus);
        if(this.props.userStatus){
            console.log("go");
            const res = await API.graphql(graphqlOperation(getExerciseReal,{room: this.props.userStatus.attributes.email}));
                
            console.log(res.data);
            if(!res.data.getExerciseReal){
                const newExercise = await API.graphql(graphqlOperation(createExerciseReal, {input: {
                    room: this.props.userStatus.attributes.email,
                    query: this.props.str,
                    video: "",
                    submit: 0
                }}));
                console.log(newExercise);
                this.setState({red: true});
            } else {
                const newExercise = await API.graphql(graphqlOperation(updateExerciseReal, {input: {
                    room: this.props.userStatus.attributes.email,
                    query: `${res.data.getExerciseReal.query},${this.props.str}`,
                    video: "",
                    submit: 0
                }}));
                console.log(newExercise);
                this.setState({red: true});
            }
          //console.log(this.props.userStatus.attributes.email);

        } else {
            console.log("no");
        }
    }
    render = () => {
        if(this.state.red){
            return <Redirect push to="/dashboard"/>;
        }
        return <div></div>;
    }
}


export default Timer;