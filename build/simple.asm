section .bss

section .text

global main

main:

	push ebp 
	mov ebp, esp

	mov eax, 100
	mov [ebx+16], eax
	mov eax, 0
	mov [ebx+18], eax

	; system call: exit
	push dword 0
	mov eax, 1
	sub esp, 4
	int 128

	mov esp, ebp
	pop ebp
	ret

section .data

	bee: db 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 10
	bee_len: equ $-bee

