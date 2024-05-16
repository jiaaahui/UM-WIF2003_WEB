import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import EditProfileIcon from '../../assets/icons/profile/edit_fill.svg';
import { Link } from 'react-router-dom';

function ProfileHeader(props) {
  const { name, university, location, avatarSrc,headline,tags } = props;

  return (
    <Container style={{ margin: 'auto',width:'1000px' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={4} className="text-center">
          <Image style={{height:'200px'}} src={avatarSrc} roundedCircle />
        </Col>
        <Col xs={12} md={8} >
          <h2 style={{marginTop:'20px'}}>{name}</h2>
          <div style={{
            display:'flex',
        
        }}>
          <p style={{
            marginRight:'100px',
            color:'#2D4777'
          }}>{university}</p>
          <p style={{
            color:'#858585'
          }}>{location}</p>
        </div>
        <p>{headline}</p>
        <div style={{ display: 'flex' }}>
            {tags.map((tag, index) => (
              <div key={index} style={{
                backgroundColor: '#80D1D5',
                color: 'white',
                padding: '5px 10px',
                marginRight: '20px',
                borderRadius: '10px',
              }}>{tag}</div>
            ))}
            <Link to="/EditProfile">
    <img src={EditProfileIcon} alt="edit profile" style={{ width: '30px', height: '30px', marginLeft:'220px' }} />
  </Link>
          </div>
        
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileHeader;