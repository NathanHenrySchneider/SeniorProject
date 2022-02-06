import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../../components/brandLogo";
import { Marginer } from "../../components/marginer";
import TopSectionBackgroundImg from "../../images/landing-page.jpg";

const TopSectionContainer = styled.div`
    width: 100%;
    height: 800px;
    background: url(${TopSectionBackgroundImg});
    background-position: 0px -50px;
    background-size: cover;
`;

const BackgroundFilter = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(38, 70, 83, 0.6);
    display: flex;
    flex-direction: column;
`;


export function TopSection(props){
    const { children } = props;

    return <TopSectionContainer>
        <BackgroundFilter>
            {children}
        </BackgroundFilter>
    </TopSectionContainer>
}