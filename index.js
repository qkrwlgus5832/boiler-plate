// JavaScript source code
const express = require('express')
const app = express()
const port = 3000
const {User} = require("./models/User");

const config = require('./config/key');

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,
{
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}
).then(()=> console.log('MongoDB Connected...'))
 .catch(err => console.log(err))
//mongodb+srv://JiHyun:<password>@firstcluster-yarkt.mongodb.net/test?retryWrites=true&w=majority

app.get('/', (req, res) => res.send('Hello World!  hihihihi~'))

app.post('/register', (req, res) => {
	const user = new User(req.body)
	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err})
		return res.status(200).json({
			success:true
		})
	})
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))