import React from "react";

export default function ProgressBar({ percent = 0 }) {
  return (
    <div style={{height:8,background:"rgba(255,255,255,0.02)",borderRadius:8,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${percent}%`,background:"linear-gradient(90deg,var(--accent),var(--accent-2))"}} />
    </div>
  );
}
