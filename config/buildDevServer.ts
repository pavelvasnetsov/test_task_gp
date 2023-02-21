import webpackDevServer from 'webpack-dev-server';
import { BuildOptions } from './types/config';

export function buildDevServer(options: BuildOptions): webpackDevServer.Configuration {
    return {
        port: options.port,
        open: true
    }
}