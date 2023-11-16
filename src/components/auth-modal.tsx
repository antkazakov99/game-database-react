import {Button, Form, Modal, Stack} from "react-bootstrap";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function AuthModal({show, onHide}: { show: boolean, onHide: () => void }) {

    const [signUp, setSignUp] = useState(false);

    const handleSignUp = () => setSignUp(true);
    const handleSignIn = () => setSignUp(false);

    const [userCredentials, setUserCredentials] = useState({username: "", password: ""});

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault()
        const res = await signIn("credentials", {...userCredentials, redirect: false});
        onHide();
    };
    const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {setUserCredentials({...userCredentials, username: e.target.value})};
    const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {setUserCredentials({...userCredentials, password: e.target.value})};

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
                    <Form className={'m-2'} onSubmit={handleSubmit}>
                        <Form.Group className={"my-4"}>
                        <Form.Control name={"username"} type={"text"} placeholder={"Логин"} value={userCredentials.username} onChange={handleChangeUsername}></Form.Control>
                        </Form.Group>
                        <Form.Group className={"my-4"}>
                            <Form.Control name={"password"} type={"password"} placeholder={"Пароль"} value={userCredentials.password} onChange={handleChangePassword}></Form.Control>
                        </Form.Group>
                        <Stack className="mx-auto">
                            <Button className={"mb-2"} type={"submit"}>Войти</Button>
                            <small>Нет аккаунта? <Link href={""} onClick={handleSignUp}>Зарегистрироваться</Link></small>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
