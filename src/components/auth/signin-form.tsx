import {Button, Form, Modal, Stack} from "react-bootstrap";
import Link from "next/link";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {signIn} from "next-auth/react";

export default function SignInForm ({onHide, onSignUp}: {onHide: () => void, onSignUp: () => void}) {
    const [userCredentials, setUserCredentials] = useState({email: "", password: ""});
    const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, email: e.target.value});
        setInvalidCredentials(false);
    };
    const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUserCredentials({...userCredentials, password: e.target.value});
        setInvalidCredentials(false);
    };

    const [invalidCredentials, setInvalidCredentials] = useState(false);

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
                <Modal.Title>Вход</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"m-3"}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={"mb-4"}>
                        <Form.Control className={invalidCredentials ? "border-danger" : ""} name={"email"} type={"email"} placeholder={"Email"} value={userCredentials.email} onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group className={"mb-3"}>
                        <Form.Control className={invalidCredentials ? "border-danger" : ""} name={"password"} type={"password"} placeholder={"Пароль"} value={userCredentials.password} onChange={handleChangePassword} />
                        <Form.Text className={invalidCredentials ? "" : "invisible"}>
                            <small className={"text-danger"}>Неверные логин и/или пароль</small>
                        </Form.Text>
                    </Form.Group>
                    <Stack className="mx-auto">
                        <Button className={"mb-2"} type={"submit"}>Войти</Button>
                        <small>Нет аккаунта? <Link href={""} onClick={onSignUp}>Зарегистрироваться</Link></small>
                    </Stack>
                </Form>
            </Modal.Body>
        </>
    );
}