import React from "react";

export default function Mapbutton({ href }) {
  return (
    <a className="btn h-10 shadow-md bg-white"
        target="_blank"
        rel="noreferrer"
        href={href}
    >
      <img
        className="h-10"
        src="https://miro.medium.com/v2/resize:fit:1024/0*oJK4t4_NTgdBPPgz.png"
        alt="map"
      />
      <span className="pt-1 font-bold">Open with Google Map</span>
    </a>
  );
}
