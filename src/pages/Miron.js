import React from "react";
import { Col, Card, Button, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const Miron = () => {

    let [post, setPost] = useState([]);
    let [image, setImage] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(item => setPost(item.data))
            .catch(err => console.log(err))

        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(image => {
                image.data.map(item => {
                    if (item.albumId === 1) {
                        setImage(item);
                    }
                })
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            <Container className="p-5 mt-4 mb-5 bg-light">
                <Row>
                    <Col lg={12} className="text-center">
                        <h1 className="fw-bold fs-2 mb-5">MIRON USER ID (1)</h1>
                    </Col>

                    {post.map(item => {
                        return (
                            item.userId === 1 ?
                                <Col lg={4} key={item.id}>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <Card.Img className="mb-4" variant="top" src={image.url} />
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

export default Miron