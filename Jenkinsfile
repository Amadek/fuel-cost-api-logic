pipeline {
  agent {
    docker {
      image 'node:lts-alpine'
    }
  }
  stages {
    stage('Build') {
      steps {
        dir('api-logic') {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        dir('api-logic') {
          sh 'npm test'
        }
      }
    }
  }
}
