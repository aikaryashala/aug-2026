# Functions and Servers: A Short Book

## How to read this book

This book explains the class of 9 November 2026 in simple words. Every sentence is short. Every idea has one small Python example.

The book has two parts.

- **Part one (Chapters 1 to 4)** is about functions. You will meet `map`, `filter`, `lambda` and `reduce`.
- **Part two (Chapters 5 to 8)** is about servers. You will learn how code is linked, how servers handle many users, and what serverless means.

Read one chapter at a time. Type each example yourself and run it. You can also watch each idea move in the [animated lessons](functions_end_to_end.html).

Every chapter ends with a part called **In the real world**. It shows the same idea inside famous open-source projects on GitHub. Each link opens the exact lines of code. The links point to the code as it was on 10 November 2026.

## Chapter 1. Functions that take functions

A function is a small machine. You give it an input. It gives you an output.

`len` is a function. You give it a word. It gives you the number of letters.

Now comes the big idea. A function is also a value, like a number or a word. So you can give one function to another function.

A function that takes another function as an input is called a **higher-order function**.

```python
def apply(fn, value):
    return fn(value)

print(apply(len, "vizag"))         # 5
print(apply(str.upper, "vizag"))   # VIZAG
```

Look at `apply`. It does not know what work it will do. It waits for you to hand over a function. With `len` it counts letters. With `str.upper` it makes capital letters.

Notice one small thing. We write `len`, not `len()`. With brackets, Python runs the function. Without brackets, Python hands the function over.

This idea is not only for Python. JavaScript, Go and many other languages work the same way.

### In the real world

**Django checks if you are logged in.** Django is a web framework used by many big websites. It has a function called `user_passes_test`. This function takes another function as its input. That input is a test. Django's `login_required` gives it a very small test, written as a lambda:

```python
lambda u: u.is_authenticated,
```

