ARG ROS_DISTRO="humble"
FROM ros:${ROS_DISTRO}

WORKDIR /turtlebot3
ADD . ./src/
RUN apt update && apt install ros-${ROS_DISTRO}-rmw-cyclonedds-cpp -y
RUN . /opt/ros/${ROS_DISTRO}/setup.sh \
    && apt update \
    && apt install ros-${ROS_DISTRO}-gazebo-* -y\
    && apt install ros-${ROS_DISTRO}-cartographer -y\
    && apt install ros-${ROS_DISTRO}-cartographer-ros -y\
    && apt install ros-${ROS_DISTRO}-navigation2 -y\
    && apt install ros-${ROS_DISTRO}-nav2-bringup -y\
    && apt install ros-${ROS_DISTRO}-dynamixel-sdk -y\
    && apt install ros-${ROS_DISTRO}-turtlebot3-msgs -y\
    && apt install ros-${ROS_DISTRO}-turtlebot3 -y\
    && rosdep install --from-paths . --ignore-src -r -y \
    && colcon build --symlink-install

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
