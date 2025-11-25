## Development

It's recommended to use [Volta](https://volta.sh/) to manage the node and pnpm version. And you need to set the `VOLTA_FEATURE_PNPM` environment variable to enable pnpm support.

```bash
export VOLTA_FEATURE_PNPM=1
```

Make sure the bun's version is 1.2.7 before run build.

```bash
curl -fsSL https://bun.sh/install | bash -s "bun-v1.2.7"
```

Install.

```bash
pnpm install
```

Run the project.

```bash
pnpm dev
```

Test the build version.

```bash
pnpm build
pnpm start
```

It will start the development server for the documentation.

```bash
▲ Next.js 14.2.32
- Local:        http://localhost:3000
```
