[![TEST][react-shield]][license-url] [![MIT License][license-shield]][license-url]

# KRAMO

<div style="display:flex; justify-content: center;">
  <img src='https://github.com/Memo8-KoreaUniv/kramo/blob/dev/public/logo.png'>
</div>

<br>
  <div style="display:flex; flex-direction:column; align-items:center; justify-content: center;">
    A memo application based on Markdown!
    <br/>
    <br/>
    <a href="#" target="_blank">Go!</a>
  </div>
<br>

<p align="center">
  <a href="#about-the-project"> About The Project</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#license">License</a> •
  <a href="#authors">Authors</a>
</p>
<br>

## About The Project

(_It will be deployed soon. We will upload Url when the deployment is complete._)

### Key Features

- Simple UI

![메인화면](https://github.com/Memo8-KoreaUniv/kramo/blob/dev/public/main.png)

- Markdown Support
- Naver Login

![네이버로그인](https://github.com/Memo8-KoreaUniv/kramo/blob/dev/public/naver-login-page.png)

- Each modification saves a certain amount of history, so you can roll back to that history.
- Memo Category Features
- Weather and location storage available

## Getting Started

### Prerequisites

- Install Node JS, React, TypeScript
- Optional installation of A and B is recommended.

### Installation

1. Please make sure you meet Prerequisites.
2. Clone the repo
   ```sh
   $ git clone https://github.com/Memo8-KoreaUniv/kramo.git
   $ cd kramo
   ```
3. Install requirements
   ```sh
   $ npm i
   ```
4. Edit configuration `.env.*`

- To run this project, you will need to add the following environment variables to your `.env.*` file
- Security is required of environment variable, could contact us.
  - `ddrrpg@naver.com`

## Documentation

[Documentation](https://github.com/Memo8-KoreaUniv/kramo/wiki)
[API Docs](#)(Will be uploaded when documents created based on swagger are deployed)

- [Documents ing..](https://github.com/Memo8-KoreaUniv/kramo/blob/dev/pages/api/api.yaml)

## Running Tests

To run tests, run the following command

```bash
$ npm run test
```

## Linting

ES-Lint is used to capture anti-patterns and maintain a consistent code style.

### How to lint

```bash
$ npm run lint
```

or in root directory

```bash
$ eslint **/*.{js,ts,tsx}
```

### Lining Rules

`eslintrc.js`

```js
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 2020 }, // to enable features such as async/await
  ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'react',
    'import', // eslint-plugin-import for custom configure
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:react/recommended', // React rules
        'plugin:react-hooks/recommended', // React hooks rules
        'plugin:jsx-a11y/recommended', // Accessibility rules
      ],
      rules: {
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',

        // No need to import React when using Next.js
        'react/react-in-jsx-scope': 'off',

        // This rule is not compatible with Next.js's <Link /> components
        'jsx-a11y/anchor-is-valid': 'off',

        // fuction return
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // no-non-null-assertion
        '@typescript-eslint/no-non-null-assertion': 'off',

        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
}
```

## Tech Used

<br/>

### Client

- Main Framework : [Next JS](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- State Management : [Recoil](https://recoiljs.org/ko/)
- UI : [Antd](https://ant.design/), [styled-component](https://styled-components.com/)

### Server

- OAuth : [Naver Developers Login Application](https://developers.naver.com/main/)
- DB : [Mongo DB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=0621control&utm_source=google&utm_campaign=gs_apac_south_korea_search_core_brand_atlas_desktop&utm_term=mongo%20db&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624365&gclid=Cj0KCQjw--GFBhDeARIsACH_kdZ_qPGfsWYBYbfxu0qc02874q3JODy1676Bb4T1PrHVQHdycvw51tgaAu0yEALw_wcB)
- Testing : [Jest](https://jestjs.io/)
- API : [Next JS](https://nextjs.org/)

### ETC

- Weather API by [openweathermap](https://openweathermap.org/API)
- API Doc by [Swagger](http://swagger.io/)
- [JWT](https://jwt.io/) Authentication
- Global-State management

<br/>
## Authors

[SeoSang](https://github.com/SeoSang)

- Blog : https://programming119.tistory.com
- Site : [https://i-am-seo-sang.vercel.app/](https://i-am-seo-sang.vercel.app/)
- E-mail : ddrrpg@naver.com

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: #license
[react-shield]: https://img.shields.io/badge/React-TypeScript-blue?logo=react&logoColor=white

## License

Distributed under the MIT License.
