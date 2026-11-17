# A Small Book of Recursion

Nov 17, 2026 · @Rohini

## How to use this book

This book explains recursion in simple English, for a student who knows a little programming. It has seven short chapters. Read them in order.

Every chapter goes with one lesson in the [Recursion Workbench](recursion_workbench.html). Read the chapter, then open the lesson and press Play. The lesson shows the same idea moving, one step at a time.

| Chapter | Idea | Lesson to open |
| --- | --- | --- |
| 1 | A function that calls itself | [Calls itself](recursion_workbench.html#calls-itself) |
| 2 | The call stack | [Calls itself](recursion_workbench.html#calls-itself), with the base case removed |
| 3 | One rule at every size | [Grow a tree](recursion_workbench.html#fractal-tree) |
| 4 | Trees as data | [Walk a binary tree](recursion_workbench.html#tree-walk) |
| 5 | Folders and files | [Folders and files](recursion_workbench.html#folders) |
| 6 | The DOM of a web page | [Walk the DOM](recursion_workbench.html#dom-walk) |

The code in this book is JavaScript, the same code the lessons run. Each chapter ends with a part called **In real code**. It links to an open-source project that uses the same data structure, so you can see that these small examples are the real thing.

## Chapter 1. A function that calls itself

Recursion means a function solves a small part of a problem and asks itself to solve the rest. See it move in the lesson [Calls itself](recursion_workbench.html#calls-itself).

### The example: factorial

factorial(4) means 4 × 3 × 2 × 1, which is 24. Look at it in a different way: factorial(4) is 4 × factorial(3). The big problem holds a smaller copy of the same problem.

```js
function factorial(n) {
  if (n === 1) return 1;          // base case
  const rest = factorial(n - 1);  // ask for the rest
  return n * rest;                // do one small part
}
```

### Two parts, always

Every recursive function has two parts.

- **Base case.** The smallest problem. The function answers it directly and does not call itself. Here: when n is 1, the answer is 1.
- **Recursive case.** The function calls itself on a smaller problem. Here: n − 1 is smaller than n, so each call moves one step closer to 1.

### What happens, step by step

| Call | What it does | What it answers |
| --- | --- | --- |
| factorial(4) | asks factorial(3), then waits | 4 × 6 = 24 |
| factorial(3) | asks factorial(2), then waits | 3 × 2 = 6 |
| factorial(2) | asks factorial(1), then waits | 2 × 1 = 2 |
| factorial(1) | base case, no more calls | 1 |

Read the table down to see the calls going in. Read the last column up to see the answers coming back. factorial(n) makes n calls.

### Try it in the lesson

- Each box is one call. Each box has its own n.
- Change n from 2 to 6. Count the boxes. There are always n of them.
- Watch the note under the picture. It says in words what the running line is doing.

## Chapter 2. The call stack

The call stack is the list of calls that have started and not yet finished. It is the data structure that makes recursion work. Watch it in the right-hand column of the lesson [Calls itself](recursion_workbench.html#calls-itself).

### Frames

When a function is called, the computer makes a **frame** for it. A frame is a small box of memory. It holds the values of that one call: its n, its rest, and the line it has reached.

A new frame goes on top of the stack. When a call returns, its frame is taken off the top. Think of a pile of plates: you add to the top and you take from the top.

### The stack at the deepest point of factorial(4)

| Position | Frame | Its own n | State |
| --- | --- | --- | --- |
| top | factorial(1) | 1 | running now |
|  | factorial(2) | 2 | waiting |
|  | factorial(3) | 3 | waiting |
| bottom | factorial(4) | 4 | waiting |

Four frames, four different values of n. The calls do not mix up their values, because each one has its own frame.

### Going in and coming out

- **Going in:** every call adds a frame. The stack grows.
- **Coming out:** the top call returns its answer to the call under it. The stack shrinks. This is called unwinding.

The multiplications happen on the way out. factorial(4) cannot multiply until factorial(3) has answered.

### Stack overflow

The stack has a limit. If the base case is missing, n goes 4, 3, 2, 1, 0, −1 and never stops. Each call adds a frame and no call ever returns. When the stack is full, the program stops with an error.

In the lesson, set **Base case** to **Removed** and press Play. The lesson stops at 9 frames so that you can see it. A real JavaScript engine allows many thousands of frames and then stops with "RangeError: Maximum call stack size exceeded".

### In real code

Every language has this stack and this limit. Python counts the frames and stops early on purpose. Its limit is usually 1000 calls deep, and the error is called RecursionError. You can read and change the limit with two functions described in the Python documentation: [sys.setrecursionlimit](https://docs.python.org/3/library/sys.html#sys.setrecursionlimit).

So a missing base case gives the same result in every language: the stack fills up and the program stops.

## Chapter 3. One rule at every size

A recursive function can make a large, complex shape from one small rule. Watch a tree grow in the lesson [Grow a tree](recursion_workbench.html#fractal-tree).

### The example: a tree made of smaller trees

Look at a tree. A tree is one branch with smaller trees on its tip. Each smaller tree is again one branch with smaller trees on its tip. The rule is the same at every size.

```js
function grow(length, depth) {
  drawBranch(length);
  if (depth === 0) return;          // a twig: stop
  for (const turn of [-25, 25]) {   // left, then right
    grow(length * 0.7, depth - 1);  // a smaller tree
  }
}
```

- **Base case:** depth is 0. Draw a twig and stop.
- **Recursive case:** grow two smaller trees. Each is 0.7 times as long, and its depth is one less.

### Trust the smaller call

grow does not know about the whole tree. It draws one branch. It trusts that the smaller calls will draw the rest correctly. This trust is the main habit of recursive thinking: do your own small part, and believe that the same function handles the smaller problem.

### One call makes many calls

factorial made one call inside itself. grow makes two, or three. So the calls spread out like the tree itself.

| Depth | Calls with 2 branches | Calls with 3 branches | Deepest stack |
| --- | --- | --- | --- |
| 1 | 3 | 4 | 2 |
| 2 | 7 | 13 | 3 |
| 3 | 15 | 40 | 4 |
| 4 | 31 | 121 | 5 |
| 5 | 63 | 364 | 6 |
| 6 | 127 | 1093 | 7 |

Two things to notice.

- **The number of calls grows fast.** One more level about doubles the work with 2 branches, and about triples it with 3.
- **The stack stays small.** It is never deeper than depth + 1. Only one path from the trunk to a twig is alive at one time. When a branch is finished, its frame is gone.

### Try it in the lesson

- Play depth 4 slowly. See the function finish the whole left side before it starts the right side.
- Run to the end, then drag the Turn slider. The whole tree changes, from one rule.
- Choose 3 branches and depth 6. More than a thousand calls, and still only 7 frames on the stack.

### In real code

Python comes with a small drawing demo that makes the same kind of tree: [turtledemo/tree.py](https://sources.debian.org/src/python3.14/3.14.3-1/Lib/turtledemo/tree.py). Its function `tree` calls itself with a shorter branch each time, `l*f`, where f is the shortening factor.

Compare its base case with ours. We stop when depth is 0. It stops when the branch is too short: it only continues `if l > 3`. Both are the same idea. Something gets smaller on every call, and a test on that thing ends the recursion.

## Chapter 4. Trees as data

A tree data structure is recursive by its own shape, so a recursive function fits it exactly. Watch one being walked in the lesson [Walk a binary tree](recursion_workbench.html#tree-walk).

### The data structure: a binary tree

A binary tree is made of nodes. Each node holds three things: a value, a left side and a right side. Each side is either another node or nothing (null).

```js
const tree = {
  value: 8,
  left:  { value: 4,  left: { value: 2,  left: null, right: null },
                      right: { value: 6,  left: null, right: null } },
  right: { value: 12, left: { value: 10, left: null, right: null },
                      right: { value: 14, left: null, right: null } }
};
```

Now see the important thing. The left side of a node is itself a tree. The right side is itself a tree. A tree is defined using smaller trees. Data with this shape is called a recursive data structure.

### The walk

To visit every node, deal with one node and call the same function on each side.

```js
function visit(node) {
  if (node === null) return;   // base case: an empty side
  visit(node.left);
  print(node.value);
  visit(node.right);
}
```

- **Base case:** the side is empty (null). There is nothing to do. Go back.
- **Recursive case:** walk the left tree, then walk the right tree.

### Three orders

The walk always goes left first, then right. Only the place of the print line changes. Here is the output for the tree above.

| Name | Where the print line is | Output |
| --- | --- | --- |
| Pre-order | before both sides | 8 4 2 6 12 10 14 |
| In-order | between the sides | 2 4 6 8 10 12 14 |
| Post-order | after both sides | 2 6 4 10 14 12 8 |

- **Pre-order** prints a parent before its children. Use it to copy a tree.
- **In-order** prints the values sorted, when the tree is a search tree. In a search tree, smaller values are on the left and bigger values are on the right.
- **Post-order** prints children before their parent. Use it when the children must be finished first, for example when deleting.

### Counting

The tree has 7 nodes. visit runs once on each node, and once on each empty side. There are 8 empty sides. So there are 15 calls. Each node is handled exactly one time.

The deepest stack is the height of the tree plus one. For this tree that is 4 frames: 8, then 4, then 2, then null.

### Shape matters

In the lesson, choose the **Lopsided** tree. Its 5 nodes are in one line, so the stack goes 6 frames deep. A balanced tree is short and wide, so its stack stays small. A balanced tree with a million nodes is only about 20 levels tall.

### In real code

The Go language tour uses the same data structure. Its type has three fields with the same meaning as ours: [tree.go in the Go tour](https://go.googlesource.com/tour/+/refs/tags/v0.1.0/tree/tree.go).

```go
type Tree struct {
    Left  *Tree
    Value int
    Right *Tree
}
```

In that file, `insert` and `String` are both recursive. `insert` has the same base case as our walk: when the tree is nil, it makes a new node and returns.

A Go conference talk walks this tree with an in-order function named Walk: [tree-walk.go](https://go.googlesource.com/talks/+/7426e6461029fb2f2fec878911ca8cca745dd7af/content/2014/go4gophers/tree-walk.go). It goes left, prints the value, then goes right. One small difference: it checks that a side is not nil before the call, and we check for null at the start of the call. Both ways work.

## Chapter 5. Folders and files

The folders on your computer are a tree, and any question about a whole folder is answered by recursion. Watch it in the lesson [Folders and files](recursion_workbench.html#folders).

### The data structure: a file tree

A folder holds files and more folders. A file holds no other items. So a file is a leaf of the tree, and a folder is a node with any number of children. A binary tree node had two sides. A folder can have zero, one or many children.

```text
project/
  index.html        4 KB
  README.md         2 KB
  src/
    app.js         12 KB
    utils.js        6 KB
    components/
      Button.js     3 KB
      Card.js       5 KB
  assets/
    logo.png       48 KB
    fonts/          (empty)
  notes/
    todo.txt        1 KB
```

### Job 1: the size of a folder

The size of a folder is the size of everything inside it. Some of those things are folders, so we ask the same question again.

```js
function sizeOf(item) {
  if (item.isFile) return item.size;   // base case
  let total = 0;
  for (const child of item.children) {
    total += sizeOf(child);
  }
  return total;
}
```

- **Base case:** a file. It answers with its own size.
- **Recursive case:** a folder. It asks each child and adds up the answers.

This pattern has a short name: **the leaf answers, the parent combines.**

| Folder | What it adds | Answer |
| --- | --- | --- |
| components | 3 + 5 | 8 KB |
| src | 12 + 6 + 8 | 26 KB |
| fonts | nothing | 0 KB |
| assets | 48 + 0 | 48 KB |
| notes | 1 | 1 KB |
| project | 4 + 2 + 26 + 48 + 1 | 81 KB |

There are 14 items, so sizeOf runs 14 times. The deepest stack is 4 frames: project, src, components, Card.js.

Look at the empty folder fonts. It needs no special rule. Its loop runs zero times and it answers 0.

### Job 2: find a file, and stop early

Sometimes you do not need to visit everything. To find a file by name, stop when you have it.

```js
function find(item, name) {
  if (item.name === name) return item.path;
  if (item.isFile) return null;        // base case
  for (const child of item.children) {
    const found = find(child, name);
    if (found) return found;           // stop early
  }
  return null;
}
```

The line `if (found) return found;` does the stopping. A folder gets a path back from a child. It leaves its own loop at once and gives the same path to the folder above it. One answer travels up the whole stack.

| Looking for | Items opened, out of 14 | Why |
| --- | --- | --- |
| index.html | 2 | it is the first thing in project |
| Card.js | 9 | it is three folders deep |
| missing.txt | 14 | it is not there, so everything is checked |

### In real code

Go's standard library walks real folders the same way. The function is named walkDir, and its own comment says that it recursively descends the path: [io/fs/walk.go](https://golang.google.cn/src/io/fs/walk.go).

It has the same shape as our code. Each entry in a directory can say whether it is a directory. For a directory, walkDir reads the entries inside it and calls itself for each one. Your own function, which walkDir calls for every entry, can also return a special value to stop the walk early, like our find.

## Chapter 6. The DOM of a web page

A web page inside the browser is a tree, and code that reads the whole page walks that tree with recursion. Watch it in the lesson [Walk the DOM](recursion_workbench.html#dom-walk).

### From HTML text to a tree

HTML is text. The browser reads the text once and builds a tree from it. This tree is called the DOM, the Document Object Model. After that, the browser and your JavaScript work with the tree, not with the text.

```html
<body>
  <header>
    <h1>Recursion</h1>
    <nav> <a>Home</a> <a>Lessons</a> </nav>
  </header>
  <main>
    <p>A function that <em>calls itself</em>.</p>
    <ul> <li>Base case</li> <li>Smaller step</li> </ul>
  </main>
</body>
```

### The data structure: nodes with child nodes

The DOM has two kinds of node that matter here.

- **Element node.** A tag such as body, p or li. It has a list of children called childNodes. The children can be elements or text.
- **Text node.** The words between the tags, such as "Home". It has no children. It is a leaf.

Compare with Chapter 5. An element is like a folder. A text node is like a file. childNodes is like the list of children of a folder.

The page above gives 12 element nodes and 8 text nodes: 20 nodes in all. The lesson leaves out text nodes that hold only spaces and line breaks, to keep the picture small. A real browser keeps them.

### One shape of function, three questions

```js
function countElements(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return 0;  // base case: text
  let count = 1;                                      // this element
  for (const child of node.childNodes) {
    count += countElements(child);
  }
  return count;
}
```

This is the folder function again. Only the combining step is different. Change that step and you answer a different question.

| Question | A text node answers | An element combines | Answer for the page above |
| --- | --- | --- | --- |
| How many elements? | 0 | 1 + the sum of its children | 12 |
| How deep is the nesting? | 0 | 1 + the biggest of its children | 4 |
| What is the text? | its own text | its children's text joined in order | RecursionHomeLessons… |

Each function runs once on every node: 20 calls. The deepest stack is 5 frames: body, header, nav, a, and the text "Home".

### Try it on a real page

countElements is real code. Open any website, open the browser's developer console, paste the function, and run `countElements(document.body)`.

For the text question you do not need to write the walk. The browser has it built in: `node.textContent`.

### In real code

The library [domutils](https://github.com/fb55/domutils) works on a DOM-like tree outside the browser. Its tree comes from the HTML parser htmlparser2, and the same tree is used by cheerio. Read its text function here: [stringify.js](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/node_modules/domutils/lib/esm/stringify.js).

Its function `textContent` has the same shape as our text walk. If the node has children, it calls textContent on the children. If the node is text, it returns `node.data`. For anything else it returns an empty string. The names differ a little (children in place of childNodes), and the idea is the same.

## Chapter 7. The whole pattern on one page

All five lessons use one pattern: answer the smallest case directly, and for anything bigger, ask the same function about the smaller parts.

| Lesson | Data structure | Base case | Recursive case | Calls made | Deepest stack |
| --- | --- | --- | --- | --- | --- |
| [Calls itself](recursion_workbench.html#calls-itself) | a number counting down | n is 1 | n × factorial(n − 1) | n | n |
| [Grow a tree](recursion_workbench.html#fractal-tree) | none, the calls make the shape | depth is 0 | grow 2 or 3 smaller trees | 31 at depth 4 | depth + 1 |
| [Walk a binary tree](recursion_workbench.html#tree-walk) | node with left and right | node is null | visit left, visit right | 15 for 7 nodes | height + 1 |
| [Folders and files](recursion_workbench.html#folders) | folder with a list of children | item is a file | add up the children | 14 for 14 items | 4 |
| [Walk the DOM](recursion_workbench.html#dom-walk) | element with childNodes | node is text | combine the children | 20 for 20 nodes | 5 |

### How to write a recursive function

Every recursive function is written in three steps.

1. **Base case.** Find the smallest problem, the one with nothing inside it. Return its answer directly.
2. **Break the problem into sub-problems.** Each sub-problem must be smaller than the problem you started with. Two common ways: make the problem smaller by 1, or split it into parts, such as two halves.
3. **Join the answers.** Take the answers of the sub-problems, join them into one answer, and return it.

Here are the three steps in each lesson.

| Lesson | 1. Base case | 2. Sub-problems | 3. Join |
| --- | --- | --- | --- |
| factorial | n is 1, answer 1 | one sub-problem, smaller by 1: factorial(n − 1) | multiply by n |
| Grow a tree | depth is 0, stop | 2 or 3 smaller trees, depth smaller by 1 | nothing to join, the drawing is the result |
| Binary tree | node is null, go back | the left tree and the right tree, about half each when the tree is balanced | put the node's value before, between or after them |
| Folder size | a file, answer its size | one sub-problem for each child | add |
| DOM | a text node | one sub-problem for each child node | add, take the biggest, or join the text |

Step 2 fits a recursive data structure with no extra work. The data is already broken into sub-problems for you: a tree gives you its left and right sides, a folder gives you its children, an element gives you its childNodes. This is why recursion is the natural tool for trees, folders and the DOM.

### Assume the sub-problems are solved

While you write step 3, assume that the answers of the sub-problems are already there and are correct. You do not need to follow every level in your head. Once all the levels have run, the full answer will be there.

This assumption is safe when two things are true. The base case is correct. And every sub-problem is smaller, so every chain of calls reaches the base case. Use the same two checks to read a recursive function that someone else wrote.

### When a loop is better

- **Use a loop** when the data is a plain line of items, as in factorial. A loop needs no stack.
- **Use recursion** when the data is nested: trees, folders, the DOM, JSON, comment threads, menus.
- **Take care with very deep data.** Each level uses one frame, and the stack has a limit (Chapter 2). A tree that is thousands of levels deep can overflow it. Programs that must handle such data keep their own stack in a list and use a loop.

## Words used in this book

| Word | Meaning |
| --- | --- |
| Recursion | A function calling itself to solve a smaller copy of the same problem |
| Base case | The smallest problem, answered directly with no further call |
| Recursive case | The part where the function calls itself on something smaller |
| Call stack | The list of calls that have started and not yet finished |
| Frame | The memory of one call: its own values and the line it has reached |
| Unwinding | Calls returning one after another, so the stack shrinks |
| Stack overflow | The error when the stack is full, usually from a missing base case |
| Tree | Data made of nodes, where each node can hold more nodes |
| Node | One item in a tree |
| Root | The top node, where a walk starts |
| Leaf | A node with nothing under it |
| Child, parent | A node directly under another node, and the node above it |
| Depth, height | How many levels down a node is, and how many levels the whole tree has |
| Traversal, walk | Visiting every node of a tree once |
| Pre-order, in-order, post-order | Handling a node before, between or after its two sides |
| DOM | The tree of nodes a browser builds from HTML text |
| Element node, text node | A tag in the DOM, and the words between tags |

## Sources

The open-source code linked in the chapters:

- Python documentation, the recursion limit: [sys.setrecursionlimit](https://docs.python.org/3/library/sys.html#sys.setrecursionlimit)
- Python, recursive tree drawing: [turtledemo/tree.py](https://sources.debian.org/src/python3.14/3.14.3-1/Lib/turtledemo/tree.py)
- Go tour, binary tree type: [tree/tree.go](https://go.googlesource.com/tour/+/refs/tags/v0.1.0/tree/tree.go)
- Go talk, in-order walk: [tree-walk.go](https://go.googlesource.com/talks/+/7426e6461029fb2f2fec878911ca8cca745dd7af/content/2014/go4gophers/tree-walk.go)
- Go standard library, directory walk: [io/fs/walk.go](https://golang.google.cn/src/io/fs/walk.go)
- domutils, text of a DOM tree: [project page](https://github.com/fb55/domutils) and [stringify.js](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/node_modules/domutils/lib/esm/stringify.js)
