import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({

    from:{type:Date},
    to:{type:Date},
    eventMsg:{type:String},
},{
//@ts-expect-error
    timeStamps:{type:Boolean,default:true}
})
export const Event = mongoose.model("Event",EventSchema)