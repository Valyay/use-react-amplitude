# use-react-amplitude

[![codecov](https://codecov.io/gh/Valyay/use-react-amplitude/branch/main/graph/badge.svg?token=1ZQ8W9Y87T)](https://codecov.io/gh/Valyay/use-react-amplitude)

React hooks for [Amplitude](https://amplitude.com/).

## Features

- **Small.** 5 kB (minified and gzipped).
  [Size Limit](https://github.com/ai/size-limit) controls the size.
- **Simple.**
- **Typescript support.**

## Install

    npm install @use-react-amplitude

## Changelog

https://github.com/Valyay/use-react-amplitude/blob/main/CHANGELOG.md

## API

### useTrackOnMount

Hook is called after the component is mounted. Analogue of componentDidMount.

|      Prop       |          Type           | Required |
| :-------------: | :---------------------: | :------: |
|   eventInput    |         string          |   true   |
| eventProperties | Record<string, unknown> |  false   |
|  eventOptions   |      EventOptions       |  false   |

### useTrackOnChange

The hook is called after mounting a component or changing any of the values in the array. (deep comparison is used)

|      Prop       |          Type           | Required |
| :-------------: | :---------------------: | :------: |
|   eventInput    |         string          |   true   |
|  dependencies   |     DependencyList      |   true   |
| eventProperties | Record<string, unknown> |  false   |
|  eventOptions   |      EventOptions       |  false   |

### useTrackOnUpdate

The hook is called after changing any of the values in the array. Analogue of componentDidUpdate. (deep comparison is used)

|      Prop       |          Type           | Required |
| :-------------: | :---------------------: | :------: |
|   eventInput    |         string          |   true   |
|  dependencies   |     DependencyList      |   true   |
| eventProperties | Record<string, unknown> |  false   |
|  eventOptions   |      EventOptions       |  false   |
