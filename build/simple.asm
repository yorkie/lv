section .bss

section .text

global main

main:

	push ebp 
	mov ebp, esp
	sub esp, 10

	mov dword [ebp-16], 100
	mov dword [ebp-18], 0
	; system call: write
	push dword bee_len
	push dword bee
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

	mov esp, ebp
	pop ebp
	ret

section .data

	bee: db 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 10
	bee_len: equ $-bee

