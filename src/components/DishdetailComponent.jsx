import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this) //Another way to declare the function to use as shown in the NavbarToggler (as a state reference). The other way was to use an arrow function
    this.toggleModal = this.toggleModal.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  toggleNav() { //Described above
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
      + " Remember: " + this.remember.checked); //GETTING DIRECTLY FROM THE DOM
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-sign-in fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <div className='col-12 col-md-9'>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" name="rating"
                    defaultValue={1}
                    className='form-control' >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name">Your Name</Label>
                  <Control.text model=".name" id="name" name="name"
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.name'
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="6"
                    className='form-control' />
                </Row>
                <Row className="form-group">
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment >
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div key={dish.id}>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle heading>{dish.name}</CardTitle>
            <CardText>{dish.description} </CardText>
          </CardBody>
        </Card>
      </div >
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments }) {
  if (comments != null && comments.length > 0) {
    return (
      <ul className='list-unstyled'>
        <h4><b>Comments</b></h4>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className='mb-1'>{comment.comment}</p>
            <p></p>
            <p className='mb-1'>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
            <p></p>
          </li>
        ))}
        <li >
          <CommentForm />
        </li>
      </ul>
    );
  }
  else {
    return <div></div>
  }
}

const DishDetail = (props) => {
  return (
    <div className='container'>
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>
          <RenderDish dish={props.dish} />
        </div>
        <div className='col-12 col-md-5 m-1'>
          <RenderComments comments={
            props.dish != null
              ? props.comments
              : []
          } />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;