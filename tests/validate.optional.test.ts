import {ObjTypeBuilder, TypeEnum} from "../source/types";
import {validateObjectByType} from "../source/json/validation";

test('Detect valid missing optional integer property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a?", TypeEnum.Integer);
    expect(validateObjectByType({}, b.build())).toBe(true);
});


test('Detect valid optional integer property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a?", TypeEnum.Integer);
    expect(validateObjectByType({a: 3}, b.build())).toBe(true);
});


test('Detect invalid missing non-optional integer property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a", TypeEnum.Integer);
    expect(validateObjectByType({}, b.build())).toBe(false);
});

test('Detect invalid string value for non-optional integer property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a", TypeEnum.Integer);
    expect(validateObjectByType({ a: '123' }, b.build())).toBe(false);
});
