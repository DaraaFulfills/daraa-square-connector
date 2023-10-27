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

import { ApiResponse, ListCatalogResponse } from "square";

import {
    InventoryCountUpdated
} from "../types/inventory"

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

const toObject = (input): string => {
    return JSON.parse(JSON.stringify(input, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}

@Route("inventory_count_updated")
export class InventoryController extends Controller {
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Get()
    public async doGet(): Promise<string> {
        this.setStatus(200);
        return toObject((await new InventoryService().getInventoryCatalog()).result);
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