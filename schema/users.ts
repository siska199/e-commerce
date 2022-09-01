import {Schema, models, model} from "mongoose"
import bcrypt from "bcrypt";

const UserSchema = new Schema({
	username : {
        type : String,
        trim : true,
        required : [true, `Username shouldn't be empty`],
        minLength : [3,`Username length cann't less than 3 character`],
        maxLength : [10, `Username length cann't more than 10 character`]
    },
	email : {
        type : String,
        required : [true, `Email shouldn't be empty`],
        trim : true,

    },
	password : {
        type : String,
        trim : true,
    },
	image : {
        type : String,
        trim : true,
    },
    role :{
        type : String,
        trime : true,
        enum : {
            values : ["user","admin"],
            message : '{VALUE} is not supported'
        },
        default : "user"
    },
	shippingAddress : {
        firstname : {
            type : String,
            trim : true,
        },
		lastname :{
            type : String,
            trim : true,
        },
		country :{
            type : String,
            trim : true,
        },
		address :{
            type : String,
            trim : true,
        },
		optional: {
            type : String,
            trim : true,
        },
		city :{
            type : String,
            trim : true,

        },
		postalcode :{
            type : String,
            trim : true,
        }
	}
},{timestamps:{createdAt:true, updatedAt:true}})

export default models.users || model("users",UserSchema)

//----------Validasi-----------//
let msgEmailError
UserSchema.path("email").validate(async (email:string):Promise<boolean>=>{
    const emailRegex = new RegExp("^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$");
    if(!emailRegex.test(email)){
        msgEmailError = 'Email should have a correct email address'
        return emailRegex.test(email)
    }
    const emailExist = await models.users.findOne({email})
    if(emailExist){
        msgEmailError = 'This email has been registered'
        return !emailExist
    }
    return true
},msgEmailError)

let msgUsernameError
UserSchema.path("username").validate(async(username:string):Promise<boolean>=>{
    const usernameExist = await models.users.findOne({username})
    if(usernameExist){
        msgUsernameError = 'This username has been existed'
        return !usernameExist
    }
    return true
},msgUsernameError)

UserSchema.path("password").validate((password:string)=>{
    const passwordRegex = new RegExp("^(?=.*[a-z])(?!.* )(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})");
    passwordRegex.test(password)
}, `Password at least have :
one numeric character,
one lowercase character,
one uppercase character,
one special symbol
and password length should be minimum 8 untul 20 character
`)

UserSchema.pre("save", async function(next){
    if(this.isModified("password") && this.password){
        console.log("get modified")
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
    return next()
})
