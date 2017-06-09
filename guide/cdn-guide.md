# CDN 설정 가이드

**Fornt-End에서 사용되는 라이브러리를 CDN으로 제공하며, NGINX로 관리합니다.**

## 목적

  - 라이브러리가 각 개발자 프로젝트 폴더에 있다보니, 프로젝트 마다 중복적으로 관리되는 문제점
  - 사용되고 있는 라이브러리에 관한 버전 관리 취약
  - 자바에 Nexus가 있다면! **Front-End에는 CDN이 있다!!!!**

## URL
  - http://192.168.232.211:8090
  - ex) <link rel="stylesheet" type="text/css" href="http://192.168.232.211:8090/semantic/semantic.min.css">
  - ex) <script src="http://192.168.232.211:8090/jquery/jquery.min.js"></script>

## 라이브러리 파일 경로

- /nkia/cdn/{vendor}/{version}/
- Vendon 별로 관리되며, 하위 폴더로 버전을 가지는 구조이다.

## 현재 지원 라이브러리
- jquery
- jquery_migrate
- kendo
- webix
- hightcharts
- bootstrap
- semantic

## nginx

### nginx 환경 설정
- 환경 설정 파일 경로
    - /etc/nginx/conf.d
- 환경 설정 파일
    - vi pass.conf

### nginx 설정 파일 작성
- 각 라이브러리에 버전 관리를 하기 위해서 변수로 선언해서 작성한다.
- 요청된 경로에 따라 실제 내려받을 버전 경로를 작성해서 관리를 한다.
- 요청 경로에는 따로 버전을 명시하지 않는다.
- ex) http://192.168.232.211:8090/jquery/jquery.min.js

```
# pass.conf

server {
	listen       8090;
	server_name  192.168.232.211;
	access_log	 /nkia/cdn/nginx-access.log;

	root /nkia/cdn/;

	# version variables
	set $jquery_version '3.2.0';
	set $jquery_migrate_version '3.0.0';
	set $semantic_version '2.2.10';
	set $kendo_version '2016.1.112';
	set $highcharts_version '4.1.7';
	set $bootstrap_version '3.3.7';
	set $webix_version '4.2.16';
	set $puf_version '0.1.0';

	location /jquery/ {
		alias /nkia/cdn/jquery/$jquery_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /jquery/migrate/ {
		alias /nkia/cdn/jquery/migrate/$jquery_migrate_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /semantic/ {
		alias /nkia/cdn/semantic/$semantic_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /kendo/ {
		alias /nkia/cdn/kendo/$kendo_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /highcharts/ {
		alias /nkia/cdn/highcharts/$highcharts_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /bootstrap/ {
		alias /nkia/cdn/bootstrap/$bootstrap_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /webix/ {
		alias /nkia/cdn/webix/$webix_version/;
        add_header Access-Control-Allow-Origin "*";
	}

	location /puf/ {
		alias /nkia/cdn/puf/$puf_version/;
        add_header Access-Control-Allow-Origin "*";
	}
}
```

### nginx 중단
- service nginx stop

### nginx 기동
- service nginx start

## 문의
NKIA UI/UX Team
