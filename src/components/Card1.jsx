import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

const Card1 = () => {
    const array = [
        {
            title: "Card 1",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus."
        },
        {
            title: "Card 2",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus."
        },
        {
            title: "Card 3",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus."
        }
    ];

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="col-11">
                <Row xs={1} md={2} lg={3} className="g-4">
                    {array.map((item, index) => (
                        <Col key={index}>
                            <Card className="h-100 mb-4">
                                <Card.Body>
                                    <Card.Title className="fs-6">{item.title}</Card.Title>
                                    <Card.Text style={{ fontSize: '15px' }}>{item.desc}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Card1;
