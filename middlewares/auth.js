function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).send('인증되지 않은 사용자');
}

module.exports = { isAuthenticated };