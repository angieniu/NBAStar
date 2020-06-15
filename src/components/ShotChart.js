import React, {Component} from 'react';
import nba from '../nba-client';
import * as d3 from 'd3';
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';
// props传来数据 类型校验 runtime type checking for React props and similar objects. 两种方法：1.MyComponent.propTypes 2.class ShotChar static propsTypes

window.d3_hexbin = {hexbin : hexbin};

class ShotChart extends Component {
    static propTypes = {
        playerId: PropTypes.number,
        minCount: PropTypes.number,
        chartType: PropTypes.string,
        displayTooltip: PropTypes.bool,
    }

    componentDidUpdate(){
        nba.stats.shots({
            // 传值到PlayerID
            PlayerID: this.props.playerId
            // receive return value (promise) through .then
        }).then((response) => {
            const final_shots = response.shot_Chart_Detail.map(shot => ({
                x: (shot.locX + 250) / 10,
                y: (shot.locY + 50) / 10,
                action_type: shot.actionType,
                shot_distance: shot.shotDistance,
                shot_made_flag: shot.shotMadeFlag,
            }));

// 1. lifecycle function didMount 访问dom, virtual dom. not in constructor, 作图in constructor too large. visit 2. fetch data: didMount

            const courtSelection = d3.select("#shot-chart");
            //清空
            courtSelection.html('');
            const chart_court = court().width(500);
            // filter
            // this.props.minCount component update stage, but componentDidMount is in mounting stage, so use didupdate.
            const chart_shots = shots().shotRenderThreshold(this.props.minCount).displayToolTips(this.props.displayTooltip).displayType(this.props.chartType);
            // dom + court
            courtSelection.call(chart_court);

            courtSelection.datum(final_shots).call(chart_shots);
        });
    }


    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}

export default ShotChart;