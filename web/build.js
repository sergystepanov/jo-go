const esbuild = require('esbuild');
const http = require('http');

// cli params
const serve = process.env.npm_config_serve || '';

// build params
const buildOptions = {
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/app.js',
}

const apiPort = 8080;

// serve
if (serve) {
// Start esbuild's server on a random local port
    esbuild.serve({
        servedir: __dirname + "/dist",
    }, buildOptions).then(result => {
        // The result tells us where esbuild's local server is
        const {host, port} = result

        // Then start a proxy server on port 3000
        http.createServer((req, res) => {
            const options = {
                hostname: host,
                port: port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            }

            if (req.url.startsWith('/api')) {
                options.port = apiPort
            }

            // Forward each incoming request to esbuild
            const proxyReq = http.request(options, proxyRes => {
                // If esbuild returns "not found", send a custom 404 page
                if (proxyRes.statusCode === 404) {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end('{"error": "404"}');
                    return;
                }

                // Otherwise, forward the response from esbuild to the client
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, {end: true});
            });

            // Forward the body of the request to esbuild
            req.pipe(proxyReq, {end: true});
        }).listen(3000);
    });
    return;
}

// build
esbuild.build(buildOptions).catch(() => process.exit(1))
