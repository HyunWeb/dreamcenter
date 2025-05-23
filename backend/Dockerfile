# 1단계: Node 이미지 사용
FROM node:18

# ✅ netcat 설치 추가 > 백엔드가 DB보다 먼저 켜져서 연결실패가 나는걸 방지하고 기다린다. 
RUN apt-get update && apt-get install -y netcat-openbsd

# 2단계: 작업 디렉토리 생성
WORKDIR /app

# 3단계: package.json과 lock 파일 복사 후 설치
COPY package*.json ./
RUN npm install

# 4단계: 전체 코드 복사
COPY . .

EXPOSE 3001

# 6단계: 앱 실행
#  DB 켜질때까지 기다렸다가 실행해라
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]
