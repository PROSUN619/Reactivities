import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MytextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationErrors";


export default observer (function RegisterForm(){
   const{userStore} = useStore();
    return (
        <Formik
        initialValues={{displayName: '', username: '', email:'',password:'',error:null}}
        onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => {
            setErrors({error:error})
            //since error param and error variable same so we can use
            //setErrors({error})    
        })}
        validationSchema={Yup.object(
            {
                displayName: Yup.string().required(),
                username : Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required()
            }
        )}
        >

        {/* Handle Render Props*/}
        {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
            <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign Up Reactivities' color="teal" textAlign="center" />
                    <MytextInput name="displayName" placeholder="Display Name"/>
                    <MytextInput name="username" placeholder="User Name"/>
                    <MytextInput name="email" placeholder="Email"/>
                    <MytextInput name="password" placeholder="Password" type="password"/>
                    <ErrorMessage
                     name="error" render={() => 
                        // <Label style={{marginBottom:10}} basic color='red' content={errors.error}/>
                        <ValidationError errors={errors.error} />
                    }
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}  
                    loading={isSubmitting} positive content='Register' type='submit' fluid/>
            </Form>
        )}    
        </Formik>
    )
})