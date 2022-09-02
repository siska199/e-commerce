import { Schema, models, model, SchemaTypes } from 'mongoose';



const NotificationSchema = new Schema({
    user: {
        type : SchemaTypes.ObjectId,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    
})

export default models.notifications || model("notifications", NotificationSchema)