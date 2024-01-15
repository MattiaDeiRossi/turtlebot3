ARG ROS_DISTRO="humble"
FROM ros:${ROS_DISTRO}

RUN apt update \
  && apt install ros-${ROS_DISTRO}-foxglove-bridge -y \
  && apt install ros-${ROS_DISTRO}-rmw-cyclonedds-cpp -y 
