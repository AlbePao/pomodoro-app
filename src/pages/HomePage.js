import React, { Component } from 'react';
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Range,
  Row,
  Col,
  Button
} from 'framework7-react';

const defaultState = {
  activityDuration: 25,
  pauseDuration: 5,
  totalRepetition: 4,
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  onChangeDuration(value) {
    this.setState({ activityDuration: value });
  }

  onChangePause(value) {
    this.setState({ pauseDuration: value });
  }

  onChangeRepetition(value) {
    this.setState({ totalRepetition: value });
  }

  pluralize(value) {
    return value > 1 ? 's' : '';
  }

  startTimer() {
    this.$f7router.navigate('/timer/', {
      props: {
        activityDuration: this.state.activityDuration * 60010,
        pauseDuration: this.state.pauseDuration * 60010,
        totalRepetition: this.state.totalRepetition,
      },
    });
  }

  resetRange() {
    this.setState(defaultState);
  }

  render() {
    return (
      <Page name="home">
        <Navbar title="Pomodoro App" />

        <BlockTitle className="display-flex justify-content-space-between">
          Activity duration
          <span>
            {this.state.activityDuration} minute{this.pluralize(this.state.activityDuration)}
          </span>
        </BlockTitle>
        <Block strong>
          <Range
            min={1}
            max={90}
            step={5}
            value={this.state.activityDuration}
            onRangeChange={this.onChangeDuration.bind(this)}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <BlockTitle className="display-flex justify-content-space-between">
          Pause duration
          <span>
            {this.state.pauseDuration} minute{this.pluralize(this.state.pauseDuration)}
          </span>
        </BlockTitle>
        <Block strong>
          <Range
            min={1}
            max={30}
            step={5}
            value={this.state.pauseDuration}
            onRangeChange={this.onChangePause.bind(this)}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <BlockTitle className="display-flex justify-content-space-between">
          Repetition
          <span>
            {this.state.totalRepetition} time{this.pluralize(this.state.totalRepetition)}
          </span>
        </BlockTitle>
        <Block strong>
          <Range
            min={1}
            max={10}
            step={1}
            value={this.state.totalRepetition}
            onRangeChange={this.onChangeRepetition.bind(this)}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <Block>
          <Row tag="p">
            <Col tag="span">
              <Button large fill raised onClick={this.startTimer.bind(this)} text="Start" />
            </Col>
            <Col tag="span">
              <Button large fill raised onClick={this.resetRange.bind(this)} text="Reset" />
            </Col>
          </Row>
        </Block>
      </Page>
    );
  }
}

export default HomePage;
