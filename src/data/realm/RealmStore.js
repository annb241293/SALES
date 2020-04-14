const Realm = require('realm');
import { Observable } from 'rxjs';

export const SchemaName = {
    SERVER_EVENT: "ServerEventSchema"
}

// define schema
export const ServerEventSchema = {
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

export const insertServerEvent = async (newServerEvent) => {
    let realm = await Realm.open(databaseOption)
    return new Promise((resolve) => realm.write(() => {
        let serverEvent = realm.objectForPrimaryKey(SchemaName.SERVER_EVENT, newServerEvent.RowKey)
        if (serverEvent && serverEvent.Version > newServerEvent.Version) {
            console.log("insertServerEvent false");
            resolve({ result: false, serverEvent: serverEvent })
        } else {
            console.log("insertServerEvent true");
            realm.create(SchemaName.SERVER_EVENT, newServerEvent, true)
            resolve({ result: true, serverEvent: newServerEvent })
        }
    })
    )
}

export const insertServerEvents = (newServerEvents) => {
    return Observable.create( async (observer) => {
        let realm = await Realm.open(databaseOption)
        realm.write(() => {
            newServerEvents.map(newServerEvent => {
                let serverEvent = realm.objectForPrimaryKey(SchemaName.SERVER_EVENT, newServerEvent.RowKey)
                if (serverEvent && serverEvent.Version > newServerEvent.Version) {
                    console.log("insertServerEvent false");
                    observer.next({ result: false, serverEvent: serverEvent })
                } else {
                    console.log("insertServerEvent true");
                    realm.create(SchemaName.SERVER_EVENT, newServerEvent, true)
                    observer.next({ result: true, serverEvent: newServerEvent })
                }
            })
            observer.complete()
        })
    })
}

const databaseOption = {
    path: 'Pos365Boss.realm',
    schema: [ServerEventSchema],
    schemaVersion: 0
}

//export default realm = new Realm(databaseOption);