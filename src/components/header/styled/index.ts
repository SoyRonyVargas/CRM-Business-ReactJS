import { CAvatar } from "@coreui/react";
import styled from "styled-components";

export const CarritoWrapper = styled(CAvatar)`
    width: 40px;
    height: 40px;
`

export const ContainerCarrito = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Badge = styled.div`
    background-color: var(--cui-info);
    border-radius: 100%;
    position: absolute;
    z-index: 1000;
    color: white;
    height: 25px;
    width: 25px;
    top: -10px;
    left: -12px;
    font-size: 13px;
    text-align: center;
`

