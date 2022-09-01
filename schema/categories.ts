import { Schema, models, model } from 'mongoose';

const CartSchema = new Schema({
    name : {
        type : String,
        required : [true, `Cart's name shouldn't be empty`],
    }
},{timestamps:{createdAt:true, updatedAt:true}})

export default models.categories || model("categories", CartSchema)