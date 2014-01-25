
#include "vm.h"
#include "opcodes.h"

quip_object_t * quip_eval(quip_vm_t *vm) {
  
  quip_dump(vm);
  printf("\n");
  quip_instruction_t *ip = vm->main->ip;
  quip_instruction_t i;
  int registers[32] = {0};

  for (;;) {
    switch (OP(i = *ip++)) {
      // LOADK
      case QUIP_OP_LOADK:
        printf("loadk %d\n", K(B(i)));
        R((A(i))) = K(B(i));
        break;

      // LOADB
      case QUIP_OP_LOADB:
        printf("loadb %d %d %d\n", A(i), K(B(i)), C(i));
        R(A(i)) = K(B(i));
        if (C(i)) ip++;
        break;

      // ADD
      case QUIP_OP_ADD:
        R(A(i)) = RK(B(i)) + RK(C(i));
        break;

      // SUB
      case QUIP_OP_SUB:
        R(A(i)) = RK(B(i)) - RK(C(i));
        break;

      // DIV
      case QUIP_OP_DIV:
        R(A(i)) = RK(B(i)) / RK(C(i));
        break;

      // MUL
      case QUIP_OP_MUL:
        R(A(i)) = RK(B(i)) * RK(C(i));
        break;

      // MOD
      case QUIP_OP_MOD:
        R(A(i)) = RK(B(i)) % RK(C(i));
        break;

      // NEGATE
      case QUIP_OP_NEGATE:
        R(A(i)) = -R(B(i));
        break;

      // LT
      case QUIP_OP_LT:
        printf("lt %d %d\n", RK(B(i)), RK(C(i)));
        if (RK(B(i)) < RK(C(i))) ip++;
        break;

      // LTE
      case QUIP_OP_LTE:
        printf("lte %d %d\n", RK(B(i)), RK(C(i)));
        if (RK(B(i)) <= RK(C(i))) ip++;
        break;

      // JMP
      case QUIP_OP_JMP:
        printf("jmp %d\n", B(i));
        ip += B(i);
        break;

      // HALT
      case QUIP_OP_HALT:
        goto end;
    }
  }

end:
  return quip_int_new(R(0));
}