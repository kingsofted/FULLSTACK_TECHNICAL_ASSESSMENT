import { EventEmitter } from "events";
import { EVENT_NAME, JobEventPayload } from "../../constant/constant";
import { JobElasticService } from "../elasticSearch/job.elasticSearch";




export class EventListener extends EventEmitter{
    private static instance: EventListener;

    private event: string = EVENT_NAME;

    public constructor() {
        super();
    }

    public static getInstance(): EventListener {
        if (!this.instance) {
            this.instance = new EventListener();
        }
        return this.instance;
    }

    public notify(payload: JobEventPayload): void {
        console.log(`Notifying event: ${payload.event}`);
        this.emit(this.event, payload);
    }

    public listen(eventHanlder: JobElasticService){
        this.on(this.event, (payload: JobEventPayload) => {
            console.log(`Event received: ${payload.event}`);
            eventHanlder.handleEvent(payload);
        });
    }
}







