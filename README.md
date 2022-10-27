# use-react-amplitude

[![codecov](https://codecov.io/gh/Valyay/use-react-amplitude/branch/main/graph/badge.svg?token=1ZQ8W9Y87T)](https://codecov.io/gh/Valyay/use-react-amplitude)

React hooks for [Amplitude](https://amplitude.com/).

## Features

- **Small.** 363 bytes (minified and gzipped).
  [Size Limit](https://github.com/ai/size-limit) controls the size.
- **Simple.**
- **Modern.** Based on the latest [Typescript SDK for Web](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/), but does not required installation. Сan be used with the Typescript SDK.
- **Typescript support.**

## Install

    npm install @valyay/use-react-amplitude

## Changelog

https://github.com/Valyay/use-react-amplitude/blob/main/CHANGELOG.md

## How to use

First, you must initialize the SDK. Find your Amplitude project's API Key in your project's [Settings page](https://help.amplitude.com/hc/en-us/articles/235649848#project-general-settings) and pass the first argument in the function `initAmplitude`. Your project's API key is required. You can pass an optional user ID and options object in this call. After initialization you can use hooks.

    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import { initAmplitude } from '@valyay/use-react-amplitude';

    // Option 1, initialize with apiKey only
    initAmplitude('YOUR_AMPLITUDE_API_KEY');

    // Option 2, initialize with user id
    initAmplitude('YOUR_AMPLITUDE_API_KEY', 'user@gmail.com');

    // Option 3, initialize with options
    initAmplitude('YOUR_AMPLITUDE_API_KEY', 'user@gmail.com', your_options);

    ReactDOM.render(
        <React.StrictMode>
          <App />
      </React.StrictMode>,
    document.getElementById("root"),
    );

## Track event when component mounts

    import React from "react";
    import { useTrackOnMount } from '@valyay/use-react-amplitude';

    export const Component = () => {

      // Option 1, initialize with event input only
      const {code, event, message} = useTrackOnMount('user_event');

      // Option 2, initialize with event properties
      const {code, event, message} = useTrackOnMount('user_event', {userProp: "foo"});

      // Option 3, initialize with event options
      const {code, event, message} = useTrackOnMount('user_event', {userProp: "foo"}, {insert_id: "test_insert_id"});

      // Hook return code, event and message of event
      const {code, event, message} = useTrackOnMount('user_event', {userProp: "foo"}, {insert_id: "test_insert_id"});

      // console.log(event); // {...}
      // console.log(code); // 200
      // console.log(message); // "Event tracked successfully"

      return <div>Title</div>;

    };

## Track event when component mounts or dependencies change

    import React, { useState } from "react";
    import { useTrackOnChange } from '@valyay/use-react-amplitude';

    export const Component = () => {

      const [count, setCount] = useState<number>(0);

      useTrackOnChange("count increase", [count]);

      return (
        <div>
            <button onClick={()=>{setCount(count+1);}}>click</button>
      </div>
      );

    };

## Track event when only dependencies change

    import React, { useState } from "react";
    import { useTrackOnUpdate } from '@valyay/use-react-amplitude';

    export const Component = () => {

      const [count, setCount] = useState<number>(0);

      useTrackOnUpdate("count increase", [count]);

      return (
        <div>
            <button onClick={()=>{setCount(count+1);}}>click</button>
      </div>
      );

    };

## API

### initAmplitude

Wrapper for initialization Amplitude. Full analogue of [init](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/?h=typ#initialize-the-sdk).

|  Prop   |                                                     Type                                                      | Required |
| :-----: | :-----------------------------------------------------------------------------------------------------------: | :------: |
| apiKey  |                                                    string                                                     |   true   |
| userId  |                                                    string                                                     |  false   |
| options | [BrowserOptions](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/?h=typ#configuration) |  false   |

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
