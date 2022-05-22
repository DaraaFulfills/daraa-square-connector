import {
        Client,
        Environment,
        SearchCatalogObjectsResponse
    } from "square"

import { 
        CatalogSearchObjects,
        DAPIInventoryUpdate 
    } from "../types/inventory"

import { randomUUID } from 'crypto'

export type DAPIInventoryUpdateParams = Pick<DAPIInventoryUpdate, "source" | "destination" | "quantity" | "sku">;

export class DAPIInventoryService {
    public async sendInventoryUpdate(dapiInventoryUpdateParams : DAPIInventoryUpdateParams) : Promise<void> {
        const dapiInventoryUpdate: DAPIInventoryUpdate = { ...dapiInventoryUpdateParams };

        const client = new Client({
            environment: Environment.Production,
            accessToken: 'EAAAERhl_tzEzVDA89p1apuHz7X53YPpKoSP7OYjZ7RyvAe0tJYkvfJy3pYuQvIZ',
        });

        try {
            const searchResponse = await client.catalogApi.searchCatalogObjects({
                objectTypes: ['ITEM_VARIATION'], query: { textQuery: { keywords: [ dapiInventoryUpdate.sku + "" ] } }
                });
            const searchCatalogObjectsResponse: SearchCatalogObjectsResponse = searchResponse.result;
            const catObjectId: string = searchCatalogObjectsResponse.objects![0].itemVariationData?.itemId + "";

            const updateResponse = await client.inventoryApi.batchChangeInventory({
                idempotencyKey: randomUUID(),
                changes: [
                  {
                    physicalCount: {
                      catalogObjectId: catObjectId,
                      catalogObjectType: 'ITEM_VARIATION',
                      quantity: dapiInventoryUpdate.quantity
                    }
                  }
                ],
                ignoreUnchangedCounts: true
              });            
        } catch(error) {
            console.log(error);
        }
        return;
    }
}