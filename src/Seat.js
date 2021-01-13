import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Seat = (props) => {
  const {
    name, party, margin, colorStyle,
  } = props;

  return (
    <div style={colorStyle} className={styles.seatDiv}>
      <p className={styles.seatName}><strong>{name}</strong></p>
      <p className={styles.marginInfo}>
        {' '}
        {party}
        {' '}
        {margin}
        %
        {/* margin */}
      </p>
    </div>
  );
};

Seat.propTypes = {
  name: PropTypes.string.isRequired,
  party: PropTypes.string.isRequired,
  margin: PropTypes.number.isRequired,
  colorStyle: PropTypes.func.isRequired,
};

export default Seat;
