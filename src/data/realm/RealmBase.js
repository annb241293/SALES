import { schemaVersion } from 'realm';
const Realm = require('realm');

//define function
export const queryAll = async (schema) => {
    let realm = await Realm.open(databaseOption)
    return realm.objects(schema)
}

export const insertNewData = async (schema, data) => {
    let realm = await Realm.open(databaseOption)
    return new Promise((resolve) => realm.write(() => {
        realm.create(schema, data)
        resolve(data)
    })
    )
}

export const insertData = async (schema, data) => {
    let realm = await Realm.open(databaseOption)
    return new Promise((resolve) => realm.write(() => {
        realm.create(schema, data, true)
        resolve(data)
    })
    )
}

export const insertDatas = async (schema, datas) => {
    let realm = await Realm.open(databaseOption)
    return new Promise((resolve) => realm.write(() => {
        datas.map( data => {
            realm.create(schema, data, true)
        })
        resolve(datas)  
    })
    )
}