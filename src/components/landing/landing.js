import React from "react";
import CondominiumCard from "../condominiumCard/condominiumCard.js";

export const Landing = ({ condominiumsData, loading, setShowLanding, condominiumTourSelected}) => {

  return (
    <>
      <div className="landing-page">
          <div className="landing-column">
            <div>
              <div className="ml-10 md:ml-20 mr-10 md:mr-0">
                <p className="landing-text mb-5">
                  ¡Encontrá tu hogar <br/>ideal usando nuestra <br/> increíble galería 360º!
                </p>
                <p className="landing-text-description">
                  Espacio para texto corto descriptor.<br/>
                  Lorem ipsum in dolor sit.
                </p>
              </div>
              <div className="gallery  md:flex mr-10 md:mr-20 space-x-4">
              {condominiumsData.condominiums.map((condominium, i) => (
                <CondominiumCard loading={loading} setShowLanding={setShowLanding} img={condominium.bgImg} gif={condominium.gif} name={condominium.name} 
                  location={condominium.location} description={condominium.description} tourSrc={condominium.tourSrc} 
                  condominiumTourSelected={condominiumTourSelected} 
                />
              ))}
                
              </div>
            </div>
          </div>
          <div className="div-img">
            <img
              className="landing-img"
              src={"img/landing-page-bg.png"}
              alt="entrance"
            />
          </div>
        </div>
    </>
  );
};

export default Landing;
