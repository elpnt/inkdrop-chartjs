# Chart.js

![Inkdrop Plugin Version](https://inkdrop-plugin-badge.vercel.app/api/version/chartjs?style=flat)
![Inkdrop Plugin Downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/chartjs?style=flat)

Inkdrop plugin for drawing charts with [Chart.js](https://www.chartjs.org/)

![sample](./img/sample.png)

## Usage

Following the [Chart.js documentation](https://www.chartjs.org/docs/latest/), write a JSON config to be passed into the `Chart(ctx, config)` class as a second argument `config`.

This plugin parses code block contents by [JSON5](https://json5.org), so there is no need to write strict JSON and it can be written in a nomarl JavaScript object like the above screenshot.

## Breaking changes

Since the version 2.0 this plugin uses Chart.js v4 on backend. Your previous codes supposing Chart.js v2 may be broken.

## CHANGELOG

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
