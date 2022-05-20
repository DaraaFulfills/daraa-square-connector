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
exports.InventoryController = void 0;
const tsoa_1 = require("tsoa");
const inventoryService_1 = require("../services/inventoryService");
let InventoryController = class InventoryController extends tsoa_1.Controller {
    async doGet() {
        console.log("InventoryController.get()");
        this.setStatus(200);
        return new inventoryService_1.InventoryService().get();
    }
    async doPost(requestBody) {
        this.setStatus(200);
        new inventoryService_1.InventoryService().inventoryCountUpdate(requestBody);
        return;
    }
};
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "doGet", null);
__decorate([
    (0, tsoa_1.Response)(422, "Validation Failed"),
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "doPost", null);
InventoryController = __decorate([
    (0, tsoa_1.Route)("inventory_count_updated")
], InventoryController);
exports.InventoryController = InventoryController;
