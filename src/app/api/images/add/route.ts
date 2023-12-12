export async function POST(request: Request): Promise<Response> {
    const file = await request.blob();

    const formData = new FormData();
    formData.append('image', file);
    return await fetch(`${process.env.STORAGE_PATH}/upload.php`, {
        method: 'POST',
        body: formData
    });
}
