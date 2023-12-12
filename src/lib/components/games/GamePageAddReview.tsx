"use client";

import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState} from 'react';
import UserReview from '@/lib/entities/UserReview';

export default function GamePageAddReview({gameId, userId}: { gameId: number, userId: number }) {
    const [mode, setMode] = useState<'new' | 'edit-new' | 'edit' | 'published'>('new')
    const [isLoaded, setIsLoaded] = useState(false);
    const [userReview, setUserReview] = useState<{summary: string | null, rating: number | null}>({summary: null, rating: null});

    useEffect(() => {
        fetch(`/api/user-reviews?user_id=${userId}&game_id=${gameId}`).then((value) => value.json()).then(
            (value) => {
                if (value.summary) {
                    setUserReview({...userReview, summary: value.summary, rating: value.rating});
                    setMode('published');
                } else {
                }
                setIsLoaded(true);
            }
        )
    }, []);

    const handleReviewChange: ChangeEventHandler<HTMLTextAreaElement> = function (event) {
        setUserReview({...userReview, summary: event.target.value});
    }

    const handleEdit: MouseEventHandler<HTMLButtonElement> = function (event) {
        setMode('edit');
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = function (event) {
        fetch('/api/user-reviews/delete', {
            method: 'POST',
            body: JSON.stringify({user_id: userId, game_id: gameId})
        }).then(() => {
            setUserReview({...userReview, summary: ''});
            setMode('new');
        })
    }

    const handleAdd: MouseEventHandler<HTMLButtonElement> = function (event) {
        setMode('edit-new');
    }

    const submitHandle: FormEventHandler = function (event) {
        event.preventDefault();

        fetch('/api/user-reviews/add', {
            method: 'POST',
            body: JSON.stringify({...userReview, user_id: userId, game_id: gameId})
        }).then(() => {
            setMode('published');
        })
    }

    let buttonPanel = <></>;
    if (mode === 'edit-new') {
        buttonPanel = <>
            <input className={'btn btn-primary'} type={'submit'} value={'Опубликовать'}/>
        </>;
    } else if(mode === 'published') {
        buttonPanel = <>
            <button className={'btn btn-primary me-3'} type={'button'} onClick={handleEdit}>Изменить</button>
            <button className={'btn btn-outline-primary'} type={'button'} onClick={handleDelete}>Удалить</button>
        </>;
    } else if (mode === 'edit') {
        buttonPanel = <>
            <input className={'btn btn-primary me-3'} type={'submit'} value={'Опубликовать'}/>
            <button className={'btn btn-outline-primary'} type={'button'} onClick={handleDelete}>Удалить</button>
        </>;
    } else {
        buttonPanel = <>
            <button className={'btn btn-outline-primary'} type={'button'} onClick={handleAdd}>Добавить</button>
        </>;
    }

    if (!isLoaded) {
        return 'Loading... Please, wait.';
    }

    return (
        <div>
            <h3 className={'mb-3'}>Написать отзыв</h3>
            <form className={'p-3'} onSubmit={submitHandle}>
                <div className={'mb-4'}>
                    <textarea className={`form-control`} disabled={['published', 'new'].includes(mode)} rows={5} value={userReview.summary ? userReview.summary : ''} required={true} onChange={handleReviewChange}></textarea>
                </div>
                {buttonPanel}
            </form>
        </div>
    );
}
