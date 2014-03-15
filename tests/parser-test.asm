section .text

global main

main:

  ; system call: exit
  push dword 0
  mov eax, 1
  sub esp, 4
  int 128

section .data



