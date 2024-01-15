import { useState } from 'react';

const Slider = ({sliderValue, setSliderValue}) => {
  const handleSliderChange = () => {
    setSliderValue(event.target.value);
  };

  return (
    <div>
      <label>Speed: {sliderValue}%</label>
      <br />
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Slider;
