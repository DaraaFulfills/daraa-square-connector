import {
        Client,
        Environment
    } from "square"

import { 
        DAPIInventoryUpdate 
    } from "../types/inventory"

export type DAPIInventoryUpdateParams = Pick<DAPIInventoryUpdate, "source" | "destination" | "quantity" | "sku">;

export class DAPIInventoryService {
    public async sendInventoryUpdate(dapiInventoryUpdateParams : DAPIInventoryUpdateParams) : Promise<void> {
        const client = new Client({
            environment: Environment.Production,
            accessToken: 'EAAAERhl_tzEzVDA89p1apuHz7X53YPpKoSP7OYjZ7RyvAe0tJYkvfJy3pYuQvIZ',
        });

        try {
            const response = await client.catalogApi.listCatalog(undefined, 'ITEM');
            console.log(response.result);
        } catch (error) {
            console.log(error);
        };
    }
}