import Ajax from "./request/ajax";
import {done} from "./screen/home";
import {apiHi} from "./api/apiV1";

(function () {
    const root = document.getElementById('root');

    Ajax(apiHi).then(response => {
        response.text()
            .then(res => {
                root.innerText = res
            })
    });

    done();
})();
