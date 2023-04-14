import { FormEditContext } from "../context/FormEditContext";
import { cilCloudUpload } from "@coreui/icons";
import ImageCarousel from "./ImageCarousel";
import React, { useContext } from 'react';
import CIcon from "@coreui/icons-react";
import Dropzone from "react-dropzone";
import {
    CCarouselItem,
    CCardHeader,
    CCardBody,
    CCarousel,
    CAvatar,
    CAlert,
    CCard
} from "@coreui/react";

const RightForm = () => {
    
    const { 
        handleDrop,
        loading,
        errors,
        values
    } = useContext(FormEditContext)
    
    return (
        <CCard className="h-100">
            <CCardHeader>
                <strong>Imagenes</strong>
            </CCardHeader>
            <CCardBody>
                {/* <pre>
                    {
                        JSON.stringify( values , null , 3 )
                    }
                </pre> */}
                <Dropzone accept={{
                    'image': ["*"]
                }} onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div
                                className="d-fle justify-content-center"
                                {...getRootProps()}
                            >
                                <div>
                                    <input {...getInputProps()} />

                                    {
                                        errors.imagen &&
                                        <CAlert color="danger">
                                            Selecciona una imagen
                                        </CAlert>
                                    }

                                    <CAvatar
                                        color="primary"
                                        textColor="white"
                                        shape="rounded-2"
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            cursor: "pointer",
                                            margin: "0 auto",
                                            borderStyle: "dashed"
                                        }}
                                    >
                                        <CIcon
                                            icon={cilCloudUpload}
                                            size="xl"
                                            className="mr-1"
                                        />
                                        Sube tu imagen
                                    </CAvatar>
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {
                    values?.imagen.length > 0 &&
                    <CCarousel className="mt-3" controls={values?.imagen.length > 1}>
                        {
                            values?.imagen.map(imagen => (
                                <CCarouselItem>
                                    <ImageCarousel 
                                        imagen={imagen}
                                    />
                                </CCarouselItem>
                            ))
                        }
                    </CCarousel>
                }
            </CCardBody>
        </CCard>
    )
}

export default RightForm
