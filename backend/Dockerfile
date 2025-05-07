# 1단계: Node 이미지 사용
FROM node:18
# ✅ netcat 설치 추가
RUN apt-get update && apt-get install -y netcat-openbsd

# 2단계: 작업 디렉토리 생성
WORKDIR /app

# 3단계: package.json과 lock 파일 복사 후 설치
COPY package*.json ./
RUN npm install

# 4단계: 전체 코드 복사
COPY . .

# 5단계: 컴파일 (TypeScript 사용 시) js 프로젝트면 생략

# 6단계: 앱 실행
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]
