import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Seat = (props) => {
  const {
    name, party, margin, style,
  } = props;

  return (
    <div className={styles.seatDiv}>
      <p className={styles.seatName} style={style}><strong>{name}</strong></p>
      <p className={styles.marginInfo}>
        {' '}
        {party}
        {' '}
        {margin}
        % margin
      </p>
    </div>
  );
};

Seat.propTypes = {
  name: PropTypes.string.isRequired,
  party: PropTypes.string.isRequired,
  margin: PropTypes.number.isRequired,
  style: PropTypes.func.isRequired,
};

export default Seat;
