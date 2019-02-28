const express = require('express')
const router = express.Router()
const httpUtility = require('../Modules/httpUtility')
const user = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../Modules/config')
const roleMap = require('../Models/roleMap')

console.log('Loaded Route : User')

router.post('/create', (req, res) => {
    let newUser = {
        userPhoneNumber: req.body.userPhoneNumber
    }

    bcrypt.genSalt(10, (genSaltError, salt) => {
        if (genSaltError) {
            httpUtility.sendResponse(res, true, genSaltError)
        } else {
            bcrypt.hash(req.body.password, salt, (hashError, hash) => {
                if (hashError) {
                    console.log(hashError)
                    httpUtility.sendResponse(res, true, hashError)
                } else {
                    newUser.password = hash;
                    newUser = new user(newUser)
                    newUser.save((saveError, saveDocs) => {
                        if (saveError) {
                            httpUtility.sendResponse(res, true, saveError)
                        } else {
                            httpUtility.sendResponse(res, false, "User Created Successfully")
                        }
                    })
                }
            });
        }
    });
})

router.post('/authenticate', (req, res) => {
    user.find({ userPhoneNumber: req.body.userPhoneNumber }, (findError, findDocs) => {
        if (findError) {
            httpUtility.sendResponse(res, true, findError)
        } else {
            if (findDocs.length == 0) {
                httpUtility.sendResponse(res, false, "Cannot find an User")
            } else {
                bcrypt.compare(req.body.password, findDocs[0].password, (compareError, isMatched) => {
                    if (compareError) {
                        httpUtility.sendResponse(res, true, compareError)
                    } else {
                        if (!isMatched) {
                            httpUtility.sendResponse(res, false, "Invalid Password")
                        } else {
                            roleMap.find({ userId: findDocs[0]._id }).populate('roleId').exec((roleMapFindError, roleMapFindDocs) => {
                                if (roleMapFindError) {
                                    httpUtility.sendResponse(res, true, roleMapFindError)
                                } else {
                                    if (roleMapFindDocs.length == 0) {
                                        httpUtility.sendResponse(res, false, "No Roles Assigned")
                                    } else {
                                        const token = jwt.sign({ data: findDocs[0] }, config.webTokenSecret, {
                                            expiresIn: 604800 // 1 week
                                        });
                                        let responseData = {
                                            token: 'JWT ' + token,
                                            user: {
                                                _id: findDocs[0]._id,
                                                userPhoneNumber: findDocs[0].userPhoneNumber,
                                                roles: roleMapFindDocs
                                            }
                                        }
                                        httpUtility.sendResponse(res, false, responseData)
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

router.post('/delete', (req, res) => {
    roleMap.deleteMany({userId: req.body._id}).exec((roleMapRemoveError, roleMapRemoveDocs)=>{
        if(roleMapRemoveError){
            httpUtility.sendResponse(res, true, roleMapRemoveDocs)
        } else {
            user.findByIdAndRemove(req.body._id,(userRemoveError, userRemoveDocs)=>{
                if(userRemoveError) {
                    httpUtility.sendResponse(res, true, userRemoveError)
                } else {
                    httpUtility.sendResponse(res, false, "User removed Successfully")                    
                }
            })
        }
    })
})

module.exports = router