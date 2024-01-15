import zenoh
from dataclasses import dataclass
from pycdr2 import IdlStruct
from pycdr2.types import int8, int32, uint32, float64

BURGER_MAX_LIN_VEL = 0.22
BURGER_MAX_ANG_VEL = 2.84
LIN_VEL_STEP_SIZE = 0.01
ANG_VEL_STEP_SIZE = 0.1

@dataclass
class Vector3(IdlStruct, typename="Vector3"):
    x: float64
    y: float64
    z: float64

@dataclass
class Twist(IdlStruct, typename="Twist"):
    linear: Vector3
    angular: Vector3 

class Turtlebot3:
  target_linear_velocity   = 0.0
  target_angular_velocity  = 0.0
  control_linear_velocity  = 0.0
  control_angular_velocity = 0.0

  def __init__(self, session : zenoh.Session) -> None:
    self.session = session
    self.cmd_vel = self.session.declare_publisher('cmd_vel')

  def move(self, direction, percentuage):
    if direction == 'fwd':
      self.target_linear_velocity = BURGER_MAX_LIN_VEL * percentuage
    elif direction == 'bwd':
      self.target_linear_velocity = -BURGER_MAX_LIN_VEL * percentuage
    elif direction == 'right':
      self.target_angular_velocity = BURGER_MAX_ANG_VEL * percentuage
    elif direction == 'left':
      self.target_angular_velocity = -BURGER_MAX_ANG_VEL * percentuage

    m = self.make_twist_cmd()
    self.cmd_vel.put(m.serialize())

  def make_twist_cmd(self) -> Twist:
    # self.control_linear_velocity = make_simple_profile(
    #             self.control_linear_velocity,
    #             self.target_linear_velocity,
    #             (LIN_VEL_STEP_SIZE/2.0))
    # self.control_angular_velocity = make_simple_profile(
    #         self.control_angular_velocity,
    #         self.target_angular_velocity,
    #         (ANG_VEL_STEP_SIZE/2.0))

    return Twist(
        linear=Vector3(x=self.target_linear_velocity, y=0, z=0),
        angular=Vector3(x=0, y=0, z=self.target_angular_velocity)
    )

def make_simple_profile(output, input, slop):
  if input > output:
      output = min(input, output + slop)
  elif input < output:
      output = max(input, output - slop)
  else:
      output = input

  return output

def constrain(input_vel, low_bound, high_bound):
  if input_vel < low_bound:
      input_vel = low_bound
  elif input_vel > high_bound:
      input_vel = high_bound
  else:
      input_vel = input_vel

  return input_vel

def check_linear_limit_velocity(velocity):
  return constrain(velocity, -BURGER_MAX_LIN_VEL, BURGER_MAX_LIN_VEL)

def check_angular_limit_velocity(velocity):
  return constrain(velocity, -BURGER_MAX_ANG_VEL, BURGER_MAX_ANG_VEL)