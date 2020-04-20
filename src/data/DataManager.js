import { HTTPService } from "./services/HttpService";
import { ApiPath } from "./services/ApiPath";
import realmStore, { SchemaName } from "./realm/RealmStore"
import { Observable, map } from 'rxjs';

export const syncServerEvent = async () => {
    let res = await new HTTPService().setPath(ApiPath.SERVER_EVENT).GET()
    console.log("syncSE", res);

    if (res.length > 0)
        realmStore.insertServerEvents(res).subscribe((res, serverEvent) => console.log("syncServerEvent", res, serverEvent))
}

export const syncProduct = async () => {
    let res = await new HTTPService().setPath(ApiPath.SYNC_PRODUCTS).GET()
    console.log("syncProduct", res);

    if (res.Data && res.Data.length > 0)
        await realmStore.insertProducts(res.Data)
}

const syncData = async (apiPath, schemaName) => {
    let res = await new HTTPService().setPath(apiPath).GET()
    console.log("sync", apiPath, res);

    if (res.Data && res.Data.length > 0)
        await realmStore.insertDatas(schemaName, res.Data)
}

export const syncAllDatas = async () => {
    console.log("syncAllDatas");
    await Promise.all(
        syncServerEvent(),
        syncProduct(),
        syncData(ApiPath.SYNC_ROOMS, SchemaName.ROOM),
        syncData(ApiPath.SYNC_ROOM_GROUPS, SchemaName.ROOM_GROUP)
    )
}