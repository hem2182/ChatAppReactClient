import React from 'react';

// we could have used Redux, props sharing instead of react-router.
// for simplicity, the props are passed as query parameters using react router.
// with this, we can focus more on socket.io side.
import { BrowserRouter as Router, Route } from 'react-router-dom';

// importing components
import Join from './components/Join';
import Chat from './components/Chat';

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/chat" component={Chat} />
        </Router>
    );
}

export default App;