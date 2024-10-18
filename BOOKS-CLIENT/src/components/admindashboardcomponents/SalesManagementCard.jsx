import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountUp from 'react-countup';
import trend from "@/assets/images/trend.svg";

const SalesManagementCard = (props) => {
    return (
        <section>
            <Container>
                <Row className="gx-0">
                    {props.arrayOfObjects.map((item, index) => {
                        return (
                            <Col md={4} key={index} className="mb-3">
                                <Card
                                    className="sales-card border-2 shadow-sm"
                                    style={{
                                        borderRadius: '1rem',
                                        border: `2px solid ${item.borderColor}`,
                                        width: '351.5px',
                                        height: '216px',
                                        opacity: 1,
                                    }}
                                >
                                    <Card.Body className="position-relative">
                                        <Card.Title className="sales-card-title text-muted mb-5">
                                            {item.title}
                                        </Card.Title>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h1 className="mb-0" style={{ color: '#5C7A8F', fontSize: '2rem', fontWeight: 'bold' }}>
                                                <CountUp duration={0.6} prefix="₹" end={item.quantity} />
                                            </h1>
                                            <div className="icon-placeholder rounded-circle p-3" style={{ backgroundColor: '#FBE9A9' }}>
                                                <svg width="24" height="24" fill="#FFD700">
                                                    <rect width="24" height="24" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-success d-flex align-items-center" style={{ fontSize: '1rem' }}>
                                                <img src={trend} alt="Trend Icon" width="16" height="16" />
                                                &nbsp;1.3% Up from past week
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default SalesManagementCard;
