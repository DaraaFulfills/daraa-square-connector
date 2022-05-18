import {
    Controller,
    Get,
    Body,
    Request,
    Route,
    Post,
    Path,
    Response,
    SuccessResponse,
  } from "tsoa";

  import {
    CatalogObject,
    InventoryCountUpdated
  } from "../types/inventory"
import { SKU_Post } from "../types/dapi";

  export type InventoryCountUpdatedParams = Pick<InventoryCountUpdated, "merchant_id"|"type"|"event_id"|"created_at"|"data">;
  export type CatalogObjectParams = Pick<CatalogObject, "object">;
  
  interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("xxxx")
export class BaseController extends Controller {
    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("200", "OK")
    @Post()
    public async doPost(@Body() icups: InventoryCountUpdatedParams): Promise<void> {
        const icu: InventoryCountUpdated = { ...icups };
        // Need to obtain SKU
        const catalog_object_id: string = icu.data.object.inventory_counts[0].catalog_object_id;
        const catalog_url: string = "https://connect.squareupsandbox.com/v2/catalog/object/" + catalog_object_id;
        const coParams: CatalogObjectParams = this.makePost("GET", catalog_url, "");
        const catalogObject: CatalogObject = { ...coParams };
        // Should probably loop through each (ie. S, M, L, XL)
        var merchant_id: string = 
        var sku: string = catalogObject.object.item_data.variations[0].item_variation_data.sku;
        var skuPost: SKU_Post = {
            file: null,
            dfin: sku,
            qty: qty_avail,
            source: "Square Inventory Count Update"
        };
        var dapiUrl = "https://api.daraa.io/sku/" + merchant_id + "/" + sku;
        this.makePost("POST", dapiUrl, skuPost);
    }

    private async makePost(fetchMethod: string, url: string, data: any): Promise<string> {
        var response = await fetch(url, {
            method: fetchMethod, 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
          });
        return JSON.stringify(await response.json());
    }
}
