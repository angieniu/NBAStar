import React, {Component} from 'react';
import Profile from './Profile';
import nba from '../nba-client';
import ShotChart from './ShotChart';

class Main extends Component {
    constructor(){
        super();
        this.state = {
            playInfo: {},
            playerId: 201939,
        }
    }

    componentDidMount(){
        window.nba = nba;
        nba.stats.playerInfo({ PlayerID: this.state.playerId})
            .then((info) => {
console.log(info);
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

            </div>
        );
    }
}

export default Main;


// var obj = { a:1, b :2}
// const {a} = obj
//
// const returnedTarget = Object.assign({ a: 1, b: 2 }, { b: 4, c: 5 });
