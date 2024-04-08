import React, { useEffect, useState } from "react";
//import Tour from "../../data/tour.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const CondominiumPartsNavbar = ({ tourData, condominiumData, amenitiesActive, setShow2DImage, setImage2D }) => {
  const [selectedPartButton, setSelectedPartButton] = useState(null);
  const [selectedButton, setSelectedButton] = useState("house");
  const [backHomeIsHover, setBackHomeIsHover] = useState(false);
  const [subType, setSubType] = useState(amenitiesActive ? "amenities" : "house");

  useEffect(() => {
    // On goto window event change selectedPartButton to the new location
    window.addEventListener("go-to", function (e) {
      // get type from location
      let location = tourData.locations.filter(
        (location) => location.id == e.detail.to
      );
      setSelectedButton(location[0].type);
    });
  }, []);

  useEffect(() => {
    // On goto window event change selectedPartButton to the new location.
    window.addEventListener("go-to", function (e) {
      setSelectedPartButton(e.detail.to);
    });
  }, []);

  const arraySelected =
    selectedButton != null
      ? tourData?.locations?.filter((location) => location.type === selectedButton)
      : null;

  const switchCondominiumPart = (selected) => {
    console.log(selected);

    let location = tourData.locations.filter(
      (location) => location.id == selected
    );

    console.log(location);

    if(location[0].still_src){
      setImage2D(location[0].still_src);
      setShow2DImage(true);
    }else{
      setShow2DImage(false);
    }

    setSelectedButton(selected);
    setSelectedPartButton(selected);
    let event = new CustomEvent("go-to", {
      detail: {
        to: selected,
      },
    });
    window.dispatchEvent(event);
  };

  const switchCondominiumPartAmenHous = (selected) => {
    setShow2DImage(false);
    setSelectedButton(selected);
  };

  const getButtonStyle = (selected) => {
    return {
      fontWeight: selectedPartButton == selected ? "bold" : "normal",
      borderBottom : selectedPartButton == selected ? "solid" : "none",
    };
  };

  return (
    <>
      {arraySelected && (
        <div className="parts-navbar hidden md:block border-t border-white gradient-parts top-[5.313rem] xl:top-[7.313rem]">
          <div className="flex items-center ml-10 md:ml-20 h-full">
            <button className={`h-[31px] pointer-events-auto rounded-[5px] flex justify-center items-center bg-transparent px-3 py-1 mr-10 cursor-pointer border border-2 border-white hover:bg-white`}
                onClick={() => window.location.reload(false)}
                onMouseEnter={() => setBackHomeIsHover(true)}
                onMouseLeave={() => setBackHomeIsHover(false)}
              >
                <img className="w-[20px]" src={`${!backHomeIsHover ? 'img/leftArrow.svg' : 'img/leftArrowHover.svg'}`}/>
                <span id="back-to-home" className={` ${backHomeIsHover ? 'text-[#FF0000]' : 'text-white'} font-medium text-[1rem] font-[Raleway] pl-2`}> Condominios</span>
            </button>


            <div className="menu md:flex md:w-auto flex-nowrap mr-4">
              <Box sx={{ display: "flex" }}>
                <Box className="mask-box">
                  <Box
                    className="mask"
                    style={{
                      transform: `translateX(${selectedButton === "house" ? 0 : "100px"})`
                    }}
                  />
                  <Button
                    disableRipple
                    variant="text"
                    sx={{ color: selectedButton === "house" ? "#FF0000" : "#FFFFFF"}}
                    style={{
                      fontWeight: `${selectedButton === "house" ? "bold" : "normal"}`
                    }}
                    onClick={() => {
                      setSubType("house")
                      switchCondominiumPartAmenHous("house");
                      let event = new CustomEvent("go-to", {
                        detail: {
                          to: condominiumData.tourSrc === "arboraTour" ? "pano10" : "pano1",
                        },
                      });
                      window.dispatchEvent(event);
                    }}
                  >
                    Casa
                  </Button>
                  <Button
                    disableRipple
                    variant="text"
                    sx={{ color: selectedButton === "amenities" ? "#FF0000" : "#FFFFFF"}}
                    style={{
                      fontWeight: `${selectedButton === "amenities" ? "bold" : "normal"}`
                    }}
                    onClick={() => {
                      setSubType("amenities")
                      switchCondominiumPartAmenHous("amenities");
                      let event = new CustomEvent("go-to", {
                        detail: {
                          to: "pano12",
                        },
                      });
                      window.dispatchEvent(event);
                    }}
                  >
                    Amenidades
                  </Button>
                </Box>
              </Box>
            </div>
            {arraySelected &&
              arraySelected.map((location) => (
                <button
                  type="button"
                  key={location.id}
                  className="menu-items h-full"
                  style={getButtonStyle(location.id)}
                  onClick={() => switchCondominiumPart(location.id)}
                >
                  <span className="hover:font-bold">{location.title}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CondominiumPartsNavbar;
