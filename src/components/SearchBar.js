import React, {Component} from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from '../nba-client';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

/*
                  App (root component, only as application entrance, not data transfer; multi layer data passing)
                /      \                             \  X
            Top         Main (data fetch, parent)   searchbar
                          /    \        \ √
                     Profile   Dataview searchbar
                               /     \
                           shotchart filter
 */

/*
实时受控
searchBar: 分析功能结构, ui组成部分，再写
1. keyword input
2. show filtered data
3.  select data

3 features:
1. key word
2. generate option list
3. select entry

ui:
1. input
2. option list -> item: img + player name (span or p)
3. Event: 1) select 2) 略 press enter 3) 略 光标移出input
 */

const Option = AutoComplete.Option;
// const {Option} = AutoComplete;

class SearchBar extends Component {
    state = {
        dataSource: [], //数据list作为autocomplete的state
    }

    handleSearch = (value) => {
        const players = nba.searchPlayers(value);
        console.log(players);

        this.setState({
            dataSource: !value ?
                [] : nba.searchPlayers(value).map(player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    }

    onSelect = (name) => {
        this.props.handleSelectPlayer(name);
    }

    render() {
        const { dataSource } = this.state; // 解构 用左边的
        console.log(dataSource);//检验
        const options = dataSource.map((player) => ( // 如果用{}需要{return}//key 为了保证div算法
            <Option key={player.fullName} value={player.fullName} className="player-option">

                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} alt={player.fullName}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));
        /* 如何知道dataSoruce是否设置成功：
        [法1] render const { dataSource } = this.state; 打印dataSource console.log(dataSource);
        [法2] this.setState设置 另一种写法  this.setState((prev) => {样式设置}, ()=> console.log(this.state))
         */
        return (
            <AutoComplete
                className="search-bar"
                dataSource={options}
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                size="large"
                optionLabelProp="value" //对应生成render里面的option的key value的value，类型匹配。
            >

                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}
export default SearchBar;
// autocomplete is component.
// onSearch is autocomplete's 接口
// handleSearch: 我们自己功能实现