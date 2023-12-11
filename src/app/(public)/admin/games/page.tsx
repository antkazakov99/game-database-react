import Link from 'next/link';
import {Button} from 'react-bootstrap';

export default function AdminGames() {

    return (
        <>
            <Button href={'/admin/games/add'}>Добавить</Button>
        </>
    );
}
