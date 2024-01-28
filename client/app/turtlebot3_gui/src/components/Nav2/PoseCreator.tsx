import { useState } from 'react';

const PoseCreator = () => {
  const [pose, setPose] = useState({
    x: 0.5,
    y: 0.5,
    theta: 0.0
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const pose = {
      x: parseFloat(formData.get('x') as string),
      y: parseFloat(formData.get('y') as string ),
      theta: parseFloat(formData.get('theta') as string) * (Math.PI / 180)
    };

    setPose(pose);
    console.log('Submitted pose:', pose);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        x [m]:
        <input
          type="number"
          name="x"
          step="0.01"
          defaultValue={pose.x}
        />
      </label>
      <label>
        y [m]:
        <input
          type="number"
          name="y"
          step="0.01"
          defaultValue={pose.y}
        />
      </label>
      <label>
        Theta [deg]:
        <input
          type="number"
          name="theta"
          step="0.01"
          defaultValue={pose.theta}
        />
      </label>
      <button className='btn btn-info sm' type="submit">Send Pose</button>
    </form>
  );
};

export default PoseCreator;
