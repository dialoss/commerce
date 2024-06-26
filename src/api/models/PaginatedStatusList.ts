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
import type { Status } from './Status';
import {
    StatusFromJSON,
    StatusFromJSONTyped,
    StatusToJSON,
} from './Status';

/**
 * 
 * @export
 * @interface PaginatedStatusList
 */
export interface PaginatedStatusList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedStatusList
     */
    count: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedStatusList
     */
    next?: string;
    /**
     * 
     * @type {string}
     * @memberof PaginatedStatusList
     */
    previous?: string;
    /**
     * 
     * @type {Array<Status>}
     * @memberof PaginatedStatusList
     */
    results: Array<Status>;
}

/**
 * Check if a given object implements the PaginatedStatusList interface.
 */
export function instanceOfPaginatedStatusList(value: object): boolean {
    if (!('count' in value)) return false;
    if (!('results' in value)) return false;
    return true;
}

export function PaginatedStatusListFromJSON(json: any): PaginatedStatusList {
    return PaginatedStatusListFromJSONTyped(json, false);
}

export function PaginatedStatusListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedStatusList {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'],
        'next': json['next'] == null ? undefined : json['next'],
        'previous': json['previous'] == null ? undefined : json['previous'],
        'results': ((json['results'] as Array<any>).map(StatusFromJSON)),
    };
}

export function PaginatedStatusListToJSON(value?: PaginatedStatusList | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'next': value['next'],
        'previous': value['previous'],
        'results': ((value['results'] as Array<any>).map(StatusToJSON)),
    };
}

