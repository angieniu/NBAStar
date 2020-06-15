import React, {Component} from 'react';

import ShotChart from './ShotChart';
import CounterSlider from './CounterSlider';
import _ from 'lodash'; // _ all
import { Radio, Row, Col, Switch } from 'antd';

/*
data
parent
     App
     /    \
  header main
          /     \auto
        profile  shotchart
                   X \  filter回传值给shotchart，filter default value from main. 三级联动, 父子
                   filter

  sibling      preferred
       App
     /    \
  header main
          /     \
        profile  B (把投球数据放到共有的component里管理，再发到component中)
                /   \
       shotchart <-> filter
 */

class DataViewContainer extends Component {
    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    }
    onCounterSliderChange = (count) => {
        this.setState({ minCount: count });
    }
    // onChange function
    onChartTypeChange = (e) => {
        // e as event. radio value 存什么值，e.target.value就是取的什么值
        console.log(e.target.value);
        this.setState({ chartType: e.target.value });

    }

    onTooltipChange = (displayTooltip) => {
        console.log(displayTooltip);
        this.setState({ displayTooltip });
    }


    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={this.props.playerId}
                           minCount={this.state.minCount}
                           chartType={this.state.chartType}
                           displayTooltip={this.state.displayTooltip}


                />

                <div className="filters">

                    {this.state.chartType === 'hexbin' ?
                        <CounterSlider value={this.state.minCount}
                                       // 定义函数传给子，用于cb子传父data, 0.5seconds 才往上传,其它子的变化不管
                                       onCounterSliderChange={_.debounce(this.onCounterSliderChange, 500)}/> : null}

                    <br/>

                    <Row>
                        <Col span={9}>
                            <Radio.Group onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>

                        </Col>
                        <Col span={4}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                onChange={this.onTooltipChange}
                                defaultChecked />
                        </Col>
                    </Row>


                </div>
            </div>
            // {} no for and if inside. 三目运算
            // value 是component private state/ attribute, onChange setState.
            // no need new component. ant design grid for radio group
// span grid length, gutter row row space, offset row row space
            // radio value should be this.state.chartType, also should have setState to make radio buttons work
 // filter where to create the component and put it depends on the data communication.
        );
    }
}

export default DataViewContainer;