import styled from "styled-components";

export const ContainerRemoveImage = styled.div`
    position: relative;
    background: red;
    .button__remove
    {
        border-radius: 100%;
        position: absolute;
        background: gray;
        font-size: 100px;
        height: 3rem !important;
        width: 3rem !important;
        padding: 10px;
        right: 10px;
        top: 10px;
        z-index: 1000;
        color: #FFFFFF !important;
        cursor: pointer;
    }
`