import Card from 'react-bootstrap/Card';

const Cards = () => {
    const array = [
        {
            image: "src/images/pexels-photo-842811.jpeg",
            title: "Tom Cruise",
            desc: "Founder & Chairman"
        },
        {
            image: "src/images/images.jpeg",
            title: "Emma Watson",
            desc: "Managing Director"
        },
        {
            image: "src/images/download.jpeg",
            title: "Will Smith",
            desc: "Product Designer"
        }
    ]
    const array2 = [
        {
            image1: "src/images/Services (1).svg",
            title1: "FREE AND FAST DELIVERY",
            desc1: "Free delivery for all orders over $140"
        }, {
            image1: "src/images/Services (2).svg",
            title1: "24/7 CUSTOMER SERVICE",
            desc1: "Friendly 24/7 customer support"
        }, {
            image1: "src/images/Services (3).svg",
            title1: "MONEY BACK GUARANTEE",
            desc1: "We reurn money within 30 days"
        }
    ]

    return (
        <div className='container'>
            <div className='row'>
                {array.map((items, index) => (
                    <div className='col-lg-4 col-md-6 col-12' key={index}>
                        <Card className='border-0 rounded-0 mb-4'>
                            <Card.Img variant="top" src={items.image} style={{ height: '45vh' }} />
                            <Card.Body>
                                <Card.Title className='fs-4 fw'>{items.title}</Card.Title>
                                <Card.Text>{items.desc}</Card.Text>
                                <div className="d-flex">
                                    <i className="bi bi-twitter fs-5 me-2"></i>
                                    <i className="bi bi-instagram fs-5 me-2"></i>
                                    <i className="bi bi-linkedin fs-5"></i>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <div className='row justify-content-center mt-4'>
                {array2.map((items, index) => (
                    <div className='col-lg-3 col-md-6 col-12' key={index}>
                        <Card className='border-0 rounded-0 mb-4'>
                            <Card.Img className='mt-3' variant="top" src={items.image1} style={{ height: '10vh' }} />
                            <Card.Body>
                                <Card.Title className='fs-6'>{items.title1}</Card.Title>
                                <Card.Text style={{ fontSize: '15px' }}>{items.desc1}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
