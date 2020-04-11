pipeline {
  stages {
    stage('Test') {
      agent {
        docker {
          dockerfile true
          dir 'api-logic'
          args '-e NODE_ENV=testing'
        }
      }
    }
  }
}