import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <p className='mb-1'>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
          </li>
        ))}
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