import { actualizarProductoSchema, createProductoSchema } from "../../../validations/movimientos/productos";
import useProductoStore from "../../../hooks/useProductoStore";
import { OBTENER_PRODUCTO } from "../../../graphql/productos";
import { Field, Form, Formik, FormikProps } from "formik";
import { Producto, WrapperQuery } from "../../../types";
import { cilCloudUpload, cilSave } from "@coreui/icons";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CIcon from "@coreui/icons-react";
import Dropzone from "react-dropzone";
import { useState } from "react";
import {
    CAlert,
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCarousel,
    CCarouselItem,
    CCol,
    CFormInput,
    CFormTextarea,
    CImage,
    CRow,
    CSpinner,
} from "@coreui/react";

const EditProductoView = () => {

    const { id } = useParams<"id">()

    const { data: producto } = useQuery<WrapperQuery<Producto>>(OBTENER_PRODUCTO, {
        variables: {
          input: id 
        }
    })

    const { loading, handleActualizarProducto } = useProductoStore()
    
    const [ preview, setPreview ] = useState([])
    
    // const initialValues: CrearProducto = {
    //     descripcion: "",
    //     nombre: "",
    //     imagen: [],
    //     precio: 0,
    //     status: 0,
    // };

    return (
        <CCard>
            <CCardBody>
            <CRow>
            <Formik
                onSubmit={(producto) => handleActualizarProducto(producto , preview)}
                validationSchema={actualizarProductoSchema}
                initialValues={producto?.obtenerProducto}
                enableReinitialize={true}
            >
                
                {
                    ((props: FormikProps<any>) => (
                        <>
                            <CCol xs={8}>
                                <CCard>
                                    <CCardHeader>
                                        <strong>Producto Nuevo</strong>
                                    </CCardHeader>
                                    <CCardBody>
                                        {/* <pre>{JSON.stringify(props, null, 3)}</pre>
                                        <pre>{JSON.stringify(producto, null, 3)}</pre> */}
                                        <Form>
                                            <CRow>
                                                <CCol xs={12}>

                                                    <CFormInput
                                                        feedbackInvalid={props.errors.nombre ? `${props.errors.nombre}` : null}
                                                        className={`${props.errors.nombre ? "is-invalid" : ""} mb-2`}
                                                        placeholder="Nombre del producto..."
                                                        {...props.getFieldProps("nombre")}
                                                        disabled={loading}
                                                        autoComplete={null}
                                                        label="Nombre"
                                                        name="nombre"
                                                        type="text"
                                                    />

                                                    <CFormTextarea
                                                        feedbackInvalid={
                                                            props.errors.descripcion ? `${props.errors.descripcion}` : null
                                                        }
                                                        className={`${props.errors.descripcion ? "is-invalid" : ""} mb-2`}
                                                        placeholder="Descripcion del producto..."
                                                        {...props.getFieldProps("descripcion")}
                                                        autoComplete={"none"}
                                                        disabled={loading}
                                                        label="Descripción"
                                                        name="descripcion"
                                                        style={{
                                                            minHeight: "200px",
                                                        }}
                                                    />

                                                    <CFormInput
                                                        feedbackInvalid={props.errors.nombre ? `${props.errors.nombre}` : null}
                                                        className={`${props.errors.nombre ? "is-invalid" : ""} mb-2`}
                                                        placeholder="Precio del producto..."
                                                        {...props.getFieldProps("precio")}
                                                        autoComplete={"none"}
                                                        disabled={loading}
                                                        label="Precio"
                                                        name="precio"
                                                        type="number"
                                                    />
                                                    
                                                    <CFormInput
                                                        feedbackInvalid={props.errors.existencias ? `${props.errors.existencias}` : null}
                                                        className={`${props.errors.existencias ? "is-invalid" : ""} mb-2`}
                                                        placeholder="Existencias del producto..."
                                                        {...props.getFieldProps("existencias")}
                                                        autoComplete={"none"}
                                                        disabled={loading}
                                                        label="Existencias"
                                                        name="existencias"
                                                        type="number"
                                                    />

                                                    <div className="mt-2">
                                                        <label className="mb-05">Estado</label>
                                                        <Field
                                                            className={`form-select`}
                                                            as="select"
                                                            name="status"
                                                        >
                                                            <option value={0}>Activo</option>
                                                            <option value={1}>Inactivo</option>
                                                            <option value={2}>Pendiente</option>
                                                        </Field>
                                                    </div>
                                                </CCol>
                                            </CRow>

                                            <hr />

                                            <div className="mb- d-flex align-items-center justify-content-end">
                                                <CButton
                                                    disabled={loading}
                                                    type="submit"
                                                    color="primary"
                                                    shape="rounded-0"
                                                >
                                                    {!loading ? (
                                                        <>
                                                            <CIcon icon={cilSave} className="mr-1" />
                                                            Actualizar Producto
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CSpinner className="mr-1" size="sm" />
                                                            Guardando...
                                                        </>
                                                    )}
                                                </CButton>
                                            </div>
                                        </Form>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol xs={4}>
                                <CCard className="h-100">
                                    <CCardHeader>
                                        <strong>Imagenes</strong>
                                    </CCardHeader>
                                    <CCardBody>
                                        <Dropzone accept={{
                                            'image': ["*"]
                                        }} onDrop={(acceptedFiles) => {

                                            if (acceptedFiles.length == 0) return

                                            // props.setFieldValue("imagen", props.values.imagen.concat(acceptedFiles))

                                            const files = acceptedFiles.map(file => Object.assign(file, {
                                                preview: URL.createObjectURL(file)
                                            }))

                                            setPreview([
                                                ...preview,
                                                ...files
                                            ])

                                        }}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div
                                                        className="d-fle justify-content-center"
                                                        {...getRootProps()}
                                                    >
                                                        <div>
                                                            <input {...getInputProps()} />

                                                            {
                                                                props.errors.imagen &&
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
                                            preview.length > 0 &&
                                            <CCarousel className="mt-3" controls>
                                                {
                                                    preview.map(imagen => (
                                                        <CCarouselItem>
                                                            <CImage
                                                                className="d-block w-100"
                                                                src={imagen.preview}
                                                                alt="slide 1"
                                                            />
                                                        </CCarouselItem>
                                                    ))
                                                }
                                            </CCarousel>
                                        }

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </>
                    ))
                }
            </Formik>
        </CRow>
            </CCardBody>
        </CCard>
    );
};

export default EditProductoView;
