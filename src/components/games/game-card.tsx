import {Card, CardBody, CardHeader, Col, Container, Image, Row, Table} from "react-bootstrap";
import {useRouter} from "next/navigation";
import Link from "next/link";
import * as fs from "fs";
import Registry from "@/lib/Registry";
import {release} from "os";

export default function GameCard({game}: { game: { id: number, name: string, release: Date | null, url: string} }) {
    const defaultPath = 'games/covers/horizontal/default.jpg';
    const imagePath = `games/covers/horizontal/${game.id}.jpg`;
    const isImageExists = fs.existsSync(`public/${imagePath}`);

    return (
        <Card className={'game-card mb-2'}>
            <Row className={'game-card-content'}>
                <Col xxl={'auto'} className={'pe-0'}>
                    <div className={'game-card-cover d-flex align-items-center'}>
                        <Image src={isImageExists ? imagePath : defaultPath} className={'mh-100 mw-100 rounded-start'}></Image>
                    </div>
                </Col>
                <Col className={'ps-0'}>
                    <CardHeader><Link href={`/game/${game.id}`} className={'link-secondary'}>{game.name}</Link></CardHeader>
                    <CardBody>
                        Описание игры. Work in progress!
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}
