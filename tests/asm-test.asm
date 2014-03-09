section .text

global main

main:

  push dword _lamb_var_58
  mov eax, 10
  sub esp, 4
  int 128

  push dword _lamb_var_91_len
  push dword _lamb_var_91
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16

  push dword 0
  mov eax, 1
  sub esp, 4
  int 128

section .data

  _lamb_var_58: db "/opt/asm-test.sample", 0x0a
  _lamb_var_91: db "Hello worldhdjsahdjs", 0x0a
  _lamb_var_91_len: equ $-_lamb_var_91

