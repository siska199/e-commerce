import { Schema, models, model, SchemaTypes } from 'mongoose';
import products from './products';

const CartSchema = new Schema({
	user : {
        type : SchemaTypes.ObjectId,
        required : true
    },
	products: [
		{
			product : {
                type : SchemaTypes.ObjectId,
                required : true,
                ref : products
            },
			quantity : {
                type:Number, 
                required :true
            },
			options : {
				color : {
                    type:String, 
                    required :true
                },
				size : {
                    type:String, 
                    required :true
                }
			}
		}		
	],
	totalPrice:{
        type : String,
        required : true
    },
})

export default models.carts || model("carts", CartSchema)
