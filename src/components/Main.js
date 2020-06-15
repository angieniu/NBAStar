import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
// import ShotChart from './ShotChart';
import DataViewContainer from "./DataViewContainer";
import SearchBar from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

// class Main 方便样式设计
class Main extends Component {
    constructor(){
        super();
        this.state = {
            playerInfo: DEFAULT_PLAYER_INFO
        }
    }

    // 父传子 props main传profile,而不必要app传profile
    componentDidMount(){ // get data from server
        //把nba给到全局
        window.nba = nba;
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);

        // 连接 nba-client playerinfo function 数据

//         nba.stats.playerInfo({ PlayerID: this.state.playerId})
//             .then((info) => {
// console.log(info);
// // data 整合 es6 Object api: assign method
//
//                 const playerInfo = Object.assign({}, info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
//                 console.log("final player info", playerInfo);
//                 this.setState({ playInfo: playerInfo });
//             })
//             .catch((e) => {
//                 console.log(e);
//             });
    }

    //复用函数
    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId}).then((info) => {
            console.log(info);
            const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            console.log(playInfo);
            this.setState({ playerInfo: playInfo });
        })
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
    }


    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>

                <div className="player">
                    <Profile playerInfo={this.state.playerInfo} />
                    <DataViewContainer playerId={this.state.playerInfo.playerId}/>
                </div>


            </div>
        );
        // playerID passes to shotchart, dataviewcontainer, coz main as parent.
        // 由于playerInfo可能变化，所以把data存为main component的私有属性, setState, update profile componenet.
        //className ="main" for style
        //传值方式 key value pair: playerInfo={this.state.playInfo}
        // inspect components
    }
}

export default Main;


// var obj = { a:1, b :2}
// const {a} = obj
//
// const returnedTarget = Object.assign({ a: 1, b: 2 }, { b: 4, c: 5 });
