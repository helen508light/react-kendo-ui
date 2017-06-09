# 표준 용어 Guide

프로젝트에 사용되는 method(function) 생성 규칙(Naming) 및 UI Framework 에서 사용되는 property, method, event에 대한 표준 용어 Guide 입니다.

## 목차
  1. [method 생성 규칙](#method-naming)
  1. [UI Framework 표준 용어](#Standard-term)

## method 생성 규칙

  - [1.1](#1.1) <a name='1.1'></a> 사전에 약속한 prefix를 사용하여 method를 생성(작성) 합니다.
    + get
    + set
    + is
    + has
    + call
    + post
    + on
    + renderReset

  - [1.2](#1.2) <a name='1.2'></a> get + 명칭
    + 데이터 또는 반환이 있는 경우에 사용되는 prefix

    ```javascript
    function getValue(){
        const value = 10;
        return value;
    }
    ```

  - [1.3](#1.3) <a name='1.3'></a> set + 명칭
    + 데이터 또는 항목 등을 설정하는 prefix

    ```javascript
    const user = {
        name: "Nkia",
        setName: function(name){
            this.name = name;
        }
    }

    user.setName("Polestar");
    console.info(user.name);
    ```

  - [1.4](#1.4) <a name='1.4'></a> is + 명칭
    + 검증(true|false)에 대한 prefix

    ```javascript
    const user = {
        name: "Nkia",
        isHuman: function(){
            return true;
        }
    }

    console.info(user.isHuman());
    ```

  - [1.5](#1.5) <a name='1.5'></a> has + 명칭
    + 소유(true|false)에 대한 prefix

    ```javascript
    const user = {
        name: "Nkia",
        hasPhone: function(){
            return true;
        }
    }

    console.info(user.hasPhone());
    ```

  - [1.6](#1.6) <a name='1.6'></a> call + 업무명
    + 조회(서버와 통신)에 대한 prefix

    ```javascript
    const user = {
        name: "Nkia",
        callPhone: function(){
            ... 사용자의 핸드폰 번호를 조회하는 요청(서버 통신)

            return phoneNumber;
        }
    }

    console.info(user.callPhone());
    ```

  - [1.7](#1.7) <a name='1.7'></a> post + 할 일(Save, Insert, Update, Remove) + 업무명
    + 저장, 생성, 수정, 삭제(서버와 통신)에 대한 prefix

    ```javascript
    const user = {
        name: "Nkia",
        postUpdatePhone: function(changePhoneNumber){
            ... 사용자의 핸드폰 번호를 수정하는 요청(서버 통신)
        }
    }

    console.info(user.postUpdatePhone("000-0000-0000"));
    ```

  - [1.8](#1.8) <a name='1.8'></a> on + 이벤트 명칭
    + 이벤트에 대한 prefix

    ```javascript
    const user = {
        name: "Nkia",
        // 실제 이벤트가 수행되는 전에 발생하는 이벤트는 onBefore를 사용한다.
        onBeforeClick: function(){
            ... 클릭 이벤트가 완료되기전에 발생되는 이벤트
        },
        // 실제 실행이 되는 이벤트 또는 After 이벤트의 경우에는 바로 이벤트 명을 기술한다.
        onClick: function(){
            ... 클릭 이벤트
        },
        // 업무적으로 분명하게 나뉘어져 있는 이벤트의 경우 업무 가독성을 위해 정확히 표기한다.
        onChangePhoneNumber: function(changePhoneNumber){
            ... 핸드폰 번호 변경 이벤트
        }
    }

    console.info(user.postUpdatePhone("000-0000-0000"));
    ```

  - [1.9](#1.9) <a name='1.9'></a> renderReset
    + 화면 초기화(리셋) 관련 method

      ```javascript
      renderReset: function(){
          // 화면과 관련된 초기화 공통 함수
          // Grid 초기화
          // Form 초기화
          // Button 초기화  등등
      }
      ```    

**[⬆ back to top](#-)**

## UI Framework 표준 용어

<a href="https://docs.google.com/spreadsheets/d/1As3FuQxsBk1NhkSGz3Aqx-LIgym179aYTd_4_GA_2jE/edit?ts=58e59a32#gid=1054354213" target="_blank">UI Framework 표준 용어</a>

**[⬆ back to top](#-)**
