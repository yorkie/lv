section .text

global main

main:

  ; system call: write
  push dword _lamb_var_70_len
  push dword _lamb_var_70
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword _lamb_var_39_len
  push dword _lamb_var_39
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

  _lamb_var_70: db "Hello World!", 0x0a
  _lamb_var_70_len: equ $-_lamb_var_70
  _lamb_var_39: db "Good Jobs!", 0x0a
  _lamb_var_39_len: equ $-_lamb_var_39

