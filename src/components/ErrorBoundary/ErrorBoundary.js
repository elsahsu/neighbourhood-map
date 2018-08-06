import React from 'react';

/* ErrorBoundary component for handling errors. Based on this:
 * https://reactjs.org/docs/error-boundaries.html
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    console.log('componentDidCatch');
    console.log(error);
    console.log(info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="WarningMessage"> {this.props.message} </div>
    }
    return this.props.children;
  }
}

export default ErrorBoundary
