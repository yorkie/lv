
//
// ast.h
//
// Copyright (c) 2014 Yorkie Neil <yorkiefixer@gmail.com>
//

#ifndef __QUIP_AST_H__
#define __QUIP_AST_H__

#include "token.h"
#include "vec.h"

/*
 * Nodes.
 */

#define QUIP_NODE_LIST \
  n(BLOCK) \
  n(EXPR_STMT) \
  n(RETURN) \
  n(DEF) \
  n(IF) \
  n(WHILE) \
  n(FOR) \
  n(UNARY_OP) \
  n(BINARY_OP) \
  n(TERNARY_OP) \
  n(BOOL) \
  n(NULL) \
  n(ID) \
  n(DECL) \
  n(CALL) \
  n(ARGS) \
  n(INT) \
  n(FLOAT) \
  n(STRING) \
  n(ARRAY) \
  n(HASH) \
  n(FUNCTION) \
  n(SLOT)

/*
 * Nodes enum.
 */

typedef enum {
#define n(node) QUIP_NODE_##node,
LUNA_NODE_LIST
#undef n
} quip_node_type;

/*
 * quip node
 */

typedef struct {
  quip_node_type type;
  int lineno;
} quip_node_t;

/*
 * quip block node
 */

typedef struct {
  quip_node_t base;
  quip_vec_t * stmts;
} quip_block_node_t;

/*
 * quip unary operation node.
 */

typedef struct {
  quip_node_t base;
  quip_token op;
  quip_node_t *expr;
  int postfix;
} quip_unary_op_node_t;

/*
 * quip binary operation node.
 */

typedef struct {
  quip_node_t base;
  quip_token op;
  quip_node_t *left;
  quip_node_t *right;
  int let;
} quip_binary_op_node_t;

/*
 * quip int node.
 */

typedef struct {
  quip_node_t base;
  int val;
} quip_int_node_t;

/*
 * quip float node.
 */

typedef struct {
  quip_node_t base;
  float val;
} quip_float_node_t;

/*
 * quip id node.
 */

typedef struct {
  quip_node_t base;
  const char *val;
} quip_id_node_t;

/*
 * quip declaration node.
 */

typedef struct {
  quip_node_t base;
  const char *name;
  const char *type;
  quip_node_t *val;
} quip_decl_node_t;

/*
 * quip string node.
 */

typedef struct {
  quip_node_t base;
  const char *val;
} quip_string_node_t;

/*
 * quip array node.
 */

typedef struct {
  quip_node_t base;
  quip_vec_t *vals;
} quip_array_node_t;

#endif /* __QUIP_AST__ */
