const { User } = require('../models/User');

let auth = (req, res, next) => {

    let token = req.cookies.x_auth; //��Ű ������ token�� �����ͼ�

    // ���� ó���� �ϴ� ��
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token; // token�� user�� �־������� ���ؼ� 
        req.user = user;
        next(); // next�� ������ middle ware�� ��������
    });

    // Ŭ���̾�Ʈ ��Ű���� ��ū�� �����´�.

    // ��ū�� ��ȣȭ�� �� ������ ã�´�.
    

    // ������ ������ ����okay ������ ���� No! 
}


module.exports = { auth };