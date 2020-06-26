// JavaScript source code
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require("./middleware/auth");
const {User} = require("./models/User");

const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,
{
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}
).then(()=> console.log('MongoDB Connected...'))
 .catch(err => console.log(err))
//mongodb+srv://JiHyun:<password>@firstcluster-yarkt.mongodb.net/test?retryWrites=true&w=majority

app.get('/', (req, res) => res.send('Hello World!  hihihihi~'))

app.get('/api/hello', (req, res) => {
    res.send("hiroo~~~ ~ ")
})

app.post('/api/users/register', (req, res) => { // => register route
	const user = new User(req.body) //  ??? ????? ????? USer??????? ???????? ???? ?????? ??????.

	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err})
		return res.status(200).json({
			success:true
		})
	})
})

app.post('/api/users/login', (req, res) => {
	// ????? ??????? ?????????????? ????? ??´?.
	User.findOne({email : req.body.email},(err, userInfo) => {
		if (!userInfo){
			return res.json({
				loginSuccess: false,
				message: "?????? ?????? ?????? ?????? ???????."
			})
		}

	// ????? ??????? ???????????? ???? ??й??????´? ??й??????????
	userInfo.comparePassword(req.body.password, (err, isMatch) => {
		if (!isMatch){
			return res.json({loginSuccess: false,message: "??й????????????."})
		}
	})

		// ??й????????´?? token?? ??????? 
	userInfo.generateToken((err, user) => {
		if(err) return res.statue(400).send(err);
		res.cookie("x_auth", user.token)
		.status(200)
		.json({ loginSuccess: true, userId: user._id })
	})

	})
})

app.get('/api/users/auth', auth, (req, res) => { // middle?? 콜백 function ??기 ??에 중간??서 ????주????.. 
	// ??기까?? 미들??어????과????다????기??Authentication??true??는 ??
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image : req.user.image
	})
})

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, {token: "" },
		(err, user) => {
			if (err) return res.json({ success: false, err });
			return res.status(200).send({
				_id : req.user.email,
				success:true
			})
		})
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))