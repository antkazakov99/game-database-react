'use client'

import React, {useEffect, useState} from 'react';

export default function Reviews({gameId}: { gameId: number }) {
    const [selectedTab, setSelectedTab] = (useState<'critics' | 'users'>('critics'));

    const handleSelectCritics = function () {
        setSelectedTab('critics');
    }

    const handleSelectUsers = function () {
        setSelectedTab('users');
    }

    const [userReviews, setUserReviews] = (useState<{username: string, summary: string | null, rating: number | null, user_id: number}[]>([]));
    const [criticReviews, setCriticReviews] = (useState<{name: string, url: string, summary: string | null, rating: number | null}[]>([]));
    useEffect(() => {
        fetch(`/api/user-reviews?usernames=true&game_id=${gameId}`)
            .then((response) => response.json())
            .then((response) => setUserReviews(response));
    }, []);

    let reviews = <></>;
    if (selectedTab === 'users') {
        reviews = (
            <div className={'vstack'}>
                {userReviews.map((value) =>
                    <div key={value.user_id} className={'card mb-4 border-light-subtle shadow-sm'}>
                        <div className={'card-header'}>{value.username}</div>
                        <div className={'card-body'}>{value.summary}</div>
                    </div>
                )}
            </div>
        );
    } else if (selectedTab === 'critics') {
        reviews = <div>Рецензии критиков</div>
    }

    return (
        <>
            <h3 className={'mb-3'}>Рецензии</h3>
            <div className={'p-3'}>
                <ul className={'nav nav-pills bg-light mb-5'}>
                    <li className={'nav-item me-2'}><a className={`nav-link${selectedTab === 'critics' ? ' active' : ''}`} href={'#'} onClick={handleSelectCritics}>Критики</a></li>
                    <li className={'nav-item'}><a className={`nav-link${selectedTab === 'users' ? ' active' : ''}`} href={'#'} onClick={handleSelectUsers}>Пользователи</a></li>
                </ul>
                {reviews}
            </div>
        </>
    );
}
