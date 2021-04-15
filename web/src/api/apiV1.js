import Ajax from "../request/ajax";

const prefix = '/api/v1';

const apiHi = prefix + '/hi';

export async function Hi() {
    let resp = await Ajax(apiHi);
    return await resp.text()
}
