import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import ShotChart from './ShotChart';
import DataViewContainer from "./DataViewContainer";

// class Main 方便样式设计
class Main extends Component {
    constructor(){
        super();
        this.state = {
            playInfo: {},
            playerId: 201939,
        }
    }

    // 父传子 props main传profile,而不必要app传profile
    componentDidMount(){ // get data from server
        //把nba给到全局
        window.nba = nba;
        // 连接 nba-client playerinfo function 数据
        nba.stats.playerInfo({ PlayerID: this.state.playerId})
            .then((info) => {
console.log(info);
// data 整合 es6 Object api: assign method

                const playerInfo = Object.assign({}, info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log("final player info", playerInfo);
                this.setState({ playInfo: playerInfo });
            })
            .catch((e) => {
                console.log(e);
            });
    }
    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playInfo}/>

                <DataViewContainer playerId={this.state.playerId}/>

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
