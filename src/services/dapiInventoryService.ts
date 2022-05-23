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
    private async isManaged(sku: string) : Promise<boolean> {
        const merchantId: string = "1";
        const result = await fetch('https://api.daraa.io/sku/' + merchantId + '/' + sku);
        const managed: boolean = await result.json();
        return managed;
    }

    public async sendInventoryUpdate(dapiInventoryUpdateParams : DAPIInventoryUpdateParams) : Promise<void> {
        const dapiInventoryUpdate: DAPIInventoryUpdate = { ...dapiInventoryUpdateParams };

        const client = new Client({
            environment: Environment.Production,
            accessToken: 'EAAAERhl_tzEzVDA89p1apuHz7X53YPpKoSP7OYjZ7RyvAe0tJYkvfJy3pYuQvIZ',
        });

        if (this.isManaged(dapiInventoryUpdate.sku!)) {
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
        }

        return;
    }
}