
//
// opcodes.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_OPCODES_H__
#define __QUIP_OPCODES_H__

/*
 * Opcodes.
 */

#define QUIP_OP_LIST            \
  o(HALT, "halt")               \
  o(JMP, "jmp")                 \
  o(LOADK, "loadk")             \
  o(LOADB, "loadb")             \
  o(MOVE, "move")               \
  o(EQ, "eq")                   \
  o(LT, "lt")                   \
  o(LTE, "lte")                 \
  o(ADD, "add")                 \
  o(SUB, "sub")                 \
  o(DIV, "div")                 \
  o(MUL, "mul")                 \
  o(MOD, "mod")                 \
  o(POW, "pow")                 \
  o(NEGATE, "negate")           \
  o(BIT_SHL, "bshl")            \
  o(BIT_SHR, "bshr")            \
  o(BIT_AND, "band")            \
  o(BIT_OR, "bor")              \
  o(BIT_XOR, "bxor")

/*
 * Opcodes enum.
 */

typedef enum {
#define o(op, str) QUIP_OP_##op,
QUIP_OP_LIST
#undef o
} quip_op_t;

/*
 * Opcode strings.
 */

static char *quip_op_strings[] = {
#define o(op, str) str,
QUIP_OP_LIST
#undef o
};

#endif /* __QUIP_OPCODES_H__ */