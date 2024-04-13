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
 * @interface PatchedGallery
 */
export interface PatchedGallery {
    /**
     * 
     * @type {number}
     * @memberof PatchedGallery
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedGallery
     */
    media?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedGallery
     */
    viewId?: number;
    /**
     * 
     * @type {string}
     * @memberof PatchedGallery
     */
    mediaTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedGallery
     */
    mediaText?: string;
}

/**
 * Check if a given object implements the PatchedGallery interface.
 */
export function instanceOfPatchedGallery(value: object): boolean {
    return true;
}

export function PatchedGalleryFromJSON(json: any): PatchedGallery {
    return PatchedGalleryFromJSONTyped(json, false);
}

export function PatchedGalleryFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedGallery {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'media': json['media'] == null ? undefined : json['media'],
        'viewId': json['viewId'] == null ? undefined : json['viewId'],
        'mediaTitle': json['mediaTitle'] == null ? undefined : json['mediaTitle'],
        'mediaText': json['mediaText'] == null ? undefined : json['mediaText'],
    };
}

export function PatchedGalleryToJSON(value?: PatchedGallery | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'media': value['media'],
        'viewId': value['viewId'],
        'mediaTitle': value['mediaTitle'],
        'mediaText': value['mediaText'],
    };
}

