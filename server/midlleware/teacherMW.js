const teacherMW = (req, res, next) => {
    if(!(req.user.role==="Teacer"||req.user.role==="Manager")){
        return res.status(401).json({ message: 'teacher Unauthorized' })
    }
    next()
}
module.exports = teacherMW