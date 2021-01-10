# learn-word-app

## Initial setup
```
virtualenv --python=python3.9 venv
. /venv/bin/activate
pip install -r requirenments.txt
npm install
```

## To develop fronted
```
cd frontend
ng build --watch --base-href=../static
cd ..
python app.py
```
or just

```
cd frontend
ng serve
````
