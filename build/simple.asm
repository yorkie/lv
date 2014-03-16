section .text

global main

main:

  push dword helloStr


  ; system call: write
  push dword helloStr_len
  push dword helloStr
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

section .data

  helloStr: db "> Hello World! >.<", 0x0a
  helloStr_len: equ $-helloStr

