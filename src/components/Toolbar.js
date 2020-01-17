import React, { Component } from 'react'
import '../assests/toolbar.css'
import axios from 'axios';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input
} from "reactstrap";


export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.sidebarToggle = React.createRef();
    }
    componentDidMount() {
        //รับค่า user แบบลักไก่
        axios.get('http://localhost:5000/users/5dc9a42c824eb44fe43c8f94')
          .then(response => {
            this.setState({
              profile: response.data
            })
            /*console.log(this.state.profile.firstname);
            console.log(this.state.profile.role);
            console.log(this.state.profile._id);*/
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    openSidebar() {
        document.documentElement.classList.toggle("nav-open");
        this.sidebarToggle.current.classList.toggle("toggled");
    }


    render() {
        return (
            <Navbar className="nuvbar" expand="lg">
                <Container fluid>
                    <div className="nuv">
                        <div className="nuv_button_left">
                            <button ref={this.sidebarToggle} className="nuv_toggle_left" onClick={() => this.openSidebar()}>
                                <span className="nuv_toggle_bar" />
                                <span className="nuv_toggle_bar" />
                                <span className="nuv_toggle_bar" />
                            </button>
                        </div>
                        <div className="nuv_logo"><a href="/">SFR</a></div>
                    </div>
                    <NavbarToggler onClick={this.toggle}>
                        <div className="nuv_toggle_right">
                            <span className="nuv_toggle_point" />
                            <span className="nuv_toggle_point" />
                            <span className="nuv_toggle_point" />
                        </div>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar >
                        <form>
                            <InputGroup className="no-border">
                                <Input placeholder="Search..." />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <i className="fas fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </form>
                        <Nav navbar className="nuv_items">
                            <NavItem>
                                <div><a href="/"><i className="fas fa-bell" />คำขอร้อง</a></div>
                            </NavItem>
                            <NavItem>
                                {this.props.role === "Responder" ?<div ><a href="/surveys">แบบสอบถาม</a></div>:<div ><a href="/surveys">แบบสอบถาม</a><a href="/projects">โปรเจค</a></div> }
                            </NavItem>
                            {console.log(this.props.role)}
                            <NavItem>
                                <div ><a href="/contacts">ติดต่อเรา</a></div>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        )
    }
}
