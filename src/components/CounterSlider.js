import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

class CounterSlider extends React.Component {
    // component private attribute
    state = {
        inputValue: this.props.value
    }

    //onChange function
    onChange = (value) => {
        // change value to type of number data
        const cleanValue = Number(value) ? value: this.state.inputValue;
        console.log(value);
        this.setState({
            inputValue: cleanValue,
        });
        // 子传父 data
        this.props.onCounterSliderChange(cleanValue);
    }

//UI  virtual dom slider line 24
    render() {
        // 结构
        const {inputValue} = this.state;
        return (
            <Row>
                <Col span={12}>

                    <Slider min={1} max={20} onChange={this.onChange} value={inputValue} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={20}
                        style={{ marginLeft: 16 }}
                        value={inputValue}
                        //value={this.state.inputValue} 如果用了很多this.state最好像line24一样结构，否则.state消耗性能很多
                        onChange={this.onChange}
                        // filter控制ShotChart.js里面的shotRenderThreshold, 短时间内实时传大量触发，api调用频繁，为了避免，用debounce function in lodash.
                    />
                </Col>
            </Row>
        );
    }
}

export default CounterSlider;