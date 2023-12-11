import {Button, Form, Modal, Stack} from "react-bootstrap";
import Link from "next/link";
import {ChangeEventHandler, FormEventHandler, useState} from "react";

/**
 * Форма регистрации
 * */
export default function SignUpForm({onHide, onSignIn}: { onHide: () => void, onSignIn: () => void }) {
    const [userCredentials, setUserCredentials] = useState({username: "", email: "", password: ""});

    const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = async (e) => {
        setUserCredentials({...userCredentials, username: e.target.value});
    };
    const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, email: e.target.value});
    };
    const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, password: e.target.value});
    };


    const register: FormEventHandler = async (e) => {
        e.preventDefault();
        await fetch('/api/register/', {
            method: 'POST',
            body: JSON.stringify(userCredentials)
        });
        onHide();
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"m-3"}>
                <Form onSubmit={register}>
                    <Form.Group className={"mb-2"}>
                        <Form.Control name={"username"}
                                      type={"text"}
                                      placeholder={"Имя пользователя"}
                                      value={userCredentials.username}
                                      onChange={handleChangeUsername}/>
                    </Form.Group>
                    <Form.Group className={"mb-2"}>
                        <Form.Control name={"email"}
                                      type={"email"}
                                      placeholder={"Email"}
                                      value={userCredentials.email}
                                      onChange={handleChangeEmail}/>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control name={"password"}
                                      type={"password"}
                                      placeholder={"Пароль"}
                                      value={userCredentials.password}
                                      onChange={handleChangePassword}/>
                    </Form.Group>
                    <Stack className="mx-auto">
                        <Button className={"mb-2"} type={"submit"}>Зарегистрироваться</Button>
                        <small>Есть аккаунт? <Link href={""} onClick={onSignIn}>Войти</Link></small>
                    </Stack>
                </Form>
            </Modal.Body>
        </>
    );
}