import { FormEditContext } from "./context/FormEditContext";
import RightForm from './components/RightForm';
import LeftForm from './components/LeftForm'
import { CCol, CRow, } from "@coreui/react";
import useForm from "./hooks/useForm";

const EditProductoView = () => {

    const form = useForm()

    return (
        <FormEditContext.Provider value={form}>
            <CRow>
                <CCol xs={8}>
                    <LeftForm/>
                </CCol>
                <CCol xs={4}>
                    <RightForm />
                </CCol>
            </CRow>
        </FormEditContext.Provider>
    );
};

export default EditProductoView;
