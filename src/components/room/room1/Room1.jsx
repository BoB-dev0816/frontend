import React from "react";
import room1 from "./room1.png";
import Chat from "../../chat/Chat";
import Map from "../../map/Map";


export default function Room1() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={room1} alt="Room 1" style={{ width: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
  <div style={{ position: 'absolute', top: '10px', right: '10px', width: '35%', height: '35%' }}>
          <Map />
        </div>
  <div style={{ position: 'absolute', top: 0, left: 0, width: '10%', height: '20%' }}>
          <Chat />
        </div>
      </div>
    </div>
  );
}
