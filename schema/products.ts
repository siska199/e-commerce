import { Schema,  models ,  model, SchemaTypes} from 'mongoose';

const CommentSchema = new Schema({
    user : {
        type : SchemaTypes.ObjectId,
        required : true,
    },
    body : {
        type : String,
        required : true
    }
})

const ReviewSchema = new Schema({
    user : {
        type : SchemaTypes.ObjectId,
        required : true
    },
    rate : {
        type : Number,
        required : true,
        maxLength : 5
    }
})

const ProductSchema = new Schema({
	name : {
        type : String,
        trim : true,
        required : [true, `Product's name shouldn't be empty`],
        maxLength : [10, `Product's name length cann't more than 50 character`]
    },
	price : {
        type : Number,
        trim : true,
        required : [true, `Product's price shouldn't be empty`],
    },
	images : {
        type : Array,
        trim : true,
        required : [true, `Product's images shouldn't be empty`],
    },
	desc : {
        type : String,
        trim : true,
        required : [true, `Product's desc shouldn't be empty`],
    },
	info:{
        type : String,
        trim : true,
    },
	comments: [CommentSchema],
	reviews : [ReviewSchema],
	stocks : {
        type : Number,
        trim : true,
        required : [true, `Product's stock shouldn't be empty`],
    },
	category : {
        type : SchemaTypes.ObjectId,
        required : [true, `Product's category shouldn't be empty`],
    },
	options : {
		colors: {
            type : Array,
            required : [true, `Product's colors shouldn't be empty`],
        },
		sizes : {
            type : Array,
            required : [true, `Product's sizes shouldn't be empty`],
        },
	}
},{timestamps:{createdAt:true, updatedAt:true}})

export default models.products || model("product", ProductSchema)

