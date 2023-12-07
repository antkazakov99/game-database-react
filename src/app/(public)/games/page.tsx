import {Card, CardBody, CardHeader, Col, Container, Row, Stack} from "react-bootstrap";
import GameCard from "@/components/games/game-card";
import Registry from "@/lib/Registry";
import Game from "@/lib/entries/Game";

export default async function Games() {
    const games = await Registry.instance.gameClient.getAll();


    const gamesCards = games.map((game: Game) => {
        return <GameCard game={{id: game.id!!, name: game.name, release: game.release, url: game.url}}/>
    })

    return (
        <>
            <Row>
                <Col xs={4}>
                    <h1 className={'h1'}>Work in progress!</h1>
                </Col>
                <Col xs={8}>
                    <Stack>
                        {gamesCards}
                    </Stack>
                </Col>
            </Row>
        </>
    )
}
