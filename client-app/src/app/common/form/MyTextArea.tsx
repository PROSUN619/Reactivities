import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

//this react component is based on formik,  to create our own textbox component
interface Props {
    placeholder: string,
    name: string,
    rows:number,
    label?: string
}

export default function MytextArea(props: Props) {
    const [field, meta] = useField(props.name); //react hooks given by formik

    //!!meta.error -- this will convert string type to boolean means meta.error has value
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (<Label Basic color='red'>{meta.error}</Label>) : null}
        </Form.Field>
    )
}