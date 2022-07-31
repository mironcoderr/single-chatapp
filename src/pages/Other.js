import React from "react";
import { Col, Card, Button, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";


const Other = () => {

    let [post, setPost] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(item => setPost(item.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Container className="p-5 mt-4 mb-5 bg-light">
                <Row>
                    <Col lg={12} className="text-center">
                        <h1 className="fw-bold fs-2 mb-5">OTHER USER ID (3)</h1>
                    </Col>

                    {post.map(item => {
                        return (
                            item.userId === 3 ?
                                <Col lg={4} key={item.id}>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Button className="mb-4" variant="danger">{item.userId}</Button>
                                            <Button className="mb-4 ms-2" variant="primary">{item.id}</Button>
                                            <Card.Title>{item.title.slice(0, 20)}</Card.Title>
                                            <Card.Text>{item.body.slice(0, 100)}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            :
                            ""
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Other