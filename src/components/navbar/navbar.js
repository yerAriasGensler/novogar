import React from "react";
import CondominiumPartsNavbar from "../condominiumPartsNavbar/condominiumPartsNavbar";

export const Navbar = ({ showLanding, tourData, condominiumData }) => {

  return (
    <>
      <div className={`navbar flex-wrap md:flex-nowrap pl-6 pr-6 md:pl-20 md:pr-20  ${!showLanding && 'gradient-navbar'}`}>
        <div className="main-logos md:w-full w-full grid grid-cols-2 md:grid-cols-3">
          <div>
            <a href="./" className="pointer-events-auto	cursor-pointer">
              <img
                className="novogar-logo"
                src={showLanding ? "img/novogar-red.png" : "img/novogar-white.png"}
                alt="logos"
              />
            </a>
          </div>
          
          {!showLanding &&
          <div className="flex justify-center">
            <img
              className="uniko-logo"
              src={!showLanding && condominiumData.logo}
              alt="logos"
            />
          </div>
          }
        </div>
      </div>
      {!showLanding && (
        <CondominiumPartsNavbar tourData={tourData}/>
      )}
    </>
  );
};

export default Navbar;
