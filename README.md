# Chart.js
A plugin for drawing chart with [Chart.js](https://www.chartjs.org/)

![sample](./img/sample.png)

## Install

```
ipm install chartjs
```

## Usage

Following the [Chart.js usage](https://www.chartjs.org/docs/latest/getting-started/usage.html), write JSON config to be passed into `Chart(ctx, config)` object as a second parameter.

````
```chart
{
    "type": "pie",
    "data": {
        "labels": ["Foo", "Bar", "Baz"],
        "datasets": [{
            "data": [40, 32, 22],
            "backgroundColor": [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    }
}
```
````

This will be rendered as

![pie chart example](./img/pie.png)

### NOTE

A JSON config you write in code blocks will be parsed with JavaScript function `JSON.parse()`. So you cannot write code in JavaScript object format which allows 

- trailing commas
- single quoted string
- key string without double quotes

and so on. These will cause `SyntaxError`.


**❌Bad**
````
```chart
{
    type: 'pie',
    data: {
        labels: ['Foo', 'Bar', 'Baz',],
        ...
    }
}
```
````

**✔️Good**
````
```chart
{
    "type": "pie",
    "data": {
        "labels": ["Foo", "Bar", "Baz"],
        ...
    }
}
```
````
