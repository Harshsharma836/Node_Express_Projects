import { users } from "../data/data";

        
export const user =(parent : any , userId : any , context : any) => {
          console.log(context)
          console.log("User id is " + userId.userId)
          return users.find(user => {
             return user.userId == userId.userId
          });
}

export const Address =() => {
    return Address
}
