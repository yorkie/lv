section .text

global main

main:

  ; system call: write
  push dword _lamb_var_87_len
  push dword _lamb_var_87
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword _lamb_var_99_len
  push dword _lamb_var_99
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

  _lamb_var_87: db "Hello World!", 0x0a
  _lamb_var_87_len: equ $-_lamb_var_87
  _lamb_var_99: db "Good Jobs! ^.^", 0x0a
  _lamb_var_99_len: equ $-_lamb_var_99

