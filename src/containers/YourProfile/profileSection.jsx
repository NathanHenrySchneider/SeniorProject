import React from "react";
import styled from "styled-components";

const profileContainer = styled.div`
    width: 100%;
    height: 900px;
    background: white;
`;

    export function profileSection(props){
        const { children } = props;
        return <profileContainer>
            {children}
        </profileContainer>
    }