'use client';

import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function AddGame() {
    const [game, setGame] = useState<{
        name: string,
        release: string,
        description: string,
        url: string,
        developers: string[],
        publishers: string[],
        genres: string[],
        verticalCover: string | null,
        horizontalCover: string | null
    }>({
        name: '',
        release: '',
        description: '',
        url: '',
        developers: [],
        publishers: [],
        genres: [],
        verticalCover: null,
        horizontalCover: null
    });

    const [developers, setDevelopers] = useState<{
        id: string,
        name: string
    }[]>([]);
    const [publishers, setPublishers] = useState<{
        id: string,
        name: string
    }[]>([]);
    const [genres, setGenres] = useState<{
        id: string,
        name: string
    }[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function loadData() {
            const responseDevelopers = await fetch('/api/developers');
            const developers = await responseDevelopers.json();
            setDevelopers(developers);

            const responsePublishers = await fetch('/api/publishers');
            const publishers = await responsePublishers.json();
            setPublishers(publishers);

            const responseGenres = await fetch('/api/genres');
            const genres = await responseGenres.json();
            setGenres(genres);

            setIsLoaded(true);
        }

        loadData();
    }, []);

    const developerOptions = developers.map((value) => (
        <option key={value.id} value={value.id}>
            {value.name}
        </option>
    ));
    const publisherOptions = publishers.map((value) => (
        <option key={value.id} value={value.id}>
            {value.name}
        </option>
    ));
    const genreOptions = genres.map((value) => (
        <option key={value.id} value={value.id}>
            {value.name}
        </option>
    ));

    const handleName: ChangeEventHandler<HTMLInputElement> = function (event) {
        setGame({...game, name: event.target.value});
    }

    const handleRelease: ChangeEventHandler<HTMLInputElement> = function (event) {
        setGame({...game, release: event.target.value});
    }

    const handleUrl: ChangeEventHandler<HTMLInputElement> = function (event) {
        setGame({...game, url: event.target.value});
    }

    const handleDevelopers: ChangeEventHandler<HTMLSelectElement> = function (event) {
        let selected: string[] = [];
        for (let i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                selected.push(event.target.options[i].value);
            }
        }
        setGame({...game, developers: selected});
    }
    const handlePublishers: ChangeEventHandler<HTMLSelectElement> = function (event) {
        let selected: string[] = [];
        for (let i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                selected.push(event.target.options[i].value);
            }
        }
        setGame({...game, publishers: selected});
    }

    const handleGenres: ChangeEventHandler<HTMLSelectElement> = function (event) {
        let selected: string[] = [];
        for (let i = 0; i < event.target.options.length; i++) {
            if (event.target.options[i].selected) {
                selected.push(event.target.options[i].value);
            }
        }
        setGame({...game, genres: selected});
    }

    const [verticalCover, setVerticalCover] = useState<File | null>(null);

    const handleVerticalCoverSelect: ChangeEventHandler<HTMLInputElement> = async function (event) {
        if (event.target.files) {
            setVerticalCover(event.target.files[0]);
        }
    }

    const [horizontalCover, setHorizontalCover] = useState<File | null>(null);

    const handleHorizontalCoverSelect: ChangeEventHandler<HTMLInputElement> = async function (event) {
        if (event.target.files) {
            setHorizontalCover(event.target.files[0]);
        }
    }

    const router = useRouter();
    const handleSubmit: FormEventHandler = function (event) {
        event.preventDefault();
        const addGame = async function () {
            let verticalCoverPath: string | null = null;
            if (verticalCover) {
                const response = await fetch(`/api/images/add`, {
                    method: 'POST',
                    body: verticalCover
                });
                verticalCoverPath = (await response.json()).fileName;
            }
            let horizontalCoverPath: string | null = null;
            if (horizontalCover) {
                const response = await fetch(`/api/images/add`, {
                    method: 'POST',
                    body: horizontalCover
                });
                horizontalCoverPath = (await response.json()).fileName;
            }
            await fetch('/api/games/add', {
                method: 'POST',
                body: JSON.stringify({...game, verticalCover: verticalCoverPath, horizontalCover: horizontalCoverPath})
            });
            router.push('/admin/games');
        }
        addGame();
    }

    if (!isLoaded) {
        return (<>Loading... Please, wait.</>)
    }

    return (
        <form onSubmit={handleSubmit} className={'mx-auto my-0'} style={{maxWidth: '500px'}}>
            <h3 className={'mb-3'}>Добавление новой игры</h3>
            <div className={'mb-3'}>
                <label className={'form-label'}>Название</label>
                <input name={'name'} className={'form-control'} type={'text'} maxLength={50} required={true}
                       value={game.name} onChange={handleName}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Обложка (Вертикальная)</label>
                <input name={'vertical-cover'} className={'form-control'} type={'file'} accept={'.jpg'}
                       onChange={handleVerticalCoverSelect}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Обложка (Горизонтальная)</label>
                <input name={'vertical-cover'} className={'form-control'} type={'file'} accept={'.jpg'}
                       onChange={handleHorizontalCoverSelect}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Дата выхода</label>
                <input name={'release'} className={'form-control'} type={'date'} value={game.release}
                       onChange={handleRelease}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Официальный сайт</label>
                <input name={'url'} className={'form-control'} type={'url'} maxLength={50} required={true}
                       value={game.url} onChange={handleUrl}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Разработчики</label>
                <select name={'developers'} className={'form-select'} multiple={true} value={game.developers}
                        onChange={handleDevelopers}>
                    {developerOptions}
                </select>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Издатели</label>
                <select name={'publishers'} className={'form-select'} multiple={true} value={game.publishers}
                        onChange={handlePublishers}>
                    {publisherOptions}
                </select>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Жанры</label>
                <select name={'genres'} className={'form-select'} multiple={true} value={game.genres}
                        onChange={handleGenres}>
                    {genreOptions}
                </select>
            </div>
            <div className={'mt-4'}>
                <input className={'btn btn-primary'} type={'submit'} value={'Добавить'}/>
            </div>
        </form>
    );
}
