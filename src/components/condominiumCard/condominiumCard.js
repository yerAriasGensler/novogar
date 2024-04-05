import React, { useEffect, useState } from "react";

export const CondominiumCard = ({ loading, setShowLanding, img, gif, name, location, description, tourSrc, condominiumTourSelected }) => {
  
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);


    const onClickCondominium = (tourSrc, name) => {
        condominiumTourSelected(tourSrc, name);
    }
  
  return (
    <>
        <div className="rounded-[10px] overflow-hidden border-white border-2 card-container h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-full">
                {isHovered ? (
                    <img className="w-full h-full object-cover" src={gif} alt="GIF"/>
                ) : (
                    <img className="w-full h-full object-cover" src={img} alt="IMAGE"/>
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-6 items-start">
                    <div className="font-bold text-[1rem] text-wrap md:text-[2rem] text-white mb-2 font-[Raleway] text-start uppercase md:text-nowrap">{name}</div>
                    <p className="font-semibold text-[1rem] md:text-[1.25rem] text-white text-start font-[Raleway]">{location}</p>
                    <p className="text-[1rem] text-white text-start font-[Raleway]">{description}</p>
                    <div className="flex mt-4 w-[142px]">
                        <button className={`w-full rounded-[2px] flex justify-center items-center bg-[#FF0000] px-3 py-1 mr-2 cursor-pointer border border-transparent ${loading ? "loading-button" : ""} hover:border-white`}
                            onClick={() => onClickCondominium(tourSrc, name)}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                        >
                            <span className="text-white text-semibold text-[1rem] font-[Raleway] pr-2"> {loading ? "Cargando..." : "Galería 360"}</span>
                            <img className={`${isButtonHovered ? 'w-[16px]' : 'w-[9px]'}`} src={isButtonHovered ? "img/rightArrowLarge.svg" : "img/rightArrow.svg"}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default CondominiumCard;
