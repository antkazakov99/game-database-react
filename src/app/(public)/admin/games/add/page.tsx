'use client';

import React, {ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState} from 'react';
import Developer from '@/lib/entities/Developer';
import Publisher from '@/lib/entities/Publisher';
import Genre from '@/lib/entities/Genre';
import {useRouter} from 'next/navigation';
import Game from '@/lib/entities/Game';
import {FormSelect} from 'react-bootstrap';
import {forEach} from 'react-bootstrap/ElementChildren';

export default function AddGame() {
    const [game, setGame] = useState<{
        name: string,
        release: string,
        description: string,
        url: string,
        developers: string[],
        publishers: string[],
        genres: string[]
    }>({
        name: '',
        release: '',
        description: '',
        url: '',
        developers: [],
        publishers: [],
        genres: []
    });

    const [developers, setDevelopers] = useState<{id: string, name: string}[]>([]);
    const [publishers, setPublishers] = useState<{id: string, name: string}[]>([]);
    const [genres, setGenres] = useState<{id: string, name: string}[]>([]);

    useEffect(() => {
        fetch('/api/developers').then((value) => value.json()).then(
            (value: { id: string, name: string }[]) => {
                setDevelopers(value);
            }
        );
        fetch('/api/publishers').then((value) => value.json()).then(
            (value: { id: string, name: string }[]) => {
                setPublishers(value);
            }
        );
        fetch('/api/genres').then((value) => value.json()).then(
            (value: { id: string, name: string }[]) => {
                setGenres(value);
            }
        );
    }, []);

    const developerOptions = developers.map((value) => <option key={value.id} value={value.id} selected={game.developers.includes(value.id)}>{value.name}</option>);
    const publisherOptions = publishers.map((value) => <option key={value.id} value={value.id} selected={game.publishers.includes(value.id)}>{value.name}</option>);
    const genreOptions = genres.map((value) => <option key={value.id} value={value.id} selected={game.genres.includes(value.id)}>{value.name}</option>);

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

    const router = useRouter();
    const handleSubmit: FormEventHandler = function (event) {
        event.preventDefault();
        fetch('/api/games/add', {
            method: 'POST',
            body: JSON.stringify(game)
        }).then(
            () => router.push('/admin/games')
        )
    }

    return (
        <form onSubmit={handleSubmit} className={'mx-auto my-0'} style={{maxWidth: '500px'}}>
            <h3 className={'mb-3'}>Добавление новой игры</h3>
            <div className={'mb-3'}>
                <label className={'form-label'}>Название</label>
                <input name={'name'} className={'form-control'} type={'text'} maxLength={50} required={true} value={game.name} onChange={handleName}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Обложка (Вертикальная)</label>
                <input name={'vertical-cover'} className={'form-control'} type={'file'}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Дата выхода</label>
                <input name={'release'} className={'form-control'} type={'date'} value={game.release} onChange={handleRelease}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Официальный сайт</label>
                <input name={'url'} className={'form-control'} type={'url'} maxLength={50} required={true} value={game.url}  onChange={handleUrl}/>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Разработчики</label>
                <select name={'developers'} className={'form-select'} multiple={true} onChange={handleDevelopers}>
                    {developerOptions}
                </select>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Издатели</label>
                <select name={'publishers'} className={'form-select'} multiple={true}>
                    {publisherOptions}
                </select>
            </div>
            <div className={'mb-3'}>
                <label className={'form-label'}>Жанры</label>
                <select name={'genres'} className={'form-select'} multiple={true}>
                    {genreOptions}
                </select>
            </div>
            <div className={'mt-4'}>
                <input className={'btn btn-primary'} type={'submit'} value={'Добавить'}/>
            </div>
        </form>
    );
}
