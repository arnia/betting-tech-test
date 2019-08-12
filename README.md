This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn install`

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

It expects to find an open websocket at `ws://localhost:8889`

## Stack

I used `reactJS`, `redux` & `redux-saga` to build it;

The app has a lot of changing parts and for every change multiple components have to update to display the new data. 
`redux ` helped by keeping the state in one place. Also normalizing the data before storing it made the subscriptions(which I introduced later) easier to handle.

The communication with the web-socket was simplified by `redux-saga` to dispatching events in components and handling them in reducers.

To keep the data immutable I used [immerJS][https://github.com/immerjs/immer].

The feature where I had the freedom to choose how to allow the browsing for event details was implemented as a new page and `react-router` helped.





