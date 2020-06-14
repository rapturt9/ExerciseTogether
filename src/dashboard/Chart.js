import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
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

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

/*let data = [
  createData('Sun', 0),
  createData('Mon', 300),
  createData('Tue', 600),
  createData('Wed(1)', 800),
  createData('Wed(2)', 800),
  createData('Thurs', 1500),
  createData('Fri', 2000),
  createData('Sat', 2400),
];*/
let data = [];

const weekday = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'];

export default function Chart (props) {
  const userStatus = useUserStatus();

  const theme = useTheme();
  //const res = await API.graphql(graphqlOperation(getExerciseReal,{room: this.props.userStatus.attributes.email}));
  return (
    <Helper userStatus={userStatus}/>
  );
}

class Helper extends React.Component {
  state = {go: false}

  componentDidMount = async () => {
    if(this.props.userStatus){
      const res = await API.graphql(graphqlOperation(getExerciseReal,{room: this.props.userStatus.attributes.email}));
      if(res.data.getExerciseReal){
        const arr=res.data.getExerciseReal.query.split(',');
        console.log(arr);
        if(!this.state.go){
        for(let i=0;i<arr.length;i+=2){
          if(i>0){
            if(arr[i+1]===arr[i-1]){
              if(arr[i-2][0]==="("){
                data.push(createData(`${weekday[arr[i+1]]}(${Number(arr[i-2].substring(1,arr[i-2].length-1))+1})`,arr[i]/60000));
                arr[i]=`(${Number(arr[i-2].substring(1,arr[i-2].length-1))+1})`;
              } else {
                data.push(createData(`${weekday[arr[i+1]]}(2)`,arr[i]/60000));
                arr[i]="(2)";
              }
            } else {
              data.push(createData(weekday[arr[i+1]],arr[i]/60000));
            }
          } else {
            data.push(createData(weekday[arr[i+1]],arr[i]/60000));
          }
        }
        this.setState({go:true});
      }
        console.log(data);
      }
    }
    
  }
  componentDidUpdate = async () => {
    if(this.props.userStatus){
      const res = await API.graphql(graphqlOperation(getExerciseReal,{room: this.props.userStatus.attributes.email}));
      if(!this.state.go){
      if(res.data.getExerciseReal){
        const arr=res.data.getExerciseReal.query.split(',');
        console.log(arr);
        for(let i=0;i<arr.length;i+=2){
          if(i>0){
            if(arr[i+1]===arr[i-1]){
              if(arr[i-2][0]==="("){
                data.push(createData(`${weekday[arr[i+1]]}(${Number(arr[i-2].substring(1,arr[i-2].length-1))+1})`,arr[i]/60000));
                arr[i]=`(${Number(arr[i-2].substring(1,arr[i-2].length-1))+1})`;
              } else {
                data.push(createData(`${weekday[arr[i+1]]}(2)`,arr[i]/60000));
                arr[i]="(2)";
              }
            } else {
              data.push(createData(weekday[arr[i+1]],arr[i]/60000));
            }
          } else {
            data.push(createData(weekday[arr[i+1]],arr[i]/60000));
          }
        }
          this.setState({go:true});
      }
        console.log(data);
      }
    }
  }
  render = () => {
    if(this.state.go){
      console.log("rendering new");
        return (
          <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                  left: 24,
                }}
              >
                <XAxis dataKey="time" stroke={'#FC9C05'} />
                <YAxis stroke={'#FC9C05'}>
                  <Label
                    angle={270}
                    position="left"
                    style={{ textAnchor: 'middle', fill: '#FC9C05' }}
                  >
                    Minutes
                  </Label>
                </YAxis>
                <Line type="monotone" dataKey="amount" stroke={'#FC9C05'} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </React.Fragment>
        );
              } else {
                return <h3>Loading</h3>;
              }
  }
}
