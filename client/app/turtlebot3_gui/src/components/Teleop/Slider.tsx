const Slider = ({sliderValue, setSliderValue}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  return (
    <div>
      <label>Speed: {sliderValue}%</label>
      <br />
      <input
        type="range"
        min="1"
        max="100"
        step="1"
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default Slider;
