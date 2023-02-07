# Chart.js

![Inkdrop Plugin Version](https://inkdrop-plugin-badge.vercel.app/api/version/chartjs?style=flat)
![Inkdrop Plugin Downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/chartjs?style=flat)

Inkdrop plugin for drawing charts with [Chart.js](https://www.chartjs.org/)

![sample](./img/sample.png)

## Usage

Create a fenced code block specifying a `chart` identifier and write a JSON `config` code to be passed into the `new Chart(ctx, config)` class as a second argument.

For example:

````
```chart
{
  type: "bar",
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
    }]
  }
}
```
````

This plugin parses code block contents with [JSON5](https://json5.org), so there is no need to write strict JSON and it can be written in a normal JavaScript object.

**NOTE**

This plugin renders a chart as a static image and disables animations. Thus, all animation-related options in your configs will be ignored.

## Breaking changes

Since the version 2.0 this plugin uses Chart.js v4 on backend. Your previous codes supposing Chart.js v2 may get broken.

## CHANGELOG

- 2.1.0

  - Make background transparent

- 2.0.0

  - Upgrade Chart.js from v2.9.4 to v4.2.0

- 1.3.5

  - Fix the error caused by react-resize-aware

- 1.3.0

  - re-render responsively when the preview pane is resized

- 1.2.0

  - JSON syntax highlight in a fenced code block

- 1.1.0
  - allow Relaxed-JSON format

```

```
