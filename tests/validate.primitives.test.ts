import {ObjTypeBuilder, TypeEnum} from "../source/types";
import {validateObjectByType} from "../source/json/validation";

test('Detect valid integer property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a", TypeEnum.Integer);
    expect(validateObjectByType({a: 3}, b.build())).toBe(true);
});

test('Detect invalid float value for integer', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a", TypeEnum.Integer);
    expect(validateObjectByType({a: 3.3}, b.build())).toBe(false);
});

test('Detect valid string property', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a", TypeEnum.String);
    expect(validateObjectByType({a: '123'}, b.build())).toBe(true);
});

