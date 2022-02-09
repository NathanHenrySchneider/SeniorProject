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
    // align-items: center;
    margin-top:20px;
    // justify-content: space-evenly;
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
    font-size: 25px;
`;

export function TopSection(props){
    const { children } = props;

    return <TopSectionContainer>
        <BackgroundFilter>
            {children}
            <TopSectionInnerContainer>
                <LogoContainer className = "container">
                    <BrandLogo logoSize={65} textSize={40}/>
                    <Marginer direction="vertical" margin={8} />
                    <SloganText>Welcome {props.email}!</SloganText>
                    <SloganText>Your appointments:</SloganText>
                </LogoContainer>
            </TopSectionInnerContainer>
        </BackgroundFilter>
    </TopSectionContainer>
}