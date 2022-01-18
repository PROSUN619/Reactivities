import { observer } from "mobx-react-lite";
import React, {useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button,  Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MytextInput from "../../../app/common/form/MyTextInput";
import MytextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";
 

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading,
        loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    //hooks
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: null,
        description: '',
        category: '',
        city: '',
        venue: '',
    });
    //end

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
        // ! is used to avoid undefined warning because we know in this scenario 
        //activity cannot be undefined
    }, [id, loadActivity]); // use this dependancy because we want our activity rerender only
    //when id change. Otherwise it will rerender infinitely

    
    function handleSubmit(activity:Activity) {
        //console.log(activity);
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    // if we use formik then below 2 methods are commented
    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value });
    //     // ... is the spread operator set an activity with value
    // }
    // end if we use formik then below 2 methods are commented

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    //added validation to formik form control
    const validationSchema = Yup.object({
        title : Yup.string().required("The activity Title is required"),
        description : Yup.string().required("The activity description is required"),
        category : Yup.string().required(),
        date : Yup.string().required('date is required').nullable(),
        city : Yup.string().required(),
        venue : Yup.string().required(),
    })

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleSubmit(values)}>
                {/* enableReinitialize form reaload when activity change ex- manage event */}
                {/* formik provide us renderprop hence use the curly bracket then () to pass down destructured property below*/}
                {/* Here we are using formik library to build our activity form*/}
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                      // above passing down formik props                  
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        {/* <FormField>
                        <Field placeholder='Title' name='title' />    
                        <ErrorMessage name="title" render={error => <Label basic color = 'red' content={error}/>}/>
                        </FormField> */}
                        {/* Abobe formik code is now converted into component*/}
                        <MytextInput name='title' placeholder="Title"/>
                        <MytextArea rows={4} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput 
                        placeholderText='Date'
                        name='date'
                        showTimeSelect
                        timeCaption="time"
                        dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal'/>
                        <MytextInput placeholder='City' name='city' />
                        <MytextInput placeholder='Venue' name='venue' />
                        <Button disabled={isSubmitting || !dirty || !isValid} 
                        loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to={'/activities'} negative type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})