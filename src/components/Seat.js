import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

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
      </p>
    </div>
  );
};

Seat.propTypes = {
  name: PropTypes.string.isRequired,
  party: PropTypes.string.isRequired,
  margin: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  colorStyle: PropTypes.object.isRequired,
};

export default Seat;
