const SECRET = 'ewghaiancswsgw5454gsrgvsvsd'
const Account = require('../model/account')

const auth = async (req, res) => {
    const raw = String(req.headers.authorization).split(' ').pop();

    const { id } = jwt.verify(raw, SECRET);
    req.user = await Account.findById(id)
}

