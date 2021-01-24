# vue-composition-ui

![PRs welcom](https://img.shields.io/badge/PRs-welcome-brightgreen)

Vue Composition UI is a renderless component library, it helps you to build a highly customized UI based on Vue 3
reactivity API.

# Installation

via npm

```
yarn add @vue-composition-ui/pagination
```

via cdn

```html
<script src="https://unpkg.com/@vue-composition-ui/pagination@latest"></script>
```

# Basic Usage

esm:

```ts
import { usePagination, useGuaranteePageSize } from '@vue-composition-ui/pagination'
```

commonjs:

```ts
const { usePagination, useGuaranteePageSize } = '@vue-composition-ui/pagination'
```

browser:

```ts
// 'VueCompositionUi' + PackageNameWithPascalCase
const { usePagination, useGuaranteePageSize } = window.VueCompositionUiPagination
```

# Contributing

Please read [CONTRIBUTING.md](/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

# Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the tags on this repository.

# License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details
