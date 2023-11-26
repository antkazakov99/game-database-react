import {Card, CardBody, CardHeader, Col, Container, Image, Row} from "react-bootstrap";
import {Style_Script} from "next/dist/compiled/@next/font/dist/google";
import {Heart, HeartFill, Plus, PlusLg} from "react-bootstrap-icons";

export default function GameCard() {
    return (
        <Card className={'game-card mb-2'}>
            <Row className={'game-card-content'}>
                <Col xxl={'auto'} className={'pe-0'}>
                    <div className={'game-card-cover d-flex align-items-center'}>
                        <Image src={'/cover_16x9.jpg'}  className={'mh-100 mw-100 rounded-start'}></Image>
                    </div>
                </Col>
                <Col className={'ps-0'}>
                    <CardHeader>Dishonored 2</CardHeader>
                </Col>
            </Row>
        </Card>
    )
}
