/**
 * AJAX requests module.
 *
 * Based on Fetch API requests which can be aborted.
 * Returns Promise after a call.
 *
 * @module transport/ajax
 *
 * @param {String} url A URL address of the requested resource.
 * @param options
 * @param timeout
 * @property {Object} params An optional list of additional params.
 * @property {Object} params.options A list of custom params to pass into Fetch call.
 * @property {String} params.timeout An abort timeout for the call.
 *
 * @example
 *
 * import Ajax from './network/transport/ajax'
 *
 * const result = Ajax('https://my.call');
 * result.then(response => response.json().then(r => console.log(r)));
 *
 */
function Ajax(url, {options = {}, timeout = 10000} = {}) {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const {signal} = controller;

        fetch(url, {...options, signal}).then(resolve, () => {
            controller.abort();
            return reject;
        });

        // auto abort when a timeout reached
        setTimeout(() => {
            controller.abort();
            reject();
        }, timeout);
    });
}

export default Ajax;
