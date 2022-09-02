import { Schema, models, model, SchemaTypes } from 'mongoose';

const OrderSchema = new Schema({
	user : {
        type : SchemaTypes.ObjectId,
        required : true
    },
	products: [
		{
			product : {
                type : SchemaTypes.ObjectId,
                required : true
            },
			quantity : {type:Number, required :true},
			options : {
				color : {type:String, required :true},
				size : {type:String, required :true}
			}
		}		
	],
	totalPrice:{
        type : String,
        required : true
    },
	status : {
        type : String,
        enum : {
            values : ["on prosess", "approved", "rejected"],
            message : '{VALUE} is not supported'
        }
    }
})

export default models.orders || model("orders", OrderSchema)