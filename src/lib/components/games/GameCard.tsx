import Image from "next/image";
import Link from "next/link";
import Game from "@/lib/entities/Game";
import Registry from '@/lib/Registry';
import {round} from '@popperjs/core/lib/utils/math';

export default async function GameCard({game}: { game: Game }) {
    let imagePath = `${process.env.STORAGE_PATH}/default/horizontal.jpg`;
    if (game.horizontalCoverName) {
        imagePath = `${process.env.STORAGE_PATH}/${game.horizontalCoverName}`;
    }

    const avg = await Registry.instance.userReviewService.getAvgRatingByGameId(game.id!!);

    return (
        <div className={'card rounded bg-light rounded shadow border-light-subtle'}>
            <Image className={'card-img rounded-top w-auto h-auto'} src={imagePath} alt={game.name} width={900}
                   height={600}/>
            <div
                className={`position-absolute fs-5 fw-semibold top-0 end-0 m-3 ${avg ? avg >= 7 ? 'text-bg-success' : avg >= 5 ? 'text-bg-warning' : 'text-bg-danger' : 'text-bg-secondary'} rounded me-3`}
                style={{
                    lineHeight: '50px',
                    textAlign: 'center',
                    width: 50,
                    height: 50,
                    opacity: 0.7
                }}>
                {avg ? round(avg * 100) / 100 : '–'}
            </div>
            <div className={'card-body'}>
                <h6 className={'card-title mb-3'}><Link style={{textDecoration: 'none'}} className='card-link'
                                                        href={`/game/${game.id}`}>{game.name}</Link></h6>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, rowGap: 4}}>
                    <div>Дата выхода</div>
                    <div>{game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                    <div>Разработчики</div>
                    <div>{game.developers.map((value) => value.name).toString()}</div>
                    <div>Издатели</div>
                    <div>{game.publishers.map((value) => value.name).toString()}</div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <Card className={'game-card mb-3 shadow-sm border-light-subtle'}>
    //         <Row className={'game-card-content'}>
    //             <Col xs={'auto'} className={'pe-0'}>
    //                 <div className={'game-card-cover d-flex align-items-center'}>
    //                     <Image src={imagePath} alt={game.name} width={240} height={135}
    //                            style={{width: '100%', height: 'auto'}}
    //                            className={'mh-100 mw-100 rounded-start'}></Image>
    //                 </div>
    //             </Col>
    //             <Col className={'ps-0'}>
    //                 <CardHeader><Link href={`/game/${game.id}`}>{game.name}</Link></CardHeader>
    //                 <CardBody>
    //                     <div>Дата
    //                         выхода: {game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
    //                     <div>Разработчик(и): {game.developers.map((value) => value.name).toString()}</div>
    //                     <div>Издател(и): {game.publishers.map((value) => value.name).toString()}</div>
    //                 </CardBody>
    //             </Col>
    //         </Row>
    //     </Card>
    // )
}
