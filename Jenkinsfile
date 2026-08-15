pipeline {
    agent any

    stages {
        // 1. 깃허브에서 프론트엔드 소스 가져오기
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ldj8196/reactWebAppFE.git'
            }
        }

        // 2. 도커 이미지 빌드
        stage('Build with Docker') {
            steps {
                // 이전 이미지나 캐시 충돌 방지용 삭제 (에러 무시)
                sh 'docker rmi -f frontend-build-image || true'
                
                // 도커 이미지 빌드 (Vite 빌드 포함)
                sh 'docker build -f frontend.dockerfile -t frontend-build-image .'
            }
        }

        // 3. 우분투 호스트의 Nginx 폴더로 결과물 즉시 복사
        stage('Deploy to Nginx') {
            steps {
                // 도커 컨테이너를 실행하면서 우분투 호스트의 /var/www/html을 /host/html로 마운트하여 내부에서 복사 후 자동 소멸(--rm)
                sh 'docker run --rm -v /var/www/html:/host/html frontend-build-image sh -c "rm -rf /host/html/* && cp -r /output/. /host/html/"'
                
                // 빌드에 사용된 도커 이미지 정리
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