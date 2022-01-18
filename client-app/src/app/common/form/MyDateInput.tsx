import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import Datepicker, {ReactDatePickerProps} from 'react-datepicker';


export default function MyDateInput(props: Partial<ReactDatePickerProps>) { //use Partial<> to make any mandatory property like onchange optional
    const [field, meta,helpers] = useField(props.name!); //react hooks given by formik // use ! because we know name cannot be empty

    //!!meta.error -- this will convert string type to boolean means meta.error has value
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <Datepicker
            {...field}
            {...props}
            selected={(field.value && (new Date(field.value) || null))}
            // (if field.value has value then new Date(field.value) else null)
            onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (<Label Basic color='red'>{meta.error}</Label>) : null}
        </Form.Field>
    )
}