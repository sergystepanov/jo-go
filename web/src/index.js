import {done} from "./screen/home";
import {Hi} from "./api/apiV1";
import {Table} from "./ui/table";

(async function () {
    const root = document.getElementById('root');

    const message = document.createElement('div');
    root.appendChild(message);
    message.innerText = await Hi();

    const data = document.createElement('div');
    root.appendChild(data);
    Table(data, {
        data: {
            h: ["a", "b", "c"],
            r: [["1", "2", "3"], ["1", "2", "3"]]
        }
    });


    done();
})();
