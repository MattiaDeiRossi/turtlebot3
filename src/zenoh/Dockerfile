ARG ROS_DISTRO="humble"
FROM ros:${ROS_DISTRO}-ros-base

WORKDIR /zenoh
ADD . ./src/
RUN apt update && apt install ros-${ROS_DISTRO}-rmw-cyclonedds-cpp -y
RUN . /opt/ros/${ROS_DISTRO}/setup.sh \
    && apt update && rosdep install --from-paths . --ignore-src -r -y \
    && colcon build --packages-select zenoh_bridge_ros2dds --cmake-args -DCMAKE_BUILD_TYPE=Release
