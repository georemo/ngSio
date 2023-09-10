import { v4 as uuidv4 } from 'uuid';
import { Component, OnInit } from '@angular/core';
import { CdObjId, IAppState, ICdPushEnvelop, ICdResponse, ICommConversationSub, LsFilter, StorageType } from './IBase';
import { SioService } from './sio.service';
import { WsHttpService } from './ws-http.service';
import { NGXLogger } from "ngx-logger";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // everytime an application is launched, the resource aquires a unique id
  // this allows for each instance to use the id for socket identification
  // the id is also used to identify the resource in the local storage for
  // inter communication with different components/resources
  resourceGuid = uuidv4();
  // for jwt authentication
  // jwtWsToken = '';
  pushEnvelope: ICdPushEnvelop = {
    pushData: {
      pushGuid: '',
      m: '',
      pushRecepients: [],
      triggerEvent: '',
      emittEvent: '',
      token: '',
      isNotification: null,
      commTrack: {
        initTime: Number(new Date()),
        relayTime: null,
        relayed: false,
        pushed: false,
        pushTime: null,
        deliveryTime: null,
        delivered: false,
        completed: false,
        completedTime: null
      },
    },
    req: null,
    resp: null
  }

  users = [
    {
      userId: 1010,
      subTypeId: 1,
      cdObjId: {
        appId: environment.appId,
        ngModule: 'UserModule',
        resourceName: 'SessionService',
        resourceGuid: uuidv4(),
        jwtToken: '',
        socket: null,
        socketId: '',
        commTrack: {
          initTime: Number(new Date()),
          relayTime: null,
          relayed: false,
          pushed: false,
          pushTime: null,
          deliveryTime: null,
          delivered: false,
          completed: false,
          completedTime: null
        },
      },
    },
    {
      userId: 1011,
      subTypeId: 1,
      cdObjId: {
        appId: environment.appId,
        ngModule: 'UserModule',
        resourceName: 'SessionService',
        resourceGuid: uuidv4(),
        jwtToken: '',
        socket: null,
        socketId: '',
        commTrack: {
          initTime: Number(new Date()),
          relayTime: null,
          relayed: false,
          pushed: false,
          pushTime: null,
          deliveryTime: null,
          delivered: false,
          completed: false,
          completedTime: null
        },
      },
    }
  ]
  newMessage: string;
  messageList: string[] = [];

  constructor(
    public svSio: SioService,
    private logger: NGXLogger,
  ) {
    this.svSio.initSio(this.resourceGuid)
  }

  ngOnInit() {
    // this.setSender();
    // this.svSio.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })


    const envl: ICdPushEnvelop = this.configPushPayload('login', 'push-menu')
    this.logger.log(`AppComponent::ngOnInit/envl: ${JSON.stringify(envl)}`)
    this.svSio.sendPayLoad(envl)
  }

  configPushPayload(triggerEvent: string, emittEvent: string): ICdPushEnvelop {
    /**
     * get recepient from localStorage
     */
    /**
         * search the recepient: SidebarComponent
         */
    /**
         * set filter for getting the recepient: SidebarComponent
         */
    // let filter: LsFilter = {
    //   storageType: StorageType.CdObjId,
    //   cdObjId: {
    //     appId: environment.appId,
    //     resourceGuid: null,
    //     resourceName: 'SidebarComponent',
    //     ngModule: 'SharedModule',
    //     jwtToken: null,
    //     socket: null,
    //     commTrack: null
    //   }
    // }

    // const sidebarCdObj: ICommConversationSub = this.searchLocalStorage(filter).value;
    // this.logger.log('AppComponent::setRecepient()/sidebarCdObj:', sidebarCdObj);
    // if (sidebarCdObj) {
    //   this.pushEnvelope.pushData.pushRecepients.push(sidebarCdObj)
    // } else {
    //   this.logger.log('sidebarCdObj is not set');
    // }

    const pushEnvelope: ICdPushEnvelop = {
      pushData: {
        pushGuid: '',
        m: '',
        pushRecepients: [],
        triggerEvent: '',
        emittEvent: '',
        token: '',
        isNotification: null,
        commTrack: {
          initTime: Number(new Date()),
          relayTime: null,
          relayed: false,
          pushed: false,
          pushTime: null,
          deliveryTime: null,
          delivered: false,
          completed: false,
          completedTime: null
        },
      },
      req: null,
      resp: null
    }

    const users = [
      {
        userId: 1010,
        subTypeId: 1,
        cdObjId: {
          appId: environment.appId,
          ngModule: 'UserModule',
          resourceName: 'SessionService',
          resourceGuid: uuidv4(),
          jwtToken: '',
          socket: null,
          socketId: '',
          commTrack: {
            initTime: Number(new Date()),
            relayTime: null,
            relayed: false,
            pushed: false,
            pushTime: null,
            deliveryTime: null,
            delivered: false,
            completed: false,
            completedTime: null
          },
        },
      },
      {
        userId: 1011,
        subTypeId: 1,
        cdObjId: {
          appId: environment.appId,
          ngModule: 'UserModule',
          resourceName: 'SessionService',
          resourceGuid: uuidv4(),
          jwtToken: '',
          socket: null,
          socketId: '',
          commTrack: {
            initTime: Number(new Date()),
            relayTime: null,
            relayed: false,
            pushed: false,
            pushTime: null,
            deliveryTime: null,
            delivered: false,
            completed: false,
            completedTime: null
          },
        },
      }
    ]

    const envl: ICdPushEnvelop = { ...pushEnvelope };
    envl.pushData.triggerEvent = triggerEvent;
    envl.pushData.emittEvent = emittEvent;

    // set sender
    const uSender: any = { ...users[0] }
    uSender.subTypeId = 1;
    envl.pushData.pushRecepients.push(uSender)


    // set recepient
    const uRecepient: any = { ...users[0] }
    uRecepient.subTypeId = 7;
    envl.pushData.pushRecepients.push(uRecepient)


    return envl;

  }

  sendMessage(message: string) {
    /**
     * - get info for recepient from localStorage
     * - send message to recepient
     */
    // this.svSio.sendMessage(message);
    // this.newMessage = '';
    const envl: ICdPushEnvelop = this.configPushPayload('send-memo', 'push-memo')
    envl.pushData.m = message;
    this.logger.log(`AppComponent::sendMessage/envl: ${JSON.stringify(envl)}`)
    this.svSio.sendPayLoad(envl)
  }

  sendPayLoad(pushData: ICdPushEnvelop) {
    /**
     * - get info for recepient from localStorage
     * - send message to recepient
     */
    this.svSio.sendPayLoad(pushData);
    this.newMessage = '';
  }

  searchLocalStorage(f: LsFilter) {
    // const lc = { ...localStorage };
    const lcArr = [];

    const lcLength = localStorage.length;
    this.logger.log(`AppComponent::searchLocalStorage()/lcLength:${lcLength}`);
    let i = 0;
    for (let i = 0; i < localStorage.length; i++) {
      // try {
      // set iteration key name
      const k = localStorage.key(i);
      // use key name to retrieve the corresponding value
      var v = localStorage.getItem(k!);
      // this.logger.log the iteration key and value
      this.logger.log('Key: ' + k + ', Value: ' + v);
      if (k !== 'accessToken') {
        try {
          const lcItem = JSON.parse(v!);
          if ('success' in lcItem) {
            const appState: IAppState = lcItem;
            // this.logger.log('BaseService::searchLocalStorage()/appState:', appState)
          }
          if ('resourceGuid' in lcItem) {
            const cdObjId = lcItem;
            // this.logger.log('BaseService::searchLocalStorage()/cdObjId:', cdObjId)
          }
          lcArr.push({ key: k, value: JSON.parse(v!) })
        } catch (e) {
          this.logger.log(`offending item:${v}`);
          this.logger.log('the item is not an object');
          this.logger.log(`Error:${e}`);
        }
      }


      // } catch (e) {
      //   this.logger.log('BaseService::pushSubscribe()/Error:', e);
      // }

    }
    this.logger.log(`BaseService::searchLocalStorage()/lcArr:${lcArr}`);
    this.logger.log(`BaseService::searchLocalStorage()/f.cdObjId!.resourceName:${f.cdObjId!.resourceName}`);
    // isAppState
    const resourceName = 'UserModule';
    const AppStateItems = (d: any) => 'success' in d.value;
    const CdObjIdItems = (d: any) => 'resourceName' in d.value;
    const filtObjName = (d: any) => d.value.resourceName === f.cdObjId!.resourceName && d.value.ngModule === f.cdObjId!.ngModule;
    const latestItem = (prev: any, current: any) => (prev.value.commTrack.initTime > current.value.commTrack.initTime) ? prev : current;
    const cdObjIdItems = lcArr.filter(CdObjIdItems);
    this.logger.log(`searchLocalStorage()/cdObjIdItems:${cdObjIdItems}`)
    const fObjName = cdObjIdItems.filter(filtObjName)
    this.logger.log(`searchLocalStorage()/fObjName:${fObjName}`)
    let lItem;
    if (fObjName.length > 0) {
      lItem = fObjName.reduce(latestItem);
    } else {
      lItem = { key: '', value: '' }
    }
    this.logger.log(`searchLocalStorage()/lItem:${lItem}`)
    return lItem;
  }
}
