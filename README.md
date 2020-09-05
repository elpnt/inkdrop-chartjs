# Chart.js
![Inkdrop Plugin Version](https://inkdrop-plugin-badge.vercel.app/api/version/chartjs&style=flat)
![Inkdrop Plugin Downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/chartjs&style=flat)

Inkdrop plugin for drawing a chart with [Chart.js](https://www.chartjs.org/)

![sample](./img/sample.png)

## Install

```
ipm install chartjs
```

## Usage

Following the [Chart.js usage](https://www.chartjs.org/docs/latest/getting-started/usage.html), write a JSON config to be passed into `Chart(ctx, config)` object as a second parameter.

**NOTE**

Since the version 1.1.0, this plugin allows [Relaxed-JSON](http://oleg.fi/relaxed-json) instead of a strict vanilla JSON format. It is allowed to use

- comments in JSON
- trailing commas
- single quote strings
- strings without single/double quotes

and so on.

**Example**

````
```chart
{
    type: pie, 
    data: {
        // we are given three data
        labels: [Foo, Bar, Baz],
        datasets: [{
            data: [40, 32, 22],
            backgroundColor: [
                #FF6384,
                #36A2EB,
                #FFCE56,
            ]
        }]
    }
}
```
````

This will be rendered as

![pie chart example](./img/pie.png)

Also you can write in a strict JSON format such as

```
{
    "type": "pie", 
    "data": {
        "labels": ["Foo", "Bar", "Baz"],
        "datasets: [{
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

## CHANGELOG

- 1.2.0
  - JSON syntax highlight in a fenced code block

- 1.1.0
  - allow Relaxed-JSON format