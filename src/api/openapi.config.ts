import { GeneratorConfig } from 'ng-openapi';
import { HttpResourcePlugin } from '@ng-openapi/http-resource';

const config: GeneratorConfig = {
    input: './openapi.yaml',
    output: './providers',
    clientName: 'Fintrack',
    plugins: [
        HttpResourcePlugin
    ],
    options: {
        dateType: 'Date',
        enumStyle: 'enum',
        generateEnumBasedOnDescription: true,

    },
};

export default config;
