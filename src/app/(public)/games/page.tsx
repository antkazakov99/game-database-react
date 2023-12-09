import {Col, Row, Stack} from "react-bootstrap";
import GameCard from "@/lib/components/games/GameCard";
import Registry from "@/lib/Registry";
import Game from "@/lib/entities/Game";

export default async function Games() {
    const games = await Registry.instance.gameService.getAll();

    const gamesCards = games.map((game: Game) => {
        return <GameCard key={game.id} game={game}/>
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
