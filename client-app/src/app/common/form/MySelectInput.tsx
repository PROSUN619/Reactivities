import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

//this react component is based on formik,  to create our own textbox component
interface Props {
    placeholder: string,
    name: string,
    options:any,
    label?: string
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name); //react hooks given by formik

    //!!meta.error -- this will convert string type to boolean means meta.error has value
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(e,d) => helpers.setValue(d.value)}
            onBlur={() => helpers.setTouched(true)}
            placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (<Label Basic color='red'>{meta.error}</Label>) : null}
        </Form.Field>
    )
}