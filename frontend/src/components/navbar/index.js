import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../components/logo.jpg";
import "./index.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get("jwtToken") || "",
      showMenu: false,
    };
  }

  logOutClick = () => {
    Cookies.remove("jwtToken");
    this.setState({ token: "" });
    this.props.onTokenChange(undefined);
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  render() {
    const { token } = this.state;

    return (
      <nav className="nav-header">
        <div className="nav-menu-laptop">
          <div className="nav-bar-large-container">
            <div>
              <Link to="/">
                <img
                  src={logo}
                  style={{ width: "60px", height: "50px" }}
                  alt="immg"
                  className="immg"
                />
              </Link>
            </div>
            <div>
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/searchresults" className="nav-link">
                    Search Results
                  </Link>
                </li>
                
                <li className="nav-menu-item">
                  <div className={token ? "diss" : ""}>
                    <Link to="/register" className="nav-link">
                      <button className="registerbutton" style={{ width: "100px",height:"40px", borderRadius: "5px" }}>
                        Register
                      </button>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav-menu-mobile">
          <Link to="/login">
            <img
              alt="nav-icon"
              src="https://imagetolink.com/ib/iFd6oIsdRP.png"
              style={{ width: "60px", height: "50px" }}
            />
          </Link>
          <div
            className={this.state.showMenu ? "hamburger-icon-hide" : "hamburger-icon"}
            onClick={this.toggleMenu}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <ul
            className={this.state.showMenu ? "nav-menu-mobile-ul show" : "nav-menu-mobile-ul"}
          >
            <li>
              <Link to="/business">Business</Link>
            </li>
            <li>
              <Link to="/financial">Financial</Link>
            </li>
            <li>
              <Link to="/legal">Legal</Link>
            </li>
            <li>
              <Link to="/advertisement">Advertisement</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
