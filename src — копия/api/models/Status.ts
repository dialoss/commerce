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
 * @interface Status
 */
export interface Status {
    /**
     * 
     * @type {number}
     * @memberof Status
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Status
     */
    step: string;
    /**
     * 
     * @type {string}
     * @memberof Status
     */
    substep: string;
}

/**
 * Check if a given object implements the Status interface.
 */
export function instanceOfStatus(value: object): boolean {
    if (!('id' in value)) return false;
    if (!('step' in value)) return false;
    if (!('substep' in value)) return false;
    return true;
}

export function StatusFromJSON(json: any): Status {
    return StatusFromJSONTyped(json, false);
}

export function StatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): Status {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'step': json['step'],
        'substep': json['substep'],
    };
}

export function StatusToJSON(value?: Status | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'step': value['step'],
        'substep': value['substep'],
    };
}

