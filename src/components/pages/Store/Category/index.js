import Card from 'react-bootstrap/Card';
import images from '~/assets/images';
function Category() {

  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '25rem' , cursor:'pointer',backgroundColor:'red'}}>
        <Card.Img variant="top" style={{ width: '243px', height: '163px' }} src={images.gym} />
        <Card.Body>
          <Card.Title style={{fontSize:'20px' , textAlign:'center', color:'white'}}>Dụng cụ tập gym</Card.Title>
        </Card.Body>
      </Card>

      <Card style={{ width: '25rem' , cursor:'pointer',backgroundColor:'red'}}>
        <Card.Img variant="top" style={{ width: '243px', height: '163px' }} src={images.ball} />
        <Card.Body>
          <Card.Title style={{fontSize:'20px' , textAlign:'center', color:'white'}}>Dụng cụ bóng đá</Card.Title>
        </Card.Body>
      </Card>

      <Card style={{ width: '25rem' , cursor:'pointer',backgroundColor:'red'}}>
        <Card.Img variant="top" style={{ width: '243px', height: '163px' }} src={images.vo} />
        <Card.Body>
          <Card.Title style={{fontSize:'20px' , textAlign:'center', color:'white'}}>Dụng cụ võ thuật</Card.Title>
        </Card.Body>
      </Card>

      <Card style={{ width: '25rem' , cursor:'pointer',backgroundColor:'red'}}>
        <Card.Img variant="top" style={{ width: '243px', height: '163px' }} src={images.swim} />
        <Card.Body>
          <Card.Title style={{fontSize:'20px' , textAlign:'center', color:'white'}}>Dụng cụ bơi lội</Card.Title>
        </Card.Body>
      </Card>

      <Card style={{ width: '25rem' , cursor:'pointer',backgroundColor:'red'}}>
        <Card.Img variant="top" style={{ width: '243px', height: '163px' }} src={images.badminton} />
        <Card.Body>
          <Card.Title style={{fontSize:'20px' , textAlign:'center', color:'white'}}>Dụng cụ cầu lông</Card.Title>
        </Card.Body>
      </Card>
      </div>
    
  );
}

export default Category;
