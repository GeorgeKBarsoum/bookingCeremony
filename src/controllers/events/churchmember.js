import Joi from 'joi';
import i18n from '../../localization';
import { Mongoose, mongo } from 'mongoose';
const db = require("../../db");
const ChurchMember = db.ChurchMember;

//Find one value that that match the ide
export const getinfo = (req, res) => {
    const id = req.params.nationalId;
    db.ChurchMember.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: i18n.__("This User "+id +"doesn't exist")
                });
            
            else res.send(data);
        })
        .catch(err => {
            res
                .status(404)
                .send({
                    message: i18n.__("This User "+id +"doesn't exist") 
                });
        }); 

};


//create new users
export const postinfo = async (req, res) => {
    //console.log("Entered")
    var array = req.body;
   
    var saved=[];
    var result;
    for(var i = 0 ; i < array.length;i++)

    {
       
       

        if(array[i]!= null && validateChurchMember(array[i]))
        {
          
            const churchmember = new ChurchMember({         
                 
                 nationalid: array[i].nationalid,
                 name: array[i].name,
                 mobile:array[i].mobile,
                 IsEnable:true,
                 lastBooking:null
                
            });
        result= await ChurchMember.insertMany(array[i]);
        saved.push(churchmember._id);
    }
    if(saved != [])

    {
        res.send(saved)
        
    }
    else{
        res.status(500).send({
                   message: err.message
                });

    }
   
        // saved.then(data => {
        //     console.log("right")
        //     res.send(data);
        // })
        // .catch(err => {
        //     console.log("wrong")
        //     
        //    
        // });
        
    };
   
};



//Update user

export const update = (req, res) => {
    var element = req.body[1];
    
    if(validateChurchMember(element))
    {
        var myquery =  req.body[0] ;
        var newvalues =   req.body[1] ;
        
        console.log(req.body[0])
       const churchmember = db.ChurchMember.update(myquery, newvalues,function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
        churchmember.save();
        res.send(req.body[0].nationalid)
   
    }
    else{
        res.status(500).send({
                   message: err.message
                });

    }
 
    


  
};

// Validation helper Functions Part

function validateChurchMember(member) {
    const id = member.nationalid;
    const name = member.name;
    const mobile = member.mobile;


    const checkid =validateChurchMemberId(id);
    console.log("id")
    console.log(checkid)
    
    
    const checkname =validateChurchMemberName(name);
    console.log("name")
    console.log(checkname)
    
    const  checkmobile= validateChurchMemberMobile(mobile);
    console.log("mobile")
    console.log(checkmobile)
    
    if(checkid == true && checkname == true && checkmobile == true)
    {
        return true;
    } 
    else
    {
        return false;
    }
}

function validateChurchMemberId(id){
    try{
        var reg = new RegExp('^[0-9]+$');
        var test =reg.test(id);
        
      
    if (id.length==14 && test == true)
    {
        return true;

    }

    else{
        return false;
    }
}
catch{
    return false;
}


}

function validateChurchMemberName(name){
    try{
       
        console.log(name)
        var arabic = /[\u0600-\u06FF]/;
      

        const test=arabic.test(name);
      

       

        const size = (name.split(" ").length ) ;
        

       

    if ( size == 4 && test == true)
    {
        return true;
    }

    else{
        return false;
    }
}
catch{
    
    return false;
}
}
function validateChurchMemberMobile(mobile)
{

    try{
        var test1 = String(mobile);
        var reg = new RegExp('^[0-9]+$');
        var test2 =reg.test(mobile);
      
        
        if( test1[0]=='0'&&test1[1]=="1"&& test2 ==true && test1.length==11)
        { 
            return true;
            
        }
        else {
            return false;
        }


    }
    catch{
        return false;
    }
}

