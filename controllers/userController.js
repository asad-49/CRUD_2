const {validationResult}= require('express-validator');
const bcrypt=require('bcryptjs');
const db=require('../config/dbCon');
const randomstring=require('randomstring');
const sendMail=require('../helper/sendMail')
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=process.env;
const register=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    db.query(
        `SELECT * FROM stu WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
        (err,result)=>{
            if(result&&result.length)
            {
                return res.status(409).send({
                    msg:'this user is already in use'
                });
            }
            else{
                bcrypt.genSalt(10,(err,salt)=>{       
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                    if(err)
                    {
                        return res.status(400).send({
                            msg:'not define'
                        });
                    }
                    else{
                        db.query(
                              `INSERT INTO stu(id,name,email,password) VALUES (${req.body.id},'${req.body.name}',${db.escape(
                                req.body.email
                              )},${db.escape(hash)});`,
                              (err,result)=>{
                                if(err){
                                return res.status(400).send({
                                    msg:'this is'
                                });}
                                
                                let mailSubject='mail verification';
                                const randomToken=randomstring.generate();
                                let content='<p>Hii '+req.body.name+',\
                                please <a href="http://127.0.0.1:3000/mail-verification?token='+randomToken+'" verify</a> your mail'
                                sendMail(req.body.email,mailSubject,content);
                                db.query('UPDATE stu set token=? where email=?',[randomToken,req.body.email],function (error,result) {
                                    if(error){
                                        return res.status(400).send({
                                            msg:+'no token'
                                        });

                                    }
                                });
                                return res.status(500).send({
                                    msg:'The user has been Registered'
                                });
                            
                              }
                        );
                    }
                });
            });
            }

        }
    )
}

const login=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    db.query(
     `SELECT * FROM stu WHERE email = ${db.escape(req.body.email)};`,
     (err,result)=>{
        if(err)
            {
                return res.status(400).send({
                    msg:err
                });
            }
            if(!result.length)
                {
                    return res.status(401).send({
                        msg:'incorrect data'
                    });
                }
                bcrypt.compare(
                    req.body.password,
                    result[0]['password'],
                    (bErr,bResult)=>{
                    if(bErr)
                    {
                        return res.status(400).send({
                            msg:bErr
                        });
                    }
                    if(bResult){
                        console.log(JWT_SECRET);
                        
                        const token=jwt.sign({id: result[0]['id'], is_admin:result[0]['is_admin']},JWT_SECRET,{expiresIn: '1h'});
                         db.query(
                            `UPDATE stu SET last_login =now() WHERE id='${result[0]['id']}'`
                         )
                         return res.status(200).send({
                            msg:'Successfuly logged in',
                            token,
                            user:result[0]

                        });
                    }
                    return res.status(401).send({
                        msg:'loss'
                    });
                    }
                    
                    

                );
     }
    );
}
const getUser=(req,res)=>{
    const authToken=req.headers.authorization.split(' ')[1];
    const decode=jwt.verify(authToken,JWT_SECRET);
    db.query('SELECT * FROM stu where id=?',decode.id,function(error,result,fields)
{
    if(error)
        throw error;
    return res.status(200).send({success:true, data:result[0],message:'fetch successfuly'});
})
}

const updateProfile=(req,res)=>{
    try{


    const errors=validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const token=req.headers.authorization.split(' ')[1];
    const decode=jwt.verify(token,JWT_SECRET);
    var sql='',data;
                
                    sql=`UPDATE stu SET name=?,email=?, where id = ?`;
                data=[req.body.name,req.body.email,decode.id]
                
                db.query(sql,data,function(error,result,fields){
                    if(error){
                         res.status(400).send({
                            msg:'NOT'
                        });
                    }
                    result.status(200).send({
                        msg:'upload'
                    });
                })
        
}catch(error){
    return res.status(400).json({msg:error.message});
}

}
module.exports={
    register,login,
    getUser,
    updateProfile
}