import {Card, CardBody, CardHeader, Col, Container, Row, Stack} from "react-bootstrap";
import GameCard from "@/components/games/game-card";

export default function Games() {
    return (
        <>
            <Row>
                <Col xs={4}>
                    <h1 className={'h1'}>Work in progress!</h1>
                </Col>
                <Col xs={8}>
                    <Stack>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                        <GameCard/>
                    </Stack>
                </Col>
            </Row>
        </>
    )
}
