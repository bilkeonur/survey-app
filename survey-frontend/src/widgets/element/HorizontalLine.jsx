import React from "react";

export function HorizontalLine({ color }) {
  return (
    <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
    />
  );
}
  
export default HorizontalLine;
