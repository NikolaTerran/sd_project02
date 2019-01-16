import urllib.request
import urllib.error
import json

def random_word():
    # TODO: SUBSCRIBE TO THE API!!!
    try:
        with open("rapidapikey") as f:
            key = str(f.read().strip())
    except FileNotFoundError:
        return "API_KEY_MISSING"
    URL = "https://wordsapiv1.p.rapidapi.com/words/?random=true"
    key_head = {"X-RapidAPI-Key": key};
    req = urllib.request.Request(URL, headers=key_head)
    try:
        resp = urllib.request.urlopen(req)
        return json_load(resp)
    except urllib.error.HTTPError as e:
        return e

print(random_word())
