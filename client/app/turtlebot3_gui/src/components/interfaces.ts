export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Twist {
    linear: Vector3;
    angular: Vector3;
}

export interface Time {
    sec: number;
    nanosec: number;
}

export interface Header {
    stamp: Time;
    frame_id: string;
}
export interface Pose {
    id: string;
    x: number;
    y: number;
    w: number;
  }