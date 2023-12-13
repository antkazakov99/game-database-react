import Registry from "@/lib/Registry";
import {notFound} from "next/navigation";
import Image from 'next/image';
import React from 'react';
import GamePageAddReview from '@/lib/components/games/GamePageAddReview';
import {auth} from '@/auth';
import Reviews from '@/lib/components/games/Reviews';

export default async function GamePage({params}: { params: { id: string } }) {
    let session = await auth();

    const id = parseInt(params.id);
    if (!id) {
        notFound();
    }

    let gameClient = Registry.instance.gameService;
    const game = await gameClient.getById(id);

    if (!game?.id) {
        notFound();
    }

    let coverPath = `${process.env.STORAGE_PATH}/default/vertical.jpg`;
    if (game.verticalCoverName) {
        coverPath = `${process.env.STORAGE_PATH}/${game.verticalCoverName}`;
    }

    let addReview = <></>;
    if (session?.user.id && game.release && game.release.getTime() < (new Date().getTime())) {
        addReview = (
            <div className={'row bg-light p-3 rounded shadow mb-5'}>
                <GamePageAddReview gameId={game.id} userId={session.user.id}/>
            </div>
        );
    }

    return (
        <div className={'container-fluid'}>
            <div className={'row bg-light p-3 rounded shadow mb-5'}>
                <div className={'me-4'} style={{width: 240, height: 360}}>
                    <Image className={'rounded'} src={coverPath} alt={game.name} width={240} height={320}/>
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
            {addReview}
            <div className={'row bg-light p-3 rounded shadow mb-5'}>
                <Reviews gameId={game.id}/>
            </div>
        </div>
    );
}
