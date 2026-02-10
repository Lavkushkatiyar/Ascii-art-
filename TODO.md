# broad plan

simple wants to create an ascii version of image

# TODO

```
[] get An image [JPG.format]
[] convert that image into pixels 
[] read those pixels 
[] get the idea of height and width of the image
```

# change in plan

```
i will use the ppm format image to perform this first

1.get a ppm image [done]
2. read it using the deno readFile[done]

3 . now i have to parse it 
1 header [done]
```

- ppm parser
- 1 version p6
- whitespace

- 2 . width
- whitespace
- 3 ,height
- whitespace

- 4 . max color value
- whitespace

```
2 . rest data of file
[done] print one row
[done] print whole the image
[done] for now i will use only # and .
```
