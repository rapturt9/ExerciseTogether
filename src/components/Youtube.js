import React, { Component } from "react";
import axios from "axios";
import {getExerciseReal, listExerciseReals} from '../graphql/queries';
import {updateExerciseReal, deleteExerciseReal, createExerciseReal} from '../graphql/mutations';
import {onUpdateExerciseReal, onDeleteExerciseReal, onCreateExerciseReal} from '../graphql/subscriptions';
import Amplify, { API, graphqlOperation } from "aws-amplify";


import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsmobile from '../aws-exports';

Amplify.configure({
  aws_appsync_graphqlEndpoint: 'https://yavt45ttpnfdvgavqppk6m4lka.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-ml4uyaklvnhjbagwgmqopbqgay'
});

const client = new AWSAppSyncClient({
  url: 'https://yavt45ttpnfdvgavqppk6m4lka.appsync-api.us-east-1.amazonaws.com/graphql',
  region: 'us-east-1',
  auth: {
    type: 'API_KEY',
    apiKey: 'da2-ml4uyaklvnhjbagwgmqopbqgay',
  }
});

const KEY = "AIzaSyCjteHYWKKH5X-5WwQ_4ropIYWXfzC5b5I";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div onClick={() => onVideoSelect(video)} className="video-item item">
      <img
        alt={video.snippet.title}
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

const VideoList = ({ videos, onVideoSelect }) => {
  const renderedList = videos.map((video) => {
    return (
      <VideoItem
        key={video.id.videoId}
        onVideoSelect={onVideoSelect}
        video={video}
      />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

class SearchBar extends React.Component {
  state = { term: ""};

  onInputChange = async (event) => {
    //this.setState({ term: event.target.value });
    console.log(this.props.channel);
    const newExercise = await API.graphql(graphqlOperation(updateExerciseReal, {input: {
      room: this.props.channel,
      query: event.target.value
    }}));
    console.log(newExercise);
  };

  componentDidUpdate = () => {
    if(this.state.term!==this.props.val){
      this.setState({term: this.props.val});
    }
  }

  onFormSubmit = (event) => {
    console.log(this.state.term);
    event.preventDefault();
    this.props.onFormSubmit(this.state.term);
    // TODO: call callback from parent
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default class Youtube extends React.Component {
  state = { videos: [], selectedVideo: null, val: "", submit: 0};

  componentDidMount = () => {
    this.getExercise(this.props.channel);
    API.graphql(
      graphqlOperation(onUpdateExerciseReal, {
          room: this.props.channel
      })
    ).subscribe({
      next: async (exerciseRealData) => {
        console.log(exerciseRealData);
        console.log(this.getExercise(this.props.channel));
        if(exerciseRealData.value.data.onUpdateExerciseReal.submit===1){
          console.log("go!");
          this.setState({submit:0});
          const response = await youtube.get("/search", {
            params: {
              part: "snippet",
              type: "video",
              maxResults: 3,
              key: KEY,
              q: this.state.val,
            },
          });
          //new post for submit 0
          await API.graphql(graphqlOperation(updateExerciseReal, {input: {
            room: this.props.channel,
            submit: 0
          }}));
          console.log(response.data.items[0]);
          this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
          });
        }
        let vid=exerciseRealData.value.data.onUpdateExerciseReal.video;
        console.log(vid);
        if(vid){
          this.setState({
            selectedVideo: JSON.parse(vid)
          });
        }
        //this.setState({val: this.getExercise})
        },
      error: (exerciseRealData) => console.log(exerciseRealData)
    });
  }

  componentDidUpdate = async () => {
    
  }

  getAllExercises = async (param) => {
    const res = await API.graphql(graphqlOperation(listExerciseReals));
    console.log(res);
  }

  getExercise = async (param) => {
    const res = await API.graphql(graphqlOperation(getExerciseReal,{room: param}));
    if(!res.data.getExerciseReal){
      const newExercise = await API.graphql(graphqlOperation(createExerciseReal, {input: {
        room: param,
        query: "",
        video: "",
        submit: 0
      }}));
      console.log(newExercise);
    } else {
      this.setState({val: res.data.getExerciseReal.query})
      console.log(res.data.getExerciseReal.query);
    }
  }

  onTermSubmit = async (term) => {
    //use term, selected video to determine state

    await API.graphql(graphqlOperation(updateExerciseReal, {input: {
      room: this.props.channel,
      submit: 1
    }}));

    console.log(this.state);
  };

  onVideoSelect = async (video) => {
    console.log(JSON.stringify(video));
    const newExercise = await API.graphql(graphqlOperation(updateExerciseReal, {input: {
      room: this.props.channel,
      video: JSON.stringify(video)
    }}));
    //this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} 
        channel={this.props.channel}
        val={this.state.val}
        />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
