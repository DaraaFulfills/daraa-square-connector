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
    DAPIInventoryUpdateParams,
    DAPIInventoryService
} from "../services/dapiInventoryService"

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("dapi_inventory_update")
export class DAPIInventoryController extends Controller {
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async doPost(@Body() requestBody: DAPIInventoryUpdateParams): Promise<void> {
        this.setStatus(200);
        new DAPIInventoryService().sendInventoryUpdate(requestBody);
        return;
    }
}