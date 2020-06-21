import nba from 'nba';
// npm install 'nba' library
// service file to get nba statistics
const SERVER_URL = 'https://nba.laiprojects.com';
//server 访问address

// export向外暴露API接口，调用nba statics, nba提供给的所有统计数据。
export default { // export object as a whole
    // default 直接可以引入
    ...nba, //nba库里所有接口解构到这里
    // all APIs from nba library
    //nba 统计statistics的接口, key value (object) pair
    stats: {
        ...nba.stats, // github CROS issue, usually we use server to fetch data instead of directly using browser to fetch data
        //special api, player info
        // 自命名 playerInfo
        // `${}`  Template String
        // It’s used for constructing strings
        // Strings are enclosed within backticks
        // Backticks allow us to embed any expression into the string, by wrapping it in ${…}
        playerInfo: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}`).then(res => res.json())
        },
        //Backticks allow us to embed any expression into the string, by wrapping it in ${…}
        //fetch .then .then promise. es6 异步
        shots: function({ PlayerID }) {
            return fetch(`${SERVER_URL}/players/${PlayerID}/shots`).then(res => res.json())
        },
    },

};