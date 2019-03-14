import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Navbar,
  Block,
  Gauge,
  Row,
  Col,
  Button
} from 'framework7-react';
import Timer from 'tiny-timer';

class TimerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.activityDuration,
      repetitionElapsed: 0,
      inProgress: 'activity',
      isTimerStopped: false,
      buttonLabel: 'Pause',
      rangeLabel: 'to the end of activity',
      rangeValue: 1,
      rangeText: this.millisToMinutesAndSeconds(this.props.activityDuration),
    };

    this.timer = new Timer();
  }

  componentDidMount() {
    // TODO: disallow phone pause
    console.log('hi');
    this.startTimer();
  }

  componentWillUnmount() {
    // TODO: allow phone pause
    console.log('bye');
    this.timer.stop();
  }

  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return (
      seconds === 60 ? (
        (minutes < 10 ? '0' : '') + (minutes + 1) + ':00'
      ) : (
        (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      )
    );
  }

  startTimer() {
    console.log('timer started');
    this.timer.start(this.state.time);

    this.timer.on('tick', ms => {
      this.setState({
        rangeValue: (ms / (this.state.time)).toFixed(2),
        rangeText: this.millisToMinutesAndSeconds(ms),
      });
    });

    this.timer.on('done', () => {
      this.toggleActivity();
    });
  }

  toggleActivity() {
    // TODO: vibrate and beep

    if (this.state.inProgress === 'activity') {
      this.setState(prevState => ({
        time: this.props.pauseDuration,
        repetitionElapsed: ++prevState.repetitionElapsed,
        inProgress: 'pause',
        rangeLabel: 'to the end of pause',
      }));

      console.log('repetitionElapsed', this.state.repetitionElapsed);
      console.log('totalRepetition', this.props.totalRepetition);

      if (this.state.repetitionElapsed === this.props.totalRepetition) {
        // FIXME: timer wont stop
        this.timer.stop();

        this.$f7.dialog.alert('Activity completed!', () => {
          this.$f7router.back();
        });
      }
    } else {
      this.setState({
        time: this.props.activityDuration,
        inProgress: 'activity',
        rangeLabel: 'to the end of activity'
      });
    }

    this.timer.start(this.state.time);
  }

  toggleTimer() {
    if (!this.state.isTimerStopped) {
      this.timer.pause();
    } else {
      this.timer.resume();
    }

    this.setState(prevState => ({
      isTimerStopped: !prevState.isTimerStopped,
      buttonLabel: prevState.isTimerStopped ? 'Pause' : 'Resume',
    }));
  }

  quitTimer() {
    this.$f7.dialog.confirm('Are you sure you want to quit the activity?', () => {
      this.$f7router.back();
    });
  }

  render() {
    return (
      <Page>
        <Navbar title="Pomodoro App" />

        <Block strong className="text-align-center">
          {/* TODO: change borderColor according to activity/pause state and valueTextColor */}
          <Gauge
            type="semicircle"
            size={300}
            valueFontSize={60}
            labelText={this.state.rangeLabel}
            value={this.state.rangeValue}
            valueText={this.state.rangeText}
            valueTextColor="green"
            borderColor="blue"
          />
        </Block>

        <Block>
          <Row tag="p">
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.toggleTimer.bind(this)}
                text={this.state.buttonLabel}
              />
            </Col>
            <Col tag="span">
              <Button
                large
                fill
                raised
                onClick={this.quitTimer.bind(this)}
                text="Stop and quit"
              />
            </Col>
          </Row>
        </Block>
      </Page>
    );
  }
}

TimerPage.propTypes = {
  activityDuration: PropTypes.number.isRequired,
  pauseDuration: PropTypes.number.isRequired,
  totalRepetition: PropTypes.number.isRequired,
};

export default TimerPage;
