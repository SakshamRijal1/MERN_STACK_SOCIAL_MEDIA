import { Inngest } from "inngest";
import User from "../models/User";
import { profile } from "console";
import { eventNames } from "cluster";
export const inngest =new Inngest({
  id:"socail-media-app"
})
const syncUserCreation=inngest.createFunction({
  id:"sync-user-data",
  triggers:[
    {
      event:"clerk/user.created"//source/object.action
    }
  ]
}, async({event})=>{
const {id,email_addresses,first_name,last_name,image_url}=event.data;
let email=email_addresses[0].email_address;
let full_name=first_name + " "+last_name;
let username=email_addresses[0].email_address.split('@')[0];
const user=await User.findOne(username);
if(user)
{
username=email_addresses[0].email_address.split('@')[0] + Math.floor(Math.random()*1000);

}
const userData={ 
  _id:id,
  full_name,
  username,
  profile_picture:image_url,
  email


}
await User.create(userData)

}
)
const syncUserUpdation=inngest.createFunction({
  id:"sync-user-updation",
  triggers:[
    {
      event:"clerk/user.action"//source/object.action
    }
  ]
},
async({event})=>{
  const {id,email_addresses,image_url,first_name,last_name}=event.data;
  const updatedData={
    email_addresses:email_addresses[0].email_address,
    full_name:first_name + " " + last_name,
    profile_picture:image_url,

  }
  User.findByIdAndUpdate(id,updatedData)

})

const syncUserDeletion=inngest.createFunction({
  id:"sync-user-deletion",
  triggers:[
    {
      event:"clerk/user.deleted"
    }
  ]
},async({event})=>{
  const{id}=event.data;
  User.findByIdAndDelete(id);
})



export const functions=[syncUserCreation,syncUserDeletion,syncUserUpdation]