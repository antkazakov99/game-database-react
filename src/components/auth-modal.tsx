import {Button, Form, FormText, Modal, Stack} from "react-bootstrap";
import {useState} from "react";
import Link from "next/link";

export default function AuthModal({show, onHide}: { show: boolean, onHide: () => void }) {

    const [signUp, setSignUp] = useState(false);

    const handleSignUp = () => setSignUp(true);
    const handleSignIn = () => setSignUp(false);

    if (signUp) {
        return (
            <Modal show={show} onHide={onHide} size={"sm"} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
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
                            <Button className={"mb-2"}>Зарегистрироваться</Button>
                            <small>Есть аккаунт? <Link href={""} onClick={handleSignIn}>Войти</Link></small>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    } else {
        return (
            <Modal show={show} onHide={onHide} size={"sm"} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Вход</Modal.Title>
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
                            <small>Нет аккаунта? <Link href={""} onClick={handleSignUp}>Зарегистрироваться</Link></small>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
