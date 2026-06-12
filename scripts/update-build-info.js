const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const buildInfoPath = path.join(rootDir, 'public', 'build-info.json');
const packageJson = require('../package.json');

const parseEnvFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return {};
    }

    const envContent = fs.readFileSync(filePath, 'utf8');
    return envContent
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => line.split('=', 2))
        .reduce((acc, [key, ...rest]) => {
            acc[key] = rest.join('=');
            return acc;
        }, {});
};

const envConfig = parseEnvFile(envPath);

const fallbackVersion = packageJson?.version ?? '0.0.0';
const fallbackImage = 'gvensly/nehara-admin-dashboard';

const version =
    envConfig.APP_VERSION ||
    process.env.APP_VERSION ||
    fallbackVersion;
const image =
    envConfig.DOCKER_IMAGE ||
    process.env.DOCKER_IMAGE ||
    fallbackImage;

if (!version || !image) {
    console.warn(
        'WARNING: APP_VERSION or DOCKER_IMAGE is undefined. ' +
            'build-info.json will still be written, but ' +
            'version/image should be defined via .env, env vars, or package.json.'
    );
}

const buildInfo = {
    image,
    version,
    builtAt: new Date().toISOString(),
};

fs.mkdirSync(path.dirname(buildInfoPath), { recursive: true });
fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 4) + '\n', 'utf8');
console.log(`Updated build-info.json (image=${image} version=${version})`);
