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
        height: 3.5rem !important;
        width: 3.5rem !important;
        padding: 10px;
        right: 0;
        top: 0;
        z-index: 1000;
        color: #FFFFFF !important;
        cursor: pointer;
    }
`