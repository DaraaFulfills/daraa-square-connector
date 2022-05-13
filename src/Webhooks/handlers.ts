import Shopify from "@shopify/shopify-api";
import {
    IOrder, 
    IInventoryItem,
    IDAPIManagedResponse
} from "../../types"
  
async function isManaged(item:IInventoryItem):Promise<IDAPIManagedResponse>{
    const {sku} = item;
    const merchant = 1;
    const result = await fetch(`https://api.daraa.io/sku/${merchant}/${sku}`);
    const data:IDAPIManagedResponse = await result.json()
    return data;
}

async function subscribe(item:number, shop:string, baseUrl:string):Promise<void>{
    const postBody = {
        url: baseUrl + '/inventory',
        destination: shop,
        item
    }
    const response = await fetch('https://api.daraa.io/subscribe', {method: "POST", body:JSON.stringify(postBody)})
    console.log(response);    
}

export default function addHandlers(app, ACTIVE_SHOPIFY_SHOPS, baseUrl){
    Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            delete ACTIVE_SHOPIFY_SHOPS[shop];
        }
    });
    Shopify.Webhooks.Registry.addHandler("INVENTORY_ITEMS_CREATE", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic, shop, body)
            const item:IInventoryItem = JSON.parse(body);
            const data = await isManaged(item);
            const {managed, DIIN} = data
            if(managed){
                await subscribe(DIIN, shop, baseUrl)
            }
        }
    });
    Shopify.Webhooks.Registry.addHandler("INVENTORY_ITEMS_UPDATE", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic, shop, body)
            const item:IInventoryItem = JSON.parse(body);
            
        }
    });
    Shopify.Webhooks.Registry.addHandler("ORDERS_CREATE", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            console.log(topic, shop, body)
            const order:IOrder = JSON.parse(body);
        }
    });
    Shopify.Webhooks.Registry.addHandler("PRODUCTS_CREATE", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            console.log('PRODUCTS_CREATE WEBHOOK')
            console.log(topic, shop, body)
        }
    });
    Shopify.Webhooks.Registry.addHandler("PRODUCTS_UPDATE", {
        path: "/webhooks",
        webhookHandler: async (topic, shop, body) => {
            console.log('PRODUCTS_UPDATE WEBHOOK')
            console.log(topic, shop, body)
        }
    });
}