The test asks one question. Is this user logged in? If yes, the page opens. If no, the user is sent to the login page. [See the code in Django](https://github.com/django/django/blob/6a8248f13fe7b51c4414eeaf3554a666464b2636/django/contrib/auth/decorators.py#L74-L85).

**Flask connects a web address to your function.** In Flask you write `@app.route("/")` above a function. Here `route` takes your function and remembers it. When a user opens that address, Flask calls your function. [See the code in Flask](https://github.com/pallets/flask/blob/49943b5a94413a530761350f04e896f76e8d620e/src/flask/sansio/scaffold.py#L344-L371).

**Remember:** a higher-order function takes a function as an input.

## Chapter 2. map, filter and lambda

Python has three built-in tools that take a function. This chapter covers two of them, and a short way to write a function.

### map does the same work on every item

Think of a teacher who gives 5 grace marks to every student. The teacher does the same thing for each one. That is `map`.

```python
marks = [35, 48, 62, 71, 90]

def add_grace(m):
    return m + 5

print(list(map(add_grace, marks)))   # [40, 53, 67, 76, 95]
```

`map` takes each mark, one at a time. It runs `add_grace` on it. Five marks go in. Five marks come out.

We wrap `map` in `list()` so that we can see the values.

### filter keeps only some items

Now the teacher wants only the students who passed. `filter` asks a yes or no question about each item. It keeps the items that get a yes.

```python
marks = [35, 48, 62, 71, 90]

passed = list(filter(lambda m: m >= 50, marks))
print(passed)   # [62, 71, 90]
```

`filter` does not change any mark. It only decides which marks stay.

### lambda is a function without a name

In the last example you saw the word `lambda`. A lambda is a small function written in one line. It has no name. People also call it an **anonymous function**.

These two functions do the same work.

```python
def square(x):
    return x * x

lambda x: x * x
```

Read a lambda like this. The part before the colon is the input. The part after the colon is the answer.

Use a lambda when the function is short and you need it only once. Use `def` when the function is long or you need it again.

### In the real world

**Python builds an IP address with map.** An address like `192.168.1.10` is stored as four numbers. To show it as text, Python's own `ipaddress` module turns each number into a string with `map`. Then it joins them with dots.

```python
return '.'.join(map(str, ip_int.to_bytes(4, 'big')))
```

[See the code in Python](https://github.com/python/cpython/blob/4575fb91eab84ec8ee02b7cad7c38b309006a010/Lib/ipaddress.py#L1295).

**Django uses filter and map together.** One Django command gets a list of folder paths. Some paths may not exist. First `filter` keeps only the paths that are real folders. Then `map` turns each one into a full path. Both happen in one line. [See the code in Django](https://github.com/django/django/blob/6a8248f13fe7b51c4414eeaf3554a666464b2636/django/core/management/commands/compilemessages.py#L103).

**Django uses filter with a lambda.** When you type part of a command and press Tab, Django completes it for you. It uses `filter` with a lambda to keep only the commands that start with the letters you typed. [See the code in Django](https://github.com/django/django/blob/6a8248f13fe7b51c4414eeaf3554a666464b2636/django/core/management/__init__.py#L316).

**Remember:** `map` changes every item. `filter` keeps some items. `lambda` is a short function with no name.

## Chapter 3. reduce and the factorial

`reduce` takes a whole list and turns it into one value. It works step by step.

`reduce` is not built in. It lives in a module called `functools`. So you must import it first.

### How reduce thinks

`reduce` keeps a running answer. We will call it `acc`. At each step it takes the running answer and the next item. It joins them and gets a new running answer.

The factorial of 5 is 1 × 2 × 3 × 4 × 5. The answer is 120. Let us get it with `reduce`.

### With a lambda

```python
from functools import reduce

n = 5
nums = list(range(1, n + 1))    # [1, 2, 3, 4, 5]

fact = reduce(lambda acc, x: acc * x, nums)
print(fact)   # 120
```

Here is what happens inside.

| Step | acc | x | acc \* x |
| --- | --- | --- | --- |
| 1 | 1 | 2 | 2 |
| 2 | 2 | 3 | 6 |
| 3 | 6 | 4 | 24 |
| 4 | 24 | 5 | 120 |

At the start, `reduce` takes the first item as `acc`. Then it goes through the rest of the list. At the end only one value is left.

One small note. `range(1, n + 1)` stops before `n + 1`. So it gives 1 to 5.

### With a named function

Now we do the same thing with `def`.

```python
from functools import reduce

def multiply(acc, x):
    return acc * x

n = 5
nums = list(range(1, n + 1))

print(reduce(multiply, nums))   # 120
```

The answer is the same. Only the function changed. `reduce` does not care how you made the function. It only needs a function that takes two inputs.

### In the real world

**You can read reduce itself.** `reduce` is written in plain Python inside the standard library. It is short. Read it once and you will see the running answer and the loop. [See the code in Python](https://github.com/python/cpython/blob/4575fb91eab84ec8ee02b7cad7c38b309006a010/Lib/functools.py#L237-L262).

**Django joins many conditions into one.** Sometimes Django has a list of small conditions for a database search. It needs one big condition that says "this one OR that one OR that one". It uses `reduce` to join them.

```python
.filter(reduce(operator.or_, filters))
```

In the factorial, `reduce` joined numbers with `*`. Here it joins conditions with OR. The idea is the same. `operator.or_` is a ready-made function from the standard library, like `operator.mul` for `*`. [See the code in Django](https://github.com/django/django/blob/6a8248f13fe7b51c4414eeaf3554a666464b2636/django/db/models/query.py#L976-L981).

**Remember:** `reduce` joins a list into one value, one step at a time.

## Chapter 4. Letters and numbers

A computer does not know letters. It knows only numbers. So every letter has a number. This set of numbers is called **ASCII**.

Python gives you two functions for this.

- `ord` turns a letter into its number.
- `chr` turns a number back into its letter.

A string is a row of letters. So `map` can work on a string too.

```python
word = "Vizag"

codes = list(map(ord, word))
print(codes)   # [86, 105, 122, 97, 103]

back = "".join(map(chr, codes))
print(back)    # Vizag
```

First, `map` runs `ord` on each letter. We get five numbers.

Then `map` runs `chr` on each number. We get five letters. The `join` glues them into one word again.

Look at the numbers. Capital `V` is 86. Small `a` is 97. Capital letters and small letters have different numbers.

### In the real world

**Python hides a poem with chr.** Type `import this` in Python. It prints a short poem called the Zen of Python. Inside the file, the poem is stored with every letter shifted by 13 places. The code that shifts the letters back uses `chr`. It also uses the numbers 65 and 97. Those are the ASCII numbers of capital `A` and small `a`.

```python
d[chr(i+c)] = chr((i+13) % 26 + c)
```

[See the code in Python](https://github.com/python/cpython/blob/4575fb91eab84ec8ee02b7cad7c38b309006a010/Lib/this.py#L23-L28).

**requests reads codes inside web addresses.** A web address can hold a letter as a code. For example, `%41` means `A`. The `requests` library turns such a code back into a letter with `chr`. [See the code in requests](https://github.com/psf/requests/blob/3c7baaa05ab4aa49cc819ce3a819d260de19c157/src/requests/utils.py#L680-L691).

**Remember:** `ord` goes from letter to number. `chr` goes from number to letter.

## Chapter 5. Where functions come from

Part two begins here. We now look at how programs are built and run.

### Three places

Every function you use was written by someone. It can come from three places. This is true in every language.

| Place | Who wrote it | Python example |
| --- | --- | --- |
| Your own code | You | `def area(r):` |
| Standard library | The people who made the language | `import math` |
| Third-party library | Other people | `pip install requests` |

The standard library comes with Python. You do not install it. A third-party library does not come with Python. You must install it first.

### What is a library?

A library is a box of ready-made functions. Your program needs a way to use that box. Joining your program to a library is called **linking**. There are two ways to link.

### Static linking

The library code is copied into your program when the program is built. Think of copying a chapter into your own notebook. Your notebook becomes thicker. But you can now read it anywhere, without the book.

### Dynamic linking

The library stays in its own file. Your program loads it later, while it is running. Think of a library book. You do not copy it. You borrow it when you need it. Many readers can share the same book.

On Windows, such a file is called a **DLL**. DLL means Dynamic Link Library. Each system has its own file type.

| System | File type |
| --- | --- |
| Windows | `.dll` |
| Linux | `.so` (shared object) |
| macOS | `.dylib` |

Python can load such a file while it runs. This small example loads the C library on Linux and uses one function from it.

```python
import ctypes, ctypes.util

path = ctypes.util.find_library("c")
print(path)                          # libc.so.6

libc = ctypes.CDLL(path)
print(libc.strlen(b"karyashala"))    # 10
```

The library was not inside Python. Python loaded it at run time. That is dynamic linking.

### In the real world

**Flask is built on other people's libraries.** Flask is a third-party library. But Flask also uses third-party libraries. Its project file lists them: `werkzeug`, `jinja2`, `click`, `blinker`, `itsdangerous` and `markupsafe`. When you run `pip install flask`, pip installs these too. [See the list in Flask](https://github.com/pallets/flask/blob/49943b5a94413a530761350f04e896f76e8d620e/pyproject.toml#L23-L30).

**python-magic loads a library at run time.** `python-magic` tells you the type of a file. The real work is done by a C library called libmagic. The Python code looks for that library by a different file name on each system.

| System | File name it looks for |
| --- | --- |
| Linux | `libmagic.so.1` |
| macOS | `libmagic.dylib` |
| Windows | names ending in `.dll` |

When it finds the file, it loads it with `ctypes.CDLL`. This is the same call you used in this chapter. It is dynamic linking in a real project. [See the file names](https://github.com/ahupp/python-magic/blob/f7b3f1396bfa46d2d7d1a722b689ed424513c83a/magic/loader.py#L11-L44) and [see the loading](https://github.com/ahupp/python-magic/blob/f7b3f1396bfa46d2d7d1a722b689ed424513c83a/magic/loader.py#L64-L72).

**Remember:** static means copied in at build time. Dynamic means loaded at run time.

## Chapter 6. Too many requests

A server is a computer that answers requests. When you open a website, your phone sends a request. The server sends back an answer.

A server can handle only so many requests at one time. What happens when more requests come? The server becomes slow. Some users wait. Some users get errors.

There are two ways to fix this.

### Vertical scaling: a bigger server

You make the same machine stronger. You give it more CPU and more RAM.

Think of a tea stall with one small stove. You replace it with a big stove. It is the same stall, but it makes more tea.

### Horizontal scaling: more servers

You add more machines. All of them do the same work.

Think of opening three tea stalls in place of one. Each stall is small. Together they serve many people.

```python
def overloaded(requests, servers, capacity):
    return requests > servers * capacity

print(overloaded(10, servers=1, capacity=4))    # True
print(overloaded(10, servers=1, capacity=12))   # False (vertical)
print(overloaded(10, servers=3, capacity=4))    # False (horizontal)
```

Ten requests are too many for one small server. A bigger server can take them. Three small servers can also take them.

### The load balancer

With many servers, a new question comes. Which server should take the next request? A **load balancer** decides this. It stands in front of the servers. Every request reaches it first.

### Round robin

The simplest rule is called **round robin**. The load balancer gives each new request to the next server in line. After the last server, it starts again from the first.

Think of dealing cards. One card to each player, in turn, again and again.

```python
from itertools import cycle

servers = cycle(["S1", "S2", "S3"])

for req in range(1, 7):
    print(f"request {req} -> {next(servers)}")
```

```
request 1 -> S1
request 2 -> S2
request 3 -> S3
request 4 -> S1
request 5 -> S2
request 6 -> S3
```

Every server gets the same number of requests.

### In the real world

**Elastic's Python client picks servers by round robin.** A search system often runs on many servers. The Python client must choose one server for each request. Its `RoundRobinSelector` does this in two lines.

```python
self._thread_local.rr = (getattr(self._thread_local, "rr", -1) + 1) % len(nodes)
```

Read it slowly. It adds 1 to the last position. The `% len(nodes)` part brings the position back to 0 after the last server. That is round robin. [See the code in elastic-transport](https://github.com/elastic/elastic-transport-python/blob/e22d55a473f9c59f612a68e7f7a07a618b32d67c/elastic_transport/_node_pool.py#L86-L95).

**nginx has a whole file for round robin.** nginx is a web server. Many companies use it as a load balancer. It is written in C. One file holds its round robin code. It also lets you give a stronger server a bigger share. [See the code in nginx](https://github.com/nginx/nginx/blob/2a3a19c6fdcdc9bd618b81c4a6d9a80ed67d50da/src/http/ngx_http_upstream_round_robin.c#L697).

**Kubernetes does horizontal scaling by itself.** Kubernetes runs many copies of a program. One part of it is called the Horizontal Pod Autoscaler. It watches the load. Then it works out how many copies are needed and adds or removes copies. In the code, this number is called `desiredReplicas`. It is written in Go. [See the code in Kubernetes](https://github.com/kubernetes/kubernetes/blob/3197813cc57dfb94631f8f20bbb8fc5b5bb4e763/pkg/controller/podautoscaler/horizontal.go#L826).

**Remember:** vertical means a bigger server. Horizontal means more servers, with a load balancer in front.

## Chapter 7. Protecting a server

Sometimes one user sends too many requests. It may be a mistake in their code. It may be an attack. Either way, the server suffers and other users wait.

There are three ways to stop this.

### Throttling: slow down

The server handles the requests slowly, one after another. Nobody is refused. Everybody waits a little.

Think of a tap that is half closed. The water still comes. It just comes slowly.

```python
import time

for req in ["r1", "r2", "r3", "r4"]:
    time.sleep(0.5)            # wait half a second
    print("handled", req)
```

Four requests came together. The server took one every half second.

### Rate limiting: only so many

The server sets a limit. For example, 3 requests in one minute. After that, it says no. The answer it sends is `429`. That number means "too many requests".

Think of a ration shop. Each family gets a fixed amount in a month. After that, they must wait for the next month.

```python
LIMIT = 3
hits = {}

def allow(ip):
    hits[ip] = hits.get(ip, 0) + 1
    return hits[ip] <= LIMIT

for n in range(1, 6):
    status = 200 if allow("10.0.0.7") else 429
    print(f"request {n}: {status}")
```

```
request 1: 200
request 2: 200
request 3: 200
request 4: 429
request 5: 429
```

The first three requests pass. The next two are refused. When the time window ends, the count starts again from zero.

### Temporary IP block: stay out for a while

Every device on the internet has an address. It is called an IP address. If one address crosses the limit, the server can block it for some time. During that time, every request from that address is refused. In class, GitHub was the example of a site that does this.

Think of a player who gets a red card. He must leave the field for some time. Later he can play again.

```python
blocked_until = {}

def is_blocked(ip, now):
    return now < blocked_until.get(ip, 0)

blocked_until["10.0.0.7"] = 63      # blocked until second 63

print(is_blocked("10.0.0.7", 10))   # True
print(is_blocked("10.0.0.7", 70))   # False
```

At second 10 the address is still blocked. At second 70 the block is over.

### The three side by side

| Way | What the server does | What the user feels |
| --- | --- | --- |
| Throttling | Works slowly | I have to wait |
| Rate limiting | Refuses after a limit | I got a 429 error |
| Temporary IP block | Refuses everything for some time | I am shut out for now |

### In the real world

**Scrapy slows itself down.** Scrapy is a Python tool that reads many web pages. If it goes too fast, it can hurt a website. So it has a part called AutoThrottle. After each page, it sets a new waiting time. A slow website gets a longer wait. This is throttling. [See the code in Scrapy](https://github.com/scrapy/scrapy/blob/2aefa609f1a9c82763df4ee3c9506051f145b0b4/scrapy/extensions/throttle.py#L100-L125).

**Django REST framework counts your requests.** This library is used to build APIs. You give it a rate as a short text, like 100 requests a day. It keeps a list of the times of your last requests. If the list is full, it refuses the next request.

```python
if len(self.history) >= self.num_requests:
```

The user then gets the `429` answer. One thing can confuse you. The library calls this "throttling". But it refuses requests, so in the words of this book it is rate limiting. [See the code in Django REST framework](https://github.com/encode/django-rest-framework/blob/9aba6856f6d2174098d5adcf52d0e20a9a16bf56/rest_framework/throttling.py#L97-L141).

**fail2ban blocks an IP address for some time.** fail2ban is a tool written in Python. It protects servers. It reads the server's log files. If one IP address fails too many times, fail2ban blocks it. The default settings are easy to read.

| Setting | Default | Meaning |
| --- | --- | --- |
| `maxretry` | 5 | Failures allowed |
| `findtime` | 10m | Count failures in the last 10 minutes |
| `bantime` | 10m | Block the address for 10 minutes |

[See the settings in fail2ban](https://github.com/fail2ban/fail2ban/blob/d0f70eba16782539e3b97f823d70573c6e4c582b/config/jail.conf#L100-L110).

**Remember:** throttling says wait. Rate limiting says no more. An IP block says stay out for a while.

## Chapter 8. Serverless

Until now, we kept a server running all the time. It runs even at night, when nobody uses it. You must also take care of it.

**Serverless** is a different way. You do not keep a server. You write only a function and give it to a cloud company. The company runs your function when a request comes. When no request comes, nothing of yours is running.

The name is a little funny. There is still a server somewhere. But it is not your job to manage it.

Think of a taxi. You do not buy a car. You do not park it or repair it. You call a taxi only when you need a ride.

### What happens to one request

1. A request comes to the platform.
2. The platform starts your function. The first start takes a little extra time. This is called a **cold start**.
3. Your function runs and sends back the answer.
4. If another request comes soon, the same function is used again. This is faster.
5. When requests stop, the platform removes your function. This is called scaling to zero.

### Who offers it

| Company | Name of the service |
| --- | --- |
| Zoho | Catalyst |
| AWS | Lambda (Bedrock was also mentioned in class) |
| Google Cloud | GCP |
| Microsoft | Azure |

### A small Zoho Catalyst function

This function takes a number and returns its square. It follows the shape that [Zoho's Python guide](https://docs.catalyst.zoho.com/en/sdk/python/v1/setup) shows for an Advanced I/O function. It has not been deployed and tested, so check it on your own Catalyst project.

```python
from flask import Request, make_response, jsonify
import zcatalyst_sdk

def handler(request: Request):
    app = zcatalyst_sdk.initialize()
    n = int(request.args.get("n", 0))
    return make_response(jsonify({"square": n * n}), 200)
```

Look at what is missing. There is no line that starts a server. There is no port number. There is only one function, called `handler`. The platform calls it for you.

Now the two parts of this book meet. Part one was about functions. Part two was about servers. In serverless, your whole backend becomes a function.

### In the real world

**A complete AWS Lambda function in 16 lines.** The Serverless project keeps a set of small examples. One of them is a Python function that tells the current time. The whole backend is one function.

```python
def endpoint(event, context):
```

It builds a message. It returns the status code 200 and the message. There is no server code in the file. Compare it with the Zoho `handler` above. The names are different. The shape is the same. [See the code in serverless/examples](https://github.com/serverless/examples/blob/424fe6f7737bd45aeea4e5b40d7beda3422ffa54/aws-python-simple-http-endpoint/handler.py#L5-L16).

**Zappa moves a whole Flask or Django app to serverless.** Zappa is a Python tool. You give it a normal web app. It packs the app and runs it on AWS Lambda. You do not rewrite the app as small functions. This is close to your class task, but on AWS and not on Zoho. [Read about Zappa](https://github.com/zappa/Zappa/blob/4911143c121b706e9865a58b5c5dba2ae91a251c/README.md).

**Remember:** in serverless, you write the function and the platform runs it only when it is needed.

## Practice

These four tasks were given in class. Try each one without looking at the book first.

- [ ] Make a list from 1 to n. Use `reduce` with `*` to get the factorial. Use a lambda.
- [ ] Do the same factorial again. This time use a named function.
- [ ] Take a string. Turn each letter into its ASCII number and print it. Then turn the numbers back into the string.
- [ ] Take one of your backend functions. Turn it into a serverless function on Zoho.

## Words to remember

| Word | Simple meaning |
| --- | --- |
| Higher-order function | A function that takes another function as an input |
| map | Does the same work on every item of a list |
| filter | Keeps only the items that pass a test |
| reduce | Joins a whole list into one value |
| lambda | A short function with no name |
| ASCII | The number given to each letter |
| Library | A box of ready-made functions |
| Static linking | Library code is copied into the program when it is built |
| Dynamic linking | The program loads the library while it is running |
| DLL | A dynamic library file on Windows |
| Vertical scaling | Making one server bigger |
| Horizontal scaling | Adding more servers |
| Load balancer | The part that shares requests among servers |
| Round robin | Giving each request to the next server in turn |
| Throttling | Handling requests slowly |
| Rate limiting | Allowing only a fixed number of requests in a time window |
| IP block | Refusing one address for some time |
| Serverless | Your code runs as a function, only when a request comes |
| Cold start | The small delay when a function starts for the first time |
