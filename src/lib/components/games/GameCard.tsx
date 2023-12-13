import {Card, CardBody, CardHeader, Col, Row} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Game from "@/lib/entities/Game";
import Registry from '@/lib/Registry';

export default function GameCard({game}: { game: Game }) {
    let imagePath = `${process.env.STORAGE_PATH}/default/horizontal.jpg`;

    if (game.horizontalCoverName) {
        imagePath = `${process.env.STORAGE_PATH}/${game.horizontalCoverName}`;
    }

    return (
        <Card className={'game-card mb-3 shadow-sm border-light-subtle'}>
            <Row className={'game-card-content'}>
                <Col xs={'auto'} className={'pe-0'}>
                    <div className={'game-card-cover d-flex align-items-center'}>
                        <Image src={imagePath} alt={game.name} width={240} height={135}
                               style={{width: '100%', height: 'auto'}}
                               className={'mh-100 mw-100 rounded-start'}></Image>
                    </div>
                </Col>
                <Col className={'ps-0'}>
                    <CardHeader><Link href={`/game/${game.id}`}>{game.name}</Link></CardHeader>
                    <CardBody>
                        <div>Дата
                            выхода: {game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                        <div>Разработчик(и): {game.developers.map((value) => value.name).toString()}</div>
                        <div>Издател(и): {game.publishers.map((value) => value.name).toString()}</div>
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}
