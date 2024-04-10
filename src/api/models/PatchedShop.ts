/* tslint:disable */
/* eslint-disable */
/**
 * Mymount
 * Mymount
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PatchedShop
 */
export interface PatchedShop {
    /**
     * 
     * @type {number}
     * @memberof PatchedShop
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedShop
     */
    page?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedShop
     */
    media?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedShop
     */
    viewId?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedShop
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedShop
     */
    summary?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedShop
     */
    price?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedShop
     */
    productType?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PatchedShop
     */
    inStock?: boolean;
}

/**
 * Check if a given object implements the PatchedShop interface.
 */
export function instanceOfPatchedShop(value: object): boolean {
    return true;
}

export function PatchedShopFromJSON(json: any): PatchedShop {
    return PatchedShopFromJSONTyped(json, false);
}

export function PatchedShopFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedShop {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'page': json['page'] == null ? undefined : json['page'],
        'media': json['media'] == null ? undefined : json['media'],
        'viewId': json['viewId'] == null ? undefined : json['viewId'],
        'name': json['name'] == null ? undefined : json['name'],
        'summary': json['summary'] == null ? undefined : json['summary'],
        'price': json['price'] == null ? undefined : json['price'],
        'productType': json['productType'] == null ? undefined : json['productType'],
        'inStock': json['inStock'] == null ? undefined : json['inStock'],
    };
}

export function PatchedShopToJSON(value?: PatchedShop | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'media': value['media'],
        'viewId': value['viewId'],
        'name': value['name'],
        'summary': value['summary'],
        'price': value['price'],
        'productType': value['productType'],
        'inStock': value['inStock'],
    };
}

