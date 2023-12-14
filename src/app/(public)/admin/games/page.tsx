import Registry from '@/lib/Registry';
import Game from '@/lib/entities/Game';
import React from 'react';
import Link from 'next/link';
import CustomIcon from '@/lib/components/utils/CustomIcon';

export default async function AdminGames() {
    const games = await Registry.instance.gameService.getAll();

    const gamesCards = games.map((game: Game) => {
        return <GameCard key={game.id} game={game}/>
    })

    return (
        <>
            <Link className={'btn btn-primary mb-3'} href={'/admin/games/add'}>Добавить</Link>
            <div style={{display: 'grid', gridTemplateColumns: '1fr', rowGap: 15}}>
                {gamesCards}
            </div>
        </>
    );
}

function GameCard({game}: { game: Game }) {
    return (
        <div className={'card bg-light rounded shadow border-light-subtle'}>
            <div className={'card-body'}>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center'}}>
                    <div className={'me-2'}>{game.id}.</div>
                    <h6 className={'card-title me-auto mb-0'}>
                        <Link style={{textDecoration: 'none'}}
                              target={'_blank'}
                              className='card-link'
                              href={`/game/${game.id}`}
                        >
                            {game.name}
                        </Link>
                    </h6>
                    <Link className={'btn btn-primary me-2'} href={`/admin/games/edit/${game.id}`}>
                        <CustomIcon className={'d-inline-block menu-icon'}
                                    style={{width: 16, height: 16}}
                                    iconPath={'/icons/pencil-square.svg'}
                        />
                    </Link>
                    {/*<Button data-id={game.id} className={'btn btn-primary'} onClick={handleDelete}>*/}
                    {/*    <CustomIcon className={'d-inline-block menu-icon'}*/}
                    {/*                style={{width: 16, height: 16}}*/}
                    {/*                iconPath={'/icons/trash.svg'}*/}
                    {/*    />*/}
                    {/*</Button>*/}
                </div>
            </div>
        </div>
    )
}