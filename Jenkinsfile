#!groovy

node {

       stage('Checkout'){
          checkout scm
       }

       stage('Build UI') {
       node {
            withEnv(["PATH+NODE=${tool name: 'node-7.9.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
                sh 'node -v'
                sh 'npm install'
            }
        }

       }

       stage('Build Server'){
            sh 'make build-server'
       }

}

