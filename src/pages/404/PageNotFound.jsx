import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import fetch from "../../../src/assets/404.png";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Aradığınız sayfayı bulamadık.</span>
                <span className="smallText2">Ana sayfaya dönmeye ne dersiniz?</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;
