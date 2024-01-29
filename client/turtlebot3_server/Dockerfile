ARG ROS_DISTRO="humble"
FROM ros:${ROS_DISTRO}

LABEL author="Mattia Dei Rossi - 885768@stud.unive.it"

RUN apt update \
  && apt install ros-${ROS_DISTRO}-rosbridge-server -y \
  && apt install ros-${ROS_DISTRO}-rmw-cyclonedds-cpp -y