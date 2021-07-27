import {ObjectId} from 'bson';

class Container {
  constructor({
    containerNumber,
    realm_id,
    position,
    id = new ObjectId(),
  }) {
    this.containerNumber = containerNumber;
    this._id = id;
    this.realm_id = realm_id;
    this.position = position;
  }

  static  schema = {
    containerNumber: "Container",
    properties: {
      _id: "objectId",
      realm_id: "string",
      containerNumber: "string",
      position: "string",
    },
    primaryKey: "_id",
  };
}
export {Container};