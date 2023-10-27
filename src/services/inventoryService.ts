import {
    CatalogObject,
    InventoryCountsEntity,
    InventoryCountUpdated,
    ItemVariationData,
} from "../types/inventory";
import { Client, Environment, SearchCatalogObjectsResponse } from "square";
import { SKU_Post } from "../types/dapi";
import {
    textChangeRangeIsUnchanged,
    isConstructorDeclaration,
} from "typescript";
import { debug } from "util";
import { getToken, getFirstTokenName } from "../helpers/tokenManager";

const SQUARE_URL = process.env.SQ_APP_PATH;
export type InventoryCountUpdatedParams = Pick<
    InventoryCountUpdated,
    "merchant_id" | "type" | "event_id" | "created_at" | "data"
>;
export type CatalogObjectParams = Pick<CatalogObject, "object">;

const toObject = (input): string => {
    return JSON.parse(
        JSON.stringify(
            input,
            (key, value) =>
                typeof value === "bigint" ? value.toString() : value // return everything else unchanged
        )
    );
};

export class InventoryService {
    public async inventoryCountUpdate(
        inventoryCountUpdatedParams: InventoryCountUpdatedParams
    ): Promise<void> {
        const icu: InventoryCountUpdated = { ...inventoryCountUpdatedParams };
        // Obtain SKU by retrieving the CatalogObject, object's ID is in the incoming inventory count update.
        let ice: InventoryCountsEntity = icu.data.object.inventory_counts![0];
        const catalog_object_id: string = ice.catalog_object_id;
        // Debug
        //console.debug("Inventory adjustment for Catalog Object ID: %o", catalog_object_id);
        const catalog_url: string =
            "https://connect.squareup.com/v2/catalog/object/" +
            catalog_object_id;
        const coResponse = await fetch(catalog_url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                    "Bearer EAAAESLNkiGw6E_8PIY5BdNKfBLqp5sZ2CXmpb1QeRzayp6Q2Orep_idQBT8Z11x",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        const catalogObject: CatalogObject = await coResponse.json();
        //console.debug("Retrieved catalogObject: $%o", catalogObject);
        // Hardcoded!!! This should probably be in the URL of the post.
        const merchant_id: string = "1";
        const itemVariationData: ItemVariationData =
            catalogObject.object.item_data.variations![0].item_variation_data;
        const sku: string = itemVariationData.sku + "";
        //console.debug("SKU for this Inventory Count/Catalog Object is %s", sku);
        const qty_avail: string = icu.data.object.inventory_counts![0].quantity;
        //console.debug("Available Quantity is: %s", qty_avail);
        const skuPost: SKU_Post = {
            file: null,
            dfin: sku,
            qty: qty_avail,
            source: "Square Inventory Count Update",
        };
        //console.debug("DAPI SKU Post: %o", skuPost);
        const dapiUrl = "https://api.daraa.io/sku/" + merchant_id + "/" + sku;
        const dapiResponse = await fetch(dapiUrl, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                    "Bearer EAAAENPC3g1ERDDT_eRtzmI_tb5L6cBxzvzWg3TG1eEHEKpQ5JxjFLoSVwV5ZjG9",
                //TODO: Replace this with actual auth
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(skuPost),
        });
        //console.debug("DAPI Response: %o", dapiResponse);
    }

    public async getInventoryCatalog(): Promise<string> {
        const environment: string =
            process.env.NODE_ENV === "production"
                ? Environment.Production
                : Environment.Sandbox;
        const squareToken = await getToken(await getFirstTokenName());

        const client = new Client({
            environment: Environment.Production,
            accessToken: squareToken,
        });

        const catalog_response = await client.catalogApi.listCatalog();
        const merchant_response = await client.merchantsApi.listMerchants();
        const payment_response = await client.paymentsApi.listPayments();
        const inventory_response =
            await client.inventoryApi.batchRetrieveInventoryCounts({});

        // This only applies for one main location --> TODO: Would need to add all locations
        const main_location_id = merchant_response.result.merchant
            ? merchant_response.result.merchant[0].mainLocationId
            : undefined;

        const orders_response = main_location_id
            ? await client.ordersApi.searchOrders({
                  locationIds: [main_location_id],
              })
            : undefined;

        const final_json = {
            objects: catalog_response.result.objects,
            merchant: merchant_response.result.merchant,
            payments: payment_response.result.payments,
            counts: inventory_response.result.counts,

            // TODO: Do we want full orders or just entries
            order_response: orders_response?.result.orderEntries,
        };

        // const catalog_url: string = `${SQUARE_URL}/v2/catalog/object`
        return toObject(final_json);
    }
}
