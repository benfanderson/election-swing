import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import styles from '../styles.css';

const SwingSlider = (props) => {
  const {
    onChange, valuetext,
  } = props;
  return (
    <div className={styles.swingSliderContainer}>
      <div> Labor &#9756; </div>
      <div className={styles.swingSlider}>
        <Slider
          defaultValue={0}
          valueLabelFormat={(x) => Math.abs(x)}
          getAriaValueText={valuetext}
          aria-labelledby="range-slider"
          valueLabelDisplay="auto"
          onChange={onChange}
          step={0.5}
          marks
          min={-10}
          max={10}
        />
      </div>
      <div> &#9758; Libs/Nats </div>
    </div>
  );
};

SwingSlider.propTypes = {
  onChange: PropTypes.func.isRequired,
  valuetext: PropTypes.func.isRequired,
};

export default SwingSlider;
