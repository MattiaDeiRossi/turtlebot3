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

export interface Transform {
    translation: Vector3;
    rotation: Quaternion;
}

export interface TransformStamped {
    header: Header;
    child_frame_id: string;
    transform: Transform;
}

export interface TFMessage {
    transforms: TransformStamped[];
}

export interface Tf{
    frame_id: string, 
    x: number, 
    y: number, 
    z: number, 
    xx: number, 
    yy: number,
    zz: number, 
    ww: number
}