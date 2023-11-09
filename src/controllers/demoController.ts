import {
    Body,
    Controller,
    Route,
    Post,
    Response,
    SuccessResponse,
    Get,
} from "tsoa";

import { DemoService, LocationMap } from "../services/demoService";

import { ApiResponse, ListCatalogResponse } from "square";

import { InventoryCountUpdated } from "../types/inventory";

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("account_digest")
export class DemoController extends Controller {
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Get()
    public async doGet(): Promise<LocationMap[]> {
        this.setStatus(200);
        return new DemoService().fetchLocations();
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async doPost(@Body() requestBody: string[]): Promise<string> {
        this.setStatus(200);
        return new DemoService().createDigest(requestBody);
    }
}
