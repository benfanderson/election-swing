/* eslint-disable class-methods-use-this */
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './styles.css';
import Seat from './Seat';
import seatsArray from './seatsArray';
import SwingSlider from './SwingSlider';

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

  partyColour(seat) {
    const styleObject = {};
    let borderColor;
    if (seat.displayMargin < -6) {
      borderColor = '#f53661';
    } else if (seat.displayMargin < 0) {
      borderColor = '#fa84a0';
    } else if (seat.displayMargin < 6 && seat.party === 'Nationals') {
      borderColor = '#76b083';
    } else if (seat.displayMargin < 6) {
      borderColor = '#7f7fb5';
    } else if (seat.displayMargin >= 6 && seat.party === 'Nationals') {
      borderColor = '#448754';
    } else if (seat.displayMargin >= 6) {
      borderColor = '#4242a1';
    }
    styleObject.border = `2.5px solid ${borderColor}`;
    return styleObject;
  }

  render() {
    const { seats, value } = this.state;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Swing calculator for 2021 WA election</h1>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <div style={style}>
                <SwingSlider
                  style={style}
                  value={value}
                  valuetext={valuetext}
                  onChange={this.handleChange}
                />
              </div>
            )}
          </Sticky>
          <div className={styles.seatContainer}>
            {seats.map(
              (seat, index) => (
                <Seat
                  name={seat.name}
                  margin={Math.abs(seat.displayMargin)}
                  party={seat.party}
                  colorStyle={this.partyColour(seat)}
                // eslint-disable-next-line react/no-array-index-key
                  key={index}
                />
              ),
            )}
          </div>
        </StickyContainer>
      </div>

    );
  }
}

export default App;
