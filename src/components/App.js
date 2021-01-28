import React, { useState } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../styles.css';
import seatsArray from '../seatsArray';
import Seat from './Seat';
import SwingSlider from './SwingSlider';

const stateArray = seatsArray.sort((a, b) => (
  (a.margin > b.margin) ? 1 : ((b.margin > a.margin) ? -1 : 0)
));

function App() {
  const [seats, setSeats] = useState(stateArray);
  const [, setSwing] = useState(0);

  const valuetext = (value) => value;

  const handleChange = (_evt, value) => {
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
    setSeats(updatedSeats);
    setSwing(value);
  };

  const partyColour = (seat) => {
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
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Swing calculator for 2021 WA election</h1>
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <div style={style}>
              <SwingSlider
                style={style}
                valuetext={valuetext}
                onChange={handleChange}
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
                colorStyle={partyColour(seat)}
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

export default App;
