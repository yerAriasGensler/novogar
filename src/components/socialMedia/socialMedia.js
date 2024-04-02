import React, { useEffect, useState } from "react";

export const SocialMedia = ({  }) => {
  
    const [hoveredIcon, setHoveredIcon] = useState(null);

    const handleMouseEnter = (icon) => {
        setHoveredIcon(icon);
    };

    const handleMouseLeave = () => {
        setHoveredIcon(null);
    };

    return (
        <>
            <div className="social-media w-screen md:w-auto pl-8 md:pl-0 pt-2 md:pt-0">
                <a target="_blank" href="https://www.facebook.com/NovogarCR">
                <img className="w-8 md:w-6" src={hoveredIcon === 'facebook' ? "img/facebook-hover.svg" : "img/facebook.svg"} alt="logos" 
                    onMouseEnter={() => handleMouseEnter('facebook')}
                    onMouseLeave={handleMouseLeave}
                />
                </a>
                <a target="_blank" href="https://www.instagram.com/NovogarCR/">
                <img
                    className="w-8 md:w-6"
                    src={hoveredIcon === 'instagram' ? "img/instagram-hover.svg" : "img/instagram.svg"}
                    alt="Instagram"
                    onMouseEnter={() => handleMouseEnter('instagram')}
                    onMouseLeave={handleMouseLeave}
                />
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCSEYxnwb-rMq_VGS11WhJvw">
                <img
                    className="w-8 md:w-6"
                    src={hoveredIcon === 'youtube' ? "img/youtube-hover.svg" : "img/Youtube.svg"}
                    alt="YouTube"
                    onMouseEnter={() => handleMouseEnter('youtube')}
                    onMouseLeave={handleMouseLeave}
                />
                </a>
                <a target="_blank" href="https://wa.me/+50687086462?text=Hola,%20les%20contacto%20desde%20su%20sitio%20web.%20Quisiera%20más%20información.">
                <img
                    className="w-8 md:w-6"
                    src={hoveredIcon === 'whatsapp' ? "img/whatsapp-hover.svg" : "img/whatsapp.svg"}
                    alt="WhatsApp"
                    onMouseEnter={() => handleMouseEnter('whatsapp')}
                    onMouseLeave={handleMouseLeave}
                />
                </a>
            </div>
        </>
    );
};

export default SocialMedia;
