const Realm = require('realm');
import { Observable } from 'rxjs';
import { RealmBase } from './RealmBase';

class RealmStore extends RealmBase{

    constructor() {
         return super();
    }

    //override
    insertDatas(schema, datas) {
        return super.insertDatas(databaseOption, schema, datas);
    }

    //server event
    insertServerEvent = async (newServerEvent) => {
        let realm = await Realm.open(databaseOption)
        return new Promise((resolve) => realm.write(() => {
            let serverEvent = realm.objectForPrimaryKey(SchemaName.SERVER_EVENT, newServerEvent.RowKey)
            if (serverEvent && serverEvent.Version > newServerEvent.Version) {
                resolve({ result: false, serverEvent: serverEvent })
            } else {
                realm.create(SchemaName.SERVER_EVENT, newServerEvent, true)
                resolve({ result: true, serverEvent: newServerEvent })
            }
        })
        )
    }

    insertServerEvents(newServerEvents) {
        return Observable.create( async (observer) => { 
            let realm = await Realm.open(databaseOption)

            realm.write(() => {
                newServerEvents.map(newServerEvent => {
                    let serverEvent = realm.objectForPrimaryKey(SchemaName.SERVER_EVENT, newServerEvent.RowKey)
                    if (serverEvent && serverEvent.Version > newServerEvent.Version) {
                        observer.next({ result: false, serverEvent: serverEvent })
                    } else {
                        realm.create(SchemaName.SERVER_EVENT, newServerEvent, true)
                        observer.next({ result: true, serverEvent: newServerEvent })
                    }
                })
                observer.complete()
            })
        })
    }

    queryServerEvents = async () =>  {
        return this.queryAll(databaseOption, SchemaName.SERVER_EVENT)
    }

    //Room
    insertRooms (newRooms) {
        return this.insertDatas(databaseOption, SchemaName.ROOM, newRooms)
    }

    queryRooms () {
        return this.queryAll(databaseOption, SchemaName.ROOM)
    }

    //RoomGroup
    insertRoomGroups (newRoomGroups) {
        return this.insertDatas( databaseOption, SchemaName.ROOM_GROUP, newRoomGroups)
    }

    queryRoomGroups () {
        return this.queryAll(databaseOption, SchemaName.ROOM_GROUP)
    }

    //Product
    async insertProducts (newProducts) {
        let realm = await Realm.open(databaseOption)
        return new Promise((resolve) => realm.write(() => {
            newProducts.map( product => {                                
                product.ProductImages = JSON.stringify(product.ProductImages)
                realm.create(SchemaName.PRODUCT, product, true)
            })
            resolve(newProducts)  
        })
        )    
    }

    queryProducts () {
        return this.queryAll(databaseOption, SchemaName.PRODUCT)
    }

    //Categories
    insertCategories (newCategories) {
        return this.insertDatas( databaseOption, SchemaName.CATEGORIES, newCategories)
    }

    queryCategories () {
        return this.queryAll(databaseOption, SchemaName.CATEGORIES)
    }

}

//define schema
export const SchemaName = {
    SERVER_EVENT: "ServerEventSchema",
    ROOM: "Room",
    ROOM_GROUP: "RoomGroup",
    PRODUCT: "Product",
    CATEGORIES: "Categories"
}

const ServerEventSchema = {
    name: SchemaName.SERVER_EVENT,
    primaryKey: 'RowKey',
    properties: {
        RoomId: 'int',
        Position: 'string',
        Version: 'int',
        JsonContent: "string",
        Compress: 'bool',
        PartitionKey: 'string',
        RowKey: 'string',
        Timestamp: 'string',
        ETag: 'string'
    }
}

const RoomSchema = {
    name: SchemaName.ROOM,
    primaryKey: 'Id',
    properties: {
        Id: 'int',
        Name: 'string',
        Position: 'int',
        Description: {type: 'string', default: ""},
        RoomGroupId: {type: 'int', default: 0},
        Printer: {type: 'string', default: ""},
    }
}

const RoomGroupSchema = {
    name: SchemaName.ROOM_GROUP,
    primaryKey: 'Id',
    properties: {
        Id: 'int',
        Name: 'string'
    }
}

const ProductSchema = {
    name: SchemaName.PRODUCT,
    primaryKey: 'Id',
    properties: {
        Id: 'int',
        Code: 'string',
        Name: 'string',
        AttributesName: 'string',
        Price: 'double',
        PriceLargeUnit: 'double',
        OnHand: 'double',
        ProductImages: 'string',
        IsSerialNumberTracking: 'bool',
        IsPercentageOfTotalOrder: 'bool',
        ConversionValue: 'double',
        SplitForSalesOrder: 'bool',
        Printer: 'string',
        ProductType: 'int',
        Coefficient: { type: 'double', default: 0.0},
        BonusPoint: 'double',
        BonusPointForAssistant: 'double',
        BonusPointForAssistant2: 'double',
        BonusPointForAssistant3: 'double',
        PriceConfig: {type: 'string', default: "{}"},
        BlockOfTimeToUseService: 'double',
        IsPriceForBlock: 'bool'
    }
}

const CategoriesSchema = {
    name: SchemaName.CATEGORIES,
    primaryKey: 'Id',
    properties: {
        Id: 'int',
        Name: 'string',
        ParentId: {type: 'int', default: 0}
    }
}

const databaseOption = {
    path: 'Pos365Boss.realm',
    schema: [ServerEventSchema, RoomSchema, RoomGroupSchema, ProductSchema, CategoriesSchema],
    schemaVersion: 3
}

const realmStore = new RealmStore();

export default realmStore;

//export default realm = new Realm(databaseOption);