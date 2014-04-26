section .text

global main

main:

  push ebp 
  ; system call: exit
  push dword 0
  mov eax, 1
  sub esp, 4
  int 128

  pop ebp

section .data



