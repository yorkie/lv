section .text

global main

main:

  mov eax, 2
  sub esp, 4
  int 128


  ; system call: write
  push dword _lamb_var_17_len
  push dword _lamb_var_17
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword _lamb_var_16_len
  push dword _lamb_var_16
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

  _lamb_var_17: db "> Hello World!       >.<", 0x0a
  _lamb_var_17_len: equ $-_lamb_var_17
  _lamb_var_16: db "------------------------", 0x0a
  _lamb_var_16_len: equ $-_lamb_var_16

