// const jwt = require('jsonwebtoken')

// module.exports = (req, res, next) => {
//     try {
//         const decode = jwt.verify(req.body.token, "MY SECRET KEY")
//         req.userBody = decode
//         next()


//     } catch (e) {
//         return res.status(401).json({ message: e })
//     }
// }


const userIdMiddleware = (req, res, next) => {
    console.log("req in auth", req.headers)
    const userId = req.headers.userid
    console.log("user Id in auth", { userId })
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    req.userId = userId;
    next();
};

export default userIdMiddleware

// module.exports = userIdMiddleware;