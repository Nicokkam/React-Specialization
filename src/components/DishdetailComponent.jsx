import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
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

  renderComments(comments) {
    if (comments != null && comments.length > 0) {
      return (
        <ul className='list-unstyled'>
          <h4><b>Comments</b></h4>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p className='mb-1'>{comment.comment}</p>
              <p className='mb-1'>-- {comment.author}, {comment.date}</p>
            </li>
          ))}
        </ul>
      );
    }
    else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className='col-12 col-md-5 m-1'>
          {this.renderComments(
            this.props.selectedDish != null
              ? this.props.selectedDish.comments
              : []
          )}
        </div>
      </div>
    );
  }
}

export default DishDetail;