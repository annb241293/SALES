import { HTTPService } from "./services/HttpService";
import { ApiPath } from "./services/ApiPath";
import { insertServerEvents } from "./realm/RealmStore"

export const syncServerEvent = async () =>{
    let res = await new HTTPService().setPath(ApiPath.SERVER_EVENT).GET()
    console.log("syncServerEvent", res);
    
    if (res.length > 0)
        insertServerEvents(res).subscribe((res, serverEvent) => console.log(" dang ky ", res, serverEvent))

}