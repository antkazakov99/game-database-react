import {Card, CardBody, CardHeader, Col, Image, Row} from "react-bootstrap";
import Link from "next/link";
import * as fs from "fs";
import Game from "@/lib/entities/Game";
import Registry from '@/lib/Registry';

type Repo = {
    imagePath: string;
}



export default function GameCard({game}: { game: Game }) {
    let imagePath = `${process.env.STORAGE_PATH}/covers/horizontal/default.jpg`;

    if (game.horizontalCoverName) {
        imagePath = `${process.env.STORAGE_PATH}/${game.horizontalCoverName}`;
    }

    return (
        <Card className={'game-card mb-2'}>
            <Row className={'game-card-content'}>
                <Col xs={'auto'} className={'pe-0'}>
                    <div className={'game-card-cover d-flex align-items-center'}>
                        <Image src={imagePath} className={'mh-100 mw-100 rounded-start'}></Image>
                    </div>
                </Col>
                <Col className={'ps-0'}>
                    <CardHeader><Link href={`/game/${game.id}`}>{game.name}</Link></CardHeader>
                    <CardBody>
                        <div>Дата выхода: {game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                        <div>Разработчик(и): {game.developers.map((value) => value.name).toString()}</div>
                        <div>Издател(и): {game.publishers.map((value) => value.name).toString()}</div>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}
