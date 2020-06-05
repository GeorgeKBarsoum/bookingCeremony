import Joi from 'joi';
import i18n from '../../localization';
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
    var array = req.body.data;
    array.forEach(element => {validateChurchMember(element)
    });
    array.forEach(element => {
        if(element != null)
        {
            var myobj = {nationalId: element.nationalId, name: element.name,mobile:element.mobile,enable : element.IsEnable ,lastdate:element.data};

            const churchmember = new ChurchMember({
                nationalId: element.body.nationalId,
                 name: element.body.name,
                 mobile:element.body.name,
                 enable:true,
                 lastdate:null
                
            });
        
        }
        
    });
   var result = await churchmember.save()

        .then(data => {
            console.log("right")
            res.send(data);
        })
        .catch(err => {
            console.log("wrong")
            res.status(500).send({
                message: err.message
            });
        });
};


//Update user

export const update = (req, res) => {
    const {
        error
    } = validateChurchMember(req.body.ChurchMember);
    if (error) return res.status(400).send(error.details[0].message);
};

// Validation helper Functions Part

function validateChurchMember(member) {
    const id = member.nationalId;
    const name = member.name;
    const mobile = member.mobile;

    const checkid =validateChurchMemberId(id);
    const checkname =validateChurchMemberName(name);
    const  checkmobile= validateChurchMemberMobile(mobile);
    if(checkid == true && checkname == true && checkmobile == true)
    {
        return member;
    } 
    else
    {
        return null;
    }
}

function validateChurchMemberId(id){
    try{
        var reg = new RegExp('^[0-9]+$');
        var test =reg.test(id);
    if (String(id).length==15 && test == true)
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
        var arabic = /[\u0600-\u06FF]/;
        var test =arabic.test(name);

        var length = String(name).split(" ").length - 1;

    if (test ==true && length == 4)
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
        var test2 =reg.test(id);
        if(test[0]=="0" && test[1]=="1" && test2 ==true )
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

