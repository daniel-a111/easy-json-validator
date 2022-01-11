import {Rules, TypeEnum} from "../source/types";

test('Detect valid missing optional integer property', () => {

    let b: Rules = new Rules();
    b.set("a?", TypeEnum.Integer);
    expect(b.validate({})).toBe(true);
});


test('Detect valid optional integer property', () => {

    let b: Rules = new Rules();
    b.set("a?", TypeEnum.Integer);
    expect(b.validate({a: 3})).toBe(true);
});


test('Detect invalid missing non-optional integer property', () => {

    let b: Rules = new Rules();
    b.set("a", TypeEnum.Integer);
    expect(b.validate({})).toBe(false);
});

test('Detect invalid string value for non-optional integer property', () => {

    let b: Rules = new Rules();
    b.set("a", TypeEnum.Integer);
    expect(b.validate({ a: '123' })).toBe(false);
});
