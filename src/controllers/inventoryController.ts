import {InventoryLevel} from '@shopify/shopify-api/dist/rest-resources/2022-01/index.js';
import Shopify from '@shopify/shopify-api';

import { getToken } from "../helpers"

import {
    Get,
    Body,
    Request,
    Route,
    Post,
    Path,
  } from "tsoa";

import { 
    IInventoryUpdateMessage
} from "../../types"




@Route("inventory")
export class Inventory {
    @Post()
    public async handleRateRequest(@Body() updateRequest: IInventoryUpdateMessage): Promise<void> {
        const { sku, destination:shop, quantity } = updateRequest;
        const token = await getToken(shop);
        
        return
    }
}