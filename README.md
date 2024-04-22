# Bookkeeping

## Project setup for local development
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Deploy in Linux
## Initial Setup
Before deployment, ensure you have Docker and Git environments set up, then execute the commands below.
```
git clone https://github.com/JP1222/Bookkeeping-Vue.git
cd Bookkeeping
docker compose up -d
```
## Update
```
chmod +x ./update_project.sh
./update_project.sh
```

## Ports Configuration
- Web port for frontend is 8081
- Backend service port is 8083



