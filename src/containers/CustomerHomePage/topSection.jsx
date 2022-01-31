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

const TopSectionInnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const SloganText = styled.h3`
    margin: 0;
    line-height: 1.4;
    color: #fff;
    font-weight: 500;
    font-size: 30px;
`;

export function TopSection(props){
    const { children } = props;

    return <TopSectionContainer>
        <BackgroundFilter>
            {children}
            <TopSectionInnerContainer>
                <LogoContainer>
                    <BrandLogo logoSize={75} textSize={50}/>
                    <Marginer direction="vertical" margin={8} />
                    <SloganText>Welcome!</SloganText>
                    <SloganText>Get in touch with your doctor</SloganText>
                </LogoContainer>
            </TopSectionInnerContainer>
        </BackgroundFilter>
    </TopSectionContainer>
}