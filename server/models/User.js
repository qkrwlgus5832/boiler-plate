const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true, // ï¿½ï¿½ï¿½ï¿½ï¿½Ì½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Ö´ï¿½ ï¿½ï¿½ï¿½ï¿½
		unique: 1
	},
	password : {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role:{
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String // ï¿½ï¿½È¿ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½
	},
	tokenExp :{
		type: Number
	}
})

userSchema.pre('save', function(next){
	var user = this;

	if (user.isModified('password')){
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err) return next(err)
				user.password = hash
				next()
			})
		})
	} 
	else {
		next()
	}
	// ï¿½ï¿½Ğ¹ï¿½È£ï¿½ï¿?ï¿½ï¿½È£È­ ï¿½ï¿½Å²ï¿½ï¿½.
}); // ï¿½ï¿½ï¿½ï¿½ï¿½Ï±ï¿½ ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Ñ´Ù´ï¿½ ï¿½ï¿½ 

userSchema.methods.comparePassword = function (plainPassword, cb) {
	// plainPassword 1234567 ï¿½ï¿½È£È­ï¿½ï¿½ ï¿½ï¿½Ğ¹ï¿½È£ï¿½ï¿?ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ Ã¼Å©
	// plainPasswordï¿½ï¿½ ï¿½ï¿½È£È­ï¿½Ø¼ï¿½ ï¿½ï¿½Ğ¹ï¿½È£ï¿½ï¿?ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ Ã¼Å©!
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function (cb) {
	const user = this;

	//jsonwebtokenï¿½ï¿½ ï¿½Ì¿ï¿½ï¿½Ø¼ï¿½ tokenï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Ï±ï¿½
	const token = jwt.sign(user._id.toHexString(), 'secretToken')

	user.token = token

	user.save(function (err, user) {
		if (err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function (token, cb){
	var user = this;

	// ? í°??decode ?œë‹¤.

	jwt.verify(token, 'secretToken', function (err, decoded) {
		// ? ì? ?„ì´?œë? ?´ìš©?´ì„œ ? ì?ë¥?ì°¾ì? ?¤ìŒ??
		// ?´ë¼?´ì–¸?¸ì—??ê°€?¸ì˜¨ tokenê³?DB??ë³´ê???? í°???¼ì¹˜?˜ëŠ”ì§€ ?•ì¸

		// findOne?€ mongoDB???´ë??ˆëŠ”ë©”ì†Œ??
		user.findOne({ "_id": decoded, "token": token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		})
	});
}
const User = mongoose.model('User', userSchema)

module.exports = { User };
