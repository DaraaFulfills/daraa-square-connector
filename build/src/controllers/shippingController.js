"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrierService = void 0;
const tsoa_1 = require("tsoa");
function increment(start, min) {
    start.setMinutes(start.getMinutes() + min);
}
let CarrierService = class CarrierService {
    async handleRateRequest(rateRequest) {
        const daraaApiUrl = "https://api.daraa.io/";
        const details = rateRequest.rate;
        const merchantId = 1;
        const items = details.items;
        const destPostalCode = details.destination.postal_code;
        let time = 0;
        let cost = 0;
        let fastest = {
            service_name: "Daraa Fastest",
            service_code: "DF",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price: 0,
            currency: 'USD'
        };
        let cheapest = {
            service_name: "Daraa Cheapest",
            service_code: "DC",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price: 0,
            currency: 'USD'
        };
        let middle = {
            service_name: "Daraa Alternate",
            service_code: "DA",
            min_delivery_date: new Date(),
            max_delivery_date: new Date(),
            total_price: 0,
            currency: 'USD'
        };
        for (let item of items) {
            const sku = item.sku;
            const fetchUrl = daraaApiUrl.concat(merchantId + "", "/", sku, "/", destPostalCode);
            const response = await fetch(fetchUrl);
            const dapiResponse = await response.json();
            const sortedFast = dapiResponse.sort((a, b) => {
                return a.time < b.time ? -1 : 1;
            });
            const sortedCheapest = dapiResponse.sort((a, b) => {
                return a.cost < b.cost ? -1 : 1;
            });
            fastest.time = Math.max(fastest.time || 0, sortedFast[0].time || 24 * 60 * 3);
            fastest.total_price += sortedFast[0].cost || 1000;
            cheapest.time = Math.max(fastest.time || 0, sortedCheapest[0].time || 24 * 60 * 3);
            cheapest.total_price += sortedCheapest[0].cost || 1000;
            if (sortedFast[0] &&
                sortedFast[0].time < 24 * 60 * 3 && sortedFast[0].cost < 1000) {
                middle.time = Math.max(middle.time || 0, sortedFast[0].time);
                middle.total_price += sortedFast[0].cost;
            }
            else if (sortedCheapest[0] &&
                sortedCheapest[0].time < 24 * 60 * 3 && sortedCheapest[0].cost < 1000) {
                middle.time = Math.max(middle.time || 0, sortedCheapest[0].time);
                middle.total_price += sortedCheapest[0].cost;
            }
            else {
                middle.time = Math.max(middle.time || 0, 24 * 60 * 3);
                middle.total_price += 1000;
            }
        }
        increment(fastest.max_delivery_date, fastest.time || 0);
        increment(fastest.min_delivery_date, fastest.time || 0);
        increment(cheapest.max_delivery_date, cheapest.time || 0);
        increment(cheapest.min_delivery_date, cheapest.time || 0);
        increment(middle.max_delivery_date, middle.time || 0);
        increment(middle.min_delivery_date, middle.time || 0);
        delete cheapest.time;
        delete fastest.time;
        delete middle.time;
        return { rates: [fastest, cheapest, middle] };
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarrierService.prototype, "handleRateRequest", null);
CarrierService = __decorate([
    (0, tsoa_1.Route)("shipping")
], CarrierService);
exports.CarrierService = CarrierService;
