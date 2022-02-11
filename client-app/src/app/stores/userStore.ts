import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/User";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
        //!! covert string to boolean 
    }

    login = async (creds: UserFormValues) => {
        try{
           const user = await agent.Account.login(creds);
           //console.log(user.token);
           store.commonStore.setToken(user.token);
           //since this class is auto observable and executing after await is always better to use 
           //run in action while update the class property
           runInAction(() => this.user = user);
           history.push('/activities');
           store.modalStore.closeModal();
           //console.log(user);
        }
        catch(error){
           throw error;     
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () =>{ 
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error){
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try{
           const user = await agent.Account.register(creds);
           //console.log(user.token);
           store.commonStore.setToken(user.token);
           //since this class is auto observable and executing after await is always better to use 
           //run in action while update the class property
           runInAction(() => this.user = user);
           history.push('/activities');
           store.modalStore.closeModal();
           //console.log(user);
        }
        catch(error){
           throw error;     
        }
    }
}