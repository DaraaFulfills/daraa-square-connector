import {
    Body,
    Controller,
    Route,
    Post,
    Response,
    SuccessResponse,
    Get,
  } from "tsoa";

import {
    InventoryCountUpdatedParams, 
     InventoryService
} from "../services/inventoryService"

import {
    InventoryCountUpdated
} from "../types/inventory"

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("inventory_count_updated")
export class InventoryController extends Controller {
    @Response(501, "Not Implemented")
    public async doGet(): Promise<void> {
        return;
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async doPost(@Body() requestBody: InventoryCountUpdatedParams): Promise<void> {
        this.setStatus(200);
        new InventoryService().inventoryCountUpdate(requestBody);
        return;
    }
}
