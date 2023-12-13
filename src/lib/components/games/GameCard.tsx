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
    const criticAvg = await Registry.instance.criticReviewService.getAvgRatingByGameId(game.id!!);

    return (
        <div className={'card rounded bg-light rounded shadow border-light-subtle'}>
            <Image className={'card-img-top rounded-top w-auto h-auto'} src={imagePath} alt={game.name} width={900}
                   height={600}/>
            <div className={'card-body'}>
                <h6 className={'card-title mb-3'}><Link style={{textDecoration: 'none'}} className='card-link'
                                                        href={`/game/${game.id}`}>{game.name}</Link></h6>
                <hr/>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, rowGap: 8, alignItems: 'center'}}>
                    <div className={''}>Оценка пользователей</div>
                    <div>
                        <div
                            className={`fs-5 fw-semibold ${avg ? avg >= 7 ? 'text-bg-success' : avg >= 5 ? 'text-bg-warning' : 'text-bg-danger' : 'text-bg-secondary'} rounded`}
                            style={{
                                lineHeight: '40px',
                                textAlign: 'center',
                                width: 40,
                                height: 40
                            }}>
                            {avg ? round(avg * 10) / 10 : '–'}
                        </div>
                    </div>
                    <div>Оценка критиков</div>
                    <div>
                        <div
                            className={`fs-5 fw-semibold ${criticAvg ? criticAvg >= 7 ? 'text-bg-success' : criticAvg >= 5 ? 'text-bg-warning' : 'text-bg-danger' : 'text-bg-secondary'} rounded`}
                            style={{
                                lineHeight: '40px',
                                textAlign: 'center',
                                width: 40,
                                height: 40
                            }}>
                            {criticAvg ? round(criticAvg * 10) / 10 : '–'}
                        </div>
                    </div>
                </div>
                <hr/>
                <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 20, rowGap: 8, alignItems: 'center'}}>
                    <div>Дата выхода</div>
                    <div>{game.release ? Registry.instance.dateTimeFormatter.format(game.release) : 'TBA'}</div>
                    <div>Разработчики</div>
                    <div>{game.developers.map((value) => value.name).toString()}</div>
                    <div>Издатели</div>
                    <div>{game.publishers.map((value) => value.name).toString()}</div>
                </div>
            </div>
        </div>
    );
}
