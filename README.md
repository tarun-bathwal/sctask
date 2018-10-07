# SCTASK 

## Installation

### Requirements
* Node.JS 8.0 and up

### Setup
* git clone https://github.com/tarun-bathwal/sctask.git
* cd sctask
* npm install
* npm test ( to run the test files, also shows code coverage courtesy istanbul.js)
* npm start 
* Base url : http://localhost:3000/

## APIs

### POST /login
* 'username' and 'password' are two string type required json payloads
* On success, it returns an object containing jwt token which should be sent along with other protected routes.


### POST /apply_patch
* Payload contains 'doc' is a json while 'patch' is an array of objects.
* Set 'Authorization' Header as "Bearer token" where token is the same as obtained as payload after logging in. Token expires in 24hours.
* This applies the patch to the doc to give back the patched json.
```
# PAYLOAD
{ 
"doc" : {
  "baz": "qux",
  "foo": "bar"
},
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]
}

# OUTPUT
{
    "success": true,
    "message": "successfully patched the json object",
    "patcheddoc": {
        "baz": "boo",
        "hello": [
            "world"
        ]
    }
}
```

### POST /thumbnail
* Payload contains 'url' as a string which is the public url of the image to be downloaded.
* Set 'Authorization' Header as "Bearer token" where token is the same as obtained as payload after logging in. Token expires in 24hours.
* The image at url is resized to 50*50 pixels and sent back as response.

### http://localhost:3000/api-docs
* swagger-ui for interactive documentation is available at this address.



<!-- ## Development
```
$ virtualenv foobar
$ . foobar/bin/activate
$ pip install -e .
``` -->
