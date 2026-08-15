pipeline {
    agent any

    stages {
        // 1. 깃허브에서 프론트엔드 소스 가져오기
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ldj8196/reactWebAppFE.git'
            }
        }

        // 2. 도커를 이용해 격리된 환경에서 빌드 후 임시 컨테이너 생성
        stage('Build with Docker') {
            steps {
                // -f 옵션으로 커스텀한 Dockerfile 파일명을 지정해 줍니다!
                sh 'docker build -f frontend.dockerfile -t frontend-build-image .'
                // 빌드 결과물을 꺼내기 위한 일회용 임시 컨테이너 생성
                sh 'docker create --name temp-frontend-container frontend-build-image'
            }
        }

        // 3. 우분투 호스트의 Nginx 폴더로 빌드 결과물 쏙 빼오기
        stage('Deploy to Nginx') {
            steps {
                // 기존 Nginx 폴더 싹 비우기
                sh 'sudo rm -rf /var/www/html/*'
                // 임시 컨테이너 안에 있는 결과물(/output/.)을 우분투 호스트의 /var/www/html로 복사
                sh 'docker cp temp-frontend-container:/output/. /var/www/html/'
                
                // 사용이 끝난 임시 컨테이너와 빌드 이미지 깔끔하게 삭제 (정리)
                sh 'docker rm temp-frontend-container'
                sh 'docker rmi frontend-build-image'
            }
        }
    }

    post {
        success {
            echo '🎉 프론트엔드 무중단 배포 성공!'
        }
        failure {
            echo '❌ 프론트엔드 배포 실패... 로그를 확인하세요.'
        }
    }
}