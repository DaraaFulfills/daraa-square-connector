import {
    Get,
    Body,
    Request,
    Route,
    Post,
    Path,
  } from "tsoa";

import { 
    IDAPIResponse, 
    IRateResponse,
    IRateRequest,
    IRateRequestDetail,
    IItem,
    IRate
} from "../../types"

function increment(start:Date, min:number):void  {
    start.setMinutes(start.getMinutes()+min)
}

@Route("shipping")
export class CarrierService {
    @Post()
    public async handleRateRequest(@Body() rateRequest: IRateRequest): Promise<IRateResponse> {
        
        const daraaApiUrl = "https://api.daraa.io/";
        const details: IRateRequestDetail = rateRequest.rate;
        const merchantId: number = 1;
        const items: IItem[] = details.items;
        const destPostalCode: string = details.destination.postal_code;
        let time = 0;
        let cost = 0;
        let fastest:IRate={
            service_name:"Daraa Fastest",
            service_code: "DF",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price:0,
            currency:'USD'
        };
        let cheapest:IRate={
            service_name:"Daraa Cheapest",
            service_code: "DC",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price:0,
            currency:'USD'
        };
        let middle:IRate={
            service_name:"Daraa Alternate",
            service_code: "DA",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price:0,
            currency:'USD'
        };
        for( let item of items){
            const sku = item.sku;
            const fetchUrl = daraaApiUrl.concat(merchantId + "", "/", sku, "/", destPostalCode);
            const response = await fetch(fetchUrl);
            const dapiResponse: IDAPIResponse[] = await response.json();
            const sortedFast = dapiResponse.sort((a,b)=>{
                return a.time<b.time?-1:1;
            })
            const sortedCheapest = dapiResponse.sort((a,b)=>{
                return a.cost<b.cost?-1:1;
            });
            fastest.time = Math.max(fastest.time || 0, sortedFast[0].time || 24*60*3);
            fastest.total_price += sortedFast[0].cost || 1000;
            cheapest.time = Math.max(fastest.time || 0, sortedCheapest[0].time || 24*60*3);
            cheapest.total_price += sortedCheapest[0].cost || 1000;
            if(
                sortedFast[0] && 
                sortedFast[0].time < 24*60*3 && sortedFast[0].cost < 1000
            ){
                middle.time = Math.max(middle.time || 0, sortedFast[0].time);
                middle.total_price += sortedFast[0].cost
            } else if (
                sortedCheapest[0] && 
                sortedCheapest[0].time < 24*60*3 && sortedCheapest[0].cost < 1000
            ){
                middle.time = Math.max(middle.time || 0, sortedCheapest[0].time);
                middle.total_price += sortedCheapest[0].cost
            } else {
                middle.time = Math.max(middle.time || 0, 24*60*3);
                middle.total_price += 1000
            }
        }
        increment(fastest.max_delivery_date, fastest.time || 0)
        increment(fastest.min_delivery_date, fastest.time || 0)
        increment(cheapest.max_delivery_date, cheapest.time || 0)
        increment(cheapest.min_delivery_date, cheapest.time || 0)
        increment(middle.max_delivery_date, middle.time || 0)
        increment(middle.min_delivery_date, middle.time || 0)

        delete cheapest.time;
        delete fastest.time;
        delete middle.time;

        return {rates:[fastest, cheapest, middle]}
    }
}