import mongoose from 'mongoose';
import i18n from '../../localization';

const churchmemberschema = mongoose.Schema({
    _id : { type : String},
    
    nationalid: {
        type:Number, 
        required: [ true, i18n.__('Id is required')],
        unique: true 
    },
    name: {
        type: String,
        required: [true, i18n.__('name i sRequired')]
    },
    mobile: {
        type: String,
        required: [true, i18n.__('mobile i sRequired')]
    },
    LastBooking:{
        type:Date,
    },

    IsEnable: {
        type: Boolean,
        
    }

});

churchmemberschema.method("toJSON", function() {
   
    const { object } = this.toObject();
    
    
    return object;
  });

const Churchmember = mongoose.model('ChurchMember', churchmemberschema);
export default Churchmember;