export default function UserPage( { params }: { params: { id: string } }) {
    return (
        <div>Page of user with id: {params.id}</div>
    )
}
