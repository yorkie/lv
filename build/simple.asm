section .text

global main

main:

  push ebp 



  ; system call: write
  push dword helloStr_len
  push dword helloStr
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword foo_len
  push dword foo
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword bar_len
  push dword bar
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16

  ; system call: exit
  push dword 0
  mov eax, 1
  sub esp, 4
  int 128

  pop ebp

section .data

  helloStr: db 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 10
  foo: db 102, 111, 111, 10
  bar: db 98, 97, 114, 10
  helloStr_len: equ $-helloStr
  foo_len: equ $-foo
  bar_len: equ $-bar

