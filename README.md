## React Puf

### Getting Started

Just clone the repo and start hacking:

```shell
$ git clone ssh://dca@cims.nkia.net:29418/react-puf.git
$ cd react-pum
$ npm install                   # Install Node.js components listed in ./package.json
$ npm start                     # Compile and launch
```

### How to Build

```shell
$ npm run webpack                 # or, `npm run webpack -- release`
```

By default, it builds in a *debug* mode. If you need to build in a release
mode, just add `-- release` flag. This will optimize the output bundle for
production deployment.

### How to Run

```shell
$ npm start                     # or, `npm start -- release`
```

This will start a lightweight development server with "live reload" and
synchronized browsing across multiple devices and browsers.

### Documentation

  * **General**
    - [React Style Guide](./docs/react-style-guide.md)
    - [How to configure text editors and IDEs](./docs/how-to-configure-text-editors.md)
  * **Questions**
    - [Which module bundler should I use?](https://github.com/kriasoft/react-starter-kit/issues/3)
    - [Which Flux implementation should I use?](https://github.com/kriasoft/react-starter-kit/issues/22)
  * **Recipes**
    - [How to Implement Routing and Navigation](./docs/recipes/how-to-implement-routing.md)
    - [How to Integrate Disqus](./docs/recipes/how-to-integrate-disqus.md)

### Directory Layout

```
.
├── /dist/                      # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /libs/                      # javascript library
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /components/            # React components
│   └── /app.js                 # Client-side startup script
├── package.json                # The list of 3rd party libraries and utilities
└── webpack.config.js           # webpack module builder config file
```


### 개발가이드 환경 구축 절차

```
- 사전 설치 프로그램
Git, node js(v4.6.1 LTS), visual studio code

- 절차
1) 소스 다운로드
특정 워크스페이스 폴더 생성후
git clone ssh://dca@cims.nkia.net:29418/react-puf.git

2) 필요한 라이브러리 설치(인터넷이 되는 환경이어야함)
npm install 
package.json에 설정되어 있는 라이브러리 설치됨

3) gulp 명령어를 글로벌하게 사용하기 위해 재설치
npm install gulp -g

4) 빌드
gulp
(빌드설정파일 : gulpfile.js)

5) http-server(웹서버) 실행
npm start

6) 개발 가이드 화면 호출
http://localhost:8080/
```