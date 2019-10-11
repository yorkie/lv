section .bss

section .text

global main

main:

	push ebp 
	mov ebp, esp
	sub esp, 10

%push main_context
%stacksize large





	; system call: exit
	push dword 0
	mov eax, 1
	sub esp, 4
	int 128


%pop

	mov esp, ebp
	pop ebp
	ret

section .data

	__sys__type_integer: dd 0x0
	__sys__type_double: dd 0x1
	__sys__type_char: dd 0x2
	__sys__type_boolean: dd 0x3
	__sys__type_array: dd 0x4
	__sys__type_string: dd 0x5
	__sys__type_object: dd 0x6



