# Load Testing

### Install
```bash
sudo apt install apache2-utils                               
```

```bash
pnpm run loadtesting
```

## Variables
change this in `package.json`

### `-n 100`: total 100 requests
### `-c 10`: 10 concurrent users
### `-p`: POST data file
### `-T`: Content-Type header