import mongoose from 'mongoose';
import i18n from '../../localization';

const churchmemberschema = mongoose.Schema({
    nationalid: {
        type: Number,
        required: [true, i18n.__('Id is required')],
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
        required: [true, i18n.__('Lastbooking is Required')]
    },

    IsEnable: {
        type: Boolean,
        required: [true, i18n.__('Is enabled is Required')]

    }

});

churchmemberschema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = churchmemberschema.nationalid;
    return object;
  });

const Churchmember = mongoose.model('ChurchMember', churchmemberschema);
export default Churchmember;