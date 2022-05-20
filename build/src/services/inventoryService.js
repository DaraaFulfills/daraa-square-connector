"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
class InventoryService {
    async get() {
        const icu = {
            "merchant_id": "6SSW7HV8K2ST5",
            "type": "inventory.count.updated",
            "event_id": "df5f3813-a913-45a1-94e9-fdc3f7d5e3b6",
            "created_at": "2019-10-29T18:38:45.455006797Z",
            "data": {
                "type": "inventory",
                "id": "84e4ac73-d605-4dbd-a9e5-ffff794ddb9d",
                "object": {
                    "inventory_counts": [
                        {
                            "calculated_at": "2019-10-29T18:38:45.10296Z",
                            "catalog_object_id": "FGQ5JJWT2PYTHF35CKZ2DSKP",
                            "catalog_object_type": "ITEM_VARIATION",
                            "location_id": "YYQR03DGCTXA4",
                            "quantity": "10",
                            "state": "IN_STOCK"
                        }
                    ]
                }
            }
        };
        return icu;
    }
    async inventoryCountUpdate(inventoryCountUpdatedParams) {
        console.log("InventoryController.doPost() starting.");
        // const icu: InventoryCountUpdated = { ...inventoryCountUpdatedParams };
        let icu = {
            "merchant_id": "6SSW7HV8K2ST5",
            "type": "inventory.count.updated",
            "event_id": "df5f3813-a913-45a1-94e9-fdc3f7d5e3b6",
            "created_at": "2019-10-29T18:38:45.455006797Z",
            "data": {
                "type": "inventory",
                "id": "84e4ac73-d605-4dbd-a9e5-ffff794ddb9d",
                "object": {
                    "inventory_counts": [
                        {
                            "calculated_at": "2019-10-29T18:38:45.10296Z",
                            "catalog_object_id": "FGQ5JJWT2PYTHF35CKZ2DSKP",
                            "catalog_object_type": "ITEM_VARIATION",
                            "location_id": "YYQR03DGCTXA4",
                            "quantity": "10",
                            "state": "IN_STOCK"
                        }
                    ]
                }
            }
        };
        // Need to obtain SKU
        let ice = icu.data.object.inventory_counts[0];
        const catalog_object_id = ice.catalog_object_id;
        const catalog_url = "https://connect.squareupsandbox.com/v2/catalog/object/" + catalog_object_id;
        const coResponse = await fetch(catalog_url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        let catalogObject = await coResponse.json();
        var merchant_id = "1";
        let itemVariationData = catalogObject.object.item_data.variations[0].item_variation_data;
        var sku = itemVariationData.sku;
        var qty_avail = icu.data.object.inventory_counts[0].quantity;
        var skuPost = {
            file: null,
            dfin: sku,
            qty: qty_avail,
            source: "Square Inventory Count Update"
        };
        var dapiUrl = "https://api.daraa.io/sku/" + merchant_id + "/" + sku;
        const dapiResponse = await fetch(dapiUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(skuPost)
        });
        console.log("DAPI Response: " + dapiResponse);
    }
}
exports.InventoryService = InventoryService;
