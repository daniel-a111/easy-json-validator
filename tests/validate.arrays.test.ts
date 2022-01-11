import {Rules, TypeEnum} from "../source/types";

test('Detect valid array of strings', () => {

    let b: Rules = new Rules();
    b.set("a*", TypeEnum.String);
    expect(b.validate({a: ['3']})).toBe(true);
});

test('Detect invalid integer type for array', () => {

    let b: Rules = new Rules();
    b.set("a*", TypeEnum.Integer);
    expect(b.validate({a: 3})).toBe(false);
});

test('Detect invalid array subscription type', () => {

    let b: Rules = new Rules();
    b.set("a*", TypeEnum.Integer);
    expect(b.validate({a: ["3"]})).toBe(false);
});

test('Detect invalid array subscription mixed type', () => {

    let b: Rules = new Rules();
    b.set("a*", TypeEnum.Integer);
    expect(b.validate({a: [1, '1']})).toBe(false);
});


test('Detect valid nested 2 dim array of integers', () => {

    let b: Rules = new Rules();
    b.set("a**", TypeEnum.Integer);
    expect(b.validate({a: [[1]]})).toBe(true);
});

test('Detect valid nested 3 dim array of integers', () => {

    let b: Rules = new Rules();
    b.set("a***", TypeEnum.Integer);
    expect(b.validate({a: [[[1]]]})).toBe(true);
});


test('Detect invalid nested 1 dim as 2 dim type', () => {

    let b: Rules = new Rules();
    b.set("a**", TypeEnum.Integer);
    expect(b.validate({a: [1]})).toBe(false);
});

test('Detect invalid nested 2 dim as 3 dim type', () => {

    let b: Rules = new Rules();
    b.set("a***", TypeEnum.Integer);
    expect(b.validate({a: [[1]]})).toBe(false);
});

