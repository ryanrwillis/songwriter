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
  Col, Input, Button, UncontrolledAlert, Badge, Alert, Modal
} from "reactstrap";
import SongLine from "../../components/SongLine";
import {Link} from "react-router-dom";
const axios = require('axios')

class WriteModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      currentLine: '',
      genre: 'Rap',
      predictionLength: 25,
      firstRunAlert: false,
      firstRun: true
    }
    // axios.get('/test').then(res =>{
    //   this.setState({test: res['data']})
    // })
  }

  autoComplete = input =>{
    const request = {
      url: '/complete',
      method: 'get',
      headers: {
        input: input,
        predict_length: this.state.predictionLength
      }
    }
    axios(request).then(res =>{
      let currentLines = this.state.lines
      currentLines[currentLines.length - 1] = res['data']['response']
      this.setState({lines: currentLines})
    })
  }

  addLine = (line) =>{
    let line_list = this.state.lines
    line_list.push(line)

    this.setState({
      lines: line_list
    })
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

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
    this.autoComplete(this.state.currentLine)
    this.setState({currentLine: ""})
    if(this.state.firstRun){
      this.state.firstRun = false;
      this.toggleModal("firstRunAlert")
    }
  }

  clearLines = (e) =>{
    e.preventDefault()
    this.setState({lines: []})
  }

  getPreviewText = () =>{
    if(this.state.lines.length == 0){
      return "Start writing your first line, and let the algorithm complete it!"
    } else {
      return "Add additional lines"
    }
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
                                    onClick={this.clearLines}
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
                      <Input placeholder={this.getPreviewText()} type="text" onChange={this.handleInputChange} value={this.state.currentLine}/>
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
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.firstRunAlert}
              toggle={() => this.toggleModal("notificationModal")}
            >
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h1 className="heading mt-4"><string>Disclaimer</string></h1>
                  <p>
                    This lyric generation algorithm was trained on real data from real artists.
                    Furthermore, the lyrics were not filtered for sensitive topics and/or language.
                  </p>
                  <p>
                    By using this application, you acknowledge that the lyrics generated by the application do not reflect opinions or vocabulary of the developer.
                  </p>
                </div>
              </div>
              <div className="text-center" style={{marginBottom:"10%"}}>
                <Button className="btn-white" color="default" type="button" onClick={() => this.toggleModal("firstRunAlert")}>
                  Ok, I Understand
                </Button>
                {/*<Button*/}
                {/*  className="text-white ml-auto"*/}
                {/*  color="link"*/}
                {/*  data-dismiss="modal"*/}
                {/*  type="button"*/}
                {/*  onClick={() => this.toggleModal("firstRunAlert")}*/}
                {/*>*/}
                {/*  Close*/}
                {/*</Button>*/}
              </div>
            </Modal>
          </div>
      );
  }
}

export default WriteModule;