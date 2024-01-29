import { useContext, useState } from 'react';
import { Topic, Message } from 'roslib';
import Quaternion from 'quaternion';
import { SocketContext } from '../RosConnection/RosContext';

const PoseCreator = () => {
  const ros = useContext(SocketContext);
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
      y: parseFloat(formData.get('y') as string),
      theta: parseFloat(formData.get('theta') as string) * (Math.PI / 180)
    };

    setPose(pose);
    sendPose();
  };

  function sendPose() {
    const publishPose = new Topic({
      ros: ros,
      name: '/goal_pose',
      messageType: 'geometry_msgs/PoseStamped',
    });

    const q = Quaternion.fromEulerLogical(0, 0, pose.theta, 'XYZ');

    let msg = new Message({
      header: {
        stamp: {
          sec: 0,
          nanosec: 0
        },
        frame_id: 'map',
      },
      pose: {
        position: {
          x: pose.x,
          y: pose.y,
          z: 0.0
        },
        orientation: {
          x: q.x,
          y: q.y,
          z: q.z,
          w: q.w
        }
      }
    });

    publishPose.publish(msg);
    console.log("sending")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="x">
        x [m]:
        <input id="x"
          type="number"
          name="x"
          step="0.01"
          min="-360"
          max="360"
          defaultValue={pose.x}
        />
      </label>
      <label htmlFor="y">
        y [m]:
        <input id="y"
          type="number"
          name="y"
          step="0.01"
          min="-360"
          max="360"
          defaultValue={pose.y}
        />
      </label>
      <label htmlFor="theta">
        Theta [deg]:
        <input id="theta"
          type="number"
          name="theta"
          step="0.01"
          min="-360"
          max="360"
          defaultValue={pose.theta}
        />
      </label>
      <button className='btn btn-info sm' type="submit">Send Pose</button>
    </form>
  );
};

export default PoseCreator;
