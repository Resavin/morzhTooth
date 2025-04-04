FROM oven/bun:latest

WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install

COPY . .
EXPOSE 6000
CMD ["bun", "--watch", "run", "src/index.ts"]
