'use client'

import {MouseEventHandler, useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {round} from '@popperjs/core/lib/utils/math';

export default function Rating({gameId, released}: { gameId: number, released: boolean }) {
    let {data: session} = useSession();
    let userId = session?.user.id ? session.user.id : null;
    const [userRating, setUserRating] = useState<null | number>(null);
    const [criticRating, setCriticRating] = useState<null | number>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [review, setReview] = useState<{
        user_id: number | null,
        game_id: number,
        summary: string | null,
        rating: number | null
    }>({game_id: gameId, user_id: userId, rating: null, summary: null});
    const [hoverRating, setHoverRating] = useState<null | number>(null);
    const [ratingCaption, setRatingCaption] = useState('Без оценки');
    const [ratingColor, setRatingColor] = useState('text-bg-secondary');

    useEffect(() => {
        const loadData = async function () {
            const promises: Promise<any>[] = [];

            const getAvgUserRating = fetch(`/api/user-reviews?game_id=${gameId}&average=true`).then((value) => value.json()).then((value) => {
                setUserRating(round(value['rating'] * 100) / 100);
            })

            if (userId) {
                const getReview = fetch(`/api/user-reviews?user_id=${userId}&game_id=${gameId}`)
                    .then((value) => value.json())
                    .then(
                        (value) => {
                            if (value) {
                                setReview({...review, summary: value.summary, rating: value.rating});
                                if (value.rating) {
                                    if (value.rating >= 7) {
                                        setRatingColor('text-bg-success');
                                    } else if (value.rating >= 5) {
                                        setRatingColor('text-bg-warning');
                                    } else {
                                        setRatingColor('text-bg-danger');
                                    }
                                } else {
                                    setRatingColor('text-bg-secondary');
                                }
                                setRatingCaption(captions[value.rating ? value.rating : 0]);
                            }
                        }
                    );
                promises.push(getReview);
            }

            promises.push(getAvgUserRating);

            const response = await Promise.all(promises);

            setIsLoaded(true);
        }

        loadData();
    }, []);

    const captions: string[] = [
        'Без оценки',
        'Appalling',
        'Horrible',
        'Very bad',
        'Bad',
        'Average',
        'Fine',
        'Good',
        'Very good',
        'Great',
        'Masterpiece'
    ];

    let userColor = 'text-bg-secondary';
    if (userRating) {
        if (userRating >= 7) {
            userColor = 'text-bg-success';
        } else if (userRating >= 5) {
            userColor = 'text-bg-warning';
        } else {
            userColor = 'text-bg-danger';
        }
    }

    let criticColor = 'text-bg-secondary';
    if (criticRating) {
        if (criticRating >= 7) {
            criticColor = 'text-bg-success';
        } else if (criticRating >= 5) {
            criticColor = 'text-bg-warning';
        } else {
            criticColor = 'text-bg-danger';
        }
    }

    //@ts
    const handleMouseOverRating: MouseEventHandler<HTMLDivElement> = function (event) {
        if (event.target instanceof HTMLDivElement) {
            let ratingData = event.target.dataset.rating;
            let rating = ratingData ? parseInt(ratingData) : null;
            setHoverRating(rating);
            setRatingCaption(captions[rating ? rating : 0]);
            if (rating) {
                if (rating >= 7) {
                    setRatingColor('text-bg-success');
                } else if (rating >= 5) {
                    setRatingColor('text-bg-warning');
                } else {
                    setRatingColor('text-bg-danger');
                }
            }
        }
    }

    const handleMouseOutRating: MouseEventHandler<HTMLDivElement> = function (event) {
        if (event.target instanceof HTMLDivElement) {
            setHoverRating(null);
            setRatingCaption(captions[review.rating ? review.rating : 0]);
        }
        if (review.rating) {
            if (review.rating >= 7) {
                setRatingColor('text-bg-success');
            } else if (review.rating >= 5) {
                setRatingColor('text-bg-warning');
            } else {
                setRatingColor('text-bg-danger');
            }
        } else {
            setRatingColor('text-bg-secondary');
        }
    }

    const handleSelectRating: MouseEventHandler<HTMLDivElement> = function (event) {
        if (event.target instanceof HTMLDivElement) {
            let rating = event.target.dataset.rating;
            setReview({...review, rating: rating ? parseInt(rating) : null});

            fetch('/api/user-reviews/add', {
                method: 'POST',
                body: JSON.stringify({...review, rating: rating})
            }).then(() => {
            });
        }
    }

    const deleteRating: MouseEventHandler<HTMLButtonElement> = function (event) {
        setReview({...review, rating: null});
        fetch('/api/user-reviews/add', {
            method: 'POST',
            body: JSON.stringify({...review, rating: null})
        });
        setRatingColor('text-bg-secondary');
        setRatingCaption(captions[0]);
    }

    let deleteButton = <></>;
    if (review) {
        deleteButton = <button className={'btn'} onClick={deleteRating}>Очистить</button>;
    }

    let addRating = <>
        <div className={'fw-semibold mb-2'}>Моя оценка</div>
        <div className={'p-5'}>Для добавления оценки необходимо авторизоваться.</div>
    </>;
    if (!released) {
        addRating = <></>;
    }
    if (review.user_id && released) {
        addRating = (
            <>
                <div className={'fw-semibold mb-2'}>Моя оценка</div>
                <div className={'p-3'}>
                    <div className={'hstack mb-3'}>
                        <div className={`d-inline-block fs-3 fw-semibold ${ratingColor} rounded me-3`} style={{
                            lineHeight: '60px',
                            textAlign: 'center',
                            width: 60,
                            height: 60
                        }}>{hoverRating ? hoverRating : review.rating ? review.rating : '–'}</div>
                        <div className={'fs-3'} style={{lineHeight: '60px'}}>{ratingCaption}</div>
                    </div>
                    <div data-selected={review.rating} data-hover={hoverRating} className={'hstack me-3'}
                         onMouseOut={handleMouseOutRating}>
                        <div data-rating={1} className={'rating-one'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={2} className={'rating-two'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={3} className={'rating-three'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={4} className={'rating-four'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={5} className={'rating-five'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={6} className={'rating-six'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={7} className={'rating-seven'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={8} className={'rating-eight'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={9} className={'rating-nine'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        <div data-rating={10} className={'rating-ten'} style={{width: 30, height: 30}}
                             onMouseOver={handleMouseOverRating} onClick={handleSelectRating}/>
                        {deleteButton}
                    </div>
                </div>
            </>
        );
    }

    if (!isLoaded) {
        return <>
            <div>Loading... Please, wait.</div>
        </>
    }

    return (
        <>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col'}>
                        <div className={'mb-3'}>
                            <div className={'fw-semibold mb-2'}>Оценка пользователей</div>
                            <div className={`d-inline-block fs-3 fw-semibold ${userColor} rounded`} style={{
                                lineHeight: '60px',
                                textAlign: 'center',
                                width: 60,
                                height: 60
                            }}>{userRating ? userRating : '–'}</div>
                        </div>
                        <div className={'mb-3'}>
                            <div className={'fw-semibold mb-2'}>Оценка критиков</div>
                            <div className={`d-inline-block fs-3 fw-semibold ${criticColor} rounded`} style={{
                                lineHeight: '60px',
                                textAlign: 'center',
                                width: 60,
                                height: 60
                            }}>{criticRating ? criticRating : '–'}</div>
                        </div>
                    </div>
                    <div className={'col'}>
                        {addRating}
                    </div>
                </div>
            </div>
        </>
    );
}
