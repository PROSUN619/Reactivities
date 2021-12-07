//import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    //title = 'Hello from MobX!';
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        // makeObservable(this,{
        //     title: observable,
        //     setTitle : action  //bind the function with observable
        // })
        makeAutoObservable(this); // automatic bind property with function
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }


    loadActivities = async () => {  // action function
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);        
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(true);
        }
    }

    loadActivity = async (id:string) => {
        let activity = this.getActivity(id);
        if (activity){
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;  // since this is an action so wrap it inside
                });// runinaction                
                this.setLoadingInitial(false);
                return activity;
            } 
            catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    
    private getActivity = (id:string) =>{
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity:Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {   // use runinaction while using 2nd statement after await
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }

    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }
    }




}