import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!; // here destructuring will give 
    switch (status) {                                     //you an error but we know what error.response will be returning
        case 400:
            if (typeof data === 'string'){
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if (data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){ // "[]" object property accesor syntax
                        modalStateErrors.push(data.errors[key])
                    } 
                }
                throw modalStateErrors.flat(); // get list of string of error
            }
            // else{
            //     toast.error(data);
            // }
            //toast.error('bad request');
            break;
        case 401:
            toast.error('unauthorizes');
            break;
        case 404:
            //toast.error('not found');
            history.push('/NotFound');
            break;
        case 500:
            //toast.error('server error');
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;



const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),   // ` used for template string
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;