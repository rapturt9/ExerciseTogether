import React, { Component } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Youtube from './Youtube';
import Timer from './Timer';

let client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

const USER_ID = Math.floor(Math.random() * 1000000001);
const APP_ID = "657acfbcdf614b0dad3186eac8e99174";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function CenteredGrid(props) {
  const classes = useStyles();
    console.log("MYKEYS",props.arr);
  return (
    <div className={classes.root} style={{paddingLeft:"1em", paddingRight:"1em"}}>
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <Timer />
        </Grid>
        <Grid item xs={12}>
          <Youtube channel={props.channel}/>
        </Grid>

        <Grid item xs={4}>
          
            <div id="agora_local" style={{height:window.innerWidth/5}} />
          
        </Grid>
        {props.arr.map(streamId => {
          return (
            <Grid item xs={4} id={streamId} key={streamId}>
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{height:window.innerWidth/5}}
            />
        </Grid>
          );
        })}
      </Grid>
    </div>
  );
}


export default class Call extends Component {
  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false
  });

  state = {
    remoteStreams: {}
  };

  componentDidMount() {
    this.initLocalStream();
    this.initClient();
    if (this.props.channel !== "") {
        this.joinChannel();
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.channel !== this.props.channel && this.props.channel !== "") {
      this.joinChannel();
    }
  }

  initLocalStream = () => {
    let me = this;
    me.localStream.init(
      function() {
        console.log("getUserMedia successfully");
        me.localStream.play("agora_local");
      },
      function(err) {
        console.log("getUserMedia failed", err);
      }
    );
  };

  initClient = () => {
    client.init(
      APP_ID,
      function() {
        console.log("AgoraRTC client initialized");
      },
      function(err) {
        console.log("AgoraRTC client init failed", err);
      }
    );
    this.subscribeToClient();
  };

  subscribeToClient = () => {
    let me = this;
    client.on("stream-added", me.onStreamAdded);
    client.on("stream-subscribed", me.onRemoteClientAdded);

    client.on("stream-removed", me.onStreamRemoved);

    client.on("peer-leave", me.onPeerLeave);
  };

  onStreamAdded = evt => {
    let me = this;
    let stream = evt.stream;
    console.log("New stream added: " + stream.getId());
    console.log("keys ", Object.keys((me.state.remoteStreams)));
    let obj=me.state.remoteStreams;
    console.log("keys2 ",obj);
    if(!obj){
      obj={[stream.getId()]: stream}
    } else {
      obj[stream.getId()]=stream;
    }
    console.log("keys2 ",obj);
    me.setState(
      {
        remoteStreams: obj
      },
      () => {
        // Subscribe after new remoteStreams state set to make sure
        // new stream dom el has been rendered for agora.io sdk to pick up
        client.subscribe(stream, function(err) {
          console.log("Subscribe stream failed", err);
        });
      }
    );
    console.log("keys ", Object.keys((me.state.remoteStreams)));
  };

  joinChannel = () => {
    let me = this;

    client.join(
      null,
      me.props.channel,
      USER_ID,
      function(uid) {
        console.log("User " + uid + " join channel successfully");
        client.publish(me.localStream, function(err) {
          console.log("Publish local stream error: " + err);
        });

        client.on("stream-published", function(evt) {
          console.log("Publish local stream successfully");
        });
      },
      function(err) {
        console.log("Join channel failed", err);
      }
    );
  };

  onRemoteClientAdded = evt => {
    let me = this;
    let remoteStream = evt.stream;
    me.state.remoteStreams[remoteStream.getId()].play(
      "agora_remote " + remoteStream.getId()
    );
  };

  onStreamRemoved = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log("Remote stream is removed " + stream.getId());
    }
  };

  onPeerLeave = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log(evt.uid + " leaved from this channel");
    }
  };

  render() {
    return (
        <div>
          <CenteredGrid channel={this.props.channel} arr={Object.keys(this.state.remoteStreams).map(key => {
            let stream = this.state.remoteStreams[key];
            let streamId = stream.getId();
            console.log("!!!!!!!!!!!!!key",Object.keys(this.state.remoteStreams))
            return streamId;
              
          }
            )}/>
        </div>
      );
  }
}
/*return (
      <div>
        <CenteredGrid arr={Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key];
          let streamId = stream.getId();
          console.log("!!!!!!!!!!!!!key",Object.keys(this.state.remoteStreams))
          return streamId;
            
        }
          )}/>
      </div>
    );*/
/*const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function CenteredGrid(props) {
  const classes = useStyles();
    console.log("MYKEYS",props.arr);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>

        <Grid item xs={3}>
          
            <div id="agora_local" style={{height:"10em"}} />
          
        </Grid>
        {props.arr.map(streamId => {
          return (
            <Grid item xs={3}>
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{height:"10em"}}
            />
        </Grid>
          );
        })}
      </Grid>
    </div>
  );
}*/