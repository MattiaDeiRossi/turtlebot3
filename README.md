# TurtleBot3

<a>
    <img src="doc/img/unive.png" alt="logo" title="CaFoscari" align="right" height="100" />
</a>

Authors: 
- Mattia Dei Rossi - [885768@stud.unive.it](885768@stud.unive.it)
<!-- ## Local workspace setup
Install [vcstool](https://github.com/dirk-thomas/vcstool)
```
vcs import < repos.yaml
``` -->

## Docker
<!-- ```
sudo xhost local:docker
``` -->
<!-- ```
docker compose up
```

## Zenoh Debug
```
``` -->



## On robot or simulation
0. Install `zenoh-bridge-ros2dds`
```
echo "deb [trusted=yes] https://download.eclipse.org/zenoh/debian-repo/ /" | sudo tee -a /etc/apt/sources.list > /dev/null
sudo apt update
sudo apt install zenoh-bridge-ros2dds
```
1. Launch simulation or real robot with navigation stack
```
#export ROS_DOMAIN_ID=111
export ROS_LOCALHOST_ONLY=1
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
ros2 launch webots_ros2_turtlebot robot_launch.py nav:=true
```
2. Launch zenoh bridge
```
sudo ip l set lo multicast on
#export ROS_DOMAIN_ID=111
<!-- export ROS_LOCALHOST_ONLY=1 -->
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
zenoh-bridge-ros2dds -c zenoh/config.json5
```
3. Test Zenoh REST API
```
curl http://localhost:8000/@ros2/turtlebot3/route/topic/**
```

## On client
0. Run backend
```
cd turtlebot3_server
flask --app server run
```
1. Run frontend
```
cd turtlebot3_gui/
pnpm run dev
```
2. Go to [http://localhost:5173/](http://localhost:5173/)