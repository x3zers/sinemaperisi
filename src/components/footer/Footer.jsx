import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";


const Footer = () => {
    const [popupContent, setPopupContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [background, setBackground] = useState("");
    const { url } = useSelector((state) => state.home);
    const { data } = useFetch("/movie/upcoming");
    const [imageContent, setImageContent] = useState("");

    useEffect(() => {
        if (data) {
            const randomIndex = Math.floor(Math.random() * 20);
            const selectedMovie = data?.results?.[randomIndex];
            const bg = url.backdrop + selectedMovie?.backdrop_path;
            setBackground(bg);
            setImageContent(selectedMovie);
        }
    }, [data, url]);

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
                    <li className="menuItem" onClick={() => navigate('/terms')}>Kullanım Koşulları </li>
                    <li className="menuItem" onClick={() => navigate('/sss')}>Sıkça Sorulan Sorular</li>
                    <li className="menuItem" onClick={() => navigate('/privacy')}>Gizlilik Politikaası</li>
                </ul>
                <span className="aciklama">Film Evreni, senin sinema ve dizi yolculuğunun bir parçası. Her sahneyi ve karakteri keşfetmeye hazır mısın? Birbirinden heyecan verici incelemeler ve önerilerle dolu bu dünyada, sinemanın ve dizilerin büyülü dünyasında iz bırakmaya hazır ol. Hayal gücünü özgür bırak ve Film Evreni'nde yeni maceralara doğru bir adım at!</span> 
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