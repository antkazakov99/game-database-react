import {useState} from "react";
import SignInForm from "@/lib/components/auth/SignInForm";
import SignUpForm from "@/lib/components/auth/SignUpForm";
import {Modal} from "react-bootstrap";

export default function AuthModal({show, onHide}: { show: boolean, onHide: () => void }) {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleIsSignIn = () => setIsSignIn(true);
    const handleIsSignUp = () => setIsSignIn(false);

    return (
        <Modal show={show} onHide={onHide} size={"sm"} centered={true}>
            { isSignIn ? <SignInForm onHide={onHide} onSignUp={handleIsSignUp} /> : <SignUpForm onHide={onHide} onSignIn={handleIsSignIn} />}
        </Modal>
    )
}
