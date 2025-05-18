# 1단계: 빌드용 이미지
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 정적 서버용 이미지
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 설정 파일 덮어씌우고 싶다면 필요시 추가 가능
# 새로고침시 404페이지 오류뜨는것 대응
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]