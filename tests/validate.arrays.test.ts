import {ObjTypeBuilder, TypeEnum} from "../source/types";
import {validateObjectByType} from "../source/json/validation";

test('Detect valid array of strings', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a*", TypeEnum.String);
    expect(validateObjectByType({a: ['3']}, b.build())).toBe(true);
});

test('Detect invalid integer type for array', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a*", TypeEnum.Integer);
    expect(validateObjectByType({a: 3}, b.build())).toBe(false);
});

test('Detect invalid array subscription type', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a*", TypeEnum.Integer);
    expect(validateObjectByType({a: ["3"]}, b.build())).toBe(false);
});

test('Detect invalid array subscription mixed type', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a*", TypeEnum.Integer);
    expect(validateObjectByType({a: [1, '1']}, b.build())).toBe(false);
});


test('Detect valid nested 2 dim array of integers', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a**", TypeEnum.Integer);
    expect(validateObjectByType({a: [[1]]}, b.build())).toBe(true);
});

test('Detect valid nested 3 dim array of integers', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a***", TypeEnum.Integer);
    expect(validateObjectByType({a: [[[1]]]}, b.build())).toBe(true);
});


test('Detect invalid nested 1 dim as 2 dim type', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a**", TypeEnum.Integer);
    expect(validateObjectByType({a: [1]}, b.build())).toBe(false);
});

test('Detect invalid nested 2 dim as 3 dim type', () => {

    let b: ObjTypeBuilder = new ObjTypeBuilder();
    b.addProp("a***", TypeEnum.Integer);
    expect(validateObjectByType({a: [[1]]}, b.build())).toBe(false);
});

