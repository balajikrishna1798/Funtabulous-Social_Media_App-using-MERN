import moment from "moment";
import { Event } from "../models/Event"

export const createEvent = async(req:any,res:any) =>{
    const event = new Event({...req.body,creator:req.userId,createdAt:new Date().toISOString()});
    try {
        if(event){
        await event.save();
        console.log(event);
        res.status(200).send(event)
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}

export const getEvent =async (req,res) => {
    const events = await Event.find({
        start:{
            $gte:moment(req.query.start).toDate()},  
        end:{
            $lte:moment(req.query.end).toDate()},
        }  
    )
    res.send(events)
}