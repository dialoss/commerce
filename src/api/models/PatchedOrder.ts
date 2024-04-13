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
 * @interface PatchedOrder
 */
export interface PatchedOrder {
    /**
     * 
     * @type {number}
     * @memberof PatchedOrder
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedOrder
     */
    page?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedOrder
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedOrder
     */
    media?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedOrder
     */
    viewId?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedOrder
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedOrder
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedOrder
     */
    user?: number;
    /**
     * 
     * @type {Date}
     * @memberof PatchedOrder
     */
    dateCreated?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PatchedOrder
     */
    statusChanged?: Date;
    /**
     * 
     * @type {number}
     * @memberof PatchedOrder
     */
    product?: number;
    /**
     * 
     * @type {number}
     * @memberof PatchedOrder
     */
    status?: number;
}

/**
 * Check if a given object implements the PatchedOrder interface.
 */
export function instanceOfPatchedOrder(value: object): boolean {
    return true;
}

export function PatchedOrderFromJSON(json: any): PatchedOrder {
    return PatchedOrderFromJSONTyped(json, false);
}

export function PatchedOrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedOrder {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'page': json['page'] == null ? undefined : json['page'],
        'slug': json['slug'] == null ? undefined : json['slug'],
        'media': json['media'] == null ? undefined : json['media'],
        'viewId': json['viewId'] == null ? undefined : json['viewId'],
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'user': json['user'] == null ? undefined : json['user'],
        'dateCreated': json['dateCreated'] == null ? undefined : (new Date(json['dateCreated'])),
        'statusChanged': json['statusChanged'] == null ? undefined : (new Date(json['statusChanged'])),
        'product': json['product'] == null ? undefined : json['product'],
        'status': json['status'] == null ? undefined : json['status'],
    };
}

export function PatchedOrderToJSON(value?: PatchedOrder | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'slug': value['slug'],
        'media': value['media'],
        'viewId': value['viewId'],
        'title': value['title'],
        'description': value['description'],
        'user': value['user'],
        'dateCreated': value['dateCreated'] == null ? undefined : ((value['dateCreated'] as any).toISOString()),
        'statusChanged': value['statusChanged'] == null ? undefined : ((value['statusChanged'] as any).toISOString()),
        'product': value['product'],
        'status': value['status'],
    };
}
