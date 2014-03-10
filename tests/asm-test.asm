section .text

global main

main:

  ; system call: write
  push dword _lamb_var_60_len
  push dword _lamb_var_60
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16

  ; system call: unlink
  push dword _lamb_var_74
  mov eax, 10
  sub esp, 4
  int 128

  ; system call: exit
  push dword 0
  mov eax, 1
  sub esp, 4
  int 128

section .data

  _lamb_var_60: db "Hello worldhdjsahdjs", 0x0a
  _lamb_var_60_len: equ $-_lamb_var_60
  _lamb_var_74: db "/opt/asm-test.sample", 0x0a

