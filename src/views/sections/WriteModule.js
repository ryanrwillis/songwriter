import React, {Component} from 'react';

import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col, Input, Button, UncontrolledAlert, Badge, Alert
} from "reactstrap";
import SongLine from "../../components/SongLine";
import {Link} from "react-router-dom";

class WriteModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      currentLine: '',
      genre: 'Rock'
    }

  }

  addLine = (line)=>{
    let line_list = this.state.lines
    line_list.push(line)

    this.setState({
      lines: line_list
    })
  }

  removeLine = index => e =>{
    e.preventDefault()
    let line_list = this.state.lines
    line_list.splice(index, 1)
    this.setState({lines: line_list})
  }

  handleInputChange = (e)=>{
    this.setState({currentLine: e.target.value})
  }

  completePressed = (e) =>{
    e.preventDefault()
    this.addLine(this.state.currentLine);
    this.setState({currentLine: ""})
  }



  render() {
      return (
          <div>
              <Row className="justify-content-center mt-md">
                  <Col lg='6'>
                      <Navbar className="navbar-dark bg-primary rounded" expand="lg">
                        <Container>
                          <NavbarBrand
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Notepad
                          </NavbarBrand>
                          <Badge className="text-uppercase" color="success" pill>
                            Current Genre: {this.state.genre}
                          </Badge>
                          <button className="navbar-toggler" id="nav-inner-primary">
                            <span className="navbar-toggler-icon" />
                          </button>
                            <Nav className="ml-lg-auto" navbar>
                              <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav>Options</DropdownToggle>
                                <DropdownMenu
                                  aria-labelledby="nav-inner-primary_dropdown_1"
                                  right
                                >
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Clear Notepad
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                  >
                                    Model Properties
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </Nav>
                        </Container>
                      </Navbar>
                  </Col>
                  {/*<Col lg='6'/>*/}
              </Row>
                  {this.state.lines.map((line, index) => (
                    <Row className="justify-content-center mt-md-1">
                      <Col lg='6'>
                      <Alert style={{marginBottom:"0px"}} color='default' fade={false}>
                        <Row>
                          <Col lg='10' md='10' sm='10'>
                        <span className="alert-inner--text ml-1">
                          {line}
                        </span>
                            </Col>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Col lg='2' md='2' sm='2'>
                          <Button onClick={this.removeLine(index)} color="primary" size="sm" type="button">
                            <span className="btn-inner--icon">
                              <i className="ni ni-fat-delete" />
                            </span>
                          </Button>
                          </Col>

                        </div>
                        </Row>
                      </Alert>
                      </Col>
                    </Row>
                  ))}
              <Row className="justify-content-center mt-md-3">
                  <Col lg='5'>
                      <Input placeholder="This is the first line of my new song!" type="text" onChange={this.handleInputChange} value={this.state.currentLine}/>
                  </Col>
                  <Col lg='1'>
                    <Button
                      className="btn-icon btn-2 ml-2"
                      color="primary"
                      type="button"
                      onClick={e => this.completePressed(e)}
                    >
                      {/*<p>Complete</p>*/}
                      <span className="btn-inner--icon">
                        <i className="ni ni-button-play" />
                        {/*<span className="btn-inner--text">Complete</span>*/}
                      </span>
                    </Button>
                  </Col>
              </Row>
          </div>
      );
  }
}

export default WriteModule;