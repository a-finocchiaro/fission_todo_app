# Typescript Todo App for Fission

This is a small Todo example application with a Mongo DB database meant to be deployed on [Fission](https://fission.io/) in Kubernetes.

## Requirements

- Node 16.15.1 (I use asdf so I have included a `.tool-versions` file)

## Local setup

Install dependencies
```
npm i
```

Build source code
```
npm run build
```

Deploy to Fission
```
fisssion spec apply
```
