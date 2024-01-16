import json
from typing import List
import zenoh
from flask_socketio import SocketIO

from turtlebot3_server.messages import *

BURGER_MAX_LIN_VEL = 0.22
BURGER_MAX_ANG_VEL = 2.84
LIN_VEL_STEP_SIZE = 0.01
ANG_VEL_STEP_SIZE = 0.1

class Turtlebot3:
  target_linear_velocity   = 0.0
  target_angular_velocity  = 0.0

  def __init__(self, session : zenoh.Session, socketio : SocketIO) -> None:
    self.session = session
    self.socketio = socketio
    self.cmd_vel = self.session.declare_publisher('cmd_vel')
    self.tf_sub = self.session.declare_subscriber('tf', self.tf_listener)
  
  def tf_listener(self, sample):
    tf = TFMessage.deserialize(sample.payload)
    base_link_tf = [tf for tf in tf.transforms if tf.header.frame_id == 'odom']
    for tf in base_link_tf:
      self.socketio.emit('tf', {'frame_id' : tf.child_frame_id,
                                'x': tf.transform.translation.x,
                                'y': tf.transform.translation.y,
                                'z': tf.transform.translation.z,
                                'xx': tf.transform.rotation.x,
                                'yy': tf.transform.rotation.y,
                                'zz': tf.transform.rotation.z,
                                'ww': tf.transform.rotation.w,
                                })

  def move(self, direction, percentuage):
    if direction == 'stop':
      self.target_linear_velocity   = 0.0
      self.target_angular_velocity  = 0.0
      return
    elif direction == 'fwd':
      if self.target_linear_velocity < BURGER_MAX_LIN_VEL * percentuage:
          self.target_linear_velocity += LIN_VEL_STEP_SIZE 
    elif direction == 'bwd':
      if self.target_linear_velocity > -BURGER_MAX_LIN_VEL * percentuage:
          self.target_linear_velocity -= LIN_VEL_STEP_SIZE
    elif direction == 'right':
      if self.target_linear_velocity < BURGER_MAX_LIN_VEL * percentuage:
        self.target_angular_velocity += ANG_VEL_STEP_SIZE
    elif direction == 'left':
      if self.target_linear_velocity > -BURGER_MAX_LIN_VEL * percentuage:
        self.target_angular_velocity -= ANG_VEL_STEP_SIZE

    m = self.make_twist_cmd()
    self.cmd_vel.put(m.serialize())

  def make_twist_cmd(self) -> Twist:
    return Twist(
        linear=Vector3(x=self.target_linear_velocity, y=0, z=0),
        angular=Vector3(x=0, y=0, z=self.target_angular_velocity)
    )