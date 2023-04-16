import { CCard, CButton } from "@coreui/react";
import styled from "styled-components";

export const ContainerConcepto = styled.article`
    border: var(--cui-card-border-width) solid var(--cui-card-border-color);
    margin-bottom: 10px;
`

export const CardContainerConcepto = styled(CCard)`
    padding: 10px;
    padding-bottom: 0;
    border: none;
`

export const CardBottomConcepto = styled(CCard)`
    border-radius: 0;
    border: 0
`

export const CardButtonConcepto = styled(CButton)`
    /* background: transparent; */
    color: var(--cui-gray-500);
    &:hover
    {
        border-color: transparent;
        color: var(--cui-gray-500);
        background: transparent;
    }
`