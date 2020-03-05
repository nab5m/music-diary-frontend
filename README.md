# 노래 일기

코인 노래방에 가는 것을 좋아해서 시작하게된 프로젝트.<br/>
먼저 오늘 자기가 노래방에서 불렀던 노래를 버튼 하나로 추가한다. 사용자는
해당 기록을 바탕으로 자신만의 노래 일기를 작성할 수 있다.<br/>
1. 카카오 로그인 api를 활용한 sns형식의 어플리케이션
2. 목록을 관리함으로써 선곡에 도움이 될 수 있다.<br/>
=> 오늘 부를만한 노래를 추천하는 것까지 바라볼 수 있다.
3. playStore 출시를 목표로 한다.

프론트엔드 : react.js<br/>
백엔드 : django<br/><br/>
Demo: [AWS EC2에 업로드한 노래일기](http://ec2-15-165-171-10.ap-northeast-2.compute.amazonaws.com/)<br/><br/>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 디버깅 과정
1. Constants.js에서 DEBUG = true로 수정
2. django 서버 로컬에서 실행(DEBUG = True)
3. 실험 코드 넣어서 확인

## 빌드 과정
1. Constants.js에서 DEBUG = false로 수정
2. Windows cmd: call build.bat
