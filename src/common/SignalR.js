import signalr from 'react-native-signalr';

const TYPE_NOTIFY = 'notify'
const TYPE_SALE_HUB = 'SaleHub'

export class SignalRManager {

    init() {
        const connectionHub = signalr.hubConnection("https://signalr.pos365.vn/signalr", {
            headers: {
                "User-Agent": "vn.pos365.cashierspos365",
                "Cookie": "ss-id=" + this.props.info.SessionId,
            },
            qs: {
                'rid': this.props.info.rId, 'bid': this.props.info.bId
            }
        })

        connectionHub.logging = true
        this.proxy = connectionHub.createHubProxy("saleHub")
        connectionHub.start()
            .done(() => {
                console.log('Now connected, connection ID=' + connectionHub.id);
                this.isStartSignalR = true
            })
            .fail(() => {
                console.log("Failed");

            })
    }

    sendMessage = (message, type = TYPE_SALE_HUB) => {
        if (this.isStartSignalR) {
            this.proxy.invoke(type, message)
                .done((response) => {
                    console.log('', response);
                })
                .fail(() => {
                    console.warn('Something went wrong when calling server, it might not be up and running?')
                });
        } else {
            console.log("settimeout");
            Alert.alert("Opps!", "Cannot connect to server")

        }
    }



}