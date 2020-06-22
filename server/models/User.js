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
		trim: true, // �����̽��� �����ִ� ����
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
		type: String // ��ȿ�� ����
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
	// ��й�ȣ��?��ȣȭ ��Ų��.
}); // �����ϱ� ���� ������ �Ѵٴ� �� 

userSchema.methods.comparePassword = function (plainPassword, cb) {
	// plainPassword 1234567 ��ȣȭ�� ��й�ȣ��?������ üũ
	// plainPassword�� ��ȣȭ�ؼ� ��й�ȣ��?������ üũ!
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function (cb) {
	const user = this;

	//jsonwebtoken�� �̿��ؼ� token�� �����ϱ�
	const token = jwt.sign(user._id.toHexString(), 'secretToken')

	user.token = token

	user.save(function (err, user) {
		if (err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function (token, cb){
	var user = this;

	// ?�큰??decode ?�다.

	jwt.verify(token, 'secretToken', function (err, decoded) {
		// ?��? ?�이?��? ?�용?�서 ?��?�?찾�? ?�음??
		// ?�라?�언?�에??가?�온 token�?DB??보�????�큰???�치?�는지 ?�인

		// findOne?� mongoDB???��??�는메소??
		user.findOne({ "_id": decoded, "token": token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		})
	});
}
const User = mongoose.model('User', userSchema)

module.exports = { User };
