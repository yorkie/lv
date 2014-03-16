section .text

global main

main:

  push ebp 
  push dword helloStr


  ; system call: write
  push dword x_len
  push dword x
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

  helloStr: db "1234123", 0x0a
  x_len: equ $-x

