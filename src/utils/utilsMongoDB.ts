import { Dictionary } from '@fullcalendar/common';
// import { MongoClient } from "mongodb";

export const prepareForUpdateMongoObject = (object: any) => {
    console.log(typeof object);

    type K1 = keyof object;
    // console.log(K1)

    console.log(object.keys());
    // TODO:
    // get all keys from object
    // remove all keys that not in type of object
    // convert all id to ObjectId recursivly

    return object;
};
