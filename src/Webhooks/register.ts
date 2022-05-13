import Shopify from '@shopify/shopify-api'
import {CarrierService} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';

import { AuthQuery } from '@shopify/shopify-api'
import { setToken } from "../helpers"

const topics = [
    'ORDERS_CREATE',
    'PRODUCTS_CREATE',
    'PRODUCTS_UPDATE',
    'INVENTORY_ITEMS_CREATE',
    'INVENTORY_ITEMS_UPDATE',
    'APP_UNINSTALLED'
]



export default async function register(request, response, ACTIVE_SHOPIFY_SHOPS, baseUrl){
    const currentSession = await Shopify.Auth.validateAuthCallback(
        request,
        response,
        request.query as unknown as AuthQuery,
    );
    if( 
        currentSession && 
        currentSession.accessToken && 
        typeof currentSession.accessToken == 'string' && 
        currentSession.shop 
    ) {
        ACTIVE_SHOPIFY_SHOPS[currentSession.shop] = true
        await setToken(currentSession.shop, currentSession.accessToken);
        for(let topic of topics){
            const response = await Shopify.Webhooks.Registry.register({
                        path: '/webhooks',
                        topic,
                        accessToken: currentSession.accessToken,
                        shop: currentSession.shop,
                    });
            
                    if (!response[topic].success) {
                        console.log(
                        `Failed to register ${topic} webhook: ${response.result}`
                        );
                    }
        }
        try {
            const services = await CarrierService.all({
                session: currentSession
              });
            for(let service of services){
                if(service.id && service.name == 'Daraa') {
                    await CarrierService.delete({
                        session:currentSession,
                        id: service.id
                    })
                }
            }
            const carrier_service = new CarrierService({session: currentSession});
            carrier_service.name = "Daraa";
            carrier_service.callback_url = baseUrl + '/shipping';
            carrier_service.service_discovery = true;
            await carrier_service.save({});
        } catch (error) {
            console.error(error);
        }

        
        return response.redirect('/'); // wherever you want your user to end up after OAuth completes
    } else {
        console.log("no session");
    }
    
}
