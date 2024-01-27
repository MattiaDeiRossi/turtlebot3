import { Pose } from "../interfaces";

interface PoseItemProps {
  pose: Pose;
  onButtonClick: (id: string) => void;
}

const PoseItem: React.FC<PoseItemProps> = ({ pose, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick(pose.id);
  };

  return (
    <div>
      <span>{`Pose: ${pose.id}: { x: ${pose.x}, y: ${pose.y}, w: ${pose.w} }`}</span>
      <button className='btn btn-info'  onClick={handleClick}>Go</button>
    </div>
  );
};

interface PoseListProps {
  poses: Pose[];
  onButtonClick: (id: string) => void;
}

export const PoseList: React.FC<PoseListProps> = ({ poses, onButtonClick }) => {
  return (
    <div>
      {poses.map(pose => (
        <PoseItem key={pose.id} pose={pose} onButtonClick={onButtonClick} />
      ))}
    </div>
  );
};