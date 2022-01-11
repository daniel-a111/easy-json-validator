import {Type, TypeEnum} from "../types"


/**
 * A function that validates any json by type's rules
 *
 * @param json - The json to validate
 * @param type - The type rules
 * @return boolean - true when json satisfies the rules of type
 */
export function validateObjectByType(json: any, type: Type) {

    // A queue used to validate objects & their nested objects
    let queue: [any, Type][] = [];
    queue.push([json, type]);

    while ( queue.length > 0 ) {

        let next: [any, Type] = <[any, Type]>queue.shift();
        let value: any = next[0];
        let type: Type = next[1];

        // If type is not defined then current value value is redundant
        if( !type ) return false;
        // Missing value for optional property is valid
        if( type.isOptional && !value ) continue;
        // Detect if value is array
        let isArray: boolean = Array.isArray(value);

        if( isArray ) {
            // Array value must have type with dimensions
            // greater then 0
            if( !type.dim || type.dim === 0 ) return false;
            // Clone type for subscriptions validations
            let innerType = JSON.parse(JSON.stringify(type));
            innerType.dim--;
            for( let i = 0; i < value.length; i++ ) {
                // Add items && subscription types to queue
                queue.push([value[i], innerType]);
            }
            continue;
        }
        // Type dimensions must have array as value
        else if( type.dim && type.dim > 0 ) return false;

        switch (type.primitive) {
            // Validate type by primitive
            case TypeEnum.Number:
            case TypeEnum.Float:
                if( typeof value !== 'number') return false;
                break;
            case TypeEnum.Integer:
                if( typeof value !== 'number') return false;
                if( !Number.isInteger(value) ) return false;
                break;
            case TypeEnum.String:
                if( typeof value !== 'string' ) return false;
                break;
            case TypeEnum.Boolean:
                if( value !== false && value !== true ) return false;
                break;
            case TypeEnum.Null:
                if( value !== null ) return false;
                break;
            case TypeEnum.Obj:
                if( typeof value !== 'object' ) return false;
                // Validation of missing properties in json value
                let existsFields = new Set();
                for( let k in type.children ) {
                    if( !type.children[k]?.isOptional ) existsFields.add(k);
                }

                // Validate nested values and their types
                // by adding to queue
                for( let k in value ) {
                    if( type.children ) {
                        queue.push([value[k], type.children[k]]);
                    }
                    // Update indication for missing values
                    existsFields.delete(k);
                }
                // On missing value return false
                if( existsFields.size > 0 ) return false;
                break;
            default:
                // Invalid primitive type
                return false;
        }
    }

    // Whole structure is valid
    return true;
}
