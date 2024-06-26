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
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    page?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    slug?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    media?: string;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    viewId?: number;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    description?: string;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    user?: number;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    dateCreated?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    statusChanged?: Date;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    product?: number;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    status?: number;
}

/**
 * Check if a given object implements the Order interface.
 */
export function instanceOfOrder(value: object): boolean {
    if (!('id' in value)) return false;
    return true;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
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

export function OrderToJSON(value?: Order | null): any {
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

