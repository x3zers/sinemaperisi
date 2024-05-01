import React, { useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../../src/assets/analogo.png"; 
import logotr  from "../../assets/s kopya.png";
import "./style.scss";

const Footer = () => {
    const [popupContent, setPopupContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleMenuItemClick = (content) => {
        setPopupContent(content);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => handleMenuItemClick("Bu, web sitesi kullanım koşullarıdır. Kullanıcıların siteyi ne amaçla kullandıklarını, hangi şartlar altında kullanabileceklerini ve hangi yasaklar olduğunu açıklar.")}>Kullanım Koşulları</li>
                    <li className="menuItem" onClick={() => handleMenuItemClick("Bu, web sitesinin gizlilik politikasıdır. Site üzerindeki kullanıcıların kişisel verilerinin ne amaçla toplandığını, nasıl korunduğunu ve hangi koşullar altında üçüncü taraflarla paylaşıldığını belirler.")}>Gizlilik Politikası</li>
                </ul>
                <span className="imageContentDf">Dizifrag İşbirliğiyle Tasarlandı<img src={logo} alt="logo" className="logo-sineperi" /></span> 
                <span className="imageContentZers">Zers Tarafından ☠️ ile geliştirildi.</span>
                <div className="socialIcons">
                    <span className="icon"> 
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
            {showPopup && (
                <div className="popupOverlay">
                    <div className="popupContent">
                        <button className="closeButton" onClick={handleClosePopup}>Kapat</button>
                        <p>{popupContent}</p>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
