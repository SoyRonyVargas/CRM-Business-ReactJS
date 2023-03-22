import { CardWrapper } from "./style";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CPlaceholder,
} from "@coreui/react";
import React from "react";


const CardPlaceHolder = () => {
  return (
    <CardWrapper>
      <CCardImage
        component="svg"
        orientation="top"
        width="230"
        height="200"
        role="img"
        aria-label="Placeholder"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </CCardImage>
      <CCardBody>
        <CPlaceholder component={CCardTitle} animation="glow" xs={7}>
          <CPlaceholder xs={6} />
        </CPlaceholder>
        <CPlaceholder component={CCardText} animation="glow">
          <CPlaceholder xs={7} />
          <CPlaceholder xs={4} />
          <CPlaceholder xs={4} />
          <CPlaceholder xs={6} />
          <CPlaceholder xs={8} />
        </CPlaceholder>
        {/* <CPlaceholder component={CButton} disabled href="#" tabIndex={-1} xs={6}></CPlaceholder> */}
      </CCardBody>
    </CardWrapper>
  );
};

export default CardPlaceHolder;
