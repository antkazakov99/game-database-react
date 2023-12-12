import Registry from "@/lib/Registry";
import {notFound} from "next/navigation";
import Image from 'next/image';
import React from 'react';
import {Star} from 'react-bootstrap-icons';
import Link from 'next/link';

export default async function GamePage({params}: {
    params: {
        id: string
    }
}) {
    let gameClient = Registry.instance.gameService;
    // todo add value check
    const id = parseInt(params.id);
    const game = await gameClient.getById(id);

    if (!game) {
        notFound()
    }

    let coverPath = `${process.env.STORAGE_PATH}/default/vertical.jpg`;
    if (game.verticalCoverName) {
        coverPath = `${process.env.STORAGE_PATH}/${game.verticalCoverName}`;
    }

    const criticRating = await Registry.instance.criticReviewService.getAvgRatingByGameId(game.id!!);
    const userRating = await Registry.instance.userReviewService.getAvgRatingByGameId(game.id!!);

    return (
        <div className={'container-fluid'}>
            <div className={'row bg-light p-3 rounded shadow mb-5'}>
                <div className={'me-4'} style={{width: 240, height: 360}}>
                    <Image className={'rounded'} src={coverPath}
                           alt={game.name} width={240}
                           height={320}/>
                </div>
                <div className={'col'}>
                    <h3 className={'mb-3'}>{game.name}</h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 5, columnGap: 15}}>
                        <div>Дата выхода</div>
                        <div>{game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                        <div>Разработчики</div>
                        <div>{game.developers.map((value) => value.name).join(', ')}</div>
                        <div>Издатели</div>
                        <div>{game.publishers.map((value) => value.name).join(', ')}</div>
                        <div>Официальный сайт</div>
                        <div><a href={game.url}>{game.url}</a></div>
                    </div>
                </div>
            </div>
            <div className={'row bg-light p-3 rounded shadow mb-5'}>
                <h3 className={'mb-3'}>Написать отзыв</h3>
                <div className={'m-2 ms-4'}>
                    <div>
                        <div style={{width: 36, height: 36}}>
                            <Link style={{display: 'inline-block', width: 18, height: 36}} href={''}></Link>
                            <Link style={{display: 'inline-block', width: 18, height: 36}} href={''}></Link>
                        </div>
                        <Star/><Star/><Star/><Star/><Star/>
                    </div>
                </div>
                <form className={'p-3'}>
                    <div className={'mb-4'}>
                        <textarea className={'form-control'} rows={5}></textarea>
                    </div>
                    <input className={'btn btn-primary'} type={'submit'} value={'Опубликовать'}/>
                </form>
            </div>
            <div className={'row bg-light p-3 rounded shadow'}>
                <h3 className={'mb-3'}>Рецензии</h3>
                <div className={'p-3'}>
                    <ul className={'nav nav-pills bg-light'}>
                        <li className={'nav-item'}><a className={'nav-link active'}>Критики</a></li>
                        <li className={'nav-item'}><a className={'nav-link'}>Пользователи</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )

    // return (
    //     <Container>
    //         <Row className={'game-card-content'}>
    //             <Col xxl={'auto'}>
    //                 <div className={'game-page-cover d-flex align-items-center'}>
    //                     <Image src={`/games/covers/vertical/${id}.jpg`}
    //                            className={'mh-100 mw-100 img-thumbnail mx-auto'}></Image>
    //                 </div>
    //             </Col>
    //             <Col>
    //                 <h1 className={'h1'}>{game.name}</h1>
    //                 <div>Оценка критиков: {criticRating ? criticRating : '-'}</div>
    //                 <div>Оценка игроков: {userRating ? userRating : '-'}</div>
    //                 <div>Дата
    //                     выхода: {game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
    //                 <Link href={game.url}>{game.url}</Link>
    //                 <div>{game.description}</div>
    //             </Col>
    //         </Row>
    //     </Container>
    // );
}
