import ColorBends from './components/ColorBends';
import React from 'react';
import Inicio_sesion from './components/menu_iniciosesion';
import './App.css'

function App() {
  return (
    <>
      
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={30}
          speed={0.3}
          scale={1.2}
          frequency={3}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.6}
          noise={0.08}
          transparent
        />
      </div>

      <div>
        <div className="centrar-div">
                  <Inicio_sesion />
        </div>


      </div>
    </>
  );
}


export default App
