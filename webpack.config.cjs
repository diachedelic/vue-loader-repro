const {VueLoaderPlugin} = require("vue-loader");

// The variant resolver transforms a "variant" suffix on a module specifier into
// a query string:

//    ./foo/bar.js@debug -> ./foo/bar.js?variant=debug

// For use with the variant loader.

const variant_resolver = {
    apply(resolver) {
        resolver.plugin("resolve", function (object, callback) {
            const matches = object.request.match(/@(\w+)$/);
            if (matches) {
                const variant = matches[1];
                object.request = object.request.replace(
                    matches[0],
                    "?variant=" + variant
                );
            }
            return callback();
        });
    }
};

module.exports = {
    mode: "development",
    bail: true,
    entry: "./src/main.js",
    resolve: {
        modules: ["node_modules"],
        plugins: [variant_resolver]
    },
    module: {
        rules: [
            {test: /\.vue$/, loader: "vue-loader"},
            {test: /\.css$/, loader: "css-loader"}
        ]
    },
    plugins: [new VueLoaderPlugin()]
};
