/* eslint-disable class-methods-use-this */
import React from 'react';
import Slider from '@material-ui/core/Slider';
import styles from './styles.css';
import Seat from './Seat';
import seatsArray from './seatsArray';

const stateArray = seatsArray.sort((a, b) => (
  (a.margin > b.margin) ? 1 : ((b.margin > a.margin) ? -1 : 0)
));

function valuetext(value) {
  return { value };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: stateArray,
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    const { seats } = this.state;
    const updatedSeats = seats;
    updatedSeats.forEach(
      (seat) => {
        seat.displayMargin = (parseFloat(seat.margin) + parseFloat(value)).toFixed(2);
        if (seat.displayMargin < 0) {
          seat.party = 'Labor';
        } else if (seat.displayMargin > 0) {
          seat.party = 'Liberal';
        } if (seat.displayMargin > 0 && (seat.name === 'Central Wheatbelt' || seat.name === 'Geraldton' || seat.name === 'Moore' || seat.name === 'North West Central' || seat.name === 'Roe' || seat.name === 'Warren-Blackwood')) {
          seat.party = 'Nationals';
        }
      },
    );
    this.setState({
      value: event.target.value,
      seats: updatedSeats,
    });
  }

  seatColour(seat) {
    const styleObject = {};
    if (seat.displayMargin < -6) {
      styleObject.backgroundColor = '#f53661';
    } else if (seat.displayMargin < 0) {
      styleObject.backgroundColor = '#fa84a0';
    } else if (seat.displayMargin < 6 && seat.party === 'Nationals') {
      styleObject.backgroundColor = '#76b083';
    } else if (seat.displayMargin < 6) {
      styleObject.backgroundColor = '#7f7fb5';
    } else if (seat.displayMargin >= 6 && seat.party === 'Nationals') {
      styleObject.backgroundColor = '#448754';
    } else if (seat.displayMargin >= 6) {
      styleObject.backgroundColor = '#4242a1';
    }
    return styleObject;
  }

  render() {
    const { seats, value } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Swing calculator for 2021 WA election</h1>
        <div className={styles.swingSliderContainer}>
          <div> Labor &#9756; </div>
          <div className={styles.swingSlider}>
            <Slider
              defaultValue={value}
              valueLabelFormat={(x) => Math.abs(x)}
              getAriaValueText={valuetext}
              aria-labelledby="range-slider"
              valueLabelDisplay="auto"
              onChange={this.handleChange}
              step={0.5}
              marks
              min={-10}
              max={10}
            />
          </div>
          <div> &#9758; Libs/Nats </div>
        </div>
        <div className={styles.seatContainer}>
          {seats.map(
            (seat, index) => (
              <Seat
                name={seat.name}
                margin={Math.abs(seat.displayMargin)}
                party={seat.party}
                style={this.seatColour(seat)}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              />
            ),
          )}
        </div>
      </div>

    );
  }
}

export default App;