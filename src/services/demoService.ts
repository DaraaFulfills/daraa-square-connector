import {
    Client,
    Environment,
    SearchCatalogObjectsResponse,
    Payment,
} from "square";
import { getToken, getFirstTokenName } from "../helpers/tokenManager";
import { create } from "domain";

// Helper to convert json to string
const toObject = (input): string => {
    return JSON.parse(
        JSON.stringify(
            input,
            (key, value) =>
                typeof value === "bigint" ? value.toString() : value // return everything else unchanged
        )
    );
};

export type LocationMap = {
    id: string | undefined;
    name: string | undefined;
};

export class DemoService {
    private client: Client;

    // Setup Square Client
    constructor() {
        this.createClient();
    }

    private async createClient() {
        const isProd = process.env.NODE_ENV === "production";
        const environment: Environment = isProd
            ? Environment.Production
            : Environment.Sandbox;
        const squareToken = isProd
            ? await getToken(await getFirstTokenName())
            : process.env.SANDBOX_ACCESS_KEY;

        this.client = new Client({
            environment: environment,
            accessToken: squareToken,
        });
    }

    public async fetchLocations(): Promise<LocationMap[]> {
        const response = await this.client.locationsApi.listLocations();
        const payload = response.result.locations?.map((location) => {
            return {
                id: location.id,
                name: location.name,
            };
        });
        return payload ? payload : [];
    }

    public async createDigest(locations: string[]): Promise<string> {
        const catalog_response = (
            await this.client.catalogApi.listCatalog(undefined, "ITEM")
        ).result.objects;
        const merchant_response = (
            await this.client.merchantsApi.listMerchants()
        ).result.merchant;
        const inventory_response = (
            await this.client.inventoryApi.batchRetrieveInventoryCounts({})
        ).result.counts;

        // Handle querying orders and payments by location
        let orders_response, payments_response;
        if (locations.length > 0) {
            locations = locations.slice(0, 10);
            try {
                orders_response = (
                    await this.client.ordersApi.searchOrders({
                        locationIds: locations,
                        returnEntries: false,
                    })
                ).result.orders;

                const payments_promise = locations.map((location) =>
                    this.client.paymentsApi.listPayments()
                );
                payments_response = (
                    await Promise.all(payments_promise)
                ).reduce((acc, payment) => {
                    if (payment.result.payments)
                        return acc.concat(payment.result.payments);
                    else return acc;
                }, [] as Payment[]);
            } catch {
                console.log(
                    "Square Orders and Payments failed: Bad location id"
                );
            }
        }

        const final_json = {
            objects: catalog_response,
            merchant: merchant_response,
            counts: inventory_response,

            payments: payments_response,
            orders: orders_response,
        };

        return toObject(final_json);
    }
}
