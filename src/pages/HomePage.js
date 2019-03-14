import React, { Component } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
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

    this.onChengeDuration = this.onChengeDuration.bind(this);
    this.onChengePause = this.onChengePause.bind(this);
    this.onChengeRepetition = this.onChengeRepetition.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetRange = this.resetRange.bind(this);
  }

  onChengeDuration(value) {
    this.setState({ activityDuration: value });
  }

  onChengePause(value) {
    this.setState({ pauseDuration: value });
  }

  onChengeRepetition(value) {
    this.setState({ totalRepetition: value });
  }

  startTimer() {
    this.$f7router.navigate('/timer/', {
      props: {
        activityDuration: this.state.activityDuration * 60000,
        pauseDuration: this.state.pauseDuration * 60000,
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
        {/* Top Navbar */}
        <Navbar>
          <NavTitle>Pomodoro App</NavTitle>
        </Navbar>

        {/* Page content */}
        <BlockTitle className="display-flex justify-content-space-between">
          Activity duration
          <span>{this.state.activityDuration} minutes</span>
        </BlockTitle>
        <Block strong>
          <Range
            min={5}
            max={90}
            step={5}
            value={this.state.activityDuration}
            onRangeChange={this.onChengeDuration}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <BlockTitle className="display-flex justify-content-space-between">
          Pause duration
          <span>{this.state.pauseDuration} minutes</span>
        </BlockTitle>
        <Block strong>
          <Range
            min={1}
            max={30}
            step={5}
            value={this.state.pauseDuration}
            onRangeChange={this.onChengePause}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <BlockTitle className="display-flex justify-content-space-between">
          Repetition
          <span>{this.state.totalRepetition}</span>
        </BlockTitle>
        <Block strong>
          <Range
            min={1}
            max={10}
            step={1}
            value={this.state.totalRepetition}
            onRangeChange={this.onChengeRepetition}
          />
          <p>
            Lorem ipsum dolor sit amet
          </p>
        </Block>

        <Block>
          <Row tag="p">
            <Col tag="span">
              <Button large fill raised onClick={this.startTimer}>Start</Button>
            </Col>
            <Col tag="span">
              <Button large fill raised onClick={this.resetRange}>Reset</Button>
            </Col>
          </Row>
        </Block>
      </Page>
    );
  }
}

export default HomePage;
