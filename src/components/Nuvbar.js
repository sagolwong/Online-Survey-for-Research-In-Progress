import React, { Component } from 'react'
import '../assests/toolbar.css'



export default class Nuvbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <header className="nuvbar">
        <nav className="nuv">
          <div className="nuv_button_left">
            <button className="nuv_toggle_left">
              <span className="nuv_toggle_bar" />
              <span className="nuv_toggle_bar" />
              <span className="nuv_toggle_bar" />
            </button>
          </div>
          <div className="nuv_logo"><a href="/">SurveyJS for Research</a></div>
        </nav>
        <div className="spacer" />
        <div className="nuv_button_right">
          <button className="nuv_toggle_right">
            <span className="nuv_toggle_point" />
            <span className="nuv_toggle_point" />
            <span className="nuv_toggle_point" />
          </button>
        </div>
        <div className="nuv_items">
          <ul>
            <li><a href="/">หน้าแรก</a></li>
            <li><a href="/">แบบสอบถาม</a></li>
            <li><a href="/">ติดต่อเรา</a></li>
          </ul>
        </div>

      </header>
    )
  }
}
