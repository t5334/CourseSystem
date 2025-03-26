const managerMW = (req, res, next) => {
    if(req.user.role!="Manager"){
        console.log(req.user);
        return res.status(401).json({ message: 'manager Unauthorized' })
    }
    next()
}
module.exports = managerMW