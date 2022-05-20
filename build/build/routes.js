"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const inventoryController_1 = require("./../src/controllers/inventoryController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const shippingController_1 = require("./../src/controllers/shippingController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "InventoryCountsEntity": {
        "dataType": "refObject",
        "properties": {
            "calculated_at": { "dataType": "string", "required": true },
            "catalog_object_id": { "dataType": "string", "required": true },
            "catalog_object_type": { "dataType": "string", "required": true },
            "location_id": { "dataType": "string", "required": true },
            "quantity": { "dataType": "string", "required": true },
            "state": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InventoryCountsObject": {
        "dataType": "refObject",
        "properties": {
            "inventory_counts": { "dataType": "array", "array": { "dataType": "refObject", "ref": "InventoryCountsEntity" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Data": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "string", "required": true },
            "id": { "dataType": "string", "required": true },
            "object": { "ref": "InventoryCountsObject", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InventoryCountUpdated": {
        "dataType": "refObject",
        "properties": {
            "merchant_id": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "event_id": { "dataType": "string", "required": true },
            "created_at": { "dataType": "string", "required": true },
            "data": { "ref": "Data", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "enum", "enums": ["Validation failed"], "required": true },
            "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_InventoryCountUpdated.merchant_id-or-type-or-event_id-or-created_at-or-data_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "merchant_id": { "dataType": "string", "required": true }, "type": { "dataType": "string", "required": true }, "event_id": { "dataType": "string", "required": true }, "created_at": { "dataType": "string", "required": true }, "data": { "ref": "Data", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InventoryCountUpdatedParams": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_InventoryCountUpdated.merchant_id-or-type-or-event_id-or-created_at-or-data_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRate": {
        "dataType": "refObject",
        "properties": {
            "service_name": { "dataType": "string", "required": true },
            "service_code": { "dataType": "string", "required": true },
            "total_price": { "dataType": "double", "required": true },
            "currency": { "dataType": "string", "required": true },
            "min_delivery_date": { "dataType": "datetime", "required": true },
            "max_delivery_date": { "dataType": "datetime", "required": true },
            "time": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRateResponse": {
        "dataType": "refObject",
        "properties": {
            "rates": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IRate" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IOrigin": {
        "dataType": "refObject",
        "properties": {
            "country": { "dataType": "string", "required": true },
            "postal_code": { "dataType": "string", "required": true },
            "province": { "dataType": "string", "required": true },
            "city": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "address1": { "dataType": "string", "required": true },
            "address2": { "dataType": "string", "required": true },
            "address3": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
            "fax": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "address_type": { "dataType": "string", "required": true },
            "company_name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDestination": {
        "dataType": "refObject",
        "properties": {
            "country": { "dataType": "string", "required": true },
            "postal_code": { "dataType": "string", "required": true },
            "province": { "dataType": "string", "required": true },
            "city": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "address1": { "dataType": "string", "required": true },
            "address2": { "dataType": "string", "required": true },
            "address3": { "dataType": "string", "required": true },
            "phone": { "dataType": "string", "required": true },
            "fax": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "address_type": { "dataType": "string", "required": true },
            "company_name": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountryHarmonizedSystemCodesEntity": {
        "dataType": "refObject",
        "properties": {
            "harmonized_system_code": { "dataType": "string", "required": true },
            "country_code": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IItem": {
        "dataType": "refObject",
        "properties": {
            "cost": { "dataType": "string", "required": true },
            "country_code_of_origin": { "dataType": "string", "required": true },
            "country_harmonized_system_codes": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "CountryHarmonizedSystemCodesEntity" } }, { "dataType": "enum", "enums": [null] }] },
            "created_at": { "dataType": "string", "required": true },
            "harmonized_system_code": { "dataType": "double", "required": true },
            "id": { "dataType": "double", "required": true },
            "province_code_of_origin": { "dataType": "string", "required": true },
            "sku": { "dataType": "string", "required": true },
            "tracked": { "dataType": "boolean", "required": true },
            "updated_at": { "dataType": "string", "required": true },
            "requires_shipping": { "dataType": "boolean", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRateRequestDetail": {
        "dataType": "refObject",
        "properties": {
            "origin": { "ref": "IOrigin", "required": true },
            "destination": { "ref": "IDestination", "required": true },
            "items": { "dataType": "array", "array": { "dataType": "refObject", "ref": "IItem" }, "required": true },
            "currency": { "dataType": "double", "required": true },
            "locale": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRateRequest": {
        "dataType": "refObject",
        "properties": {
            "rate": { "ref": "IRateRequestDetail", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/inventory_count_updated', ...((0, runtime_1.fetchMiddlewares)(inventoryController_1.InventoryController)), ...((0, runtime_1.fetchMiddlewares)(inventoryController_1.InventoryController.prototype.doGet)), function InventoryController_doGet(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new inventoryController_1.InventoryController();
            const promise = controller.doGet.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/inventory_count_updated', ...((0, runtime_1.fetchMiddlewares)(inventoryController_1.InventoryController)), ...((0, runtime_1.fetchMiddlewares)(inventoryController_1.InventoryController.prototype.doPost)), function InventoryController_doPost(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "InventoryCountUpdatedParams" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new inventoryController_1.InventoryController();
            const promise = controller.doPost.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 200, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/shipping', ...((0, runtime_1.fetchMiddlewares)(shippingController_1.CarrierService)), ...((0, runtime_1.fetchMiddlewares)(shippingController_1.CarrierService.prototype.handleRateRequest)), function CarrierService_handleRateRequest(request, response, next) {
        const args = {
            rateRequest: { "in": "body", "name": "rateRequest", "required": true, "ref": "IRateRequest" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new shippingController_1.CarrierService();
            const promise = controller.handleRateRequest.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
