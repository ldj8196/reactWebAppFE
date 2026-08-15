# 1단계: Node.js 22 환경에서 리액트(Vite) 빌드 수행
FROM node:22 AS builder
WORKDIR /app

# 의존성 파일 먼저 복사 후 설치
COPY package*.json ./
RUN npm install

# 소스코드 전체 복사 후 빌드 (Vite는 npm run build 시 dist 폴더 생성)
COPY . .
RUN npm run build

# 2단계: 실행은 하지 않고 빌드 결과물만 보관하는 최종 단계 (Alpine)
FROM alpine
WORKDIR /output

# [중요] Vite 프로젝트이므로 /app/build 가 아니라 /app/dist 를 복사합니다!
COPY --from=builder /app/dist /output