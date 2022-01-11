import {Rules, TypeEnum} from "../source/types";

test('Detect valid simple complex & nested object', () => {

    let b: Rules = new Rules();
    b.set("a.b.c", TypeEnum.Integer);
    b.set("a.b.d", TypeEnum.String);
    b.set("e", TypeEnum.Boolean);
    expect(b.validate({a: { b: {c: 1, d: '1'} }, e: false})).toBe(true);
});


test('Detect valid missing nested optional property', () => {

    let b: Rules = new Rules();
    b.set("a.b.c?", TypeEnum.Integer);
    b.set("a.b.d", TypeEnum.String);
    b.set("e", TypeEnum.Boolean);
    expect(b.validate({a: { b: {d: '1'} }, e: false})).toBe(true);
});


test('Detect invalid missing nested property', () => {

    let b: Rules = new Rules();
    b.set("a.b.c", TypeEnum.Integer);
    b.set("a.b.d", TypeEnum.String)
    b.set("e", TypeEnum.Boolean)
    expect(b.validate({a: { b: {d: '1'} }, e: false})).toBe(false);
});

test('Detect invalid redundant nested property', () => {

    let b: Rules = new Rules();
    b.set("a.b.d", TypeEnum.String)
    b.set("e", TypeEnum.Boolean)
    expect(b.validate({a: { b: {c: 1, d: '1'} }, e: false})).toBe(false);
});
