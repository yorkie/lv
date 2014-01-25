
#ifndef __QUIP_VM_H__
#define __QUIP_VM_H__

#include <stdint.h>
#include "ast.h"

/*
 * Instruction.
 */

typedef uint32_t luna_instruction_t;

/*
 * Luna activation record.
 */

typedef struct {
  luna_instruction_t *ip;
  luna_instruction_t *code; // TODO: pointer to single malloc()?
  int nconstants;
  int *constants;
} quip_activation_t;

/*
 * Luna VM.
 */

typedef struct {
  quip_activation_t *main;
  quip_instruction_t *jump;
} quip_vm_t;

/*
 *   8    8   8   8
 * +----------------+
 * | op | a | b | c |
 * +----------------+
 */

#define ABC(op, a, b, c) \
  ( QUIP_OP_##op << 24 \
  | (a) << 16 \
  | (b) << 8 \
  | (c) )

/*
 *   8    8    16
 * +----------------+
 * | op | a |   b   |
 * +----------------+
 */

#define AB(op, a, b) \
  ( QUIP_OP_##op << 24 \
  | (a) << 16 \
  | (b) << 8 )

/*
 * Opcode.
 */

#define OP(i) ((i) >> 24 & 0xff)

/*
 * Operand A.
 */

#define A(i) ((i) >> 16 & 0xff)

/*
 * Operand B.
 */

#define B(i) ((i) >> 8 & 0xff)

/*
 * Operand C.
 */

#define C(i) ((i) & 0xff)

/*
 * Register n.
 */

#define R(n) registers[n]

/*
 * Constant n.
 */

#define K(n) vm->main->constants[(n) - 32]

/*
 * Register or constant.
 */

#define RK(n) \
   ((n) < 32 ? R(n) : K(n))


quip_object_t * quip_eval(luna_vm_t *vm);


#endif