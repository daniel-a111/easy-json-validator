import {Rules, TypeEnum} from "../source/types";

test('Detect valid integer property', () => {

    let b: Rules = new Rules();
    b.set("a", TypeEnum.Integer);
    expect(b.validate({a: 3})).toBe(true);
});

test('Detect invalid float value for integer', () => {

    let b: Rules = new Rules();
    b.set("a", TypeEnum.Integer);
    expect(b.validate({a: 3.3})).toBe(false);
});

test('Detect valid string property', () => {

    let b: Rules = new Rules();
    b.set("a", TypeEnum.String);
    expect(b.validate({a: '123'})).toBe(true);
});

