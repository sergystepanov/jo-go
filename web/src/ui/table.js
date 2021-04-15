/**
 * Renders HTML table element.
 *
 * <pre>
 * <table>
 *   <tr>
 *     <th>...</th>
 *   </tr>
 *   <tr>
 *     <td>...</td>
 *   </tr>
 * </table>
 * </pre>
 *
 * @param parentEl
 * @param data
 */
export function Table(parentEl, {data} = {data: {h: [], r: []}}) {
    const table = new DocumentFragment();

    const _t = document.createElement('table');
    table.appendChild(_t);

    if (data.h.length) {
        const row = document.createElement('tr');
        _t.appendChild(row);
        data.h.forEach((h) => {
            const col = document.createElement('th');
            row.appendChild(col);
            col.innerText = h;
        })
    }

    if (data.r.length) {
        data.r.forEach((r) => {
            const row = document.createElement('tr');
            _t.appendChild(row);
            r.forEach((d) => {
                const col = document.createElement('td');
                row.appendChild(col);
                col.innerText = d;
            })
        })
    }

    parentEl.appendChild(table);
}
