import path from "path";
import webpack from "webpack";
import { buildWebpackConfig } from "./config/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/types/config";

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
}
const mode = 'development';
const isDev = mode === 'development';
const port = 3000;

const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port
})

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html')
    }
    const mode = env.mode ?? 'development';
    const port = env.port ?? 3000;

    const isDev = mode === 'development';

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port
    })

    return config;
};