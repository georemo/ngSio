import { Observable } from 'rxjs';

/**
 * @path // the path of the controller relative to the BaseService file
 * @clsName // class name
 * @action // class method to invoke
 */
export interface IControllerContext {
    path: string;
    clsName: string;
    action: string;
}

export interface IModelRules {
    create: object;
    update: object;
    remove: object;
}

// cd request format
export interface ICdRequest {
    ctx: string;
    m: string;
    c: string;
    a: string;
    dat: any;
    args: object;
}

export interface ICdResponse {
    app_state: {
        success: boolean;
        info: IRespInfo;
        sess: ISessResp;
        cache: object;
        sConfig?: IServerConfig;
    };
    data: object;
}

// export interface ISessResp {
//     cd_token?: string;
//     userId?: number | null;
//     jwt?: string;
//     ttl: number;
// }

export interface ISessResp {
    cd_token?: string;
    userId?: number | null;
    jwt: JWT | null;
    ttl: number;
    initUuid?: string;
    initTime?: string;
}

export interface JWT {
    jwtToken: string;
    checked: boolean;
    checkTime: number;
    authorized: boolean;
}

export interface IRespInfo {
    messages: string[];
    code: string;
    app_msg: any;
}

export interface IServerConfig {
    usePush: boolean;
    usePolling: boolean;
    useCacheStore: boolean;
}

export const DEFAULT_CD_REQUEST: ICdRequest = {
    ctx: 'Sys',
    m: '',
    c: '',
    a: '',
    dat: {
        f_vals: [
            {
                data: {}
            }
        ],
        token: ''
    },
    args: {}
};

export const DEFAULT_CD_RESPONSE: ICdResponse = {
    app_state: {
        success: false,
        info: {
            messages: [],
            code: '',
            app_msg: ''
        },
        sess: {
            cd_token: '',
            jwt: null,
            ttl: 600
        },
        cache: {}
    },
    data: []
};

export interface EnvConfig {
    production: boolean;
    apiEndpoint: string;
    consumerToken: string;// current company consumer
    USER_RESOURCES: string;
    HOST: string;
    CD_PORT?: number; // optional setting for apiEndpoint
    consumer: string;
    clientAppId: number; // this client application identifies itself to the server with this id
    clientAppGuid: string; // this client application identifies itself to the server with this guid, to depricate clientAppId
    SOCKET_IO_PORT: number; // push server port
}

// export interface ICdPushEnvelop {
//     pushRecepients: any;
//     triggerEvent: string;
//     emittEvent: string;
//     req: ICdRequest;
//     resp: ICdResponse;
//     pushData?: any;
// }

export interface ICdPushEnvelop {
    pushData: {
        pushGuid: string,
        m?: string,
        pushRecepients: ICommConversationSub[],
        triggerEvent: string,
        emittEvent: string,
        token: string,
        commTrack: CommTrack
    },
    req: ICdRequest | null,
    resp: ICdResponse | null
};

export interface ICommConversationSub {
    userId: number; // subscriber userId
    subTypeId: number; // type of subscriber
    commconversationId?: number;
    commconversationsubId?: number;
    commconversationsubInvited?: boolean;
    commconversationsubAccepted?: boolean;
    groupId?: number; // can be used to represent chat room in websocket service
    // commTrack: CommTrack;
    cdObjId: CdObjId;
}

export interface CommTrack {
    initTime: number | null,
    relayTime: number | null,
    pushed: boolean,
    pushTime: number | null,
    relayed: boolean,
    deliveryTime: number | null,
    deliverd: boolean,
}

export interface CdObjId {
    appId: string;
    ngModule: string | null;
    resourceName: string | null;
    resourceGuid: string | null;
    jwtToken: string | null;
    socket: any;
    socketId?: string;
    commTrack: CommTrack | null;
}

export interface IServiceInput {
    serviceInstance?: any;
    serviceModel: any;
    serviceModelInstance?: any;
    docName?: string;
    cmd?: Cmd;
    data?: any;
    dSource?: number;
    extraInfo?: boolean;
}

export enum StorageType {
    CdObjId = 0,
    IAppState = 1,
}

export interface IAppState {
    success: boolean;
    info: IRespInfo | null;
    sess: ISessResp | null;
    cache: object | null;
    sConfig?: IServerConfig;
}


export interface LsFilter {
    storageType: StorageType;
    cdObjId?: CdObjId,
    appState?: IAppState
}

export interface Cmd {
    action: string;
    query: IQuery;
}

export interface IDoc {
    doc_id?: number;
    doc_guid?: string;
    doc_name?: string;
    doc_description?: string;
    company_id?: number;
    doc_from: number;
    doc_type_id: number;
    doc_date?: Date;
    attach_guid?: string;
    doc_expire_date?: Date;
}

export type ClassRef = new (...args: any[]) => any;
export type Fn = () => void;

export interface IUser {
    userID: number;
    userGUID: string;
    userName: string;
}
export interface IBase {
    cdToken: string;
    cRules: object;
    uRules: object;
    dRules: object;
}

export interface IAclCtx {
    memberGuid: string;
    moduleGroupGuid: any;
    consumerId: number;
    moduleName: string;
    currentUser: any,
    module: any,
}

export interface IQuery {
    select?: string[];
    where: object;
    take?: number;
    skip?: number;
}

export interface ObjectItem {
    key: string,
    value: any
}

export interface CreateIParams {
    serviceInput: IServiceInput;
    controllerData: any;
}

export interface CacheData {
    key: string;
    value: string;
    initUuid?: string;
    initTime?: string;
}






