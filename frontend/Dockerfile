# 컨테이너를 만들기 위한 이미지(설계과정)의 시작
# 총 2단계로 빌드와 배포로 진행한다. (멀티 스테이지 빌드)
# 1단계 빌드 : 노드 18 버전으로 1단계 이미지를 생성하겠다. 
FROM node:18 as build 

# 작업이 진행될 경로를 /app 폴더로 생성해서 수행한다. 
WORKDIR /app
# EC2의 pull 받은 최신 패키지json 파일들을 컨테이너로 복사하겠다. 
COPY package*.json ./
# 복사한 json을 기준으로 노드 모듈 패키지를 받는다. 
RUN npm install
# 서버상의 모든 프론트엔드 파일들을 복사한다 (.ignore 지정한 파일들만 제외하고)
COPY . .
# 복사된 프로젝트 파일들을 기반으로 빌드 진행한다.
RUN npm run build

# 2단계 배포: 정적 서버용 이미지를 생성한다. 
FROM nginx:alpine

# --from=build : 첫줄에서 지정했던 build 이미지에서 가져온다. 
# 이전 이미지(노드 이미지)의 build 폴더속 내용을 > 현재 이미지(nginx 이미지)의 html로 복사해 가져온다. 
COPY --from=build /app/build /usr/share/nginx/html

# 내 EC2 프로젝트에 있는 conf 파일을 nginx 이미지의 기본 설정 파일로 덮어쓰기함
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 해당 컨테이너 포트는 80으로 선언 > .yml에서 82로 들어온 요청을 80으로 매칭해줄 것
EXPOSE 80

# 위에서 만든 이미지 기반으로 실제 컨테이너가 실행될 때 제일 먼저 실행할 명령어
# nginx를 전역으로 실행시키고 백그라운드 실행을 꺼라 > 앞에서(포그라운드) 실행해야 도커가 유지된다. 
CMD ["nginx", "-g", "daemon off;"]