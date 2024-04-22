/**
 * 该文件仅用于存放测试codemirror代码高亮效果的代码
 */

const htmlCode = `

`

const markdownCode = `
~~删除线~~
*斜体字*      _斜体字_
**粗体**  __粗体__
***粗斜体*** ___粗斜体___

执行命令：\`npm install marked\`

<h1>Hello world!</h1>

[普通链接带标题](http://localhost/ "普通链接带标题")
[![](https://pandao.github.io/editor.md/examples/images/7.jpg)]

* 列表一
* 列表二
  * 列表一

1. 第一行
2. 第二行
  1. 第一行

| Item      | Value |
| --------- | -----:|
| Computer  | $1600 |
| Phone     |   $12 |
| Pipe      |    $1 |

- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and <del>tags</del> supported :editormd-logo:;
- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;
    - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;
    - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);

### 科学公式 TeX(KaTeX)
                    
$$E=mc^2$$

行内的公式$$E=mc^2$$行内的公式，行内的$$E=mc^2$$公式。
`

const sassCode = `
$is-dark: true;
body {
  @if $is-dark {
    background-color: black;
  } @else {
    background-color: white;
  }
}
$base-color: #333;
.dark-text {
  color: darken($base-color, 10%);
}
.light-text {
  color: lighten($base-color, 20%);
}
%ir {
  padding: 0;
  /* ... */
}
button {
  @extend %ir;
  font-size: 1rem;
}
@function em($px) {  
  @return $px / 16 * 1em;  
}  
h1 {  
  font-size: em(32); // 等同于 font-size: 2em;  
}
`

const lessCode = `
@width: 10px;
#header {
  width: @width;
}
.bordered {
  border-top: dotted 1px black;
}
#menu a {
  .bordered();
}
.clearfix {
  zoom: 1;
  &:after {
    content: " ";
    display: block;
  }
}
.component {
  @media (min-width: 768px) and (min-resolution: 192dpi) {
    background-image: url(/img/retina2x.png);
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
@base: #f04615;
@width: 0.5;
.class {
  width: percentage(@width); // 返回 50%
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
`

const stylusCode = `
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments
body
  font: 12px Helvetica, Arial, sans-serif
a.button
  border-radius: 5px

fonts = Helvetica, Arial, sans-serif
body {
  padding: 50px;
  font: 14px/1.4 fonts;
}
border_and_bg(border_on, border_color, bg_on, bg_color)
  if border_on == true
    border 1px solid border_color
  else
    border 0
  if bg_on == true
    background-color bg_color
  else
    background-color transparent

function-name(parameter)
  dosomething + parameter /somethingelse

.callem
  border_and_bg true #000 false #fff
  font-size function-name(6)

@mixin border_and_bg( $border_on, $border_color, $bg_on, $bg_color ){
  @if $border_on == true {
    border: 1px solid $border_color;
  } @else {
    border: 0;
  }
  @if $bg_on == true {
    background-color: 1px solid $bg_color;
  } @else {
    background-color: transparent;
  }
}
@function function-name($parameter) {
  @return $dosomething + $parameter / $somethingelse;
}
.callem {
  @include border_and_bg(true, #000, true, #fff);
  font-size: function-name( 6 );
}
`

const typeScriptCode = `
type num = 1;
type str = 'hello world';
type IsNumber<N> = N extends number ? 'yes, is a number' : 'no, not a number';
type result1 = IsNumber<num>; // "yes, is a number"
type result2 = IsNumber<str>; // "no, not a number"
type ReplaceValByOwnKey<T, S extends any> = { [P in keyof T]: S[P] };
type ShiftAction<T extends any[]> = ((...args: T) => any) extends ((arg1: any, ...rest: infer R) => any) ? R : never;
declare type str = string;
declare interface Foo {
  propA: string;
  propB: number;
}
function Foo<T> () {
  return function(param: T) {
    return param;
  }
}
`

const coffeeScriptCode = `
# 赋值:
number   = 42
opposite = true

# 条件:
number = -42 if opposite

# 函数:
square = (x) -> x * x

# 数组:
list = [1, 2, 3, 4, 5]

# 对象:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# 存在性:
alert "I knew it!" if elvis?

# 数组 推导(comprehensions):
cubes = (math.cube num for num in list)
`

const jsxCode = `
const name = 'Josh Perez';
const style = {
  fontSize: 100,
  color: '#FF0000'
}
const element = <h1 style={ style }>Hello, { name }</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
`