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
  push dword _lamb_var_42_len
  push dword _lamb_var_42
  push dword 1
  mov eax, 4
  sub esp, 4
  int 128
  add esp, 16


  ; system call: write
  push dword _lamb_var_41_len
  push dword _lamb_var_41
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
  helloStr_len: equ $-helloStr
  _lamb_var_42: db 104, 97, 104, 97, 10
  _lamb_var_42_len: equ $-_lamb_var_42
  _lamb_var_41: db 98, 101, 101, 112, 10
  _lamb_var_41_len: equ $-_lamb_var_41

