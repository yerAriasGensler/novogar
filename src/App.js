import { useEffect, useState } from "react";
import "./App.css";
import "./components/waypoint/waypoint.js";
import "./components/hoverable/hoverable.js";
import "./components/map/map.js";
import Tour from "./data/unikoTour.json";
import CondominiumsData from "./data/condominiums.json";
import Navbar from "./components/navbar/navbar.js";
import Landing from "./components/landing/landing.js";
import SocialMedia from "./components/socialMedia/socialMedia.js";
import { Helmet } from "react-helmet";
require("aframe-stereo-component");
require("aframe-look-at-component");
require("aframe");

function App() {
  const [tourData, setTourData] = useState(Tour);
  const [actualLocation, setActualLocation] = useState(Tour.locations[9].id);
  const [showLanding, setShowLanding] = useState(true);
  const [rendering, setRendering] = useState(true);
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isInVR, setIsInVR] = useState(true);
  const [condominiumSelected, setCondominiumSelected ] = useState(CondominiumsData.condominiums[0]);
  const condominiumsData = CondominiumsData;

  const condominiumTourSelected = (tourName, condominiumName) => {
    import(`./data/${tourName}.json`).then((moduleData) => {
      setTourData(moduleData);
    }).catch((error) => {
      console.error('Error loading module data:', error);
    });

    const condominium = condominiumsData.condominiums.find(condo => condo.name === condominiumName);
    setCondominiumSelected(condominium);
  }

  useEffect(() => {
    window.localStorage.setItem("actualLocation", tourData.locations[9].id);
    document.querySelector("a-scene").addEventListener("enter-vr", function () {
      var vrMap = document.querySelector("#vr-map");
      //vrMap.setAttribute("visible", true);
    });
    document.querySelector("a-scene").addEventListener("exit-vr", function () {
      var vrMap = document.querySelector("#vr-map");
      //vrMap.setAttribute("visible", false);
    });
    window.addEventListener("go-to", function (e) {
      GoTo(e.detail.to);
    });

    // Get a-assets
    var assets = document.querySelector("a-assets");

    // On assets loaded event do something
    assets.addEventListener("loaded", function (e) {
      console.log("Assets loaded");
      setAssetsLoading(false);
    });

    document.querySelector("a-scene").addEventListener("loaded", function () {
      setRendering(false);
    });

    // Set enter vr and exit vr events
    document
      .querySelector("a-scene")
      .addEventListener("enter-vr", () => setIsInVR(true));
    document
      .querySelector("a-scene")
      .addEventListener("exit-vr", () => setIsInVR(false));
  }, []);

  useEffect(() => {
    if (!rendering && !assetsLoading) setLoading(false);
  }, [rendering, assetsLoading]);

  const GoTo = (to) => {
    // Trigger custon go-to event with to as parameter

    let actualLocation = window.localStorage.getItem("actualLocation");
    if (actualLocation !== to) {
      var fadeEl = document.querySelector("#fade");
      fadeEl.emit("fadein");
      let stepsSound = document.getElementById("steps-sound");
      stepsSound.components.sound.playSound();
      setTimeout(() => {
        var skybox = document.querySelector("#sky");
        if (isInVR) {
          var actualWaypoints = document.querySelector(`#${actualLocation}`);
          var goToWaypoints = document.querySelector(`#${to}`);

          actualWaypoints.setAttribute("visible", false);
          actualWaypoints.childNodes.forEach((child) => {
            child.classList.remove("clickable");
          });

          goToWaypoints.setAttribute("visible", true);
          goToWaypoints.childNodes.forEach((child) => {
            child.classList.add("clickable");
          });
        }

        var vrMap = document.querySelector("#vr-map");
        //vrMap.setAttribute("src", `#map-${to}`);

        // Get the location with "to" as id
        var location = tourData.locations.find((location) => location.id === to);
        // Get camera rotation in y axis
        var camera = document.querySelector("#cam");
        var cameraRotation = camera.getAttribute("rotation");
        var yAxis = cameraRotation.y;
        // Get new direction from location.direction and camera rotation
        var newDirection = Number(location.direction) + Number(yAxis);

        // Get waypoints container
        var waypointContainer = document.querySelector("#waypoint-container");

        skybox.setAttribute("src", `#img-${to}`);
        skybox.setAttribute("rotation", `0 ${newDirection} 0`);
        waypointContainer.setAttribute("rotation", `0 ${newDirection} 0`);
        fadeEl.emit("fadeout");
      }, 1000);

      setActualLocation(to);
      window.localStorage.setItem("actualLocation", to);
    }
  };

  const DispatchGoToEvent = (to) => {
    let event = new CustomEvent("go-to", {
      detail: {
        to: to,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Uniko</title>
        <meta
          name="description"
          content="Learn design and code by building real apps with React and Swift. Complete courses about UI design, web and iOS development using Figma, CSS, React Hooks and SwiftUI."
        />
      </Helmet>

      {showLanding && (
        <Landing condominiumsData={condominiumsData} loading={loading} setShowLanding={setShowLanding} condominiumTourSelected={condominiumTourSelected}/>       
      )}

      <div className="z-[100] absolute bottom-[15px]">
        <SocialMedia />
      </div>

      <div id="loading-page">
        <img className="loading" src={"img/loading.gif"} alt="loading" />
      </div>

      <Navbar showLanding={showLanding} tourData={tourData} condominiumData={condominiumSelected}/>

      {!showLanding && (
        <div className="room-box bottom-[41px] md:bottom-[41px]">
          <img className="w-[156px] h-[35px]" src="img/moveImg.png" alt="logos"/>
        </div>
      )}

      <a-scene
        renderer="antialias: true"
        loading-screen="enabled:false"
        cursor="rayOrigin: mouse; fuseTimeout: 0;"
        raycaster="objects: .clickable"
      >
        <a-assets timeout="99999999999">
          {tourData.locations.map((location) => (
            <img id={`img-${location.id}`} src={location.src} />
          ))}
          {tourData.locations &&
            tourData.locations.map(
              (location) =>
                location.waypoints &&
                location.waypoints.map((waypoint) => (
                  <>
                    <img id={`waypoint-${waypoint.id}`} src={waypoint.pin_src}/>
                  </>
                ))
            )}
        </a-assets>

        <a-camera
          id="cam"
          look-controls="reverseMouseDrag: true"
          position="0 0 0"
        >
          <a-sphere
            id="fade"
            radius="2"
            material="shader:flat; color: black; opacity: 0.0; side: double; transparent: true; alphaTest: 0.5;"
            animation__fadein="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: normal; startEvents: fadein;"
            animation__fadeout="property: material.opacity; from: 0.0; to: 1.0 dur: 500; dir: reverse; startEvents: fadeout;"
          ></a-sphere>
        </a-camera>

        <a-entity id="waypoint-container" rotation="0 -70 0">
          {/*No funciona bien, buscar otro metodo de validacion si es en vr */}
          {isInVR &&
            tourData.locations.map((location, index) => {
              return (
                <a-entity
                  id={location.id}
                  visible={location.id == "pano10" ? true : false}
                >
                  {location.waypoints.map((waypoint) => (
                    <a-image
                      position={`${waypoint.position[0]} ${waypoint.position[1]} ${waypoint.position[2]}`}
                      scale="1 1 1"
                      class={location.id == "pano10" ? "clickable" : ""}
                      waypoint={`to:${waypoint.to}`}
                      src={waypoint.pin_src}
                      width="1.8"
                      height="2"
                      hoverable={`pin_src_hover:${waypoint.pin_src_hover}; pin_src: ${waypoint.pin_src}`}
                    ></a-image>
                  ))}
                </a-entity>
              );
            })}
        </a-entity>

        <a-entity
          laser-controls="hand: right"
          raycaster="objects: .clickable; lineColor: red; lineOpacity: 0.5;"
        ></a-entity>
        
        <a-sky
          id="sky"
          rotation="0 -70 0"
          src={`#img-${tourData.locations[9].id}`}
        ></a-sky>

        <a-sound
          id="ambient-sound"
          src="src: url(sound/ambient2.mp3)"
          loop="true"
          autoplay="true"
          volume={actualLocation === "pano10" ? 1 : 0.5}
        ></a-sound>
        <a-sound id="steps-sound" src="src: url(sound/pop.mp3)"></a-sound>
      </a-scene>
    </div>
  );
}

export default App;
