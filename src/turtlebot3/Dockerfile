ARG ROS_DISTRO="humble"
FROM ros:${ROS_DISTRO}-ros-base

WORKDIR /turtlebot3
ADD . ./src/
RUN apt update && apt install ros-${ROS_DISTRO}-rmw-cyclonedds-cpp -y
RUN . /opt/ros/${ROS_DISTRO}/setup.sh \
    && apt update && rosdep install --from-paths . --ignore-src -r -y \
    && colcon build --symlink-install

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
