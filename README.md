# easy-json-validator
This tool uses for validate a complex JSON object by easy set of rules.

# Usage
## Define a new type / structure by set of rules
```
let r: Rules = new Rules();
r.set("a.b.c", TypeEnum.Integer);
r.set("a.b.d", TypeEnum.String);
r.set("e", TypeEnum.Boolean);
```
the above example define an object of the form:
```
{
  "a": {
    "b": {
      "c": 1, 
      "d": "a"
    }
  },
  "e": false
}
```

Then it can be validate by:
```
let isValid: boolean = b.validate(
{
  "a": {
    "b": {
      "c": 1, 
      "d": "a"
    }
  },
  "e": false
});
```
where b.build() is a type object - a set of rules. The above example set isValid to be true, the next example
set isValid to be false, because "a.b.d" is of the type integer and not string as defined.
```
let isValid: boolean = r.validate(
{
  "a": {
    "b": {
      "c": 1, 
      "d": 1
    }
  },
  "e": false
});
```
### Lists
Lists can defined by ```*``` as follow
```
r.set("a*", TypeEnum.Integer);
```
In the above case the property 'a' should holds a list (or array) of integers. With the same methodolgy
we can define 2dim lists and so, for example
```r.set("a**", TypeEnum.Integer);```
define a's type to be 2dim list of integers.

### Optional
An optional property can be defined by ?, for example:
```
r.set("a?", TypeEnum.Integer);
```
In that example 
```console.log(r.validate({});``` prints ```true```.

We can combine a property to be a list & an optional by set the rule
```
r.set("a*?", TypeEnum.Integer);
```
or
```
r.set("a**?", TypeEnum.Integer);
```
Note that ```?``` character must be the last character of a property path or be located immediate
before ```.``` character.
