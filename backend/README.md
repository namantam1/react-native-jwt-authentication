Backend code for `AuthApp` using Django, DRF and Simple JWT.

## Usage

1. Move to backend directory and create virtual environment(Option).
```bash
cd backend

# Optional
virtualenv .venv
source .venv/bin/activate # for linux/macos
source .venv/bin/activate # for windows using git bash
```
2. Install dependencies and setup data.
```bash
pip install -r requirements.txt

# run migrations to create database tables.
./manage.py migrate

# setup dummy users
./manage.py loaddata users.json
```
3. Run local server.
```bash
# 5. run local server
# running on system IP to be accessible from remote device
./manage.py runserver 0.0.0.0:8000
```

### Default Credentials
**username**: `admin`
**password**: `password`
