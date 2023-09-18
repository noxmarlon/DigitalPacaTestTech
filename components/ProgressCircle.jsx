import React from "react";
import { View } from "react-native";
import Svg, { Circle, Text } from "react-native-svg";

const ProgressCircle = ({ radius, strokeWidth, progress }) => {
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset =
    circumference - (circumference * progress) / 100;

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#3fc25b7c"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#3FC25C"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressStrokeDashoffset}
          fill="transparent"
        />
        <Text
          x={radius}
          y={40}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={18}
          fill="#fff"
        >
          {`${progress}%`}
        </Text>
      </Svg>
    </View>
  );
};

export default ProgressCircle;
