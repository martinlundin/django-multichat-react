import React, { Component } from 'react';
import './assets/scss/style.css';
import './extend'
import LoginRegister from "./containers/LoginRegister";
import EditProfile from "./components/EditProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {
  render() {
    return (
      <div className="App">
          <ToastContainer closeButton={false} position={"top-center"} toastClassName={"bbToast"} hideProgressBar={true} pauseOnFocusLoss={false}/>

          <EditProfile/>

      </div>
    );
  }
}

export default App;
