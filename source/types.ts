
// Primitive types
enum TypeEnum {
    Number,
    Integer,
    Float,
    String,
    Boolean,
    Null,
    Obj,
}

interface TypeChildren {
    [index: string]: Type;
}

// Interface for general types, including primitive and nested & complex types
interface Type {
    primitive: TypeEnum;
    dim?: number;
    isOptional?: boolean;
    children?: TypeChildren;
}

// An interface for complex type property builder
// path including the name, its dimensions (by *) and its optional property (by ?)
interface ObjTypeProperty {
    path: string, type: TypeEnum
}

/**
 *  A builder for a complex type rules
 */
class ObjTypeBuilder {

    properties: ObjTypeProperty[];

    constructor() {
        this.properties = [];
    }

    addProp(name: string, type: TypeEnum) {
        this.properties.push({
            path: name, type: type
        });
        return this;
    }

    // Generate Type object from properties
    build(): Type {

        // Initiate root object
        let objStruct: Type = {
            primitive: TypeEnum.Obj,
            children: {}
        };

        // Iterate over all raw properties
        for( let i = 0; i < this.properties.length; i++ ) {
            let prop = this.properties[i];   // property name
            let type: TypeEnum = prop.type;  // property type

            let pathParts: string[] = prop.path.split(".");

            let curObjectType: Type = objStruct;      // Start with root
            for( let j = 0; j < pathParts.length; j++ ) {

                // Next property of the path & Check if array
                let p = pathParts[j];
                let dim = 0;
                let isOptional = p.endsWith('?');
                if( isOptional ) p = p.substring(0, p.length-1);
                while ( p.endsWith('*') ) {
                    dim++; p = p.substring(0, p.length-1);
                }

                // In a case of object, then it might be exists already
                if( curObjectType.children && curObjectType.children[p] === undefined ) {

                    if( j < pathParts.length - 1 ) {
                        // The non last part MUST be an object
                        curObjectType.children[p] = {
                            primitive: TypeEnum.Obj,
                            children: {}     // Object type as a subtype
                            ,isOptional: isOptional,
                            dim: dim
                        };

                    } else {
                        // The last part MUST be a primitive
                        curObjectType.children[p] = {
                            primitive: type,
                            isOptional: isOptional,
                            dim: dim
                        };
                    }
                }

                // On non-last part, we keep with the last object
                if( j < pathParts.length - 1 ) {
                    if( ! curObjectType.children ) curObjectType.children = {};
                    curObjectType = curObjectType.children[p];
                }
            }
        }

        return objStruct;
    }
}

export { ObjTypeBuilder, TypeEnum, Type}