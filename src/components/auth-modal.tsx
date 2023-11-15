import {Button, Container, Form, Image, Modal, Row, Stack} from "react-bootstrap";
import {useState} from "react";

export default function AuthModal({show, onHide}: { show: boolean, onHide: () => void }) {
    return (
        <Modal show={show} onHide={onHide} size={"sm"} centered>
            <Modal.Header closeButton>
                <Modal.Title>Войти</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={'m-2'}>
                    <Form.Group className={"my-4"}>
                        <Form.Control type={"email"} placeholder={"Email"}></Form.Control>
                    </Form.Group>
                    <Form.Group className={"my-4"}>
                        <Form.Control type={"password"} placeholder={"Пароль"}></Form.Control>
                    </Form.Group>
                    <Stack className="mx-auto">
                        <Button className={"mb-2"}>Войти</Button>
                        <Button variant="outline-secondary" href={"/user/signup"}>Создать аккаунт</Button>
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
