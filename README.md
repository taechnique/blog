* docs/.vuepress: 전역 구성, 구성 요소, 정적 리소스 등을 저장하는 데 사용됩니다.
* docs/.vuepress/components: 이 디렉터리에 있는 Vue 구성 요소는 자동으로 전역 구성 요소로 등록됩니다.
* docs/.vuepress/theme: 로컬 테마를 저장하기 위해 사용합니다.
* docs/.vuepress/styles: 스타일 관련 파일을 저장합니다.
* docs/.vuepress/styles/index.styl: CSS 파일의 끝부분에 생성된 자동 적용 전역 스타일 파일은 기본 스타일보다 우선순위가 높습니다.
* docs/.vuepress/styles/palette.styl: 팔레트는 기본 색상 상수를 무시하고 스타일러스의 색상 상수를 설정하는 데 사용됩니다.
* docs/.vuepress/public: 정적 리소스 디렉토리.
* docs/.vuepress/templates: HTML 템플릿 파일을 저장합니다.
* docs/.vuepress/templates/dev.html: 개발 환경용 HTML 템플릿 파일입니다.
* docs/.vuepress/templates/ssr.html: 빌드시 Vue SSR 기반 HTML 템플릿 파일.
* docs/.vuepress/config.js: 구성의 항목 파일은 yml또는 도 될 수 있습니다 toml.
* docs/.vuepress/enhanceApp.js: 앱 레벨 향상.