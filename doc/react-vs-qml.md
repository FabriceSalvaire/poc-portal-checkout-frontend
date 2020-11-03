# React / Material UI versus Qt QML

* Both QML and React code becomes cumbersome to maintain when we have a lot of nested items, we must
  split the code in components.

## Qt QML pro

* Qt framework don't require third party libraries to do the job
* QML binding
* We can easily set (margin, padding, ...) for QML Item
* We can easily anchor a QML Item to another one

## Qt QML cons

* styling / theming is the weak point

# React cons

* JSX in Emacs is painful will editing: on the fly linting, indentation ...

# Material UI cons

* negative margin in Grid
* override default theme is not so easy
