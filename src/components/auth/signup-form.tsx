import {Button, Form, Modal, Stack} from "react-bootstrap";
import Link from "next/link";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {signIn} from "next-auth/react";

export default function SignUpForm ({onHide, onSignUp}: {onHide: () => void, onSignUp: () => void}) {
    const [userCredentials, setUserCredentials] = useState({username: "", email: "", password: ""});
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, username: e.target.value});
        setInvalidCredentials(false);
    };
    const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, email: e.target.value});
        setInvalidCredentials(false);
    };
    const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, password: e.target.value});
        setInvalidCredentials(false);
    };

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const response = await signIn("credentials", {...userCredentials, redirect: false});
        if (response != undefined && !response.error) {
            onHide();
        } else {
            setInvalidCredentials(true);
        }
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"m-3"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={"mb-2"}>
                        <Form.Control className={invalidCredentials ? "border-danger" : ""} name={"username"} type={"text"} placeholder={"Имя пользователя"} value={userCredentials.username} onChange={handleChangeUsername} />
                        <Form.Text className={invalidCredentials ? "" : "invisible"}>
                            <small className={"text-danger"}>Данный </small>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-2"}>
                        <Form.Control className={invalidCredentials ? "border-danger" : ""} name={"email"} type={"email"} placeholder={"Email"} value={userCredentials.email} onChange={handleChangeEmail} />
                        <Form.Text className={invalidCredentials ? "" : "invisible"}>
                            <small className={"text-danger"}>Данный </small>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control className={invalidCredentials ? "border-danger" : ""} name={"password"} type={"password"} placeholder={"Пароль"} value={userCredentials.password} onChange={handleChangePassword} />
                        <Form.Text className={invalidCredentials ? "" : "invisible"}>
                            <small className={"text-danger"}>Данный </small>
                        </Form.Text>
                    </Form.Group>
                    <Stack className="mx-auto">
                        <Button className={"mb-2"} type={"submit"}>Зарегистрироваться</Button>
                        <small>Есть аккаунт? <Link href={""} onClick={onSignUp}>Войти</Link></small>
                    </Stack>
                </Form>
            </Modal.Body>
        </>
    );
}