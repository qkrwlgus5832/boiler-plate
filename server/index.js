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
	const user = new User(req.body) //  È¸¿ø °¡ÀÔ¿¡ ÇÊ¿äÇÑ USerµ¥ÀÌÅÍ¸¦ °¡Á®¿À¸é ±×°Å¸¦ ¼­¹ö¿¡ ³Ö¾îÁØ´Ù.

	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err})
		return res.status(200).json({
			success:true
		})
	})
})

app.post('/api/users/login', (req, res) => {
	// ï¿½ï¿½Ã»ï¿½ï¿½ ï¿½Ì¸ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Íºï¿½ï¿½Ì½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Ö´ï¿½ï¿½ï¿½ Ã£ï¿½Â´ï¿½.
	User.findOne({email : req.body.email},(err, userInfo) => {
		if (!userInfo){
			return res.json({
				loginSuccess: false,
				message: "ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Ì¸ï¿½ï¿½Ï¿ï¿½ ï¿½Ø´ï¿½ï¿½Ï´ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Ï´ï¿½."
			})
		}

	// ï¿½ï¿½Ã»ï¿½ï¿½ ï¿½Ì¸ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Íºï¿½ï¿½Ì½ï¿½ï¿½ï¿½ ï¿½Ö´Ù¸ï¿½ ï¿½ï¿½Ð¹ï¿½È£ï¿½ï¿?ï¿½Â´ï¿½ ï¿½ï¿½Ð¹ï¿½È£ï¿½ï¿½ï¿½ï¿?È®ï¿½ï¿½
	userInfo.comparePassword(req.body.password, (err, isMatch) => {
		if (!isMatch){
			return res.json({loginSuccess: false,message: "ï¿½ï¿½Ð¹ï¿½È£ï¿½ï¿?Æ²ï¿½È½ï¿½ï¿½Ï´ï¿½."})
		}
	})

		// ï¿½ï¿½Ð¹ï¿½È£ï¿½ï¿½ï¿½ï¿?ï¿½Â´Ù¸ï¿½ tokenï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ï¿½Ï±ï¿½ 
	userInfo.generateToken((err, user) => {
		if(err) return res.statue(400).send(err);
		res.cookie("x_auth", user.token)
		.status(200)
		.json({ loginSuccess: true, userId: user._id })
	})

	})
})

app.get('/api/users/auth', auth, (req, res) => { // middle?€ ì½œë°± function ?˜ê¸° ?„ì— ì¤‘ê°„?ì„œ ë­??´ì£¼??ê²?.. 
	// ?¬ê¸°ê¹Œì? ë¯¸ë“¤?¨ì–´ë¥??µê³¼???”ë‹¤???˜ê¸°??Authentication??true?¼ëŠ” ë§?
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