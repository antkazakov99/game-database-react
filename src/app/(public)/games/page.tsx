import GameCard from "@/lib/components/games/GameCard";
import Registry from "@/lib/Registry";
import Game from "@/lib/entities/Game";
import React from 'react';

export default async function Games() {
    const games = await Registry.instance.gameService.getAll();

    const gamesCards = games.map((game: Game) => {
        return <GameCard key={game.id} game={game}/>
    })

    return (
        <div className={'bg-light p-3 rounded shadow games-list'} style={{display: 'grid', columnGap: '20px', rowGap: '20px'}}>
            {gamesCards}
        </div>
        // <div className={'row'}>
        //     <div className={'flex-column bg-light p-3 rounded shadow'} style={{width: '400px'}}>
        //         <form>
        //
        //         </form>
        //     </div>
        //     <div className={'vr p-0   ms-3 me-3 bg-secondary'}></div>
        //     <div className={'col bg-light p-4 rounded shadow'}>
        //         <div className={'vstack'}>
        //             {gamesCards}
        //         </div>
        //     </div>
        // </div>
    );
}
