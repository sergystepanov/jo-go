import Ajax from "./request/ajax"
import {done} from "./screen/home"


(function () {
    const root = document.getElementById('root');

    Ajax('/api/v1/hi').then(response => {
        response.text()
            .then(res => {
                root.innerText = res
            })
    });

    done();
})();
