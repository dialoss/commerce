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
 * @interface Comment
 */
export interface Comment {
    /**
     * 
     * @type {number}
     * @memberof Comment
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    page: string;
    /**
     * 
     * @type {Date}
     * @memberof Comment
     */
    time?: Date;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    text?: string;
    /**
     * 
     * @type {number}
     * @memberof Comment
     */
    parent?: number;
    /**
     * 
     * @type {number}
     * @memberof Comment
     */
    user?: number;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    media?: string;
}

/**
 * Check if a given object implements the Comment interface.
 */
export function instanceOfComment(value: object): boolean {
    if (!('id' in value)) return false;
    if (!('page' in value)) return false;
    return true;
}

export function CommentFromJSON(json: any): Comment {
    return CommentFromJSONTyped(json, false);
}

export function CommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Comment {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'page': json['page'],
        'time': json['time'] == null ? undefined : (new Date(json['time'])),
        'text': json['text'] == null ? undefined : json['text'],
        'parent': json['parent'] == null ? undefined : json['parent'],
        'user': json['user'] == null ? undefined : json['user'],
        'media': json['media'] == null ? undefined : json['media'],
    };
}

export function CommentToJSON(value?: Comment | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'time': value['time'] == null ? undefined : ((value['time'] as any).toISOString()),
        'text': value['text'],
        'parent': value['parent'],
        'user': value['user'],
        'media': value['media'],
    };
}

