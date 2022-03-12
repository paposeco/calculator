# Calculator implementation for the Odin Project

[Live Demo](https://paposeco.github.io/calculator/)

This is a simplified calculator that only operates on two operands at a time.

## Features

- The user can use either a mouse or a keyboard, except for the negate option, which is only available with a mouse (I fought against this for a bit, until I realized that on Windows and Linux this is also the case).
- It's possible to use the backspace if the user makes a mistake. And it's also possible to switch the operator before entering the second operand.
- There's a clear button, which also gets triggered on DEL, that clears the calculator completely.
- The largest number one can use as an operand is 9999999999999999 and the smallest 0.00000000000001.

## Notes

As suggested on this exercise, I started by creating a calculator that worked with the mouse only. The keyboard support works by matching a specific key to a button. Since the buttons change the value of the input, I could disable the input and not have to worry about the user writing letters instead of numbers.

There was also an issue when switching between using keyboard and mouse. If the user clicked on a button, the button remained in focus after changing the input, and if the user switched to using a keyboard afterwards and pressed "Enter", the button in focus would be used instead of the previous keyboard input. I worked around it using the blur() method, but I worry that it is now an accessibility issue.
