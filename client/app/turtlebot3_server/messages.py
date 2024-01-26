from dataclasses import dataclass
from pycdr2 import IdlStruct
from pycdr2.types import int8, int32, uint32, float64
from typing import List

@dataclass
class Vector3(IdlStruct, typename="Vector3"):
    x: float64
    y: float64
    z: float64
@dataclass
class Quaternion(IdlStruct, typename="Quaternion"):
    x: float64
    y: float64
    z: float64
    w: float64
@dataclass
class Twist(IdlStruct, typename="Twist"):
    linear: Vector3
    angular: Vector3 

@dataclass
class Time(IdlStruct, typename="Time"):
   sec: int32
   nanosec: uint32

@dataclass 
class Header(IdlStruct, typename="Header"):
  stamp: Time
  frame_id : str

@dataclass 
class Transform(IdlStruct, typename="Transform"):
  translation: Vector3
  rotation: Quaternion

@dataclass
class TransformStamped(IdlStruct, typename="TransformStamped"):
  header: Header
  child_frame_id: str
  transform: Transform

@dataclass
class TFMessage(IdlStruct, typename="TFMessage"):
  transforms: List[TransformStamped]