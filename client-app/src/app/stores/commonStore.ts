import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        //reaction is called when jwt token reinitialized after page refresh
        reaction(
            () => this.token,
            token => {
                if (token){
                    window.localStorage.setItem('jwt',token);
                }
                else{
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        //if (!!token) window.localStorage.setItem('jwt', token);
        //above code is not required because if we set set token reaction will run and set the token for us
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}