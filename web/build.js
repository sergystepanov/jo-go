const esbuild = require('esbuild');
const http = require('http');

// cli params
const {
    npm_config_serve, npm_config_serve_dir, npm_config_serve_port,
    npm_config_proxy_prefix, npm_config_proxy_port
} = process.env;
const serve = {
    enabled: npm_config_serve || false,
    dir: npm_config_serve_dir || '/dist',
    port: npm_config_serve_port || '3000'
};
const proxy = {
    prefix: npm_config_proxy_prefix || '/api',
    port: npm_config_proxy_port || 8080
};

// build params
const buildOptions = {
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/app.js',
}

// serve
if (serve) {
    esbuild
        .serve({servedir: __dirname + serve.dir,}, buildOptions)
        .then(result => {
            // The result tells us where esbuild's local server is
            const {host, port} = result

            // Then start a proxy server
            http.createServer((req, res) => {
                const options = {
                    hostname: host,
                    port: port,
                    path: req.url,
                    method: req.method,
                    headers: req.headers,
                }

                if (req.url.startsWith(proxy.prefix)) {
                    options.port = proxy.port
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
            }).listen(serve.port);
        });
    return;
}

// build
esbuild.build(buildOptions).catch(() => process.exit(1))
