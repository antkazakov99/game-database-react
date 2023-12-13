'use client'

import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {Dropdown} from '@restart/ui';
import displayName = Dropdown.displayName;
import Link from 'next/link';

export default function Reviews({gameId}: { gameId: number }) {
    const {data: session} = useSession();
    const [selectedTab, setSelectedTab] = (useState<'critics' | 'users'>('critics'));
    const [isLoaded, setIsLoaded] = (useState(false));


    const handleSelectCritics = function () {
        setSelectedTab('critics');
    }

    const handleSelectUsers = function () {
        setSelectedTab('users');
    }

    const [userReviews, setUserReviews] = (useState<{
        username: string,
        summary: string | null,
        rating: number | null,
        user_id: number
    }[]>([]));
    const [criticReviews, setCriticReviews] = (useState<{
        critic_id: number,
        critic_name: string,
        name: string,
        url: string,
        summary: string | null,
        rating: number | null
    }[]>([]));
    useEffect(() => {
        const loadData = async function() {
            let promises = [];
            const userPromise = fetch(`/api/user-reviews?usernames=true&game_id=${gameId}`)
                .then((response) => response.json())
                .then((response) => setUserReviews(response));
            const criticPromise = fetch(`/api/critic-reviews?names=true&game_id=${gameId}`)
                .then((response) => response.json())
                .then((response) => setCriticReviews(response));

            promises.push(userPromise, criticPromise);

            await Promise.all(promises);

            setIsLoaded(true);
        }

        loadData();
    }, []);



    let reviews = <></>;
    if (selectedTab === 'users') {
        reviews = (
            <div className={'games-list'} style={{minHeight: 300}}>
                {userReviews
                    .filter((value) => value.summary && value.user_id !== session?.user.id)
                    .map((value) =>
                        <div key={value.user_id} className={'card border-light-subtle shadow-sm'} style={{minHeight: 250}}>
                            <div className={'card-header hstack'}>
                                <div className={'me-3 fs-5 fw-semibold me-auto p-3'}>{value.username}</div>
                                <div
                                    className={`d-inline-block fs-4 fw-semibold ${value.rating ? value.rating >= 7 ? 'text-bg-success' : value.rating >= 5 ? 'text-bg-warning' : 'text-bg-danger' : 'text-bg-secondary'} rounded me-3`}
                                    style={{
                                        lineHeight: '50px',
                                        textAlign: 'center',
                                        width: 50,
                                        height: 50
                                    }}>{value.rating ? value.rating : '–'}</div>
                            </div>
                            <div className={'card-body p-4'}>{value.summary}</div>
                        </div>
                    )}
            </div>
        );
    } else if (selectedTab === 'critics') {
        reviews = <div className={'games-list'} style={{minHeight: 300}}>
            {criticReviews
                .map((value) =>
                    <div key={value.critic_id} className={'card border-light-subtle shadow-sm'} style={{minHeight: 250}}>
                        <div className={'card-header hstack'}>
                            <div className={'me-3 fs-5 fw-semibold me-auto p-3'}>{value.critic_name}</div>
                            <div
                                className={`d-inline-block fs-4 fw-semibold ${value.rating ? value.rating >= 7 ? 'text-bg-success' : value.rating >= 5 ? 'text-bg-warning' : 'text-bg-danger' : 'text-bg-secondary'} rounded me-3`}
                                style={{
                                    lineHeight: '50px',
                                    textAlign: 'center',
                                    width: 50,
                                    height: 50
                                }}>{value.rating ? value.rating : '–'}</div>
                        </div>
                        <div className={'card-body p-4'}>
                            <p>
                                {value.summary}
                            </p>
                            <Link style={{textDecoration: 'none'}} target={'_blank'} className='card-link' href={value.url}>Читать полностью</Link>
                        </div>
                    </div>
                )}
        </div>
    }

    if (!isLoaded) {
        return <>
            <h3 className={'mb-3'}>Рецензии</h3>
            <div>Loading... Please, wait.</div>
        </>
    }

    return (
        <>
            <h3 className={'mb-3'}>Рецензии</h3>
            <div className={'p-3'}>
                <ul className={'nav nav-pills bg-light mb-5'}>
                    <li className={'nav-item me-2'}><div
                        className={`nav-link${selectedTab === 'critics' ? ' active' : ''}`} style={{cursor: 'pointer'}}
                        onClick={handleSelectCritics}>Критики</div></li>
                    <li className={'nav-item'}><div className={`nav-link${selectedTab === 'users' ? ' active' : ''}`} style={{cursor: 'pointer'}} onClick={handleSelectUsers}>Пользователи</div></li>
                </ul>
                {reviews}
            </div>
        </>
    );
}
