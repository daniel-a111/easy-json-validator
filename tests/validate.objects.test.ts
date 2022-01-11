import {ObjTypeBuilder, TypeEnum} from "../source/types";
import {validateObjectByType} from "../source/json/validation";

test('Detect valid simple complex & nested object', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a.b.c", TypeEnum.Integer);
    b.addProp("a.b.d", TypeEnum.String);
    b.addProp("e", TypeEnum.Boolean);
    expect(validateObjectByType({a: { b: {c: 1, d: '1'} }, e: false}, b.build())).toBe(true);
});


test('Detect valid missing nested optional property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a.b.c?", TypeEnum.Integer);
    b.addProp("a.b.d", TypeEnum.String);
    b.addProp("e", TypeEnum.Boolean);
    expect(validateObjectByType({a: { b: {d: '1'} }, e: false}, b.build())).toBe(true);
});


test('Detect invalid missing nested property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a.b.c", TypeEnum.Integer);
    b.addProp("a.b.d", TypeEnum.String)
    b.addProp("e", TypeEnum.Boolean)
    expect(validateObjectByType({a: { b: {d: '1'} }, e: false}, b.build())).toBe(false);
});

test('Detect invalid redundant nested property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a.b.d", TypeEnum.String)
    b.addProp("e", TypeEnum.Boolean)
    expect(validateObjectByType({a: { b: {c: 1, d: '1'} }, e: false}, b.build())).toBe(false);
});
