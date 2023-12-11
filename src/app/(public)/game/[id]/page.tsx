import Registry from "@/lib/Registry";
import {notFound} from "next/navigation";
import {Col, Container, Image, Row} from "react-bootstrap";
import Link from "next/link";

export default async function GamePage({params}: { params: { id: string } }) {
    let gameClient = Registry.instance.gameService;
    // todo add value check
    const id = parseInt(params.id);
    const game = await gameClient.getById(id);

    if (!game) {
        notFound()
    }

    const criticRating = await Registry.instance.criticReviewService.getAvgRatingByGameId(game.id!!);
    const userRating = await Registry.instance.userReviewService.getAvgRatingByGameId(game.id!!);
    console.log(criticRating);

    return (
        <Container>
            <Row className={'game-card-content'}>
                <Col xxl={'auto'}>
                    <div className={'game-page-cover d-flex align-items-center'}>
                        <Image src={`/games/covers/vertical/${id}.jpg`}
                               className={'mh-100 mw-100 img-thumbnail mx-auto'}></Image>
                    </div>
                </Col>
                <Col>
                    <h1 className={'h1'}>{game.name}</h1>
                    <div>Оценка критиков: {criticRating ? criticRating : '-'}</div>
                    <div>Оценка игроков: {userRating ? userRating : '-'}</div>
                    <div>Дата
                        выхода: {game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                    <Link href={game.url}>{game.url}</Link>
                    <div>{game.description}</div>
                </Col>
            </Row>
        </Container>
    );
}
