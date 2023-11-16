export default function GamePage({params}: { params: { id: string } }) {
    return (
        <div>Page of game with id: {params.id}</div>
    );
}
